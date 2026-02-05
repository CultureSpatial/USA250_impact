// GROQ queries for Sanity content

export const BLOG_POSTS_QUERY = `
  *[_type == "blog" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    author -> {
      _id,
      name,
      email,
      bio
    },
    publishedAt,
    image {
      asset -> {
        _id,
        url
      },
      alt
    },
    tags[]
  }
`

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    author -> {
      _id,
      name,
      email,
      bio
    },
    publishedAt,
    image {
      asset -> {
        _id,
        url
      },
      alt
    },
    tags[]
  }
`

export const PRODUCTS_QUERY = `
  *[_type == "product" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    slug,
    price,
    description,
    category,
    image {
      asset -> {
        _id,
        url
      },
      alt
    },
    inStock
  }
`

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    description,
    category,
    specifications,
    image {
      asset -> {
        _id,
        url
      },
      alt
    },
    inStock
  }
`

export const SETTINGS_QUERY = `
  *[_type == "settings"][0] {
    siteName,
    description,
    logo {
      asset -> {
        _id,
        url
      }
    },
    socialLinks,
    contactEmail
  }
`
