// Original schemas
import post from './post'
import product from './product'
import author from './author'

// Place Packet system (maps-is-globes)
import placePacket from './placePacket'
import stop from './stop'
import narrativeLayer from './narrativeLayer'
import magnetTemplate from './magnetTemplate'
import cipOverlay from './cipOverlay'

// Phase 0 — B2B2C Corridor Coordination Network (OPS-66 v1.1)
// REGISTRATION ORDER MATTERS: consentRecord + ancestralStitch must come before
// producerProfile because producerProfile references both.
import {consentRecord} from './consentRecord'
import {ancestralStitch} from './ancestralStitch'
import {producerProfile} from './producerProfile'
import {activationProposal} from './activationProposal'

// Corridor infrastructure
import corridorNode from './corridorNode'

// DEPRECATED: corridorActivation.ts — renamed to activationProposal (OPS-66 v1.1)
// syncEvent.ts — deleted (sync is embedded in activationProposal.syncedNodes[])

export const schemaTypes = [
  // Original schemas
  post,
  product,
  author,

  // Place Packet system
  placePacket,
  stop,
  narrativeLayer,
  magnetTemplate,
  cipOverlay,

  // Phase 0 — B2B2C Corridor Coordination Network
  // Order: dependencies before dependents
  consentRecord,      // referenced by producerProfile
  ancestralStitch,    // referenced by producerProfile
  producerProfile,    // references consentRecord + ancestralStitch
  activationProposal, // references producerProfile
  corridorNode,       // standalone geographic container
]
