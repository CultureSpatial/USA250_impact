import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/producerProfile.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema producerProfile

export default defineType({
  name: 'producerProfile',
  title: 'Producer Profile',
  type: 'document',
  fields: [
  defineField({
    name: 'name',
    title: 'Name',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { source: 'name', maxLength: 200 },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'producerType',
    title: 'Producer Type',
    type: 'string',
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Chef', value: 'chef' }, { title: 'Fisher', value: 'fisher' }, { title: 'Cultural Custodian', value: 'cultural_custodian' }, { title: 'Winemaker', value: 'winemaker' }, { title: 'Venue Operator', value: 'venue_operator' }, { title: 'Agricultural', value: 'agricultural' }] },
  }),
  defineField({
    name: 'node',
    title: 'Node',
    type: 'reference',
    to: [{ type: 'corridorNode' }],
    description: "Reference to the CorridorNode this producer represents",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'dacumProfile',
    title: 'Dacum Profile',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Competency profile submitted via Producer Seeding Portal",
  }),
  defineField({
    name: 'ancestralStitch',
    title: 'Ancestral Stitch',
    type: 'reference',
    to: [{ type: 'ancestralStitch' }],
    description: "Reference to the compiled AncestralStitch from this producer's submission",
  }),
  defineField({
    name: 'translationStatus',
    title: 'Translation Status',
    type: 'string',
    description: "Current position in translation workflow state machine",
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Submitted — awaiting human review', value: 'submitted' }, { title: 'Content translated from source language', value: 'translated' }, { title: 'Translated and contextualized for collective corridor voice', value: 'articulated' }, { title: 'Live on public corridor page', value: 'published' }] },
  }),
  defineField({
    name: 'translationNotes',
    title: 'Translation Notes',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Internal workflow notes — not public-facing",
  }),
  defineField({
    name: 'articulatedVoice',
    title: 'Articulated Voice',
    type: 'array',
    of: [{ type: 'block' }],
    description: "Final collective voice text (Portable Text) — set when status = articulated",
  }),
  defineField({
    name: 'consentRecord',
    title: 'Consent Record',
    type: 'object',
    fields: [], // expand inline object fields here
  }),
  ],
})
