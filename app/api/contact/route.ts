import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Helper function to get a temporary access token using the persistent refresh token
async function getZohoAccessToken() {
  const url = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&grant_type=refresh_token`;

  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(`Failed to refresh Zoho token: ${data.error || 'Unknown error'}`);
  }

  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message } = body;

    // Basic validation
    if (!lastName || !email) {
      return NextResponse.json({ error: 'Missing mandatory fields (Last Name, Email)' }, { status: 400 });
    }

    // 1. Get a fresh short-lived access token
    const accessToken = await getZohoAccessToken();

    // 2. Format the payload specifically for the Zoho CRM Leads module
    // Zoho CRM requires "Last_Name" as a mandatory field for new leads by default
    const leadData = {
      data: [
        {
          First_Name: firstName || '',
          Last_Name: lastName,
          Email: email,
          Company: company || 'Not Provided',
          Description: message || '',
          Lead_Source: 'Website Contact Form'
        }
      ]
    };

    // 3. Post data to Zoho CRM Leads API endpoint
    const crmResponse = await fetch(`${process.env.ZOHO_API_BASE_URL}/crm/v3/Leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    const crmResult = await crmResponse.json();

    if (!crmResponse.ok || crmResult.data?.[0]?.status === 'error') {
      console.error('Zoho API Error Detail:', crmResult);
      return NextResponse.json({ error: 'Failed to push data to CRM' }, { status: 502 });
    }

    // 4. Send confirmation email using Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'contact@erlanglabs.com',
          to: email,
          subject: 'Thank you for reaching out to ErlangLabs',
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
                .logo span {
                  color: #FF5B0A;
                }
                .content {
                  padding: 40px 32px;
                }
                h1 {
                  font-size: 24px;
                  margin-top: 0;
                  margin-bottom: 16px;
                  font-weight: 600;
                  color: #111827;
                }
                p {
                  font-size: 16px;
                  line-height: 1.6;
                  margin-top: 0;
                  margin-bottom: 24px;
                  color: #4b5563;
                }
                .footer {
                  background-color: #f3f4f6;
                  padding: 24px 32px;
                  text-align: center;
                  font-size: 14px;
                  color: #6b7280;
                }
                
                @media (prefers-color-scheme: dark) {
                  body {
                    background-color: #030712;
                  }
                  .container {
                    background-color: #111827;
                    border-color: #1f2937;
                  }
                  .header {
                    background-color: #030712;
                  }
                  h1 {
                    color: #f9fafb;
                  }
                  p {
                    color: #9ca3af;
                  }
                  .footer {
                    background-color: #0f141e;
                  }
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
                  <p>Thank you for getting in touch with us! We have received your inquiry regarding our enterprise AI voice solutions.</p>
                  <p>Our team is currently reviewing your message. We aim to respond to all inquiries within 24 hours to discuss how we can help scale your infrastructure.</p>
                  <p style="margin-bottom: 0;">Best regards,<br/><strong style="color: #FF5B0A;">The ErlangLabs Team</strong></p>
                </div>
                <div class="footer">
                  &copy; ${new Date().getFullYear()} ErlangLabs. All rights reserved.
                </div>
              </div>
            </body>
            </html>
          `
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // We don't fail the whole request if just the email fails
      }
    }

    return NextResponse.json({ success: true, message: 'Lead created and email sent successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
