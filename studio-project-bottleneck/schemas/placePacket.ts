import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'placePacket',
  title: 'Place Packet',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'Semantic version (e.g., 1.0.0)',
      validation: (Rule) =>
        Rule.required().regex(/^\d+\.\d+\.\d+$/, {
          name: 'semver',
          invert: false,
        }),
    }),
    defineField({
      name: 'routeGraph',
      title: 'Route Graph',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Route Type',
          type: 'string',
          options: {
            list: [
              { title: 'Linear', value: 'linear' },
              { title: 'Branching', value: 'branching' },
              { title: 'Freeform', value: 'freeform' },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'nodes',
          title: 'Route Nodes',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'stop',
                  title: 'Stop Reference',
                  type: 'reference',
                  to: [{ type: 'stop' }],
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'sequence',
                  title: 'Sequence Order',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0),
                },
                {
                  name: 'required',
                  title: 'Required Stop',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'conditions',
                  title: 'Branching Conditions',
                  type: 'text',
                  description: 'JSON logic for conditional routing',
                  hidden: ({ parent }) => parent?.type !== 'branching',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'layers',
      title: 'Narrative Layers',
      type: 'array',
      of: [{ type: 'narrativeLayer' }],
    }),
    defineField({
      name: 'rules',
      title: 'Rules & Policies',
      type: 'object',
      fields: [
        {
          name: 'consentPolicy',
          title: 'Consent Policy',
          type: 'string',
          options: {
            list: [
              { title: 'Capture', value: 'capture' },
              { title: 'Remix', value: 'remix' },
              { title: 'Export', value: 'export' },
              { title: 'None', value: 'none' },
            ],
          },
        },
        {
          name: 'refusalGate',
          title: 'Refusal Gate (PRS-like)',
          type: 'boolean',
          description: 'Enable user refusal workflow',
        },
        {
          name: 'ntaiClass',
          title: 'NTAI Classification',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Non-transactable AI flags',
        },
      ],
    }),
    defineField({
      name: 'outputs',
      title: 'Output Configuration',
      type: 'object',
      fields: [
        {
          name: 'magnetDefault',
          title: 'Default Magnet Template',
          type: 'reference',
          to: [{ type: 'magnetTemplate' }],
        },
      ],
    }),
    defineField({
      name: 'overlays',
      title: 'CIP Overlays',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'cipOverlay' }] }],
    }),
    defineField({
      name: 'changelog',
      title: 'Version Changelog',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'version', type: 'string', title: 'Version' },
            { name: 'date', type: 'datetime', title: 'Date' },
            { name: 'changes', type: 'text', title: 'Changes' },
            { name: 'author', type: 'string', title: 'Author' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'version',
    },
  },
})
