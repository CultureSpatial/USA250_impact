export default function Home() {
  return (
    <main className="min-h-screen bg-earth-gradient flex flex-col items-center justify-center p-4">
      <div className="neo-card max-w-2xl w-full text-center">
        <h1 className="text-6xl font-bold earth-text-primary mb-4">Hello World</h1>
        <p className="text-xl earth-text-secondary mb-8">
          Next.js Microfrontend with Sanity CMS
        </p>
        <p className="text-earth-slate mb-6">
          Powered by Earth Motif design system with neomorphic styling
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="neo-button-primary">
            Get Started
          </button>
          <button className="neo-button">
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="neo-card">
          <h3 className="earth-text-primary text-lg mb-2">Grounded</h3>
          <p className="text-earth-slate text-sm">Stable, organic, and natural design</p>
        </div>
        <div className="neo-card">
          <h3 className="earth-text-primary text-lg mb-2">Trustworthy</h3>
          <p className="text-earth-slate text-sm">Built on proven design principles</p>
        </div>
        <div className="neo-card">
          <h3 className="earth-text-primary text-lg mb-2">Elemental</h3>
          <p className="text-earth-slate text-sm">Earth, fire, wind themes available</p>
        </div>
      </div>
    </main>
  )
}


