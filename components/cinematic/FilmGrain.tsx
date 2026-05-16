'use client'

export function FilmGrain() {
  return (
    <>
      {/* Animated film grain */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.042] mix-blend-overlay"
        aria-hidden="true"
      >
        <svg className="h-full w-full animate-grain" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
      </div>

      {/* Horizontal scan lines */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        aria-hidden="true"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Subtle chromatic aberration at edges */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.018]"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(8,4,0,0.8) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </>
  )
}
