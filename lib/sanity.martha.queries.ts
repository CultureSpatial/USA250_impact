export const MARTHA_PRODUCER_PROFILE = `
*[_type == "producerProfile" && slug.current == $slug && translationStatus == "published"][0]{
  _id,
  name,
  dialect,
  producerType,
  articulatedVoice,
  dacumProfile {
    primarySkill,
    yearsOfPractice,
    localIngredientSignature,
    sourceLanguage
  },
  consentRecord-> {
    consentScope,
    knowledgeProtections
  },
  ancestralStitch-> {
    title,
    ingredientPacket,
    sessionReadiness
  }
}
`

export const MARTHA_PLACE_PACKET = `
*[_type == "placePacket" && slug.current == $slug][0]{
  _id,
  name,
  version,
  "slug": slug.current,
  route {
    type
  },
  layers[]-> {
    type,
    culturalSensitivity
  },
  consentPolicy
}
`

// Canonical distribution interface for all consumer endpoints.
// Never exposes sovereignty flags, gestureDescriptions, or knowledgeProtections.
// Multi-endpoint: swirly.quest induction, PlayFab lobby, trade proof, academic archive.
export const PLACE_PACKET_LOBBY_SAFE = `
*[_type == "placePacket" && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  "node": route.node,
  terroir,
  season,
  fifaMatchDay
}
`

export type MarthaProfile = {
  _id: string
  name: string
  dialect?: string
  producerType: string
  articulatedVoice: string
  dacumProfile?: {
    primarySkill?: string
    yearsOfPractice?: number
    localIngredientSignature?: string
    sourceLanguage?: string
  }
  consentRecord?: {
    consentScope: string[]
    knowledgeProtections?: string[]
  }
  ancestralStitch?: {
    title: string
    ingredientPacket?: unknown
    sessionReadiness?: {
      readyForMartha?: boolean
    }
  }
}

export type MarthaPlacePacket = {
  _id: string
  name: string
  version?: string
  slug: string
  route?: { type?: string }
  layers?: Array<{ type: string; culturalSensitivity?: string }>
  consentPolicy?: string
}

export type LobbyPlacePacket = {
  name: string
  slug: string
  node?: string
  terroir?: string
  season?: string
  fifaMatchDay?: string
}
