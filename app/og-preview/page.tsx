'use client';

import { useState } from 'react';

// All values derived from source SVG viewBox "20 70 1700 340"
// Content: y=85 (top) → y=315 (baseline), height=230 SVG units
// Font-size: 240 SVG units, baseline at y=315 (same as path bottoms)

const SCALE = 130 / 230;
const fs = (u: number) => Math.round(u * SCALE);

export default function OGPreview() {
  const [scale, setScale] = useState(1);
  const [marginLeft1, setMarginLeft1] = useState(-4);
  const [marginLeft2, setMarginLeft2] = useState(-2);
  const [align, setAlign] = useState<'baseline' | 'flex-end' | 'center'>('baseline');

  return (
    <div style={{ background: '#111', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ marginBottom: 8 }}>OG Image Preview</h1>
      <p style={{ color: '#888', marginBottom: 32, fontSize: 14 }}>
        This replicates the exact layout used in <code>app/opengraph-image.tsx</code>
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 40, flexWrap: 'wrap', fontSize: 14, color: '#aaa' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Logo scale: <strong style={{ color: '#fff' }}>{scale.toFixed(2)}</strong>
          <input type="range" min={0.5} max={2} step={0.05} value={scale}
            onChange={e => setScale(Number(e.target.value))} style={{ width: 160 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          rlang marginLeft: <strong style={{ color: '#fff' }}>{marginLeft1}px</strong>
          <input type="range" min={-100} max={10} step={1} value={marginLeft1}
            onChange={e => setMarginLeft1(Number(e.target.value))} style={{ width: 160 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          abs marginLeft: <strong style={{ color: '#fff' }}>{marginLeft2}px</strong>
          <input type="range" min={-30} max={10} step={1} value={marginLeft2}
            onChange={e => setMarginLeft2(Number(e.target.value))} style={{ width: 160 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          alignItems:
          <select value={align} onChange={e => setAlign(e.target.value as typeof align)}
            style={{ background: '#222', color: '#fff', padding: '4px 8px', border: '1px solid #444', borderRadius: 4 }}>
            <option value="baseline">baseline</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
          </select>
        </label>
      </div>

      {/* OG Card preview */}
      <div style={{
        width: 1200, height: 630,
        background: '#0a0a0a',
        backgroundImage: 'radial-gradient(circle at 25px 25px, #1e1e1e 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e1e1e 2%, transparent 0%)',
        backgroundSize: '100px 100px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        marginBottom: `${630 * (scale - 1) + 40}px`,
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(12,12,12,0.92)',
          padding: '64px 100px', borderRadius: 32,
          border: '1.5px solid #2a2a2a',
        }}>

          {/* ─── Logo Row ─── */}
          {/* Red line = baseline reference */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: align, gap: 0,
            }}>

              {/* E mark: viewBox padded to prevent circle/stroke clipping */}
              <svg viewBox="25 68 350 252" width={fs(350)} height={fs(252)}
                style={{ display: 'block', overflow: 'visible' }}>
                <path
                  d="M 140 85 L 300 85 L 282 115 L 192 115 L 140 185 L 254 185 L 236 215 L 140 215 L 192 285 L 268 285 L 250 315 L 140 315 L 80 200 Z"
                  fill="#eb4700" stroke="#eb4700" strokeWidth="5" strokeLinejoin="round" />
                <line x1="285" y1="91" x2="340" y2="91" stroke="#eb4700" strokeWidth="9" />
                <circle cx="352" cy="91" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
                <line x1="60" y1="309" x2="140" y2="309" stroke="#eb4700" strokeWidth="9" />
                <circle cx="48" cy="309" r="11" fill="#0a0a0a" stroke="#eb4700" strokeWidth="8" />
              </svg>

              {/* rlang */}
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: fs(240),
                fontWeight: 800,
                color: '#e5e2e1',
                lineHeight: 1,
                marginLeft: marginLeft1,
              }}>rlang</span>

              {/* L path: after translate(-109,0) → x=949–1096, y=85–315 */}
              <svg viewBox="949 85 147 230" width={fs(147)} height={fs(230)}
                style={{ display: 'block' }}>
                <path
                  d="M 949 85 L 1003 85 L 985 115 L 985 270 L 1003 285 L 1096 285 L 1078 315 L 949 315 Z"
                  fill="#e5e2e1" stroke="#e5e2e1" strokeWidth="5" strokeLinejoin="round" />
              </svg>

              {/* abs */}
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: fs(240),
                fontWeight: 800,
                color: '#e5e2e1',
                lineHeight: 1,
                marginLeft: marginLeft2,
              }}>abs</span>

            </div>

            {/* Baseline guide overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 1, background: 'rgba(255,0,0,0.5)', pointerEvents: 'none',
            }} title="bottom edge" />
          </div>

          {/* Tagline */}
          <div style={{
            marginTop: 44, fontSize: 38, fontWeight: 500, color: '#808080',
            textAlign: 'center', fontFamily: 'Montserrat, sans-serif',
          }}>
            The Voice Infrastructure for Enterprise AI.
          </div>

          <div style={{ marginTop: 28, width: 64, height: 3, background: '#eb4700', borderRadius: 2 }} />
        </div>
      </div>

      {/* Source SVG for comparison */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 12 }}>Source SVG (reference)</h2>
        <div style={{ background: '#1a1a1a', padding: 32, borderRadius: 16, display: 'inline-block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/erlanglabs-logo-topbar.svg" alt="source logo" style={{ height: 60, display: 'block' }} />
        </div>
      </div>
    </div>
  );
}
