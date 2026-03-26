#!/usr/bin/env node
/**
 * LinkML → Sanity Schema Converter
 *
 * Reads LinkML YAML schema files from /linkml and emits TypeScript
 * Sanity schema definitions into /studio-project-bottleneck/schemas/generated/.
 *
 * Usage:
 *   node scripts/linkml-to-sanity.js [--schema <name>] [--all] [--validate]
 *
 * Options:
 *   --schema <name>   Convert a single schema by file stem (e.g. post, stop)
 *   --all             Convert every .yaml file in /linkml (default)
 *   --validate        Validate YAML structure without generating files
 *   --dry-run         Print generated code without writing files
 *
 * Annotation convention (in LinkML attributes):
 *   annotations:
 *     sanity_type:       string | text | number | boolean | slug | image |
 *                        file | url | datetime | array | object | reference |
 *                        block | document
 *     sanity_name:       override the Sanity field/doc name
 *     sanity_of:         comma-separated items for array.of (e.g. "block,image")
 *     sanity_to:         reference target type (e.g. author)
 *     sanity_source:     slug source field name
 *     sanity_validation: email | url | semver
 */

'use strict'

const fs   = require('fs')
const path = require('path')

// ─── Minimal YAML parser for the subset we use ───────────────────────────────
// We implement a simple line-by-line parser rather than pulling in js-yaml,
// keeping this script dependency-free.

function parseYAML(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  return parseBlock(lines, 0, -1).value
}

function parseBlock(lines, startIdx, parentIndent) {
  let result = {}
  let i = startIdx
  let lastKey = null
  let lastIndent = -1

  while (i < lines.length) {
    const raw = lines[i]
    const trimmed = raw.trimStart()

    // Skip blank lines and comments
    if (trimmed === '' || trimmed.startsWith('#')) { i++; continue }

    const indent = raw.length - trimmed.length

    // Back out if we've returned to the parent level
    if (indent <= parentIndent) break

    // Array item
    if (trimmed.startsWith('- ')) {
      // Convert to list representation
      if (!Array.isArray(result)) result = []
      const itemContent = trimmed.slice(2).trim()
      if (itemContent === '' || itemContent.startsWith('#')) {
        // Block array item
        const sub = parseBlock(lines, i + 1, indent)
        result.push(sub.value)
        i = sub.nextIdx
      } else if (itemContent.includes(': ')) {
        // Inline object item: `- key: value`
        const sub = {}
        const [k, ...rest] = itemContent.split(': ')
        sub[k.trim()] = parseScalar(rest.join(': ').trim())
        // Collect more keys at same indent+2
        let j = i + 1
        while (j < lines.length) {
          const r2 = lines[j]
          const t2 = r2.trimStart()
          if (t2 === '' || t2.startsWith('#')) { j++; continue }
          const ind2 = r2.length - t2.length
          if (ind2 !== indent + 2) break
          const [k2, ...rest2] = t2.split(': ')
          sub[k2.trim()] = parseScalar(rest2.join(': ').trim())
          j++
        }
        result.push(sub)
        i = j
      } else {
        result.push(parseScalar(itemContent))
        i++
      }
      continue
    }

    if (trimmed.includes(': ') || trimmed.endsWith(':')) {
      const colonIdx = trimmed.indexOf(':')
      const key = trimmed.slice(0, colonIdx).trim()
      const rest = trimmed.slice(colonIdx + 1).trim()

      if (rest === '' || rest.startsWith('#')) {
        // Value on next lines
        const sub = parseBlock(lines, i + 1, indent)
        if (typeof result !== 'object' || Array.isArray(result)) result = {}
        result[key] = sub.value
        i = sub.nextIdx
      } else if (rest.startsWith('>-') || rest.startsWith('>') || rest.startsWith('|')) {
        // Folded/literal block scalar — gather continuation lines
        const blockLines = []
        let j = i + 1
        while (j < lines.length) {
          const r2 = lines[j]
          const t2 = r2.trimStart()
          if (t2 === '' ) { blockLines.push(''); j++; continue }
          const ind2 = r2.length - t2.length
          if (ind2 <= indent) break
          blockLines.push(t2)
          j++
        }
        if (typeof result !== 'object' || Array.isArray(result)) result = {}
        result[key] = blockLines.join(' ').trim()
        i = j
      } else {
        if (typeof result !== 'object' || Array.isArray(result)) result = {}
        result[key] = parseScalar(rest)
        lastKey = key
        lastIndent = indent
        i++
      }
      continue
    }

    i++
  }

  return { value: result, nextIdx: i }
}

