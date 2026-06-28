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
          {/*
           * Logo: replicates public/erlanglabs-logo-topbar.svg exactly.
           * SVG viewBox "20 70 1700 340":
           *   - E logo mark (orange polygon + nodes)
           *   - "rlang" text at x=300
           *   - Geometric L path (translate -109) starting at x=1058
           *   - "abs" text at x=1220 (after translate -109 → effective x=1111)
           *
           * Satori does not support SVG <text> nodes, so text is rendered
           * as HTML <span> elements positioned inline, matching the layout.
           *
           * The logo row is: [E-mark] [rlang] [L-path] [abs]
           * We scale the whole thing to fit ~960px wide at OG image size.
           *)
          */}

          {/* Logo row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              // The SVG viewBox width is 1700, height 340.
              // We scale to height=112px → scale factor = 112/340 ≈ 0.329
              // viewBox x-start=20, so E-mark starts at SVG x=80..300 → ~26..92px
              height: '112px',
              gap: '0px',
            }}
          >
            {/* E logo mark: viewBox subset covering the mark (x: 40–370, y: 70–340) */}
            <svg
              viewBox="40 70 340 270"
              height="112"
              width="141"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              {/* Main E polygon */}
              <path
                d="M 140 85 L 300 85 L 282 115 L 192 115 L 140 185 L 254 185 L 236 215 L 140 215 L 192 285 L 268 285 L 250 315 L 140 315 L 80 200 Z"
                fill="#eb4700"
                stroke="#eb4700"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              {/* Top-right node & line */}
              <line x1="285" y1="91" x2="340" y2="91" stroke="#eb4700" strokeWidth="9" />
              <circle cx="352" cy="91" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
              {/* Bottom-left node & line */}
              <line x1="60" y1="309" x2="140" y2="309" stroke="#eb4700" strokeWidth="9" />
              <circle cx="48" cy="309" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
            </svg>

            {/* "rlang" — matches SVG text x=300, font-size=240, font-weight=800
                Scale: 112/340 ≈ 0.329 → fontSize = 240 * 0.329 ≈ 79px
                The original textLength=629 at scale → 629 * 0.329 ≈ 207px */}
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: '79px',
                fontWeight: 800,
                color: '#e5e2e1',
                lineHeight: 1,
                letterSpacing: '-2px',
                display: 'flex',
                alignItems: 'center',
                // Slight left nudge to close gap after E mark (mirrors SVG spacing)
                marginLeft: '-6px',
              }}
            >
              rlang
            </span>

            {/* Geometric L path: from SVG translate(-109,0), path starts at x=1058
                Effective SVG region: x: 949–1096, y: 85–315  (with translate -109)
                Width in SVG coords: ~147, Height: 230
                At scale 0.329: width≈48px, height≈76px
                We add a small gap to match SVG spacing between "rlang" and L */}
            <svg
              viewBox="949 70 155 270"
              height="112"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0, marginLeft: '1px' }}
            >
              {/* L path with translate(-109,0) applied: original coords shifted */}
              <path
                d="M 949 85 L 1003 85 L 985 115 L 985 270 L 1003 285 L 1096 285 L 1078 315 L 949 315 Z"
                fill="#e5e2e1"
                stroke="#e5e2e1"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>

            {/* "abs" — matches SVG text x=1220 (after translate -109 → 1111)
                Same font size as "rlang": 79px
                Original textLength=390 → at scale ≈ 128px */}
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: '79px',
                fontWeight: 800,
                color: '#e5e2e1',
                lineHeight: 1,
                letterSpacing: '-2px',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '-2px',
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

          {/* Accent line */}
          <div
            style={{
              marginTop: '32px',
              width: '80px',
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
