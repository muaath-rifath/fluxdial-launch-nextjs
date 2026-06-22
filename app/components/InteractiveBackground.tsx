"use client";

import { useEffect, useState } from "react";

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Light Theme Static Grid */}
      <div className="light-theme-grid fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Dark Theme Interactive Grid */}
      <div className="dark-theme-grid fixed inset-0 z-[-1] pointer-events-none bg-background">
        {/* Base faint grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        {/* Interactive hover grid spotlight */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.25)_1.5px,transparent_1.5px)] [background-size:24px_24px]"
          style={{
            WebkitMaskImage: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            maskImage: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        />
        
        {/* Interactive subtle orange glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--sys-primary), transparent)`,
          }}
        />
      </div>
    </>
  );
}
