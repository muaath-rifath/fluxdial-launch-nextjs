import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// ─── Zod Schema ────────────────────────────────────────────────────────────────
const earlyAccessSchema = z.object({
  firstName:      z.string().min(1, 'First name is required').max(100),
  lastName:       z.string().min(1, 'Last name is required').max(100),
  email:          z.email('Invalid email address').max(254),
  companySize:    z.string().min(1, 'Company size is required').max(100),
  message:        z.string().min(1, 'Message is required').max(5000),
  turnstileToken: z.string().min(1, 'CAPTCHA token is required'),
  _honey:         z.string().optional().default(''),
});

// ─── Redis client (shared for rate limiting + deduplication) ─────────────────
// Gracefully disabled when env vars are not set (local dev / preview).
const redisUrl   = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

if (redisUrl && redisToken) {
  redis = new Redis({ url: redisUrl, token: redisToken });

  ratelimit = new Ratelimit({
    redis,
    // 5 submissions per IP per 10-minute sliding window (tighter than contact)
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    analytics: true,
    prefix: 'erlanglabs:early-access',
  });
}

// ─── Deduplication helpers ────────────────────────────────────────────────────
function waitlistKey(email: string): string {
  return `erlanglabs:waitlist:${email.toLowerCase().trim()}`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getClientIp(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('X-Forwarded-For')?.split(',')[0].trim() ??
    'unknown'
  );
}

async function getZohoAccessToken() {
  const url =
    `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token` +
    `?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}` +
    `&client_id=${process.env.ZOHO_CLIENT_ID}` +
    `&client_secret=${process.env.ZOHO_CLIENT_SECRET}` +
    `&grant_type=refresh_token`;

  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(`Failed to refresh Zoho token: ${data.error ?? 'Unknown error'}`);
  }

  return data.access_token as string;
}

async function verifyTurnstileToken(token: string, remoteip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return false;
  }

  const formData = new URLSearchParams();
  formData.append('secret', secret);
  formData.append('response', token);
  if (remoteip) formData.append('remoteip', remoteip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  });

  const data = await res.json();
  return data.success === true;
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // ── 1. Origin check (production only) ──────────────────────────────────────
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl && process.env.NODE_ENV === 'production') {
      const origin = request.headers.get('origin') ?? '';
      const allowed = siteUrl.replace(/\/$/, '');
      if (origin !== allowed) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    // ── 2. Rate limiting ────────────────────────────────────────────────────────
    if (ratelimit) {
      const ip = getClientIp(request);
      const { success, limit, remaining, reset } = await ratelimit.limit(ip);
      if (!success) {
        const retryAfterSecs = Math.ceil((reset - Date.now()) / 1000);
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit':     String(limit),
              'X-RateLimit-Remaining': String(remaining),
              'Retry-After':           String(retryAfterSecs),
            },
          }
        );
      }
    }

    // ── 3. Parse & validate body with Zod ──────────────────────────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = earlyAccessSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? 'Invalid request data' },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, companySize, message, turnstileToken, _honey } = parsed.data;

    // ── 4. Honeypot check ───────────────────────────────────────────────────────
    // If the hidden field was filled, it's almost certainly a bot.
    // Return a 200 to avoid teaching the bot what failed.
    if (_honey) {
      console.warn(`Honeypot triggered from IP: ${getClientIp(request)}`);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ── 5. Turnstile CAPTCHA verification ───────────────────────────────────────
    const ip = getClientIp(request);
    const isHuman = await verifyTurnstileToken(turnstileToken, ip);
    if (!isHuman) {
      return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 });
    }

    // ── 5.5. Duplicate email check ───────────────────────────────────────────────
    // Stores email -> ISO timestamp in Redis with no TTL (permanent waitlist record).
    // Gracefully skipped when Redis is not configured.
    if (redis) {
      const key = waitlistKey(email);
      const existing = await redis.get<string>(key);
      if (existing) {
        return NextResponse.json(
          { error: 'already_registered', message: 'This email is already on the waitlist.' },
          { status: 409 }
        );
      }
      // Reserve the slot before hitting Zoho/Resend (deleted on CRM failure)
      await redis.set(key, new Date().toISOString());
    }

    // ── 6. Get Zoho access token ────────────────────────────────────────────────
    const accessToken = await getZohoAccessToken();

    // ── 7. Create lead in Zoho CRM ──────────────────────────────────────────────
    const leadData = {
      data: [
        {
          First_Name:  firstName,
          Last_Name:   lastName,
          Email:       email,
          Company:     companySize, // Saving the company size choice into the Company field
          Description: message,
          Lead_Source: 'Website Early Access',
        },
      ],
    };

    const crmResponse = await fetch(`${process.env.ZOHO_API_BASE_URL}/crm/v3/Leads`, {
      method: 'POST',
      headers: {
        Authorization:  `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const crmResult = await crmResponse.json();

    if (!crmResponse.ok || crmResult.data?.[0]?.status === 'error') {
      console.error('Zoho API Error Detail:', crmResult);
      // Release the deduplication key so the user can retry after a CRM failure
      if (redis) {
        await redis.del(waitlistKey(email));
      }
      return NextResponse.json({ error: 'Failed to push data to CRM' }, { status: 502 });
    }

    // ── 8. Send confirmation email via Resend ───────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && resendKey !== 'your_resend_api_key_here') {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'contact@erlanglabs.com',
          to:   email,
          subject: "You're on the ErlangLabs waitlist!",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta name="color-scheme" content="light dark">
              <meta name="supported-color-schemes" content="light dark">
              <style>
                body {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background-color: #f9f9fa;
                  color: #111827;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid #e5e7eb;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background-color: #111827;
                  padding: 32px;
                  text-align: center;
                  border-bottom: 4px solid #FF5B0A;
                }
                .logo {
                  color: #ffffff;
                  font-size: 24px;
                  font-weight: 700;
                  letter-spacing: -0.5px;
                  margin: 0;
                }
                .logo span { color: #FF5B0A; }
                .content { padding: 40px 32px; }
                h1 { font-size: 24px; margin-top: 0; margin-bottom: 16px; font-weight: 600; color: #111827; }
                p { font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 24px; color: #4b5563; }
                .footer { background-color: #f3f4f6; padding: 24px 32px; text-align: center; font-size: 14px; color: #6b7280; }
                @media (prefers-color-scheme: dark) {
                  body { background-color: #030712; }
                  .container { background-color: #111827; border-color: #1f2937; }
                  .header { background-color: #030712; }
                  h1 { color: #f9fafb; }
                  p { color: #9ca3af; }
                  .footer { background-color: #0f141e; }
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 class="logo">Erlang<span>Labs</span></h2>
                </div>
                <div class="content">
                  <h1>Hi ${firstName || 'there'},</h1>
                  <p>You're officially on the waitlist for ErlangLabs early access! We have received your details.</p>
                  <p>We are rolling out access gradually and our team will be in touch with you shortly to discuss your use case and get you onboarded.</p>
                  <p style="margin-bottom: 0;">Best regards,<br/><strong style="color: #FF5B0A;">The ErlangLabs Team</strong></p>
                </div>
                <div class="footer">
                  &copy; ${new Date().getFullYear()} ErlangLabs. All rights reserved.
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Non-fatal: don't fail the whole request if email alone fails
      }
    }

    return NextResponse.json(
      { success: true, message: 'Early access lead created and email sent successfully' },
      { status: 200 }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
