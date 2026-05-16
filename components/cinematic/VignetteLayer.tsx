'use client'

interface Props {
  intensity?: 'light' | 'medium' | 'heavy'
}

const INTENSITIES = {
  light: 'rgba(10,8,5,0.3)',
  medium: 'rgba(10,8,5,0.5)',
  heavy: 'rgba(10,8,5,0.72)',
}

export function VignetteLayer({ intensity = 'medium' }: Props) {
  const color = INTENSITIES[intensity]
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        background: `radial-gradient(ellipse at center, transparent 40%, ${color} 100%)`,
      }}
      aria-hidden="true"
    />
  )
}
