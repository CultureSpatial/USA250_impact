import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wine Micro-Experience | Spatial Studio',
  description: 'Discover wine stories through paired perspectives. A Vintage & Voice experience.',
  openGraph: {
    title: 'Wine Micro-Experience',
    description: 'Two perspectives on wine, told side-by-side.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-warm-sand text-studio-blue antialiased">
        <header className="border-b border-studio-blue/10 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl">🍷</span>
              <span className="font-semibold text-lg">Vintage & Voice</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/trader"
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Trader
              </Link>
              <Link
                href="/buyer"
                className="px-3 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition"
              >
                Explorer
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-full bg-studio-blue/10 hover:bg-studio-blue/20 text-studio-blue transition"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-studio-blue/10 mt-auto py-6">
          <div className="container mx-auto px-4 text-center text-sm text-studio-blue/60">
            <p>A Spatial Studio Experience &bull; Witness, don&apos;t judge</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
