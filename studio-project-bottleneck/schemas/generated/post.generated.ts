import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/post.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema post

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description: "Post headline",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { source: 'title', maxLength: 200 },
    description: "URL-safe identifier generated from title (max 200 chars)",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'excerpt',
    title: 'Excerpt',
    type: 'text',
    description: "Short summary of the post (3 rows)",
  }),
  defineField({
    name: 'body',
    title: 'Body',
    type: 'array',
    of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    description: "Rich-text body with inline images; stored as Portable Text",
  }),
  defineField({
    name: 'featuredImage',
    title: 'Featured Image',
    type: 'image',
    description: "Hero image for the post",
  }),
  defineField({
    name: 'author',
    title: 'Author',
    type: 'reference',
    to: [{ type: 'author' }],
    description: "Reference to the post author",
  }),
  defineField({
    name: 'publishedAt',
    title: 'Published At',
    type: 'datetime',
    description: "ISO-8601 publication timestamp",
  }),
  defineField({
    name: 'tags',
    title: 'Tags',
    type: 'array',
    of: [{ type: 'string' }],
    description: "Categorisation tags",
    options: { list: [{ title: 'Culture', value: 'culture' }, { title: 'History', value: 'history' }, { title: 'Community', value: 'community' }, { title: 'Impact', value: 'impact' }, { title: 'Event', value: 'event' }] },
  }),
  ],
})
