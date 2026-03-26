import { defineType, defineField } from 'sanity'

// Auto-generated from linkml/cipOverlay.yaml — DO NOT EDIT MANUALLY
// Re-generate with: node scripts/linkml-to-sanity.js --schema cipOverlay

export default defineType({
  name: 'cipOverlay',
  title: 'Cip Overlay',
  type: 'document',
  fields: [
  defineField({
    name: 'name',
    title: 'Name',
    type: 'string',
    description: "Human-readable overlay name",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'version',
    title: 'Version',
    type: 'string',
    description: "Semantic version (e.g. 1.0.0)",
    validation: (Rule) => Rule.required().regex(/^\d+\.\d+\.\d+$/, 'Must be semver format'),
  }),
  defineField({
    name: 'attachmentPoints',
    title: 'Attachment Points',
    type: 'array',
    of: [{ type: 'object' }],
    description: "Journey phases where this overlay activates",
  }),
  defineField({
    name: 'couplingMode',
    title: 'Coupling Mode',
    type: 'string',
    description: "Whether overlay engagement is optional or mandatory",
    validation: (Rule) => Rule.required(),
    options: { list: [{ title: 'Soft', value: 'soft' }, { title: 'Hard', value: 'hard' }, { title: 'Steward', value: 'steward' }] },
  }),
  defineField({
    name: 'toggles',
    title: 'Toggles',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "12-direction governance configuration flags",
  }),
  defineField({
    name: 'restorativeHuddleScript',
    title: 'Restorative Huddle Script',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Structured dialogue script for restorative huddles",
  }),
  defineField({
    name: 'governanceHooks',
    title: 'Governance Hooks',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Three-layer hook configuration (surface / deep / benthic)",
  }),
  defineField({
    name: 'evidencePolicy',
    title: 'Evidence Policy',
    type: 'object',
    fields: [], // expand inline object fields here
    description: "Rules for evidence capture and retention",
  }),
  ],
})
