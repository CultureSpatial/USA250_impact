// Query to fetch all content items (pages and components)
export const ALL_CONTENT_QUERY = `
  *[_type in ["page", "component"]] | order(_updatedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    status,
    publishedAt,
    author->{ name, email },
    tags[],
    seo { title, description, keywords }
  }
`

// Query to fetch pages only
export const PAGES_QUERY = `
  *[_type == "page"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    status,
    publishedAt,
    featured,
    tags[],
    _updatedAt,
    author->{ name }
  }
`

// Query to fetch components only
export const COMPONENTS_QUERY = `
  *[_type == "component"] | order(_updatedAt desc) {
    _id,
    title,
    slug,
    description,
    status,
    publishedAt,
    category,
    tags[],
    _updatedAt,
    author->{ name }
  }
`

// Query single content item by ID
export const CONTENT_BY_ID_QUERY = `
  *[_id == $id][0] {
    _id,
    _type,
    title,
    slug,
    description,
    content,
    status,
    publishedAt,
    author->{ name, email },
    tags[],
    seo { title, description, keywords }
  }
`

// Query to fetch content with filters
export const FILTERED_CONTENT_QUERY = `
  *[_type in ["page", "component"] && status == $status && ($tags in tags)] | order(_updatedAt desc) {
    _id,
    _type,
    title,
    description,
    status,
    tags[],
    _updatedAt
  }
`
