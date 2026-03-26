import {defineField, defineType} from 'sanity'
import {deploymentReadinessField, failureModesField} from '../lib/deploymentReadiness'

export const activationProposal = defineType({
  name: 'activationProposal',
  title: 'Activation Proposal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Activation Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'e.g., "Ceviche Tasting at Waterfront" or "Coast Salish Salmon Ceremony"',
    }),
    defineField({
      name: 'proposedBy',
      title: 'Proposed By',
      type: 'reference',
      to: [{type: 'producerProfile'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'node',
      title: 'Primary Node',
      type: 'string',
      options: {
        list: [
          {title: 'Ensenada', value: 'ensenada'},
          {title: 'Seattle', value: 'seattle'},
          {title: 'Vancouver', value: 'vancouver'},
          {title: 'Ucluelet', value: 'ucluelet'},
          {title: 'Okanagan', value: 'okanagan'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proposedDate',
      title: 'Proposed Activation Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fifaMatchDay',
      title: 'FIFA Match Day Anchor',
      type: 'string',
      description: 'e.g., "Group Stage D · June 15"',
    }),
    defineField({
      name: 'format',
      title: 'Activation Format',
      type: 'string',
      options: {
        list: [
          {title: 'Tasting Session', value: 'tasting'},
          {title: 'Oral-Kinetic Ritual', value: 'ritual'},
          {title: 'Workshop / Demo', value: 'workshop'},
          {title: 'Market / Pop-Up', value: 'popup'},
          {title: 'Ceremony', value: 'ceremony'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Activation Description',
      type: 'text',
    }),
    defineField({
      name: 'proposalStatus',
      title: 'Proposal Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Open (accepting syncs)', value: 'open'},
          {title: 'Synced (nodes aligned)', value: 'synced'},
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'Live (happening now)', value: 'live'},
          {title: 'Complete', value: 'complete'},
          {title: 'Withdrawn', value: 'withdrawn'},
        ],
      },
      initialValue: 'draft',
    }),

    // NODE-SPECIFIC CONTEXT — Anti-universality guard
    defineField({
      name: 'nodeSpecificContext',
      title: 'Node-Specific Context',
      type: 'object',
      description:
        'Anti-universality guard. Dungeness crab tasting in Seattle ≠ aguachile in Ensenada ≠ salmon ceremony in Vancouver.',
      fields: [
        {
          name: 'localIngredientFocus',
          type: 'string',
          title: 'Local Ingredient Focus',
        },
        {
          name: 'spatialContext',
          type: 'string',
          title: 'Spatial Context',
          description: 'e.g., "waterfront tidal zone"',
        },
        {
          name: 'seasonalLogic',
          type: 'text',
          title: 'Seasonal Logic (WHY now — not calendar-driven)',
        },
        {
          name: 'audienceSize',
          type: 'number',
          title: 'Expected Audience Size',
        },
        {
          name: 'requiresMarthaSession',
          type: 'boolean',
          title: 'Requires Martha Session?',
          initialValue: false,
          description:
            'True when the gesture IS the knowledge — not just the product.',
        },
      ],
    }),

    // SYNCED NODES — replaces deprecated syncEvent document
    defineField({
      name: 'syncedNodes',
      title: 'Synced Nodes (Cross-Node Participation)',
      type: 'array',
      description:
        'Sync ≠ Duplicate. Each node preserves its own context. SyncType determines coordination mode.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'syncingProducer',
              title: 'Syncing Producer',
              type: 'reference',
              to: [{type: 'producerProfile'}],
            },
            {
              name: 'syncType',
              title: 'Sync Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Full (parallel, same date)', value: 'full'},
                  {title: 'Echo (complementary, same week)', value: 'echo'},
                  {title: 'Relay (sequential, next day)', value: 'relay'},
                ],
              },
            },
            {
              name: 'syncNote',
              title: "Sync Note (What this node is contributing — their own words)",
              type: 'text',
            },
          ],
          preview: {
            select: {producer: 'syncingProducer.name', type: 'syncType'},
            prepare: (value: any) => ({
              title: value.producer as string,
              subtitle: `Sync type: ${value.type as string}`,
            }),
          },
        },
      ],
    }),

    // RIPPLE TRACKING
    defineField({
      name: 'rippleTracking',
      title: 'Ripple Tracking',
      type: 'object',
      fields: [
        {
          name: 'auTrailId',
          title: 'Attribution Unit Trail ID',
          type: 'string',
          description:
            'Format: AU-YYYY-MM-DD-[PRODUCER]-[SEQ]. Generated on confirmation.',
        },
        {
          name: 'engagementVelocity',
          title: 'Engagement Velocity (0–1)',
          type: 'number',
          description: 'Phase 0: mocked. Phase 1: live social API aggregation.',
          validation: (Rule) => Rule.min(0).max(1),
        },
        {
          name: 'isMocked',
          title: 'Engagement Velocity is Mocked?',
          type: 'boolean',
          initialValue: true,
          description:
            'Must be true in Phase 0. False only when live API is active.',
        },
        {
          name: 'sponsorProofGenerated',
          title: 'Sponsor Proof Generated?',
          type: 'boolean',
          initialValue: false,
          description:
            "Only true if producer has consented to sponsor_surface in their ConsentRecord.",
        },
      ],
    }),

    deploymentReadinessField,
    failureModesField,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'node',
      status: 'proposalStatus',
      fifa: 'fifaMatchDay',
    },
    prepare(value: any) {
      const {title, subtitle, status, fifa} = value
      return {
        title: title as string,
        subtitle: `${subtitle as string} • ${status as string}${fifa ? ` · ${fifa}` : ''}`,
      }
    },
  },
})

export default activationProposal
