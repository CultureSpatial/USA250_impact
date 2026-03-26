import {defineField, defineType} from 'sanity'

/**
 * Producer Profile v1.1 (OPS-66 corrected)
 *
 * A producer is NOT an author or content creator.
 * Producers submit DACUM profiles. Curators articulate their voice.
 * consentRecord is now a SEPARATE DOCUMENT (not embedded object) — enables independent queries.
 * node is a string enum (not a reference) — enables seeding portal submissions before node docs exist.
 */
export const producerProfile = defineType({
  name: 'producerProfile',
  title: 'Producer Profile',
  type: 'document',
  description:
    'A producer is NOT an author or content creator. Producers submit DACUM profiles. Curators articulate their voice. This document holds the raw submission and translation state.',
  fields: [
    // IDENTITY
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
      options: {source: 'name', maxLength: 100},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'node',
      title: 'Corridor Node',
      type: 'string',
      description: 'String enum — does not require corridorNode document to exist first.',
      options: {
        list: [
          {title: 'Ensenada (Mexico)', value: 'ensenada'},
          {title: 'Seattle (WA)', value: 'seattle'},
          {title: 'Vancouver (BC)', value: 'vancouver'},
          {title: 'Ucluelet (BC)', value: 'ucluelet'},
          {title: 'Okanagan (BC)', value: 'okanagan'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'producerType',
      title: 'Producer Type',
      type: 'string',
      description: 'What the producer DOES — not what they write.',
      options: {
        list: [
          {title: 'Chef / Culinary', value: 'chef'},
          {title: 'Fisher / Seafood', value: 'fisher'},
          {title: 'Farmer / Agriculture', value: 'agricultural'},
          {title: 'Winemaker / Viticulture', value: 'winemaker'},
          {title: 'Cultural Custodian', value: 'cultural_custodian'},
          {title: 'Venue Operator', value: 'venue_operator'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dialect',
      title: 'Source Language / Dialect',
      type: 'string',
      description:
        'The language or dialect in which the producer submitted. Preserved in archive — not erased by translation. e.g. "es-MX", "hul\'q\'umi\'num\'", "en-BC"',
    }),
    defineField({
      name: 'submissionEmail',
      title: 'Contact Email (Magic Link re-entry)',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),

    // DACUM PROFILE — raw competency documentation
    defineField({
      name: 'dacumProfile',
      title: 'DACUM Profile',
      type: 'object',
      description:
        'Raw competency documentation. Preserved as-is in archive. NOT edited for publication.',
      fields: [
        {
          name: 'primarySkill',
          title: 'Primary Skill',
          type: 'text',
          description: 'What this producer does — in their own words.',
        },
        {
          name: 'yearsOfPractice',
          title: 'Years of Practice',
          type: 'number',
        },
        {
          name: 'localIngredientSignature',
          title: 'Signature Ingredient (Local name, terroir-bound)',
          type: 'string',
          description:
            'The one ingredient that defines their practice in this place. NOT scientific name — local name as pronounced.',
        },
        {
          name: 'gestureDescription',
          title: 'Gesture Description (Oral-Kinetic Vocabulary)',
          type: 'text',
          description:
            'How they physically make their signature dish — in their own words. Translated but NOT sanitized.',
        },
      ],
    }),

    // TRANSLATION STATE MACHINE — submitted → translated → articulated → published
    defineField({
      name: 'translationStatus',
      title: 'Translation Status',
      type: 'string',
      description:
        'Workflow state. submitted → translated → articulated → published. Each step has a named owner.',
      options: {
        list: [
          {title: '📥 Submitted (raw producer voice)', value: 'submitted'},
          {title: '🌐 Translated (language documented)', value: 'translated'},
          {title: '🪡 Articulated (woven into collective voice)', value: 'articulated'},
          {title: '✅ Published (live in public spaces)', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'submitted',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'translationNotes',
      title: 'Translation Notes (Internal)',
      type: 'object',
      fields: [
        {
          name: 'translatedBy',
          title: 'Translated By (Audit trail)',
          type: 'string',
          description: 'Named language specialist. Required for audit.',
        },
        {
          name: 'articulatedAt',
          title: 'Articulated At',
          type: 'datetime',
          description: 'When curator wove this voice into corridor collective.',
        },
        {
          name: 'articulationNotes',
          title: 'Articulation Notes',
          type: 'text',
        },
      ],
    }),

    // ARTICULATED VOICE — final public text (NOT the raw DACUM submission)
    defineField({
      name: 'articulatedVoice',
      title: 'Articulated Voice (Corridor-Ready)',
      type: 'array',
      of: [{type: 'block'}],
      description:
        "The curator-woven 'corridor voice' version of this producer's story. This — NOT the raw DACUM submission — appears on the public corridor page.",
    }),

    // REFERENCES — consentRecord is now a SEPARATE DOCUMENT (v1.1 correction)
    defineField({
      name: 'consentRecord',
      title: 'Consent Record',
      type: 'reference',
      to: [{type: 'consentRecord'}],
      description:
        'REQUIRED before any content from this producer appears on any surface. Separate document enables independent consent queries.',
    }),
    defineField({
      name: 'ancestralStitch',
      title: 'Ancestral Stitch',
      type: 'reference',
      to: [{type: 'ancestralStitch'}],
      description: 'The compiled stitch packet (ingredient + gesture + terroir).',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'node',
      status: 'translationStatus',
    },
    prepare(value: any) {
      const {title, subtitle, status} = value
      const statusEmoji: Record<string, string> = {
        submitted: '📥',
        translated: '🌐',
        articulated: '🪡',
        published: '✅',
      }
      return {
        title,
        subtitle: `${subtitle} • ${statusEmoji[status] ?? ''} ${status}`,
      }
    },
  },
})

export default producerProfile