function parseScalar(s) {
  if (s === 'true')  return true
  if (s === 'false') return false
  if (s === 'null' || s === '~') return null
  if (/^-?\d+$/.test(s)) return parseInt(s, 10)
  if (/^-?\d*\.\d+$/.test(s)) return parseFloat(s)
  // Strip quotes
  if ((s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1)
  }
  return s
}

// ─── Type mapping ─────────────────────────────────────────────────────────────

const LINKML_TO_SANITY = {
  string:   'string',
  uri:      'url',
  integer:  'number',
  float:    'number',
  double:   'number',
  boolean:  'boolean',
  datetime: 'datetime',
  date:     'date',
}

// ─── Converter ────────────────────────────────────────────────────────────────

function getAnnotation(attr, key) {
  if (!attr || !attr.annotations) return undefined
  return attr.annotations[key]
}

function sanityTypeFor(attr) {
  const override = getAnnotation(attr, 'sanity_type')
  if (override) return override
  const rangeType = (attr.range || 'string').toLowerCase()
  return LINKML_TO_SANITY[rangeType] || 'string'
}

function buildValidation(attr) {
  const v = getAnnotation(attr, 'sanity_validation')
  if (!v) return attr.required ? '(Rule) => Rule.required()' : null
  const parts = []
  if (attr.required) parts.push('required()')
  if (v === 'email')  parts.push('email()')
  if (v === 'url')    parts.push('uri()')
  if (v === 'semver') parts.push("regex(/^\\d+\\.\\d+\\.\\d+$/, 'Must be semver format')")
  return parts.length ? `(Rule) => Rule.${parts.join('.')}` : null
}

function buildField(name, attr, enums, indent = '  ') {
  const lines = []
  const sanityType = sanityTypeFor(attr)
  const sanityName = getAnnotation(attr, 'sanity_name') || name
  const arrayOf    = getAnnotation(attr, 'sanity_of')
  const refTo      = getAnnotation(attr, 'sanity_to')
  const slugSrc    = getAnnotation(attr, 'sanity_source')
  const validation = buildValidation(attr)
  const title      = toTitle(name)

  lines.push(`${indent}defineField({`)
  lines.push(`${indent}  name: '${sanityName}',`)
  lines.push(`${indent}  title: '${title}',`)

  if (sanityType === 'slug') {
    lines.push(`${indent}  type: 'slug',`)
    if (slugSrc) {
      lines.push(`${indent}  options: { source: '${slugSrc}', maxLength: 200 },`)
    }
  } else if (sanityType === 'reference') {
    lines.push(`${indent}  type: 'reference',`)
    if (refTo) lines.push(`${indent}  to: [{ type: '${refTo}' }],`)
  } else if (sanityType === 'array') {
    lines.push(`${indent}  type: 'array',`)
    if (arrayOf) {
      const items = arrayOf.split(',').map(t => t.trim())
      const ofItems = items.map(t => {
        if (t === 'block') return "{ type: 'block' }"
        if (t === 'image') return "{ type: 'image', options: { hotspot: true } }"
        if (t === 'string') return "{ type: 'string' }"
        if (t === 'reference' && refTo) return `{ type: 'reference', to: [{ type: '${refTo}' }] }`
        return `{ type: '${t}' }`
      })
      lines.push(`${indent}  of: [${ofItems.join(', ')}],`)
    }
  } else if (sanityType === 'object') {
    lines.push(`${indent}  type: 'object',`)
    // sub-fields would need recursive expansion; emit a placeholder
    lines.push(`${indent}  fields: [], // expand inline object fields here`)
  } else {
    lines.push(`${indent}  type: '${sanityType}',`)
  }

  if (attr.description) {
    lines.push(`${indent}  description: ${JSON.stringify(attr.description)},`)
  }
  if (validation) {
    lines.push(`${indent}  validation: ${validation},`)
  }

  // Enum list options
  if (attr.range && enums && enums[attr.range]) {
    const e = enums[attr.range]
    const list = Object.entries(e.permissible_values || {}).map(([k, v]) => {
      const label = (v && v.description) || (v && v.meaning) || toTitle(k)
      return `{ title: '${label}', value: '${k}' }`
    })
    if (list.length) {
      lines.push(`${indent}  options: { list: [${list.join(', ')}] },`)
    }
  }

  lines.push(`${indent}}),`)
  return lines.join('\n')
}

