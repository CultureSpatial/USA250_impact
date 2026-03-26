import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/product.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema product

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
  defineField({
    name: 'name',
    title: 'Name',
    type: 'string',
    description: "Product display name",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { source: 'name', maxLength: 200 },
    description: "URL-safe product identifier",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'array',
    of: [{ type: 'block' }],
    description: "Product description (Portable Text rich text)",
  }),
  defineField({
    name: 'price',
    title: 'Price',
    type: 'number',
    description: "Price in USD",
  }),
  defineField({
    name: 'category',
    title: 'Category',
    type: 'string',
    description: "Product category",
    options: { list: [{ title: 'Electronics', value: 'electronics' }, { title: 'Fashion', value: 'fashion' }, { title: 'Home Garden', value: 'home_garden' }, { title: 'Sports', value: 'sports' }, { title: 'Books', value: 'books' }] },
  }),
  defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    description: "Product image",
  }),
  defineField({
    name: 'inStock',
    title: 'In Stock',
    type: 'string',
    description: "Current stock status",
    options: { list: [{ title: 'In Stock', value: 'in_stock' }, { title: 'Out Of Stock', value: 'out_of_stock' }, { title: 'Pre Order', value: 'pre_order' }] },
  }),
  defineField({
    name: 'featured',
    title: 'Featured',
    type: 'boolean',
    description: "Whether to feature this product on the homepage",
  }),
  ],
})
