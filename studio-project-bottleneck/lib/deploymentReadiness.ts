import {defineField} from 'sanity'

/**
 * Shared deployment readiness fields for Phase 0 → Phase 1 transition tracking.
 * Added to documents that need explicit readiness gates before going live.
 */
export const deploymentReadinessField = defineField({
  name: 'deploymentReadiness',
  title: 'Deployment Readiness',
  type: 'object',
  description:
    'Phase gate tracking. Operators verify each item before document goes live. isMocked flags MUST be false before Phase 1 launch.',
  fields: [
    {
      name: 'consentVerified',
      title: 'Consent Verified?',
      type: 'boolean',
      initialValue: false,
      description:
        'All producers on this activation have consented to the relevant surfaces. REQUIRED before live.',
    },
    {
      name: 'culturalClearanceVerified',
      title: 'Cultural Clearance Verified?',
      type: 'boolean',
      initialValue: false,
      description:
        'Knowledge holder has cleared any sovereignty-flagged content. REQUIRED before live.',
    },
    {
      name: 'marthaConfirmed',
      title: 'Martha Session Confirmed?',
      type: 'boolean',
      initialValue: false,
      description: 'Required only when requiresMarthaSession = true.',
    },
    {
      name: 'nodeOperatorSignoff',
      title: 'Node Operator Sign-Off',
      type: 'boolean',
      initialValue: false,
      description: 'Primary node coordinator has reviewed and approved.',
    },
    {
      name: 'readinessNotes',
      title: 'Readiness Notes (Internal)',
      type: 'text',
    },
  ],
})

export const failureModesField = defineField({
  name: 'failureModes',
  title: 'Failure Modes (Risk Register)',
  type: 'object',
  description:
    'Known risks and mitigation status. Complete before confirming activation.',
  fields: [
    {
      name: 'consentWithdrawn',
      title: 'Risk: Producer withdraws consent last-minute?',
      type: 'string',
      options: {
        list: [
          {title: 'Not assessed', value: 'not_assessed'},
          {title: 'Low risk — producer confirmed', value: 'low'},
          {title: 'Medium risk — check in 48h before', value: 'medium'},
          {title: 'High risk — contingency plan exists', value: 'high'},
        ],
      },
      initialValue: 'not_assessed',
    },
    {
      name: 'marthaUnavailable',
      title: 'Risk: Martha unavailable on proposed date?',
      type: 'string',
      options: {
        list: [
          {title: 'Not applicable', value: 'na'},
          {title: 'Confirmed available', value: 'confirmed'},
          {title: 'Backup facilitator identified', value: 'backup'},
          {title: 'Date flexible — can shift', value: 'flexible'},
        ],
      },
      initialValue: 'na',
    },
    {
      name: 'sovereigntyEscalation',
      title: 'Risk: Sovereignty flag unresolved at activation time?',
      type: 'string',
      options: {
        list: [
          {title: 'No flags', value: 'none'},
          {title: 'Flags resolved — cleared by knowledge holder', value: 'resolved'},
          {title: 'Flags pending — do not go live', value: 'pending'},
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'mitigationNotes',
      title: 'Mitigation Notes',
      type: 'text',
    },
  ],
})
