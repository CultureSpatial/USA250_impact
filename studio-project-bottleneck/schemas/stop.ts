import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'stop',
  title: 'Stop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationHint',
      title: 'Location Hint',
      type: 'text',
      description: 'Descriptive location (no GPS required)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accessibilityVariants',
      title: 'Accessibility Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Accessibility Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Visual Description', value: 'visual' },
                  { title: 'Audio Description', value: 'audio' },
                  { title: 'Physical Access', value: 'physical' },
                  { title: 'Cognitive Support', value: 'cognitive' },
                ],
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'media',
              title: 'Supporting Media',
              type: 'file',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contentRefs',
      title: 'Content References',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'post' }] },
        { type: 'reference', to: [{ type: 'product' }] },
        {
          type: 'object',
          title: 'Direct Media',
          fields: [
            {
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: ['audio', 'video', 'image', 'text'],
              },
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration (minutes)',
      type: 'number',
      description: 'Time expected at this stop',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'locationHint',
    },
  },
})
