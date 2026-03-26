import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/magnetTemplate.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema magnetTemplate

export default defineType({
  name: 'magnetTemplate',
  title: 'Magnet Template',
  type: 'document',
  fields: [
  defineField({
    name: 'name',
    title: 'Name',
    type: 'string',
    description: "Template identifier name",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'type',
    title: 'Type',
    type: 'string',
    description: "Kind of artefact this template generates",
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Postcard', value: 'postcard' }, { title: 'Field Note', value: 'field_note' }, { title: 'Clip', value: 'clip' }, { title: 'Steward Mark', value: 'steward_mark' }] },
  }),
  defineField({
    name: 'layout',
    title: 'Layout',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Layout and design configuration",
  }),
  defineField({
    name: 'copyVariants',
    title: 'Copy Variants',
    type: 'array',
    of: [{ type: 'object' }],
    description: "Localised or A/B copy alternatives",
  }),
  defineField({
    name: 'sharePolicy',
    title: 'Share Policy',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Controls for download and social sharing",
  }),
  defineField({
    name: 'proofMode',
    title: 'Proof Mode',
    type: 'string',
    description: "Verification mode for artefact authenticity",
    options: { list: [{ title: 'Role', value: 'role' }, { title: 'Rotating Code', value: 'rotating_code' }, { title: 'Steward', value: 'steward' }, { title: 'None', value: 'none' }] },
  }),
  defineField({
    name: 'metadata',
    title: 'Metadata',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Metadata inclusion controls",
  }),
  ],
})
