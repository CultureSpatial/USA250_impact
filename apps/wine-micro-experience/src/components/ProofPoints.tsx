'use client'

import { useState, useEffect } from 'react'

interface ProofPointsProps {
  regionsExplored: string[]
  winesViewed: string[]
  storiesGenerated: number
  spinsCompleted: number
  persona: 'trader' | 'buyer'
}

interface Achievement {
  id: string
  label: string
  description: string
  threshold: number
  current: number
  unlocked: boolean
  tier: 'bronze' | 'silver' | 'gold'
}

export default function ProofPoints({
  regionsExplored,
  winesViewed,
  storiesGenerated,
  spinsCompleted,
  persona,
}: ProofPointsProps) {
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<string | null>(null)
  const [previousPoints, setPreviousPoints] = useState(0)

  const uniqueRegions = new Set(regionsExplored).size
  const uniqueWines = new Set(winesViewed).size

  const totalPoints =
    uniqueRegions * 15 +
    uniqueWines * 10 +
    storiesGenerated * 20 +
    spinsCompleted * 5

  const achievements: Achievement[] = [
    {
      id: 'first_sip',
      label: 'First Sip',
      description: 'View your first wine card',
      threshold: 1,
      current: uniqueWines,
      unlocked: uniqueWines >= 1,
      tier: 'bronze',
    },
    {
      id: 'regional_explorer',
      label: 'Regional Explorer',
      description: 'Visit 3 different wine regions',
      threshold: 3,
      current: uniqueRegions,
      unlocked: uniqueRegions >= 3,
      tier: 'silver',
    },
    {
      id: 'story_collector',
      label: 'Story Collector',
      description: 'Generate 3 AI wine stories',
      threshold: 3,
      current: storiesGenerated,
      unlocked: storiesGenerated >= 3,
      tier: 'silver',
    },
    {
      id: 'spin_master',
      label: 'Spin Master',
      description: 'Complete 5 bottle spins',
      threshold: 5,
      current: spinsCompleted,
      unlocked: spinsCompleted >= 5,
      tier: 'bronze',
    },
    {
      id: 'cascadia_connoisseur',
      label: 'Cascadia Connoisseur',
      description: 'Explore all 6 Cascadia regions',
      threshold: 6,
      current: uniqueRegions,
      unlocked: uniqueRegions >= 6,
      tier: 'gold',
    },
    {
      id: 'proof_99',
      label: '99 Proof',
      description: 'Reach 99 proof points',
      threshold: 99,
      current: totalPoints,
      unlocked: totalPoints >= 99,
      tier: 'gold',
    },
  ]

  // Trigger unlock animation when new achievement unlocked
  useEffect(() => {
    if (totalPoints > previousPoints) {
      const newlyUnlocked = achievements.find(
        (a) => a.unlocked && a.current === a.threshold
      )
      if (newlyUnlocked) {
        setShowUnlockAnimation(newlyUnlocked.id)
        setTimeout(() => setShowUnlockAnimation(null), 3000)
      }
    }
    setPreviousPoints(totalPoints)
  }, [totalPoints])

  const tierColors = {
    bronze: 'from-amber-700 to-amber-500',
    silver: 'from-gray-400 to-gray-200',
    gold: 'from-yellow-500 to-yellow-300',
  }

  const tierBorders = {
    bronze: 'border-amber-600',
    silver: 'border-gray-300',
    gold: 'border-yellow-400',
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const progressPercent = Math.min((totalPoints / 99) * 100, 100)

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-800 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">99 Proof Points</h2>
            <p className="text-purple-200 text-sm">
              {persona === 'trader'
                ? 'Build your trade portfolio credentials'
                : 'Collect stories across the Cascadia corridor'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-mono font-bold">{totalPoints}</p>
            <p className="text-purple-200 text-xs">proof points</p>
          </div>
        </div>

        {/* Progress bar to 99 */}
        <div className="bg-purple-950/50 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 to-yellow-400 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-purple-300">
          <span>{totalPoints} / 99</span>
          <span>
            {unlockedCount} / {achievements.length} achievements
          </span>
        </div>
      </div>

      {/* Scoring breakdown */}
      <div className="grid grid-cols-4 gap-px bg-gray-100">
        <div className="bg-white p-3 text-center">
          <p className="text-xl font-bold text-purple-700">{uniqueRegions}</p>
          <p className="text-xs text-gray-500">Regions</p>
          <p className="text-xs text-purple-400">+15 ea</p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-xl font-bold text-pink-700">{uniqueWines}</p>
          <p className="text-xs text-gray-500">Wines</p>
          <p className="text-xs text-pink-400">+10 ea</p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-xl font-bold text-amber-700">{storiesGenerated}</p>
          <p className="text-xs text-gray-500">Stories</p>
          <p className="text-xs text-amber-400">+20 ea</p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-xl font-bold text-green-700">{spinsCompleted}</p>
          <p className="text-xs text-gray-500">Spins</p>
          <p className="text-xs text-green-400">+5 ea</p>
        </div>
      </div>

      {/* Achievement grid */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">ACHIEVEMENTS</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-3 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? `${tierBorders[achievement.tier]} bg-gradient-to-br ${tierColors[achievement.tier]} bg-opacity-10`
                  : 'border-gray-200 bg-gray-50 opacity-60'
              } ${showUnlockAnimation === achievement.id ? 'scale-105 ring-4 ring-yellow-400 ring-opacity-50' : ''}`}
            >
              {/* Tier badge */}
              <span
                className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  achievement.unlocked
                    ? `bg-gradient-to-r ${tierColors[achievement.tier]} text-white`
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {achievement.tier === 'gold'
                  ? 'G'
                  : achievement.tier === 'silver'
                    ? 'S'
                    : 'B'}
              </span>

              <p
                className={`font-semibold text-sm ${
                  achievement.unlocked ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {achievement.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>

              {/* Progress */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      achievement.unlocked
                        ? `bg-gradient-to-r ${tierColors[achievement.tier]}`
                        : 'bg-gray-400'
                    }`}
                    style={{
                      width: `${Math.min(
                        (achievement.current / achievement.threshold) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {Math.min(achievement.current, achievement.threshold)}/{achievement.threshold}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
