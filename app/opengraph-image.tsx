import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

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
          {/* Logo Mark + Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {/* SVG Logo Mark */}
            <svg viewBox="40 70 330 260" width="160" height="125" xmlns="http://www.w3.org/2000/svg">
              <path d="M 140 85 L 300 85 L 282 115 L 192 115 L 140 185 L 254 185 L 236 215 L 140 215 L 192 285 L 268 285 L 250 315 L 140 315 L 80 200 Z" fill="#eb4700" />
              <line x1="285" y1="91" x2="340" y2="91" stroke="#eb4700" strokeWidth="9" />
              <circle cx="352" cy="91" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
              <line x1="60" y1="309" x2="140" y2="309" stroke="#eb4700" strokeWidth="9" />
              <circle cx="48" cy="309" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
            </svg>
            
            {/* Text Logo */}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 110, fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.04em', fontFamily: 'sans-serif' }}>Erlang</span>
                <span style={{ fontSize: 110, fontWeight: 800, color: '#eb4700', letterSpacing: '-0.04em', fontFamily: 'sans-serif' }}>Labs</span>
            </div>
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
    }
  );
}
