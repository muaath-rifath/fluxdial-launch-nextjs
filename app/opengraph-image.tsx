import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const alt = 'ErlangLabs - Enterprise AI Voice Agents';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1e1e1e 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e1e1e 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(12, 12, 12, 0.92)',
            padding: '64px 100px',
            borderRadius: '32px',
            border: '1.5px solid #2a2a2a',
          }}
        >
          {/* Logo row: SVG mark + HTML text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* E logo mark — paths only, no <text> */}
            <svg
              viewBox="40 70 340 270"
              width="110"
              height="110"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main E shape */}
              <path
                d="M 140 85 L 300 85 L 282 115 L 192 115 L 140 185 L 254 185 L 236 215 L 140 215 L 192 285 L 268 285 L 250 315 L 140 315 L 80 200 Z"
                fill="#eb4700"
                stroke="#eb4700"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Top-right node */}
              <line x1="285" y1="91" x2="330" y2="91" stroke="#eb4700" strokeWidth="9" />
              <circle cx="341" cy="91" r="10" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
              {/* Bottom-left node */}
              <line x1="60" y1="309" x2="140" y2="309" stroke="#eb4700" strokeWidth="9" />
              <circle cx="49" cy="309" r="10" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
            </svg>

            {/* "Erlang" text */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                fontFamily: 'sans-serif',
              }}
            >
              {/* Custom geometric L mark */}
              <svg
                viewBox="1050 80 165 240"
                width="52"
                height="88"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '-2px' }}
              >
                <path
                  d="M 1058 85 L 1112 85 L 1094 115 L 1094 270 L 1112 285 L 1205 285 L 1187 315 L 1058 315 Z"
                  fill="#e5e2e1"
                  stroke="#e5e2e1"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  fontSize: 96,
                  fontWeight: 800,
                  color: '#e5e2e1',
                  letterSpacing: '-3px',
                  lineHeight: 1,
                  fontFamily: 'sans-serif',
                }}
              >
                erlang
              </span>

              <span
                style={{
                  fontSize: 96,
                  fontWeight: 800,
                  color: '#e5e2e1',
                  letterSpacing: '-3px',
                  lineHeight: 1,
                  fontFamily: 'sans-serif',
                }}
              >
                abs
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: '44px',
              fontSize: 38,
              fontWeight: 500,
              color: '#808080',
              textAlign: 'center',
              letterSpacing: '-0.01em',
              fontFamily: 'sans-serif',
            }}
          >
            The Voice Infrastructure for Enterprise AI.
          </div>

          {/* Subtle accent line */}
          <div
            style={{
              marginTop: '32px',
              width: '80px',
              height: '3px',
              backgroundColor: '#eb4700',
              borderRadius: '2px',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
      },
    }
  );
}
