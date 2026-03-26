import { defineType, defineField } from 'sanity'

/**
 * Corridor Node — a geographic segment of the B2B2C coordination corridor.
 *
 * Maps-is-globes: this is the top-level geographic container equivalent to the
 * "Corridor Map" concept. Each node is a city or territory segment that can
 * hold producers, activations, and Place Packets (the detailed experience layer).
 *
 * Relationship:
 *   corridorNode → has many producerProfiles
 *   corridorNode → has many corridorActivations
 *   corridorNode → references one or more PlacePackets (the "globe"/experience)
 */
export default defineType({
  name: 'corridorNode',
  title: 'Corridor Node',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Node Name',
      type: 'string',
      description: 'City or territory name (e.g. "Vancouver", "Seattle", "Ensenada")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'territory',
      title: 'Indigenous Territory',
      type: 'string',
      description: 'Unceded / ancestral territory name — required for corridor integrity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'Canada', value: 'CA' },
          { title: 'United States', value: 'US' },
          { title: 'Mexico', value: 'MX' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'corridorPosition',
      title: 'Corridor Position',
      type: 'number',
      description: 'Sequence position in the corridor (1 = northernmost, ascending south)',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'nodeType',
      title: 'Node Type',
      type: 'string',
      description: 'Determines which node-specific activation fields are shown',
      options: {
        list: [
          { title: 'Coastal Fishing Territory', value: 'coastal_fishing' },
          { title: 'Wine / Terroir', value: 'wine_terroir' },
          { title: 'Urban Cultural Hub', value: 'urban_cultural' },
          { title: 'Ceremonial / Sacred Site', value: 'ceremonial' },
          { title: 'Market / Agricultural', value: 'market_agricultural' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collectiveIdentity',
      title: 'Collective Identity Shell',
      type: 'object',
      description: 'Static HTML-first content — no JS needed, SEO-optimized (Sponsor Surface layer)',
      fields: [
        {
          name: 'headline',
          title: 'Node Headline',
          type: 'string',
          description: 'One sentence — the corridor position of this node, not a tagline',
        },
        {
          name: 'body',
          title: 'Collective Narrative',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Translated + articulated collective voice from producer submissions',
        },
        {
          name: 'languages',
          title: 'Languages Represented',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Languages of source producer submissions (e.g. ["en", "es", "hul\'q\'umi\'num\'"])',
        },
        {
          name: 'sponsorSurface',
          title: 'Sponsor Surface',
          type: 'object',
          description: 'Static sponsor integration — renders as pure HTML, no JS',
          fields: [
            { name: 'sponsorName', title: 'Sponsor Name', type: 'string' },
            { name: 'sponsorLogo', title: 'Sponsor Logo', type: 'image' },
            { name: 'sponsorUrl', title: 'Sponsor URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'placePackets',
      title: 'Linked Place Packets',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'placePacket' }] }],
      description: 'The detailed experience layer (the "globe") for this corridor node',
    }),
    defineField({
      name: 'fifaMatchDays',
      title: 'FIFA Match Days',
      type: 'array',
      of: [{ type: 'datetime' }],
      description: 'Match days relevant to this node during June–July 2026 window',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'territory',
      position: 'corridorPosition',
    },
    prepare({ title, subtitle, position }) {
      return {
        title: `${position}. ${title}`,
        subtitle,
      }
    },
  },
})
