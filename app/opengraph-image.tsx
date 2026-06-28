import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export const alt = 'ErlangLabs - Enterprise AI Voice Agents';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Derived from source SVG viewBox "20 70 1700 340":
// Content height: y=85 (top) → y=315 (baseline) = 230 SVG units
// Font-size in SVG: 240 units, baseline at y=315
// Scale so the logo sits nicely: 130px / 230 units = 0.565
const SCALE = 130 / 230;
const fs = (svgUnits: number) => Math.round(svgUnits * SCALE);

export default async function Image() {
  // Load Montserrat ExtraBold — same family used in the source SVG
  // File downloaded to app/fonts/ (see setup below)
  const fontData = await readFile(
    join(process.cwd(), 'app', 'fonts', 'Montserrat-ExtraBold.ttf')
  );

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
            backgroundColor: 'rgba(12,12,12,0.92)',
            padding: '64px 100px',
            borderRadius: '32px',
            border: '1.5px solid #2a2a2a',
          }}
        >
          {/*
           * Logo row: [E-mark] [rlang] [L-path] [abs]
           *
           * Satori does NOT correctly implement alignItems:'baseline' for SVG
           * replaced elements (it uses top/center instead of bottom edge).
           * Fix: use alignItems:'flex-end' to align the bottom bounding boxes,
           * and use transform: translateY(-19px) to visually push the SVGs UP
           * so their bottoms sit precisely on the text baseline.
           * (Offset of -19px was visually confirmed via the /og-preview tool)
           */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0 }}>

            {/* E mark: y=68 → 320 (height=252). Fully includes bottom-left node circle. */}
            <svg viewBox="25 68 350 252" width={fs(350)} height={fs(252)} style={{ transform: 'translateY(-19px)' }} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 140 85 L 300 85 L 282 115 L 192 115 L 140 185 L 254 185 L 236 215 L 140 215 L 192 285 L 268 285 L 250 315 L 140 315 L 80 200 Z"
                fill="#eb4700" stroke="#eb4700" strokeWidth="5" strokeLinejoin="round"
              />
              <line x1="285" y1="91" x2="340" y2="91" stroke="#eb4700" strokeWidth="9" />
              <circle cx="352" cy="91" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
              <line x1="60" y1="309" x2="140" y2="309" stroke="#eb4700" strokeWidth="9" />
              <circle cx="48" cy="309" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
            </svg>

            {/* "rlang" — marginLeft=-60px confirmed via og-preview */}
            <span style={{
              fontFamily: 'Montserrat',
              fontSize: `${fs(240)}px`,
              fontWeight: 800,
              color: '#e5e2e1',
              lineHeight: 1,
              marginLeft: '-60px',
            }}>
              rlang
            </span>

            {/* L path: y=85 → 315 (height=230) */}
            <svg viewBox="949 85 147 230" width={fs(147)} height={fs(230)} style={{ transform: 'translateY(-19px)' }} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 949 85 L 1003 85 L 985 115 L 985 270 L 1003 285 L 1096 285 L 1078 315 L 949 315 Z"
                fill="#e5e2e1" stroke="#e5e2e1" strokeWidth="5" strokeLinejoin="round"
              />
            </svg>

            {/* "abs" — marginLeft=1px confirmed via og-preview */}
            <span style={{
              fontFamily: 'Montserrat',
              fontSize: `${fs(240)}px`,
              fontWeight: 800,
              color: '#e5e2e1',
              lineHeight: 1,
              marginLeft: '1px',
            }}>
              abs
            </span>

          </div>

          <div style={{
            marginTop: '44px',
            fontSize: '38px',
            fontWeight: 500,
            color: '#b0b0b0',
            textAlign: 'center',
            fontFamily: 'Montserrat',
            display: 'flex',
          }}>
            The Voice Infrastructure for Enterprise AI.
          </div>

          <div style={{
            marginTop: '28px',
            width: '64px',
            height: '3px',
            backgroundColor: '#eb4700',
            borderRadius: '2px',
            display: 'flex',
          }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Montserrat',
          data: fontData,
          weight: 800,
          style: 'normal',
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
      },
    }
  );
}
