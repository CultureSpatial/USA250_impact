import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'magnetTemplate',
  title: 'Magnet Template',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Magnet Type',
      type: 'string',
      options: {
        list: [
          { title: 'Postcard', value: 'postcard' },
          { title: 'Field Note', value: 'field_note' },
          { title: 'Audio Clip', value: 'clip' },
          { title: 'Steward Mark', value: 'steward_mark' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout Configuration',
      type: 'object',
      fields: [
        {
          name: 'format',
          title: 'Format',
          type: 'string',
          options: {
            list: ['portrait', 'landscape', 'square'],
          },
        },
        {
          name: 'dimensions',
          title: 'Dimensions',
          type: 'object',
          fields: [
            { name: 'width', type: 'number', title: 'Width (px)' },
            { name: 'height', type: 'number', title: 'Height (px)' },
          ],
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color code',
        },
        {
          name: 'template',
          title: 'Template Image',
          type: 'image',
          description: 'Base template design',
        },
      ],
    }),
    defineField({
      name: 'copyVariants',
      title: 'Copy Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Variant Label', type: 'string' },
            { name: 'headline', title: 'Headline', type: 'string' },
            { name: 'body', title: 'Body Text', type: 'text' },
            { name: 'cta', title: 'Call to Action', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'sharePolicy',
      title: 'Share Policy',
      type: 'object',
      fields: [
        {
          name: 'allowDownload',
          title: 'Allow Download',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'allowSharing',
          title: 'Allow Social Sharing',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'platforms',
          title: 'Enabled Platforms',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: ['twitter', 'facebook', 'instagram', 'discord', 'email'],
          },
        },
        {
          name: 'watermark',
          title: 'Apply Watermark',
          type: 'boolean',
        },
      ],
    }),
    defineField({
      name: 'proofMode',
      title: 'Proof/Verification Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Role-Based', value: 'role' },
          { title: 'Rotating Code', value: 'rotating_code' },
          { title: 'Steward Approval', value: 'steward' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata Template',
      type: 'object',
      fields: [
        { name: 'includeLocation', title: 'Include Location', type: 'boolean' },
        { name: 'includeTimestamp', title: 'Include Timestamp', type: 'boolean' },
        { name: 'includeAttribution', title: 'Include Attribution', type: 'boolean' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      media: 'layout.template',
    },
    prepare(selection) {
      const { title, type, media } = selection
      return {
        title,
        subtitle: type,
        media,
      }
    },
  },
})
