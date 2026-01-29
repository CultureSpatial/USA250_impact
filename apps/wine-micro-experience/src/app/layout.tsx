import type { Metadata } from 'next'
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
        <header className="border-b border-studio-blue/10 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍷</span>
              <span className="font-semibold text-lg">Vintage & Voice</span>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <button className="px-3 py-1.5 rounded-full bg-studio-blue/10 hover:bg-studio-blue/20 transition">
                Trader
              </button>
              <button className="px-3 py-1.5 rounded-full bg-wine-red/10 hover:bg-wine-red/20 transition">
                Explorer
              </button>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-studio-blue/10 mt-auto py-6">
          <div className="container mx-auto px-4 text-center text-sm text-studio-blue/60">
            <p>A Spatial Studio Experience • Witness, don't judge</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
