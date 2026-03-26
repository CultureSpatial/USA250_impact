import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/placePacket.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema placePacket

export default defineType({
  name: 'placePacket',
  title: 'Place Packet',
  type: 'document',
  fields: [
  defineField({
    name: 'name',
    title: 'Name',
    type: 'string',
    description: "Human-readable name for this place packet",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'version',
    title: 'Version',
    type: 'string',
    description: "Semantic version string (e.g. 1.0.0)",
    validation: (Rule) => Rule.required().regex(/^\d+\.\d+\.\d+$/, 'Must be semver format'),
  }),
  defineField({
    name: 'routeGraph',
    title: 'Route Graph',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Graph structure defining the route between stops",
  }),
  defineField({
    name: 'layers',
    title: 'Layers',
    type: 'array',
    of: [{ type: 'narrativeLayer' }],
    description: "Ordered narrative layers applied to this packet",
  }),
  defineField({
    name: 'rules',
    title: 'Rules',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Consent, refusal, and NTAI classification rules",
  }),
  defineField({
    name: 'outputs',
    title: 'Outputs',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Output configuration — default magnet template",
  }),
  defineField({
    name: 'overlays',
    title: 'Overlays',
    type: 'array',
    of: [{ type: 'reference' }],
    description: "CIP overlay references applied to this packet",
  }),
  defineField({
    name: 'changelog',
    title: 'Changelog',
    type: 'array',
    of: [{ type: 'object' }],
    description: "Version history for this place packet",
  }),
  ],
})
