/**
 * GROQ Queries for Place Packet Content Model
 * Implements the "Runner Contract" from Sanity Content Model v0.1
 */

/**
 * Get fully expanded Place Packet by ID
 * Returns complete configuration with all referenced documents resolved
 */
export const PLACE_PACKET_EXPANDED = `
  *[_type == "placePacket" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    name,
    version,
    routeGraph {
      type,
      "stops": nodes[] {
        sequence,
        required,
        conditions,
        "stop": stop-> {
          _id,
          title,
          locationHint,
          estimatedDuration,
          accessibilityVariants,
          "content": contentRefs[]-> {
            _type,
            _id,
            title,
            excerpt,
            "image": image.asset->url
          }
        }
      }
    },
    layers[] {
      type,
      title,
      description,
      assets[] {
        assetType,
        "url": file.asset->url,
        transcript,
        duration
      },
      attribution,
      visibilityPolicy,
      culturalSensitivity
    },
    rules {
      consentPolicy,
      refusalGate,
      ntaiClass
    },
    "magnetDefault": outputs.magnetDefault-> {
      _id,
      name,
      type,
      layout,
      copyVariants,
      sharePolicy,
      proofMode,
      metadata
    },
    "overlays": overlays[]-> {
      _id,
      name,
      version,
      attachmentPoints,
      couplingMode,
      toggles,
      restorativeHuddleScript,
      governanceHooks,
      evidencePolicy
    },
    changelog[] {
      version,
      date,
      changes,
      author
    }
  }
`

/**
 * List all Place Packets (admin view)
 */
export const PLACE_PACKETS_LIST = `
  *[_type == "placePacket"] | order(_createdAt desc) {
    _id,
    name,
    version,
    _createdAt,
    _updatedAt,
    "stopsCount": count(routeGraph.nodes),
    "layersCount": count(layers),
    "hasOverlays": count(overlays) > 0
  }
`

/**
 * Get single Stop by ID with full details
 */
export const STOP_DETAIL = `
  *[_type == "stop" && _id == $id][0] {
    _id,
    title,
    locationHint,
    estimatedDuration,
    accessibilityVariants[] {
      type,
      description,
      "mediaUrl": media.asset->url
    },
    "content": contentRefs[]-> {
      _type,
      _id,
      title,
      excerpt,
      description,
      "image": image.asset->url,
      "media": select(
        _type == "post" => mainImage.asset->url,
        _type == "product" => image.asset->url,
        file.asset->url
      )
    }
  }
`

/**
 * Get Magnet Template by ID
 */
export const MAGNET_TEMPLATE = `
  *[_type == "magnetTemplate" && _id == $id][0] {
    _id,
    name,
    type,
    layout {
      format,
      dimensions,
      backgroundColor,
      "templateUrl": template.asset->url
    },
    copyVariants,
    sharePolicy,
    proofMode,
    metadata
  }
`

/**
 * Get all active CIP Overlays
 */
export const CIP_OVERLAYS_ACTIVE = `
  *[_type == "cipOverlay"] {
    _id,
    name,
    version,
    couplingMode,
    attachmentPoints[] {
      phase,
      triggerCondition,
      priority,
      required
    },
    toggles
  } | order(attachmentPoints[0].priority asc)
`

/**
 * Get Place Packet summary for preview
 */
export const PLACE_PACKET_SUMMARY = `
  *[_type == "placePacket" && _id == $id][0] {
    _id,
    name,
    version,
    "route": {
      "type": routeGraph.type,
      "stopsCount": count(routeGraph.nodes),
      "stops": routeGraph.nodes[].stop->title
    },
    "narrativeTypes": layers[].type,
    "consentPolicy": rules.consentPolicy,
    "hasOverlays": defined(overlays) && count(overlays) > 0
  }
`

/**
 * Search Place Packets by name
 */
export const SEARCH_PLACE_PACKETS = `
  *[_type == "placePacket" && name match $searchTerm] {
    _id,
    name,
    version,
    "stopsCount": count(routeGraph.nodes)
  } | order(name asc)
`

/**
 * Get Place Packet with specific narrative layer types
 */
export const PLACE_PACKET_BY_NARRATIVE_TYPE = `
  *[_type == "placePacket" && $narrativeType in layers[].type] {
    _id,
    name,
    version,
    "matchingLayers": layers[type == $narrativeType] {
      type,
      title,
      description
    }
  }
`

/**
 * Get all Stops with accessibility variants
 */
export const STOPS_WITH_ACCESSIBILITY = `
  *[_type == "stop" && count(accessibilityVariants) > 0] {
    _id,
    title,
    locationHint,
    "accessibilityTypes": accessibilityVariants[].type
  }
`

/**
 * Validate Place Packet completeness
 */
export const VALIDATE_PLACE_PACKET = `
  *[_type == "placePacket" && _id == $id][0] {
    _id,
    name,
    "valid": {
      "hasName": defined(name),
      "hasVersion": defined(version),
      "hasStops": count(routeGraph.nodes) > 0,
      "allStopsResolved": count(routeGraph.nodes[!defined(stop)]) == 0,
      "hasConsent": defined(rules.consentPolicy),
      "hasMagnet": defined(outputs.magnetDefault)
    }
  }
`
