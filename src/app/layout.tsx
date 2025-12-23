
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pomodoro Timer - Focus with Music | Free Productivity Tool',
    template: '%s | Pomodoro Timer',
  },
  description: 'Free Pomodoro timer with lofi, epic score, and phonk music. Boost productivity with 25-minute focus sessions. No signup required. Works offline.',
  keywords: [
    'pomodoro timer',
    'pomodoro technique',
    'focus timer',
    'productivity timer',
    'study timer',
    'work timer',
    'lofi timer',
    'pomodoro with music',
    'free pomodoro app',
    '25 minute timer',
    'time management',
    'focus music',
    'productivity tool',
    'study music timer',
    'concentration timer',
  ],
  authors: [{ name: 'Aldi Nurfa Pratama' }],
  creator: 'Aldi Nurfa Pratama',
  publisher: 'Aldi Nurfa Pratama',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mysite.vercel.app',
    title: 'Pomodoro Timer - Focus with Music',
    description: 'Free Pomodoro timer with lofi, epic score, and phonk music. 25-minute focus sessions to boost your productivity.',
    siteName: 'Pomodoro Timer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pomodoro Timer App Screenshot',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pomodoro Timer - Focus with Music',
    description: 'Free Pomodoro timer with lofi, epic score, and phonk music.',
    images: ['/og-image.png'],
    creator: '@yourhandle',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7C3AED' },
    { media: '(prefers-color-scheme: dark)', color: '#1E1B4B' },
  ],

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },



}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}