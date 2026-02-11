import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cipOverlay',
  title: 'CIP Overlay',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Overlay Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^\d+\.\d+\.\d+$/, 'Must be semver format'),
    }),
    defineField({
      name: 'attachmentPoints',
      title: 'Attachment Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'phase',
              title: 'Journey Phase',
              type: 'string',
              options: {
                list: [
                  { title: 'Pre-Flight', value: 'pre-flight' },
                  { title: 'Mid-Journey', value: 'mid-journey' },
                  { title: 'Post-Journey', value: 'post' },
                ],
              },
            },
            {
              name: 'triggerCondition',
              title: 'Trigger Condition',
              type: 'text',
              description: 'Event name or state condition',
            },
            {
              name: 'priority',
              title: 'Priority',
              type: 'number',
              description: 'Lower numbers = higher priority',
              initialValue: 100,
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'couplingMode',
      title: 'Coupling Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Soft (Optional)', value: 'soft' },
          { title: 'Hard (Required)', value: 'hard' },
          { title: 'Steward Controlled', value: 'steward' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'toggles',
      title: '12-Direction Toggles',
      type: 'object',
      description: 'Governance configuration toggles',
      fields: [
        { name: 'consentGating', title: 'Consent Gating', type: 'boolean' },
        { name: 'evidenceCapture', title: 'Evidence Capture', type: 'boolean' },
        { name: 'attributionTracking', title: 'Attribution Tracking', type: 'boolean' },
        { name: 'refusalRights', title: 'Refusal Rights', type: 'boolean' },
        { name: 'dataMinimization', title: 'Data Minimization', type: 'boolean' },
        { name: 'transparencyMode', title: 'Transparency Mode', type: 'boolean' },
        { name: 'auditLogging', title: 'Audit Logging', type: 'boolean' },
        { name: 'remixPermission', title: 'Remix Permission', type: 'boolean' },
        { name: 'exportControl', title: 'Export Control', type: 'boolean' },
        { name: 'stewardReview', title: 'Steward Review', type: 'boolean' },
        { name: 'communityVeto', title: 'Community Veto', type: 'boolean' },
        { name: 'temporalLimits', title: 'Temporal Limits', type: 'boolean' },
      ],
    }),
    defineField({
      name: 'restorativeHuddleScript',
      title: 'Restorative Huddle Script',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Huddles',
          type: 'boolean',
        },
        {
          name: 'script',
          title: 'Script',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'prompt', title: 'Prompt', type: 'text' },
                { name: 'responseType', title: 'Response Type', type: 'string',
                  options: {
                    list: ['text', 'choice', 'scale', 'audio'],
                  },
                },
                { name: 'required', title: 'Required', type: 'boolean' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'governanceHooks',
      title: 'Governance Hooks',
      type: 'object',
      fields: [
        {
          name: 'surface',
          title: 'Surface Layer (Immediate)',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Quick checks before actions',
        },
        {
          name: 'deep',
          title: 'Deep Layer (Review)',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Detailed review processes',
        },
        {
          name: 'benthic',
          title: 'Benthic Layer (Archive)',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Long-term governance',
        },
      ],
    }),
    defineField({
      name: 'evidencePolicy',
      title: 'Evidence Policy',
      type: 'object',
      fields: [
        {
          name: 'requiredEvents',
          title: 'Required Events',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Event IDs that must be captured',
        },
        {
          name: 'artifacts',
          title: 'Required Artifacts',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'type',
                  title: 'Artifact Type',
                  type: 'string',
                  options: { list: ['photo', 'audio', 'note', 'signature'] },
                },
                { name: 'required', title: 'Required', type: 'boolean' },
                { name: 'validation', title: 'Validation Rules', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'retention',
          title: 'Retention Period',
          type: 'string',
          options: {
            list: ['30d', '1y', '7y', 'indefinite'],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'version',
      coupling: 'couplingMode',
    },
    prepare(selection) {
      const { title, subtitle, coupling } = selection
      return {
        title,
        subtitle: `v${subtitle} • ${coupling}`,
      }
    },
  },
})
