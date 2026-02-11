import { defineType } from 'sanity'

export default defineType({
  name: 'narrativeLayer',
  title: 'Narrative Layer',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Narrative Type',
      type: 'string',
      options: {
        list: [
          { title: 'TEK (Traditional Ecological Knowledge)', value: 'tek' },
          { title: 'Historical', value: 'historical' },
          { title: 'Contemporary', value: 'contemporary' },
          { title: 'Stewardship', value: 'stewardship' },
          { title: 'Sound Clash', value: 'sound_clash' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Layer Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'assetType',
              title: 'Asset Type',
              type: 'string',
              options: {
                list: ['audio', 'video', 'image', 'text', 'interactive'],
              },
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
            },
            {
              name: 'transcript',
              title: 'Transcript/Alt Text',
              type: 'text',
            },
            {
              name: 'duration',
              title: 'Duration (seconds)',
              type: 'number',
              hidden: ({ parent }) =>
                !['audio', 'video'].includes(parent?.assetType),
            },
          ],
        },
      ],
    },
    {
      name: 'attribution',
      title: 'Attribution',
      type: 'object',
      fields: [
        {
          name: 'contributors',
          title: 'Contributors',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'role', title: 'Role', type: 'string' },
                { name: 'affiliation', title: 'Affiliation', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'license',
          title: 'License',
          type: 'string',
          options: {
            list: [
              'CC BY',
              'CC BY-SA',
              'CC BY-ND',
              'CC BY-NC',
              'All Rights Reserved',
              'Custom',
            ],
          },
        },
        {
          name: 'acknowledgments',
          title: 'Acknowledgments',
          type: 'text',
        },
      ],
    },
    {
      name: 'visibilityPolicy',
      title: 'Visibility Policy',
      type: 'string',
      options: {
        list: [
          { title: 'Express (Always Show)', value: 'express' },
          { title: 'Show on Request', value: 'show' },
          { title: 'Steward Only', value: 'steward' },
        ],
      },
      initialValue: 'show',
    },
    {
      name: 'culturalSensitivity',
      title: 'Cultural Sensitivity Notes',
      type: 'text',
      description: 'Special handling or context requirements',
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare(selection) {
      const { title, type } = selection
      return {
        title: title,
        subtitle: type?.toUpperCase(),
      }
    },
  },
})
