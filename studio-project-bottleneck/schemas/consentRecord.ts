import {defineField, defineType} from 'sanity'

export const consentRecord = defineType({
  name: 'consentRecord',
  title: 'Consent Record',
  type: 'document',
  description:
    "Consent is a GATING mechanism — not a label. If sponsor_surface is not in consentScope, that producer's content MUST NOT appear on sponsor surfaces. Knowledge protections are non-negotiable.",
  fields: [
    defineField({
      name: 'producer',
      title: 'Producer',
      type: 'reference',
      to: [{type: 'producerProfile'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'consentScope',
      title: 'Consent Scope',
      type: 'array',
      description:
        'Multi-select. Each surface is gated independently. Rosa scenario: collective_page ✅, martha_session ✅, sponsor_surface ❌.',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Collective Page (public corridor)', value: 'collective_page'},
              {title: 'Sponsor Surface', value: 'sponsor_surface'},
              {title: 'Martha Session (facilitation only)', value: 'martha_session'},
              {title: 'DTC Attribution (attribution units)', value: 'dtc_attribution'},
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'knowledgeProtections',
      title: 'Knowledge Protections',
      type: 'text',
      description:
        'What this producer has explicitly asked NOT to be shared publicly. Non-negotiable. Operators must read this before every session or surface use.',
    }),
    defineField({
      name: 'consentDate',
      title: 'Consent Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'consentWitness',
      title: 'Consent Witness / Cultural Reviewer',
      type: 'string',
      description: 'Named person who witnessed or verified consent. Required for audit.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'consentVersion',
      title: 'Consent Version',
      type: 'string',
      initialValue: '1.0',
      description: 'Increment when consent scope changes.',
    }),
  ],
  preview: {
    select: {
      producer: 'producer.name',
      scope: 'consentScope',
    },
    prepare(value: any) {
      const {producer, scope} = value
      const hasSponsor = (scope as string[])?.includes('sponsor_surface')
      return {
        title: producer as string,
        subtitle: hasSponsor ? '💰 Sponsor surface: YES' : '🚫 Sponsor surface: NO',
      }
    },
  },
})

export default consentRecord
