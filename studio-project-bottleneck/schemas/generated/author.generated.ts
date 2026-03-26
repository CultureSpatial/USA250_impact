import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/author.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema author

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
  defineField({
    name: 'name',
    title: 'Name',
    type: 'string',
    description: "Author full name",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { source: 'name', maxLength: 200 },
    description: "URL-safe author identifier",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'bio',
    title: 'Bio',
    type: 'array',
    of: [{ type: 'block' }],
    description: "Short biography (Portable Text)",
  }),
  defineField({
    name: 'profileImage',
    title: 'Profile Image',
    type: 'image',
    description: "Author headshot",
  }),
  defineField({
    name: 'email',
    title: 'Email',
    type: 'string',
    description: "Contact email address",
    validation: (Rule) => Rule.email(),
  }),
  defineField({
    name: 'website',
    title: 'Website',
    type: 'url',
    description: "Author personal website",
  }),
  defineField({
    name: 'social',
    title: 'Social',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Social media handles",
  }),
  ],
})
