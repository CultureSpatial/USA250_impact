/**
 * Cultural Safety Gate
 *
 * Prevents generation of exploitative narratives and ensures
 * proper attribution of Indigenous terroir stories.
 *
 * Maps to V&V Safety Gate: TQ cultural safety gate
 */

import type { WineStoryCard, CulturalSafetyCheck } from '@/types/wine'

// Known Indigenous territories in BC wine regions
const INDIGENOUS_TERRITORIES: Record<string, string[]> = {
  'Okanagan Valley': ['Syilx (Okanagan) Nation'],
  'Similkameen Valley': ['Syilx (Okanagan) Nation', "Nlaka'pamux Nation"],
  'Fraser Valley': ['Stó:lō Nation', 'Semiahmoo First Nation'],
  'Vancouver Island': ["Quw'utsun (Cowichan) Tribes", "W̱SÁNEĆ Nations"],
}

// Terms that require cultural sensitivity review
const SENSITIVE_TERMS = [
  'ancient',
  'sacred',
  'traditional knowledge',
  'indigenous wisdom',
  'native',
  'spiritual',
  'ceremonial',
  'ancestral',
]

// Terms that indicate potential appropriation
const APPROPRIATION_INDICATORS = [
  'discovered',
  'pioneered',
  'first to',
  'brought wine to',
  'introduced viticulture',
]

export interface SafetyCheckResult {
  passed: boolean
  flags: {
    indigenous_territory_mentioned: boolean
    requires_fpic: boolean
    labor_attribution_needed: boolean
    cultural_sensitivity_warning: boolean
  }
  warnings: string[]
  blocked_reason?: string
}

/**
 * Check if generated narrative content passes cultural safety gates
 */
export function checkNarrativeSafety(
  content: string,
  region: string,
  existingAttribution?: WineStoryCard['attribution']
): SafetyCheckResult {
  const warnings: string[] = []
  const contentLower = content.toLowerCase()

  // Check for Indigenous territory mentions
  const territoryMentioned = INDIGENOUS_TERRITORIES[region]?.some(
    territory => content.includes(territory)
  ) ?? false

  // Check for sensitive terms
  const sensitiveTermsFound = SENSITIVE_TERMS.filter(term =>
    contentLower.includes(term)
  )
  const hasSensitiveContent = sensitiveTermsFound.length > 0

  if (hasSensitiveContent) {
    warnings.push(
      `Content contains culturally sensitive terms: ${sensitiveTermsFound.join(', ')}. ` +
      `Ensure proper context and attribution.`
    )
  }

  // Check for appropriation indicators
  const appropriationTermsFound = APPROPRIATION_INDICATORS.filter(term =>
    contentLower.includes(term)
  )
  const hasAppropriationRisk = appropriationTermsFound.length > 0

  if (hasAppropriationRisk) {
    warnings.push(
      `Content may contain appropriative language: ${appropriationTermsFound.join(', ')}. ` +
      `Consider reframing to acknowledge Indigenous presence.`
    )
  }

  // Determine if FPIC is required
  const requiresFPIC = territoryMentioned || hasSensitiveContent

  // Check if FPIC status is verified when required
  if (requiresFPIC && existingAttribution?.fpic_status !== 'verified') {
    if (existingAttribution?.fpic_status === 'pending') {
      warnings.push(
        `FPIC status is pending. Content may be published but should note pending status.`
      )
    } else {
      warnings.push(
        `FPIC verification required for content mentioning Indigenous territories or cultural elements.`
      )
    }
  }

  // Block if appropriation risk is high and no attribution exists
  const shouldBlock =
    hasAppropriationRisk &&
    !existingAttribution?.indigenous_territory &&
    INDIGENOUS_TERRITORIES[region]

  return {
    passed: !shouldBlock,
    flags: {
      indigenous_territory_mentioned: territoryMentioned,
      requires_fpic: requiresFPIC,
      labor_attribution_needed: !existingAttribution?.labor_acknowledgment,
      cultural_sensitivity_warning: hasSensitiveContent,
    },
    warnings,
    blocked_reason: shouldBlock
      ? `Narrative contains appropriative language without Indigenous attribution. ` +
        `Please add proper attribution for ${INDIGENOUS_TERRITORIES[region]?.join(' / ')}.`
      : undefined,
  }
}

/**
 * Get required attribution for a region
 */
export function getRequiredAttribution(region: string): string[] {
  return INDIGENOUS_TERRITORIES[region] ?? []
}

/**
 * Validate a wine card's attribution completeness
 */
export function validateAttribution(card: WineStoryCard): {
  complete: boolean
  missing: string[]
} {
  const missing: string[] = []

  // Check Indigenous territory attribution
  const requiredTerritories = INDIGENOUS_TERRITORIES[card.origin.region]
  if (requiredTerritories && !card.attribution.indigenous_territory) {
    missing.push(`Indigenous territory attribution (${requiredTerritories.join(' / ')})`)
  }

  // Check labor acknowledgment
  if (!card.attribution.labor_acknowledgment) {
    missing.push('Labor acknowledgment')
  }

  // Check FPIC status
  if (card.attribution.fpic_status === 'pending') {
    missing.push('FPIC verification (currently pending)')
  }

  return {
    complete: missing.length === 0,
    missing,
  }
}

/**
 * Create a cultural safety check record for audit logging
 */
export function createSafetyCheckRecord(
  wineId: string,
  checkType: CulturalSafetyCheck['check_type'],
  result: SafetyCheckResult
): CulturalSafetyCheck {
  return {
    wine_id: wineId,
    check_type: checkType,
    flags: result.flags,
    passed: result.passed,
    blocked_reason: result.blocked_reason,
    checked_at: new Date().toISOString(),
  }
}

/**
 * Generate culturally appropriate placeholder text
 */
export function getSafeNarrativePlaceholder(region: string): string {
  const territories = INDIGENOUS_TERRITORIES[region]

  if (territories) {
    return (
      `This wine is produced on the traditional, ancestral, and unceded territory of the ` +
      `${territories.join(' and ')}. We honor the ongoing stewardship of this land ` +
      `and the generations of knowledge that inform sustainable viticulture.`
    )
  }

  return (
    `This wine reflects the unique terroir of ${region}, shaped by generations ` +
    `of careful stewardship and sustainable farming practices.`
  )
}
