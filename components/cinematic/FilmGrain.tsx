'use client'

export function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full animate-grain"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  )
}
