import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/corridorNode.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema corridorNode

export default defineType({
  name: 'corridorNode',
  title: 'Corridor Node',
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
    name: 'territory',
    title: 'Territory',
    type: 'string',
    description: "Unceded / ancestral territory name",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'country',
    title: 'Country',
    type: 'string',
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'C A', value: 'CA' }, { title: 'U S', value: 'US' }, { title: 'M X', value: 'MX' }] },
  }),
  defineField({
    name: 'corridorPosition',
    title: 'Corridor Position',
    type: 'number',
    description: "Sequence position in corridor (1 = northernmost)",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'nodeType',
    title: 'Node Type',
    type: 'string',
    description: "Determines node-specific activation field parameterization",
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Coastal Fishing', value: 'coastal_fishing' }, { title: 'Wine Terroir', value: 'wine_terroir' }, { title: 'Urban Cultural', value: 'urban_cultural' }, { title: 'Ceremonial', value: 'ceremonial' }, { title: 'Market Agricultural', value: 'market_agricultural' }] },
  }),
  defineField({
    name: 'collectiveIdentity',
    title: 'Collective Identity',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Static HTML-first collective identity content (Sponsor Surface layer)",
  }),
  defineField({
    name: 'placePackets',
    title: 'Place Packets',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'placePacket' }] }],
    description: "References to Place Packet documents (the globe/experience layer)",
  }),
  defineField({
    name: 'fifaMatchDays',
    title: 'Fifa Match Days',
    type: 'array',
    of: [{ type: 'datetime' }],
    description: "Match days relevant to this node (June–July 2026)",
  }),
  ],
})
