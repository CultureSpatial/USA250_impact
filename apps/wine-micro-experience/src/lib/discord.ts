/**
 * Discord Webhook Integration
 *
 * Enables sharing wine stories to Discord channels and
 * provides continuity from web experience to community.
 *
 * Maps to V&V Scaling Surface: Discord Continuity
 */

import type { WineStoryCard, PersonaType } from '@/types/wine'

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

interface DiscordEmbed {
  title: string
  description: string
  color: number
  fields: {
    name: string
    value: string
    inline?: boolean
  }[]
  footer?: {
    text: string
  }
  timestamp?: string
}

interface DiscordWebhookPayload {
  content?: string
  embeds: DiscordEmbed[]
  username?: string
  avatar_url?: string
}

/**
 * Convert hex color to Discord integer format
 */
function hexToDecimal(hex: string): number {
  return parseInt(hex.replace('#', ''), 16)
}

// Brand colors
const COLORS = {
  wine_red: hexToDecimal('#8B1538'),
  wine_gold: hexToDecimal('#C9A962'),
  incumbent: hexToDecimal('#722F37'),
  digital_native: hexToDecimal('#0D9488'),
}

/**
 * Create a Discord embed for a wine story card
 */
export function createWineCardEmbed(
  card: WineStoryCard,
  sharerPersona: PersonaType
): DiscordEmbed {
  const perspectiveLabel = card.maker_voice.perspective === 'incumbent' ? '🍷 Vintage' : '🌱 Voice'
  const perspectiveColor = card.maker_voice.perspective === 'incumbent'
    ? COLORS.incumbent
    : COLORS.digital_native

  return {
    title: `${card.name}`,
    description: `*"${card.maker_voice.quote}"*\n— ${card.maker_voice.name}, ${card.maker_voice.role}`,
    color: perspectiveColor,
    fields: [
      {
        name: '🍇 Varietal',
        value: `${card.varietal} ${card.vintage}`,
        inline: true,
      },
      {
        name: '📍 Region',
        value: card.origin.subregion
          ? `${card.origin.subregion}, ${card.origin.region}`
          : card.origin.region,
        inline: true,
      },
      {
        name: perspectiveLabel,
        value: card.maker_voice.perspective === 'incumbent'
          ? 'Tradition & Experience'
          : 'Innovation & Fresh Eyes',
        inline: true,
      },
      {
        name: '🍽️ Pairs With',
        value: card.pairing_notes.food.slice(0, 3).join(' • '),
        inline: false,
      },
      {
        name: '🏛️ Territory',
        value: card.attribution.indigenous_territory || 'Not specified',
        inline: true,
      },
      {
        name: '✅ FPIC Status',
        value: card.attribution.fpic_status === 'verified' ? '✓ Verified' :
               card.attribution.fpic_status === 'pending' ? '⏳ Pending' : '—',
        inline: true,
      },
    ],
    footer: {
      text: `Shared by ${sharerPersona === 'trader' ? 'Trade Professional' : 'Wine Explorer'} • Vintage & Voice`,
    },
    timestamp: new Date().toISOString(),
  }
}

/**
 * Send a wine story to Discord
 */
export async function shareToDiscord(
  card: WineStoryCard,
  sharerPersona: PersonaType,
  customMessage?: string
): Promise<{ success: boolean; error?: string }> {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('Discord webhook URL not configured')
    return {
      success: false,
      error: 'Discord sharing not configured',
    }
  }

  const embed = createWineCardEmbed(card, sharerPersona)

  const payload: DiscordWebhookPayload = {
    content: customMessage || '🍷 A new wine story has been shared!',
    embeds: [embed],
    username: 'Vintage & Voice',
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to share to Discord:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Create an invite message for the Discord community
 */
export function createDiscordInviteMessage(
  regionsExplored: string[],
  cardsViewed: number,
  depthScore: number
): string {
  const achievements: string[] = []

  if (regionsExplored.length >= 4) {
    achievements.push('🏆 Region Explorer (all 4 regions)')
  } else if (regionsExplored.length >= 2) {
    achievements.push(`🗺️ Visited ${regionsExplored.length} regions`)
  }

  if (cardsViewed >= 5) {
    achievements.push('📚 Wine Scholar (5+ stories)')
  }

  if (depthScore >= 75) {
    achievements.push('🎯 Deep Diver (75+ depth score)')
  }

  const achievementText = achievements.length > 0
    ? `\n\nYour achievements:\n${achievements.join('\n')}`
    : ''

  return (
    `You've explored ${regionsExplored.length} BC wine region${regionsExplored.length !== 1 ? 's' : ''} ` +
    `and viewed ${cardsViewed} wine ${cardsViewed !== 1 ? 'stories' : 'story'}.${achievementText}\n\n` +
    `Join our Discord community to continue the conversation, share your discoveries, ` +
    `and connect with winemakers and fellow enthusiasts.`
  )
}

/**
 * Create a session summary embed for Discord
 */
export function createSessionSummaryEmbed(
  sessionId: string,
  persona: PersonaType,
  regionsExplored: string[],
  cardsViewed: number,
  cardsSaved: number,
  depthScore: number
): DiscordEmbed {
  return {
    title: '📊 Wine Journey Complete',
    description: `A ${persona === 'trader' ? 'trade professional' : 'wine explorer'} just completed their journey.`,
    color: COLORS.wine_gold,
    fields: [
      {
        name: '🗺️ Regions Explored',
        value: regionsExplored.length > 0 ? regionsExplored.join(', ') : 'None',
        inline: false,
      },
      {
        name: '📖 Stories Viewed',
        value: cardsViewed.toString(),
        inline: true,
      },
      {
        name: '❤️ Stories Saved',
        value: cardsSaved.toString(),
        inline: true,
      },
      {
        name: '🎯 Depth Score',
        value: `${depthScore}/100`,
        inline: true,
      },
    ],
    footer: {
      text: `Session: ${sessionId.slice(0, 12)}... • Vintage & Voice`,
    },
    timestamp: new Date().toISOString(),
  }
}

/**
 * Channel recommendations based on interests
 */
export function getChannelRecommendations(
  regionsExplored: string[],
  perspectives: ('incumbent' | 'digital_native')[]
): string[] {
  const channels: string[] = ['#vintage-and-voice']

  // Region-specific channels
  if (regionsExplored.includes('Okanagan Valley')) {
    channels.push('#okanagan')
  }
  if (regionsExplored.includes('Vancouver Island')) {
    channels.push('#island-wines')
  }

  // Perspective-based channels
  if (perspectives.includes('incumbent') && perspectives.includes('digital_native')) {
    channels.push('#paired-perspectives')
  }

  // Interest channels
  channels.push('#wine-recommendations')

  return channels
}
