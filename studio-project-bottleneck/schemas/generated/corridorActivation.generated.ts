import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/corridorActivation.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema corridorActivation

export default defineType({
  name: 'corridorActivation',
  title: 'Corridor Activation',
  type: 'document',
  fields: [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description: "Descriptive title in the proposing node's voice — not a marketing headline",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { source: 'title', maxLength: 200 },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'proposedBy',
    title: 'Proposed By',
    type: 'reference',
    to: [{ type: 'producerProfile' }],
    description: "Reference to the ProducerProfile who initiated this proposal",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'proposingNode',
    title: 'Proposing Node',
    type: 'reference',
    to: [{ type: 'corridorNode' }],
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'proposedDate',
    title: 'Proposed Date',
    type: 'datetime',
    description: "Proposed activation date/time — aligned to FIFA match calendar",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'fifaMatchDay',
    title: 'Fifa Match Day',
    type: 'string',
    description: "Match day reference (e.g. \"Group Stage D · June 15\")",
  }),
  defineField({
    name: 'duration',
    title: 'Duration',
    type: 'number',
    description: "Estimated duration in hours (0.5–12)",
  }),
  defineField({
    name: 'activationFormat',
    title: 'Activation Format',
    type: 'string',
    description: "Node-specific format — use node vocabulary, not generic categories",
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Live Catch Demo', value: 'live_catch_demo' }, { title: 'Curing Session', value: 'curing_session' }, { title: 'Harvest Tasting', value: 'harvest_tasting' }, { title: 'Oral Kinetic Wine', value: 'oral_kinetic_wine' }, { title: 'Street Food', value: 'street_food' }, { title: 'Ceviche Tasting', value: 'ceviche_tasting' }, { title: 'Oral Kinetic Ceremony', value: 'oral_kinetic_ceremony' }, { title: 'First Foods Ceremony', value: 'first_foods_ceremony' }, { title: 'Market Demo', value: 'market_demo' }, { title: 'Ferment Session', value: 'ferment_session' }] },
  }),
  defineField({
    name: 'nodeSpecificContext',
    title: 'Node Specific Context',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "What makes this activation specific to its node — do not normalize",
  }),
  defineField({
    name: 'syncedNodes',
    title: 'Synced Nodes',
    type: 'array',
    of: [{ type: 'object' }],
    description: "Other nodes that have synced with this activation proposal",
  }),
  defineField({
    name: 'proposalStatus',
    title: 'Proposal Status',
    type: 'string',
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Open', value: 'open' }, { title: 'Synced', value: 'synced' }, { title: 'Confirmed', value: 'confirmed' }, { title: 'Live', value: 'live' }, { title: 'Complete', value: 'complete' }, { title: 'Withdrawn', value: 'withdrawn' }] },
  }),
  defineField({
    name: 'rippleTracking',
    title: 'Ripple Tracking',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Engagement Velocity and AU attribution data",
  }),
  ],
})
