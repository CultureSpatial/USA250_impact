import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/stop.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema stop

export default defineType({
  name: 'stop',
  title: 'Stop',
  type: 'document',
  fields: [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description: "Human-readable stop name",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'locationHint',
    title: 'Location Hint',
    type: 'text',
    description: "Descriptive location without GPS coordinates",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'accessibilityVariants',
    title: 'Accessibility Variants',
    type: 'array',
    of: [{ type: 'object' }],
    description: "Accessibility-specific content variants for this stop",
  }),
  defineField({
    name: 'contentRefs',
    title: 'Content Refs',
    type: 'array',
    of: [{ type: 'reference' }, { type: 'object' }],
    description: "References to content displayed at this stop",
  }),
  defineField({
    name: 'estimatedDuration',
    title: 'Estimated Duration',
    type: 'number',
    description: "Expected time at this stop in minutes",
  }),
  ],
})
