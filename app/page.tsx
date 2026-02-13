import { ComponentBrowser } from '@/components/ComponentBrowser'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-earth-light via-gray-100 to-earth-light p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold earth-text-primary mb-2">
            Component Repository
          </h1>
          <p className="text-lg text-earth-slate">
            Discover, manage, and integrate components from the Studio Soundwave ecosystem
          </p>
        </header>

        <ComponentBrowser />
      </div>
    </main>
  )
}
