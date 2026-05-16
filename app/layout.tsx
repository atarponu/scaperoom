import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scaperoom — Amsterdam, 1942',
  description:
    'An interactive historical experience set in Nazi-occupied Amsterdam.',
  robots: 'noindex',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className="h-full overflow-hidden bg-ink">{children}</body>
    </html>
  )
}
