import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/ancestralStitch.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema ancestralStitch

export default defineType({
  name: 'ancestralStitch',
  title: 'Ancestral Stitch',
  type: 'document',
  fields: [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
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
    name: 'node',
    title: 'Node',
    type: 'reference',
    to: [{ type: 'corridorNode' }],
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'sourceProducers',
    title: 'Source Producers',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'producerProfile' }] }],
    description: "ProducerProfile references that feed this stitch",
  }),
  defineField({
    name: 'ingredientPacket',
    title: 'Ingredient Packet',
    type: 'object',
    fields: [], // expand inline object fields here
  }),
  defineField({
    name: 'gesturePacket',
    title: 'Gesture Packet',
    type: 'object',
    fields: [], // expand inline object fields here
  }),
  defineField({
    name: 'sessionReadiness',
    title: 'Session Readiness',
    type: 'object',
    fields: [], // expand inline object fields here
  }),
  defineField({
    name: 'narrativeLayer',
    title: 'Narrative Layer',
    type: 'reference',
    to: [{ type: 'narrativeLayer' }],
    description: "Optional reference to linked NarrativeLayer in Place Packet system",
  }),
  ],
})
