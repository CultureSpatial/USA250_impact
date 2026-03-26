import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/narrativeLayer.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema narrativeLayer

export default defineType({
  name: 'narrativeLayer',
  title: 'Narrative Layer',
  type: 'object',
  fields: [
  defineField({
    name: 'type',
    title: 'Type',
    type: 'string',
    description: "Narrative classification",
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Traditional Ecological Knowledge', value: 'tek' }, { title: 'Historical', value: 'historical' }, { title: 'Contemporary', value: 'contemporary' }, { title: 'Stewardship', value: 'stewardship' }, { title: 'Sound Clash', value: 'sound_clash' }] },
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description: "Display title of this narrative layer",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    description: "Narrative description or summary",
  }),
  defineField({
    name: 'assets',
    title: 'Assets',
    type: 'array',
    of: [{ type: 'object' }],
    description: "Media assets associated with this narrative",
  }),
  defineField({
    name: 'attribution',
    title: 'Attribution',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Attribution and licensing information",
  }),
  defineField({
    name: 'visibilityPolicy',
    title: 'Visibility Policy',
    type: 'string',
    description: "Access control policy for display",
    options: { list: [{ title: 'Express', value: 'express' }, { title: 'Show', value: 'show' }, { title: 'Steward', value: 'steward' }] },
  }),
  defineField({
    name: 'culturalSensitivity',
    title: 'Cultural Sensitivity',
    type: 'text',
    description: "Notes on special handling or cultural context",
  }),
  ],
})
