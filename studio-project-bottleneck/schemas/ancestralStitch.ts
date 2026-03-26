import {defineField, defineType} from 'sanity'

/**
 * Ancestral Stitch v1.1 (OPS-66 corrected)
 *
 * NOT a recipe or template. The specific compiled stitch for ONE producer at ONE node.
 * Non-normalizable. A Dungeness crab stitch ≠ an aguachile stitch.
 *
 * Changes from v1.0:
 * - producer: single reference (was sourceProducers[] array)
 * - sovereigntyFlags moved here from producerProfile.translationNotes (they belong to the knowledge, not the person)
 * - readyForMartha boolean added (replaces status enum as primary gate)
 * - seasonalLogic added to ingredientPacket (WHY now, not WHEN)
 * - Linked narrativeLayer preserved from v1.0
 */
export const ancestralStitch = defineType({
  name: 'ancestralStitch',
  title: 'Ancestral Stitch',
  type: 'document',
  description:
    'NOT a recipe or template. The specific compiled stitch for one producer at one node. Non-normalizable. A Dungeness crab stitch ≠ an aguachile stitch.',
  fields: [
    defineField({
      name: 'title',
      title: 'Stitch Title',
      type: 'string',
      description: 'e.g. "Coast Salish Salmon · Spring 2026" — descriptive, not branded.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 100},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'producer',
      title: 'Producer',
      type: 'reference',
      to: [{type: 'producerProfile'}],
      description:
        'Single producer. v1.1 correction — was sourceProducers[] array. One stitch, one voice.',
      validation: (Rule) => Rule.required(),
    }),

    // INGREDIENT PACKET — node-specific, not normalized
    defineField({
      name: 'ingredientPacket',
      title: 'Ingredient Packet',
      type: 'object',
      description: 'The stitch. Not a recipe. Node-specific.',
      fields: [
        {
          name: 'primaryIngredient',
          title: 'Primary Ingredient',
          type: 'string',
          description: 'Wild, common, or local name — NOT scientific name.',
        },
        {
          name: 'localName',
          title: 'Local Name (Territory language)',
          type: 'string',
          description: 'Recorded as pronounced. Not normalized.',
        },
        {
          name: 'acidProfile',
          title: 'Acid Profile',
          type: 'string',
          options: {
            list: [
              {title: 'Citrus', value: 'citrus'},
              {title: 'Ferment', value: 'ferment'},
              {title: 'Brine', value: 'brine'},
              {title: 'Smoke', value: 'smoke'},
              {title: 'Age', value: 'age'},
            ],
          },
        },
        {
          name: 'terroir',
          title: 'Terroir',
          type: 'text',
          description: 'Where it comes from — the water, soil, or sky that made it.',
        },
        {
          name: 'season',
          title: 'Season',
          type: 'string',
          options: {
            list: [
              {title: 'Spring', value: 'spring'},
              {title: 'Summer', value: 'summer'},
              {title: 'Autumn', value: 'autumn'},
              {title: 'Winter', value: 'winter'},
              {title: 'Year-round', value: 'year_round'},
              {title: 'Ceremonially timed', value: 'ceremonial'},
            ],
          },
        },
        {
          name: 'seasonalLogic',
          title: 'Seasonal Logic (WHY now — not calendar-driven)',
          type: 'text',
          description:
            '"When the water is coldest and fish are fullest" — not "December 21".',
        },
        {
          name: 'supportingIngredients',
          title: 'Supporting Ingredients',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'ingredient', type: 'string', title: 'Ingredient'},
                {name: 'localName', type: 'string', title: 'Local Name'},
                {
                  name: 'role',
                  type: 'string',
                  title: 'Role',
                  options: {
                    list: [
                      {title: 'Acid', value: 'acid'},
                      {title: 'Fat', value: 'fat'},
                      {title: 'Heat', value: 'heat'},
                      {title: 'Sweet', value: 'sweet'},
                      {title: 'Bitter', value: 'bitter'},
                      {title: 'Textural', value: 'textural'},
                      {title: 'Ceremonial', value: 'ceremonial'},
                    ],
                  },
                },
              ],
              preview: {
                select: {title: 'ingredient', subtitle: 'role'},
              },
            },
          ],
        },
      ],
    }),

    // GESTURE PACKET — physical vocabulary, not technique or recipe
    defineField({
      name: 'gesturePacket',
      title: 'Gesture Packet (Oral-Kinetic Vocabulary)',
      type: 'object',
      description:
        "NOT a recipe or technique. The physical vocabulary of this producer. Translated but not sanitized.",
      fields: [
        {
          name: 'gestureDescription',
          title: "Gesture Description (Producer's own words)",
          type: 'text',
          description: 'In the producer\'s own words — translated but NOT sanitized.',
        },
        {
          name: 'bodyParts',
          title: 'Body Parts / Tools Involved',
          type: 'array',
          of: [{type: 'string'}],
          description: 'e.g., hands, knife, water, fire, vessel. Guides accessibility adaptation.',
          options: {
            list: ['hands', 'wrists', 'forearms', 'full arms', 'shoulders', 'torso', 'breath'],
          },
        },
        {
          name: 'soundSignature',
          title: 'Sound Signature',
          type: 'string',
          description: 'What is heard during the gesture. Cues Martha to adjust session tempo.',
        },
        {
          name: 'durationMinutes',
          title: 'Gesture / Session Duration (minutes)',
          type: 'number',
        },
        {
          name: 'gestureVideo',
          title: 'Oral-Kinetic Video',
          type: 'file',
          options: {accept: 'video/*'},
        },
      ],
    }),

    // SESSION READINESS — Martha protocol gates
    defineField({
      name: 'sessionReadiness',
      title: 'Session Readiness (Martha Protocol)',
      type: 'object',
      description:
        'Martha must read restrictions before every session. All gates must pass before readyForMartha = true.',
      fields: [
        {
          name: 'readyForMartha',
          title: 'Cleared for Martha Sessions?',
          type: 'boolean',
          initialValue: false,
          description:
            'Primary gate. Only true when culturalClearance = true AND all sovereigntyFlags resolved.',
        },
        {
          name: 'clearedBy',
          title: 'Cleared By',
          type: 'string',
          description: 'Named individual with cultural authority. NOT Western credentialing.',
        },
        {
          name: 'culturalClearance',
          title: 'Cultural Clearance Granted?',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'restrictions',
          title: 'Sacred / Non-Negotiable Restrictions',
          type: 'text',
          description:
            'Martha reads this before every session. Cannot be overridden by curator or coordinator.',
        },
        {
          name: 'sovereigntyFlags',
          title: 'Sovereignty Flags',
          type: 'array',
          description:
            'GATING mechanisms — not warning labels. CIP_REQUIRED blocks publication until CIP review complete. Moved here from producerProfile (flags belong to the knowledge, not the person).',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  {
                    title: 'CIP Required (Indigenous protocol review required)',
                    value: 'CIP_REQUIRED',
                  },
                  {title: 'CASL Consent (Canadian privacy compliance)', value: 'CASL_CONSENT'},
                  {
                    title: 'Seasonal Gate (only available in specific season)',
                    value: 'SEASONAL_GATE',
                  },
                  {title: 'Sacred Knowledge (cannot be generalized)', value: 'SACRED_KNOWLEDGE'},
                  {title: 'Territorial Water Sacred', value: 'TERRITORIAL_WATER_SACRED'},
                  {
                    title: 'Oral Transmission Only (cannot be recorded)',
                    value: 'ORAL_TRANSMISSION_ONLY',
                  },
                  {title: 'No Recording', value: 'NO_RECORDING'},
                ],
              },
            },
          ],
        },
      ],
    }),

    // LINKED MATERIALS — preserved from v1.0
    defineField({
      name: 'narrativeLayer',
      title: 'Linked Narrative Layer',
      type: 'reference',
      to: [{type: 'narrativeLayer'}],
      description:
        'Optional: the NarrativeLayer that carries this stitch in the Place Packet system.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      producer: 'producer.name',
      ready: 'sessionReadiness.readyForMartha',
    },
    prepare(value: any) {
      const {title, producer, ready} = value
      return {
        title: title as string,
        subtitle: `${(producer as string) ?? 'No producer'} · ${ready ? '✅ Ready for Martha' : '⏳ Awaiting clearance'}`,
      }
    },
  },
})

export default ancestralStitch
