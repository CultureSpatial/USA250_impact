import { defineType, defineField } from 'sanity'

/**
 * Producer Profile — a Value Producer in the B2B2C corridor seeding system.
 *
 * This is NOT the same as Author (content creator) or PractitionerProfile (Martha).
 * A Producer is the B2B layer: chef, fisher, cultural custodian, venue operator —
 * a local operator who seeds the corridor with their knowledge, ingredients, and voice.
 *
 * The translation workflow state machine lives here:
 *   submitted → translated → articulated → published
 *
 * Connected to:
 *   corridorNode (which segment they represent)
 *   ancestralStitch (their ingredient/gesture/terroir submission)
 *   corridorActivation (activations they've proposed or synced to)
 */
export default defineType({
  name: 'producerProfile',
  title: 'Producer Profile',
  type: 'document',
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Producer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 100 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'producerType',
      title: 'Producer Type',
      type: 'string',
      options: {
        list: [
          { title: 'Chef / Culinary Practitioner', value: 'chef' },
          { title: 'Fisher / Harvester', value: 'fisher' },
          { title: 'Cultural Custodian', value: 'cultural_custodian' },
          { title: 'Winemaker / Vigneron', value: 'winemaker' },
          { title: 'Venue Operator', value: 'venue_operator' },
          { title: 'Market / Agricultural Producer', value: 'agricultural' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'node',
      title: 'Corridor Node',
      type: 'reference',
      to: [{ type: 'corridorNode' }],
      description: 'Which corridor segment this producer represents',
      validation: (Rule) => Rule.required(),
    }),

    // ── Seeding Portal Submission Fields ──────────────────────────────────
    defineField({
      name: 'dacumProfile',
      title: 'DACUM Profile',
      type: 'object',
      description: 'Competency profile submitted via Producer Seeding Portal',
      fields: [
        {
          name: 'primarySkill',
          title: 'Primary Skill / Craft',
          type: 'string',
          description: 'In the producer\'s own words — do not edit for style',
        },
        {
          name: 'yearsOfPractice',
          title: 'Years of Practice',
          type: 'number',
        },
        {
          name: 'localIngredientSignature',
          title: 'Signature Local Ingredient',
          type: 'string',
          description: 'The one ingredient that defines their practice in this place',
        },
        {
          name: 'sourceLanguage',
          title: 'Submission Language',
          type: 'string',
          description: 'Language/dialect of original submission (e.g. "es-MX", "hul\'q\'umi\'num\'", "en-BC")',
        },
        {
          name: 'gestureDescription',
          title: 'Oral-Kinetic Gesture Description',
          type: 'text',
          description: 'How they physically make their signature dish/process — in their own words',
          rows: 4,
        },
        {
          name: 'oralKineticVideo',
          title: 'Oral-Kinetic Video',
          type: 'file',
          description: 'Short video of the gesture/process — this feeds Martha\'s Ancestral Stitch sessions',
          options: { accept: 'video/*' },
        },
      ],
    }),

    // ── Ancestral Stitch Packet ────────────────────────────────────────────
    defineField({
      name: 'ancestralStitch',
      title: 'Ancestral Stitch',
      type: 'reference',
      to: [{ type: 'ancestralStitch' }],
      description: 'The compiled ingredient + gesture packet drawn from this producer\'s DACUM submission',
    }),

    // ── Translation Workflow State Machine ────────────────────────────────
    defineField({
      name: 'translationStatus',
      title: 'Translation Status',
      type: 'string',
      options: {
        list: [
          { title: '1 · Submitted — awaiting review', value: 'submitted' },
          { title: '2 · Translated — content translated from source language', value: 'translated' },
          { title: '3 · Articulated — contextualized for collective corridor voice', value: 'articulated' },
          { title: '4 · Published — live on public corridor page', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'submitted',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'translationNotes',
      title: 'Translation / Articulation Notes',
      type: 'object',
      description: 'Internal workflow notes — not public-facing',
      fields: [
        {
          name: 'translatedAt',
          title: 'Translated At',
          type: 'datetime',
        },
        {
          name: 'translatedBy',
          title: 'Translated By',
          type: 'string',
        },
        {
          name: 'articulatedAt',
          title: 'Articulated At',
          type: 'datetime',
        },
        {
          name: 'culturalReviewNotes',
          title: 'Cultural Review Notes',
          type: 'text',
          rows: 3,
        },
        {
          name: 'sovereigntyFlags',
          title: 'Sovereignty Flags',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Any content requiring CIP/CARE attention before publication',
        },
      ],
    }),

    // ── Collective Identity Output ─────────────────────────────────────────
    defineField({
      name: 'articulatedVoice',
      title: 'Articulated Collective Voice',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Final translated + contextualized text for the CollectiveIdentityShell — set when status = articulated',
    }),

    // ── Consent & Sovereignty ─────────────────────────────────────────────
    defineField({
      name: 'consentRecord',
      title: 'Consent Record',
      type: 'object',
      fields: [
        { name: 'consentedAt', title: 'Consented At', type: 'datetime' },
        {
          name: 'consentScope',
          title: 'Consent Scope',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Corridor collective page', value: 'collective_page' },
              { title: 'Sponsor surface display', value: 'sponsor_surface' },
              { title: 'Martha session material', value: 'martha_session' },
              { title: 'Public DtC attribution', value: 'dtc_attribution' },
            ],
          },
        },
        {
          name: 'knowledgeProtections',
          title: 'Knowledge Protections',
          type: 'text',
          description: 'What this producer has explicitly asked NOT to be shared publicly',
          rows: 2,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'translationStatus',
      type: 'producerType',
    },
    prepare({ title, subtitle, type }) {
      const statusEmoji: Record<string, string> = {
        submitted: '⏳',
        translated: '🔄',
        articulated: '✍️',
        published: '✅',
      }
      return {
        title,
        subtitle: `${type} · ${statusEmoji[subtitle] ?? ''}  ${subtitle}`,
      }
    },
  },
})
