import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'R.I.S.E. Program | AOI · Citizens Specialty Hospital',
  description:
    'R.I.S.E. Program (Robotic Integrated Surgical Education) — Largest Robotix Conclave in Hyderabad. Live surgical demonstrations & keynotes: redefining robotic surgeries in cancer care. Interactive scientific agenda.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e1b4b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
