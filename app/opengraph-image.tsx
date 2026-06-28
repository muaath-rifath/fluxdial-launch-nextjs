import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'ErlangLabs - Enterprise AI Voice Agents';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// SVG geometry from public/erlanglabs-logo-topbar.svg
// ViewBox: "20 70 1700 340". Content y: 85 (top) → 315 (baseline), height=230 units.
// Font-size: 240 SVG units, baseline at y=315 (same as path bottoms).
// Scale: 120px rendered height / 230 SVG units = 0.5217
// With alignItems:'baseline', SVG bottom-edge = text baseline — exact match.

const SCALE = 120 / 230; // ~0.5217

// Convert SVG width in units → px
const sw = (units: number) => Math.round(units * SCALE);

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
          {/*
           * Logo row: [E-mark SVG] [rlang span] [L-path SVG] [abs span]
           *
           * alignItems:'baseline' makes:
           *   - SVG elements: bottom edge = baseline
           *   - Text spans: font baseline = baseline
           * This replicates the SVG layout where all elements share y=315 baseline.
           *
           * Each SVG viewBox Y range ends at y=315 so its bottom = the text baseline.
           * Font-size = 240 * SCALE px to match the SVG proportions.
           */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: 0,
            }}
          >
            {/*
             * E mark SVG
             * SVG x: 37 (circle left) → 363 (circle right), y: 80 (circle top) → 315 (baseline)
             * Height (y: 80→315) = 235 units → sw(235) = 123px
             * Width  (x: 37→363) = 326 units → sw(326) = 170px
             * viewBox ends at y=315 so SVG bottom aligns with text baseline.
             */}
            <svg
              viewBox="37 80 326 235"
              width={sw(326)}
              height={sw(235)}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 140 85 L 300 85 L 282 115 L 192 115 L 140 185 L 254 185 L 236 215 L 140 215 L 192 285 L 268 285 L 250 315 L 140 315 L 80 200 Z"
                fill="#eb4700"
                stroke="#eb4700"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <line x1="285" y1="91" x2="340" y2="91" stroke="#eb4700" strokeWidth="9" />
              <circle cx="352" cy="91" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
              <line x1="60" y1="309" x2="140" y2="309" stroke="#eb4700" strokeWidth="9" />
              <circle cx="48" cy="309" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
            </svg>

            {/*
             * "rlang" text
             * In SVG: x=300 (just after E mark at x≈300), font-size=240, baseline y=315
             * font-size in px = 240 * SCALE = 125px
             */}
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: `${Math.round(240 * SCALE)}px`,
                fontWeight: 800,
                color: '#e5e2e1',
                lineHeight: 1,
                letterSpacing: '-1px',
              }}
            >
              rlang
            </span>

            {/*
             * Geometric L path
             * SVG coords after translate(-109,0): x=949→1096, y=85→315
             * Height (85→315) = 230 units → sw(230) = 120px  ← exactly matches text cap height
             * Width  (949→1096) = 147 units → sw(147) = 77px
             * viewBox ends at y=315 so SVG bottom = text baseline.
             */}
            <svg
              viewBox="949 85 147 230"
              width={sw(147)}
              height={sw(230)}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 949 85 L 1003 85 L 985 115 L 985 270 L 1003 285 L 1096 285 L 1078 315 L 949 315 Z"
                fill="#e5e2e1"
                stroke="#e5e2e1"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>

            {/*
             * "abs" text
             * In SVG: x=1111 (after translate), font-size=240, baseline y=315
             */}
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: `${Math.round(240 * SCALE)}px`,
                fontWeight: 800,
                color: '#e5e2e1',
                lineHeight: 1,
                letterSpacing: '-1px',
              }}
            >
              abs
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: '44px',
              fontSize: '38px',
              fontWeight: 500,
              color: '#808080',
              textAlign: 'center',
              letterSpacing: '-0.01em',
              fontFamily: 'sans-serif',
              display: 'flex',
            }}
          >
            The Voice Infrastructure for Enterprise AI.
          </div>

          {/* Orange accent */}
          <div
            style={{
              marginTop: '28px',
              width: '64px',
              height: '3px',
              backgroundColor: '#eb4700',
              borderRadius: '2px',
              display: 'flex',
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
