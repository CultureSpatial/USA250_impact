import WineCanvas from '@/components/WineCanvas'

export default function TraderPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Trade Portal</h1>
      <p className="text-gray-300 mb-8">Explore allocations and supplier data</p>
      <WineCanvas persona="trader" />
    </div>
  )
}
