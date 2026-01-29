import WineCanvas from '@/components/WineCanvas'

export default function BuyerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Discover Your Story</h1>
      <p className="text-gray-200 mb-8">Every wine has a place, a maker, and a reason</p>
      <WineCanvas persona="buyer" />
    </div>
  )
}
