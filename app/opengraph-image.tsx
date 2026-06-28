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
          backgroundImage: 'radial-gradient(circle at 25px 25px, #222 2%, transparent 0%), radial-gradient(circle at 75px 75px, #222 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(10, 10, 10, 0.85)',
            padding: '60px 100px',
            borderRadius: '32px',
            border: '2px solid #2a2a2a',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '800px', height: '160px' }}>
            <svg viewBox="20 70 1700 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <g id="logo-mark">
                  <path d="M 140 85 
                           L 300 85 
                           L 282 115 
                           L 192 115 
                           L 140 185 
                           L 254 185 
                           L 236 215 
                           L 140 215 
                           L 192 285 
                           L 268 285 
                           L 250 315 
                           L 140 315 
                           L 80 200 Z" 
                        fill="#eb4700" 
                        stroke="#eb4700" 
                        strokeWidth="5" 
                        strokeLinejoin="round" />

                  {/* Top Right Node & Connection Line */}
                  <line x1="285" y1="91" x2="340" y2="91" stroke="#eb4700" strokeWidth="9" />
                  <circle cx="352" cy="91" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />

                  {/* Bottom Left Node & Connection Line */}
                  <line x1="60" y1="309" x2="140" y2="309" stroke="#eb4700" strokeWidth="9" />
                  <circle cx="48" cy="309" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
              </g>

              <g id="logo-typography">
                  <text x="300" y="315" fill="#e5e2e1" fontSize="240" fontWeight="800" textAnchor="start" textLength="629" lengthAdjust="spacing" style={{ fontFamily: 'sans-serif' }}>rlang</text>
                  
                  {/* Custom text-colored L with subtle geometric cuts mirroring the E */}
                  <g transform="translate(-109, 0)">
                      <path d="M 1058 85 
                               L 1112 85 
                               L 1094 115 
                               L 1094 270 
                               L 1112 285 
                               L 1205 285 
                               L 1187 315 
                               L 1058 315 Z" 
                            fill="#e5e2e1"
                            stroke="#e5e2e1"
                            strokeWidth="5"
                            strokeLinejoin="round" />
                            
                      <text x="1220" y="315" fill="#e5e2e1" fontSize="240" fontWeight="800" textAnchor="start" textLength="390" lengthAdjust="spacing" style={{ fontFamily: 'sans-serif' }}>abs</text>
                  </g>
              </g>
            </svg>
          </div>
          
          {/* Tagline */}
          <div style={{ 
            marginTop: '40px', 
            fontSize: 42, 
            fontWeight: 500, 
            color: '#a0a0a0',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            fontFamily: 'sans-serif'
          }}>
            The Voice Infrastructure for Enterprise AI.
          </div>
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