function toTitle(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim()
}

function classToSanitySchema(name, cls, enums, isDocument) {
  const schemaType = isDocument ? 'document' : 'object'
  const attrs = cls.attributes || {}

  const lines = []
  lines.push(`import { defineType, defineField } from 'sanity'`)
  lines.push('')
  lines.push(`// Auto-generated from linkml/${name}.yaml — DO NOT EDIT MANUALLY`)
  lines.push(`// Re-generate with: node scripts/linkml-to-sanity.js --schema ${name}`)
  lines.push('')
  lines.push(`export default defineType({`)
  lines.push(`  name: '${name}',`)
  lines.push(`  title: '${toTitle(name)}',`)
  lines.push(`  type: '${schemaType}',`)
  lines.push(`  fields: [`)

  for (const [attrName, attr] of Object.entries(attrs)) {
    if (attrName === '_type') continue // internal discriminator
    lines.push(buildField(attrName, attr, enums))
  }

  lines.push(`  ],`)
  lines.push(`})`)
  lines.push('')

  return lines.join('\n')
}

function convertSchema(yamlPath, dryRun, validate) {
  const raw = fs.readFileSync(yamlPath, 'utf8')
  const schema = parseYAML(raw)

  const errors = []
  if (!schema.name) errors.push('Missing required field: name')
  if (!schema.classes) errors.push('Missing required field: classes')

  if (errors.length) {
    console.error(`[ERROR] ${path.basename(yamlPath)}:`)
    errors.forEach(e => console.error(`  • ${e}`))
    return false
  }

  if (validate) {
    console.log(`[OK] ${path.basename(yamlPath)} — valid (${Object.keys(schema.classes || {}).length} classes)`)
    return true
  }

  const enums = schema.enums || {}
  const outDir = path.resolve(__dirname, '../studio-project-bottleneck/schemas/generated')

  if (!dryRun) fs.mkdirSync(outDir, { recursive: true })

  let generated = 0
  for (const [className, cls] of Object.entries(schema.classes || {})) {
    const ann = cls.annotations || {}
    const sanityType = ann.sanity_type || 'object'
    const isDocument = sanityType === 'document'
    const sanityName = ann.sanity_name || className.charAt(0).toLowerCase() + className.slice(1)

    // Only emit root/document classes as top-level schema files.
    // Nested object classes are inlined by the developer.
    if (!isDocument && !cls.tree_root) continue

    const code = classToSanitySchema(sanityName, cls, enums, isDocument)
    const outFile = path.join(outDir, `${sanityName}.generated.ts`)

    if (dryRun) {
      console.log(`\n// ── ${outFile} ────────────────`)
      console.log(code)
    } else {
      fs.writeFileSync(outFile, code, 'utf8')
      console.log(`[WRITE] ${path.relative(process.cwd(), outFile)}`)
    }
    generated++
  }

  if (generated === 0) {
    console.log(`[SKIP] ${path.basename(yamlPath)} — no document-level classes found`)
  }
  return true
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2)
  const dryRun  = args.includes('--dry-run')
  const validate = args.includes('--validate')
  const schemaIdx = args.indexOf('--schema')
  const singleSchema = schemaIdx !== -1 ? args[schemaIdx + 1] : null

  const linkmlDir = path.resolve(__dirname, '../linkml')
  let files = fs.readdirSync(linkmlDir)
    .filter(f => f.endsWith('.yaml') && f !== 'usa250_impact.yaml')
    .map(f => path.join(linkmlDir, f))

  if (singleSchema) {
    files = files.filter(f => path.basename(f, '.yaml') === singleSchema)
    if (!files.length) {
      console.error(`[ERROR] No schema found for: ${singleSchema}`)
      process.exit(1)
    }
  }

  console.log(`LinkML → Sanity converter`)
  console.log(`Mode: ${validate ? 'validate' : dryRun ? 'dry-run' : 'generate'}`)
  console.log(`Schemas: ${files.length}\n`)

  let ok = 0
  let fail = 0
  for (const f of files) {
    if (convertSchema(f, dryRun, validate)) ok++
    else fail++
  }

  console.log(`\nDone — ${ok} ok, ${fail} failed`)
  if (fail > 0) process.exit(1)
}

main()
