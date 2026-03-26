import { defineType, defineField } from 'sanity'

/**
 * Corridor Activation — the Temporal Co-Design Fora proposal document.
 *
 * A producer proposes an activation (date + node + format).
 * Other producers at other nodes can "sync" with it, creating
 * multi-node temporal events that are corridor-coherent without
 * requiring synchronous coordination.
 *
 * Anti-universality: activation format is parameterized by nodeType.
 * A ceviche tasting (Ensenada) ≠ a Coast Salish salmon ceremony (Vancouver) ≠
 * an Okanagan wine pairing (Kelowna). The `nodeSpecificFields` carries
 * the differentiated format logic.
 *
 * Maps to FIFA calendar: each activation is indexed against match day dates,
 * allowing the corridor to create culturally-coherent match-week programming
 * without a central scheduler.
 */
export default defineType({
  name: 'corridorActivation',
  title: 'Corridor Activation',
  type: 'document',
  fields: [
    // ── Proposal Identity ─────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Activation Title',
      type: 'string',
      description: 'Descriptive title in the proposing node\'s voice, not a marketing headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 120 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proposedBy',
      title: 'Proposed By',
      type: 'reference',
      to: [{ type: 'producerProfile' }],
      description: 'The producer who initiated this activation proposal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proposingNode',
      title: 'Proposing Node',
      type: 'reference',
      to: [{ type: 'corridorNode' }],
      validation: (Rule) => Rule.required(),
    }),

    // ── Temporal Co-Design ────────────────────────────────────────────────
    defineField({
      name: 'proposedDate',
      title: 'Proposed Activation Date',
      type: 'datetime',
      description: 'The date/time the producer is proposing — aligned to FIFA match calendar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fifaMatchDay',
      title: 'FIFA Match Day Reference',
      type: 'string',
      description: 'Which match day this maps to (e.g. "Group Stage D · June 15")',
    }),
    defineField({
      name: 'duration',
      title: 'Estimated Duration (hours)',
      type: 'number',
      validation: (Rule) => Rule.min(0.5).max(12),
    }),

    // ── Format — node-parameterized ───────────────────────────────────────
    defineField({
      name: 'activationFormat',
      title: 'Activation Format',
      type: 'string',
      description: 'The type of activation — use node-specific vocabulary, not generic categories',
      options: {
        list: [
          // Coastal Fishing
          { title: 'Live catch demonstration', value: 'live_catch_demo' },
          { title: 'Curing / processing session', value: 'curing_session' },
          // Wine / Terroir
          { title: 'Harvest tasting', value: 'harvest_tasting' },
          { title: 'Oral-kinetic wine session', value: 'oral_kinetic_wine' },
          // Urban Cultural
          { title: 'Street food activation', value: 'street_food' },
          { title: 'Ceviche / raw tasting', value: 'ceviche_tasting' },
          // Ceremonial
          { title: 'Oral-kinetic ceremony', value: 'oral_kinetic_ceremony' },
          { title: 'Salmon / first foods ceremony', value: 'first_foods_ceremony' },
          // Agricultural
          { title: 'Market demonstration', value: 'market_demo' },
          { title: 'Ferment / preservation session', value: 'ferment_session' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Node-Specific Fields (Anti-universality) ──────────────────────────
    defineField({
      name: 'nodeSpecificContext',
      title: 'Node-Specific Context',
      type: 'object',
      description: 'What makes this activation specific to its node — do not normalize',
      fields: [
        {
          name: 'localIngredientFocus',
          title: 'Local Ingredient Focus',
          type: 'string',
          description: 'The primary ingredient — named in local terminology',
        },
        {
          name: 'ancestralStitchReference',
          title: 'Ancestral Stitch Reference',
          type: 'reference',
          to: [{ type: 'ancestralStitch' }],
          description: 'Which stitch packet this activation draws on',
        },
        {
          name: 'spatialContext',
          title: 'Spatial Context',
          type: 'string',
          description: 'Where exactly: waterfront, market, tasting room, outdoor, ceremonial space',
        },
        {
          name: 'seasonalLogic',
          title: 'Seasonal Logic',
          type: 'text',
          rows: 2,
          description: 'Why now? What makes this moment the right time for this activation?',
        },
        {
          name: 'audienceSize',
          title: 'Expected Audience Size',
          type: 'number',
        },
        {
          name: 'requiresMarthaSession',
          title: 'Requires Martha Session',
          type: 'boolean',
          description: 'Does this activation call for an oral-kinetic facilitation session?',
          initialValue: false,
        },
      ],
    }),

    // ── Multi-Node Sync Layer ─────────────────────────────────────────────
    defineField({
      name: 'syncedNodes',
      title: 'Synced Nodes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'node',
              title: 'Syncing Node',
              type: 'reference',
              to: [{ type: 'corridorNode' }],
            },
            {
              name: 'syncingProducer',
              title: 'Syncing Producer',
              type: 'reference',
              to: [{ type: 'producerProfile' }],
            },
            {
              name: 'syncType',
              title: 'Sync Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Full sync — parallel activation same date', value: 'full' },
                  { title: 'Echo — complementary activation same week', value: 'echo' },
                  { title: 'Relay — sequential activation next day', value: 'relay' },
                ],
              },
            },
            {
              name: 'syncNote',
              title: 'Sync Note',
              type: 'text',
              rows: 2,
              description: 'What the syncing node is contributing — in their own words',
            },
            {
              name: 'syncedAt',
              title: 'Synced At',
              type: 'datetime',
            },
          ],
        },
      ],
      description: 'Other nodes that have synced with this activation proposal',
    }),

    // ── Proposal Status ───────────────────────────────────────────────────
    defineField({
      name: 'proposalStatus',
      title: 'Proposal Status',
      type: 'string',
      options: {
        list: [
          { title: '1 · Draft — proposing producer is still editing', value: 'draft' },
          { title: '2 · Open — visible to other nodes for sync', value: 'open' },
          { title: '3 · Synced — at least one other node has synced', value: 'synced' },
          { title: '4 · Confirmed — all nodes locked in', value: 'confirmed' },
          { title: '5 · Live — activation is happening now', value: 'live' },
          { title: '6 · Complete — activation has concluded', value: 'complete' },
          { title: 'Withdrawn', value: 'withdrawn' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    // ── Ripple / AU Attribution ───────────────────────────────────────────
    defineField({
      name: 'rippleTracking',
      title: 'Ripple Tracking',
      type: 'object',
      description: 'Engagement Velocity and AU attribution — fed by the Ripple Validator',
      fields: [
        {
          name: 'auTrailId',
          title: 'AU Trail ID',
          type: 'string',
          description: 'Attribution Unit ID — generated on activation confirmation',
        },
        {
          name: 'engagementVelocity',
          title: 'Engagement Velocity Score',
          type: 'number',
          description: 'Phase 0: mocked metric. Phase 1: live social API aggregation.',
        },
        {
          name: 'socialProxyData',
          title: 'Social Proxy Data',
          type: 'object',
          description: 'Phase 1 target: live hashtag/geo-tag/mention aggregation',
          fields: [
            { name: 'hashtags', title: 'Tracked Hashtags', type: 'array', of: [{ type: 'string' }] },
            { name: 'mentionCount', title: 'Mention Count (mocked Phase 0)', type: 'number' },
            { name: 'geoTagCount', title: 'Geo-Tag Count (mocked Phase 0)', type: 'number' },
            { name: 'corridorScale', title: 'Corridor-Scale (Y/N)', type: 'boolean' },
          ],
        },
        {
          name: 'sponsorProofGenerated',
          title: 'Sponsor Proof Generated',
          type: 'boolean',
          description: 'Has a sponsor-facing proof document been generated for this activation?',
          initialValue: false,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      node: 'proposingNode.name',
      status: 'proposalStatus',
      date: 'proposedDate',
    },
    prepare({ title, node, status, date }) {
      const d = date ? new Date(date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }) : '—'
      return {
        title,
        subtitle: `${node ?? '—'} · ${d} · ${status}`,
      }
    },
  },
})
