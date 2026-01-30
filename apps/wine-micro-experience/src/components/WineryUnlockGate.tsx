'use client'

interface WineryUnlockGateProps {
  regionsExplored: number
  requiredRegions: number
  wineryName?: string
  persona: 'trader' | 'buyer'
  onUnlocked?: () => void
}

export default function WineryUnlockGate({
  regionsExplored,
  requiredRegions = 3,
  wineryName,
  persona,
  onUnlocked,
}: WineryUnlockGateProps) {
  const isUnlocked = regionsExplored >= requiredRegions
  const progress = Math.min(regionsExplored / requiredRegions, 1)

  if (isUnlocked) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">
            &#10003;
          </div>
          <div className="flex-1">
            <p className="font-semibold text-green-800">
              {persona === 'trader' ? 'Trade Contact Unlocked' : 'Winery Access Unlocked'}
            </p>
            <p className="text-sm text-green-600">
              {wineryName
                ? `You can now contact ${wineryName} directly`
                : 'Direct winery contacts are now available'}
            </p>
          </div>
          <button
            onClick={onUnlocked}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
          >
            {persona === 'trader' ? 'View Allocation' : 'Contact Winery'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-lg">
          &#128274;
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-700">
            {persona === 'trader'
              ? 'Unlock Trade Contacts'
              : 'Unlock Direct Access'}
          </p>
          <p className="text-sm text-gray-500">
            Explore {requiredRegions - regionsExplored} more region
            {requiredRegions - regionsExplored !== 1 ? 's' : ''} to unlock
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1 text-right">
        {regionsExplored} / {requiredRegions} regions
      </p>
    </div>
  )
}
