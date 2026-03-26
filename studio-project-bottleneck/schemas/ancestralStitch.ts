import { defineType, defineField } from 'sanity'

/**
 * Ancestral Stitch — the compiled ingredient + gesture + terroir packet
 * that Martha draws on during oral-kinetic sessions.
 *
 * Each Stitch is assembled from one or more ProducerProfile DACUM submissions.
 * It is the seeded knowledge object that bridges the Async Layer (producer prep)
 * to the Sync Layer (Martha's frontstage session).
 *
 * Anti-universality: ingredient taxonomy is node-specific.
 * A Dungeness crab stitch from Ucluelet is structurally different from
 * an aguachile stitch from Ensenada — each carries its own acid logic,
 * seasonal rhythm, and gesture vocabulary.
 */
export default defineType({
  name: 'ancestralStitch',
  title: 'Ancestral Stitch',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Stitch Title',
      type: 'string',
      description: 'Name of this stitch packet (e.g. "Coast Salish Salmon · Spring 2026")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 100 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'node',
      title: 'Corridor Node',
      type: 'reference',
      to: [{ type: 'corridorNode' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceProducers',
      title: 'Source Producers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'producerProfile' }] }],
      description: 'ProducerProfiles whose DACUM submissions feed this stitch',
      validation: (Rule) => Rule.min(1),
    }),

    // ── Ingredient Packet (node-specific taxonomy) ────────────────────────
    defineField({
      name: 'ingredientPacket',
      title: 'Ingredient Packet',
      type: 'object',
      description: 'Node-specific ingredient taxonomy — parameterized by node type',
      fields: [
        {
          name: 'primaryIngredient',
          title: 'Primary Ingredient',
          type: 'string',
          description: 'The central ingredient: the species, varietal, or cultivar by its local name',
        },
        {
          name: 'localName',
          title: 'Local / Indigenous Name',
          type: 'string',
          description: 'Name in the territory\'s language — record as pronounced, not normalized',
        },
        {
          name: 'acidProfile',
          title: 'Acid / Ferment Profile',
          type: 'string',
          description: 'What gives this ingredient its character: citrus, ferment, brine, smoke, age',
        },
        {
          name: 'terroir',
          title: 'Terroir Description',
          type: 'text',
          rows: 3,
          description: 'Where it comes from — the water, soil, or sky that made it this specific thing',
        },
        {
          name: 'season',
          title: 'Season / Harvest Window',
          type: 'string',
          options: {
            list: [
              { title: 'Spring (Feb–May)', value: 'spring' },
              { title: 'Summer (June–Aug)', value: 'summer' },
              { title: 'Autumn (Sept–Nov)', value: 'autumn' },
              { title: 'Winter (Dec–Jan)', value: 'winter' },
              { title: 'Year-round', value: 'year_round' },
              { title: 'Ceremonially timed', value: 'ceremonial' },
            ],
          },
        },
        {
          name: 'supportingIngredients',
          title: 'Supporting Ingredients',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'ingredient', title: 'Ingredient', type: 'string' },
                { name: 'localName', title: 'Local Name', type: 'string' },
                { name: 'role', title: 'Role in dish', type: 'string', description: 'acid | fat | heat | sweet | bitter | textural | ceremonial' },
              ],
            },
          ],
        },
      ],
    }),

    // ── Gesture Packet ────────────────────────────────────────────────────
    defineField({
      name: 'gesturePacket',
      title: 'Oral-Kinetic Gesture Packet',
      type: 'object',
      description: 'The physical vocabulary of this stitch — what Martha enacts in session',
      fields: [
        {
          name: 'gestureDescription',
          title: 'Gesture Description',
          type: 'text',
          rows: 4,
          description: 'In the producer\'s own words — translated but not sanitized',
        },
        {
          name: 'gestureVideo',
          title: 'Gesture Video',
          type: 'file',
          options: { accept: 'video/*' },
        },
        {
          name: 'bodyParts',
          title: 'Body Parts Involved',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: ['hands', 'wrists', 'forearms', 'full arms', 'shoulders', 'torso', 'breath'],
          },
          description: 'Guides accessibility adaptation for Martha\'s sessions',
        },
        {
          name: 'soundSignature',
          title: 'Sound Signature',
          type: 'string',
          description: 'What this process sounds like — knife on board, sizzle, pour, silence',
        },
        {
          name: 'durationMinutes',
          title: 'Process Duration (minutes)',
          type: 'number',
        },
      ],
    }),

    // ── Session Readiness ─────────────────────────────────────────────────
    defineField({
      name: 'sessionReadiness',
      title: 'Session Readiness',
      type: 'object',
      description: 'Is this stitch ready for Martha to draw on in a live oral-kinetic session?',
      fields: [
        {
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              { title: 'Draft — incomplete', value: 'draft' },
              { title: 'Review — awaiting cultural check', value: 'review' },
              { title: 'Ready — cleared for Martha sessions', value: 'ready' },
              { title: 'Restricted — sacred/withheld', value: 'restricted' },
            ],
            layout: 'radio',
          },
          initialValue: 'draft',
        },
        {
          name: 'culturalClearance',
          title: 'Cultural Clearance',
          type: 'boolean',
          description: 'Has a knowledge holder or steward cleared this for session use?',
          initialValue: false,
        },
        {
          name: 'clearedBy',
          title: 'Cleared By',
          type: 'string',
          hidden: ({ parent }) => !parent?.culturalClearance,
        },
        {
          name: 'restrictions',
          title: 'Use Restrictions',
          type: 'text',
          rows: 2,
          description: 'What cannot be demonstrated, recorded, or shared from this stitch',
        },
      ],
    }),

    // ── Linked Session Materials ───────────────────────────────────────────
    defineField({
      name: 'narrativeLayer',
      title: 'Linked Narrative Layer',
      type: 'reference',
      to: [{ type: 'narrativeLayer' }],
      description: 'Optional: the NarrativeLayer that carries this stitch in the Place Packet system',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      node: 'node.name',
      status: 'sessionReadiness.status',
    },
    prepare({ title, node, status }) {
      const statusIcon: Record<string, string> = {
        draft: '📝', review: '🔍', ready: '✅', restricted: '🔒',
      }
      return {
        title,
        subtitle: `${node ?? 'No node'} · ${statusIcon[status] ?? ''} ${status ?? 'draft'}`,
      }
    },
  },
})
