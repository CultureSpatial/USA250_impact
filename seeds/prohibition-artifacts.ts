/**
 * Chicago Prohibition Resistance Trail — Seed Data (TypeScript)
 * 10 Sites: 7 active trail stops + 3 supporting context sites
 * Era: 1920-1933
 */

export type NarrativeLayerType = "historical" | "community_memory" | "sensory_atmosphere"
export type NarrativeStatus = "draft" | "pending_review" | "active" | "suspended" | "archived"

export interface Coordinates {
  lat: number
  lng: number
}

export interface NarrativeLayer {
  layerType: NarrativeLayerType
  status: NarrativeStatus
  title: string
  scriptText: string
  durationSeconds: number
  cfiScore: number
  stewardApproved: boolean
  version: number
}

export interface ProhibitionArtifact {
  siteId: string
  name: string
  eraStart: number
  eraEnd: number
  address: string
  coordinates: Coordinates
  trailStop: number | null
  trailId: string
  sovereigntyLevel: 0 | 1 | 2 | 3
  cfiScore: number
  ssiScore: number
  metadata: Record<string, unknown>
  narratives: NarrativeLayer[]
}

export const TRAIL_ID = "chicago-prohibition-trail"

export const prohibitionArtifacts: ProhibitionArtifact[] = [
  // ============================================================
  // TRAIL STOP 1: Green Mill Cocktail Lounge (Trailhead)
  // ============================================================
  {
    siteId: "green-mill-tavern",
    name: "Green Mill Cocktail Lounge",
    eraStart: 1907,
    eraEnd: 1933,
    address: "4802 N Broadway, Chicago, IL 60640",
    coordinates: { lat: 41.9650, lng: -87.6598 },
    trailStop: 1,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.72,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "Al Capone-connected speakeasy with underground tunnels beneath the stage; jazz venue operated through Prohibition under machine political protection",
      architecturalStatus: "operating_business",
      publicAccess: true,
      tunnelAccess: false,
      notableFigures: ["Al Capone", "Jack McGurn"],
      currentUse: "jazz bar — continuously operating since 1907",
      trailheadNotes:
        "Primary entry point for trail. Map kiosk placement recommended near Uptown neighborhood signage.",
    },
    narratives: [
      {
        layerType: "historical",
        status: "draft",
        title: "The Green Mill: Jazz, Tunnels, and Protected Vice",
        scriptText:
          "The Green Mill has been pouring drinks since 1907. By 1928, it had become one of Chicago's most celebrated speakeasies — protected by the Capone organization through their stake held by Machine Gun Jack McGurn. The tunnels beneath this stage weren't just for storage. They were escape routes.",
        durationSeconds: 120,
        cfiScore: 0.72,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "community_memory",
        status: "draft",
        title: "What the Neighborhood Remembers",
        scriptText:
          "Uptown residents have passed down accounts of the Green Mill as a community anchor — not just for vice, but for Black jazz musicians who found relatively integrated audiences here during a period of intense segregation elsewhere in the city.",
        durationSeconds: 90,
        cfiScore: 0.68,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "sensory_atmosphere",
        status: "draft",
        title: "Circa 1929 — The Sound of Protected Space",
        scriptText:
          "It is 1929. The smell of cigarette smoke and spilled rye. A trumpet somewhere above you. The bar moves faster than the conversation. Outside, the city's political machine has already decided what happens here tonight.",
        durationSeconds: 60,
        cfiScore: 0.72,
        stewardApproved: false,
        version: 1,
      },
    ],
  },

  // ============================================================
  // TRAIL STOP 2: St. Valentine's Day Massacre Site
  // ============================================================
  {
    siteId: "st-valentines-massacre",
    name: "St. Valentine's Day Massacre Site",
    eraStart: 1929,
    eraEnd: 1929,
    address: "2122 N Clark St, Chicago, IL 60614",
    coordinates: { lat: 41.9224, lng: -87.6363 },
    trailStop: 2,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.85,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "February 14, 1929: Seven members of the Bugs Moran gang shot by men dressed as police officers; the defining event that turned public opinion against Capone and Prohibition-era gang violence",
      architecturalStatus: "demolished_site",
      currentUse: "parking lot with memorial marker",
      publicAccess: true,
      memorialMarker: true,
      notableFigures: ["Al Capone", "Bugs Moran", "Frank Gusenberg"],
      narrativeSensitivity:
        "moderate — not sacred, but grave site of 7 individuals; community framing required",
    },
    narratives: [
      {
        layerType: "historical",
        status: "draft",
        title: "February 14, 1929",
        scriptText:
          "At 10:30 in the morning, seven men were lined against the north wall of the SMC Cartage Company garage. The men who killed them wore police uniforms. Four days later, a dog named Highball was found howling beside his owner's body. Al Capone was in Miami. He was never charged.",
        durationSeconds: 150,
        cfiScore: 0.85,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "community_memory",
        status: "draft",
        title: "What the Lincoln Park Neighborhood Carried",
        scriptText:
          "The building stood until 1967. Neighbors in Lincoln Park tell of bricks from the demolished wall being sold as souvenirs — and a dog who survived that never recovered. The parking lot that replaced the garage has no sign. Only the memorial marker installed decades later acknowledges what happened here.",
        durationSeconds: 100,
        cfiScore: 0.78,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "sensory_atmosphere",
        status: "draft",
        title: "Clark Street, Winter Morning, 1929",
        scriptText:
          "February cold. A garage that smells like motor oil and concrete. The city has not yet named what happened here. The radio will not carry it until evening. For now, it is just a street in Lincoln Park, and the sound of a dog that will not stop.",
        durationSeconds: 75,
        cfiScore: 0.82,
        stewardApproved: false,
        version: 1,
      },
    ],
  },

  // ============================================================
  // TRAIL STOP 3: Holy Name Cathedral
  // ============================================================
  {
    siteId: "holy-name-cathedral",
    name: "Holy Name Cathedral",
    eraStart: 1926,
    eraEnd: 1926,
    address: "735 N State St, Chicago, IL 60654",
    coordinates: { lat: 41.8960, lng: -87.6280 },
    trailStop: 3,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.80,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "Site of the 1926 assassination of Hymie Weiss on the cathedral steps; bullet holes visible in the cornerstone for decades",
      architecturalStatus: "active_church",
      publicAccess: true,
      currentUse: "active Roman Catholic cathedral",
      notableFigures: ["Hymie Weiss", "Al Capone"],
      narrativeSensitivity:
        "high — active place of worship; community and institutional consent required before Layer 2/3 deployment",
      accessNotes: "External approach only for trail; do not enter during services",
    },
    narratives: [
      {
        layerType: "historical",
        status: "draft",
        title: "The Killing on State Street",
        scriptText:
          "On October 11, 1926, Hymie Weiss and his bodyguard were shot on the steps of Holy Name Cathedral. It was afternoon. Parishioners were inside. The shooters fired from a second-floor window across the street. The cornerstone of the cathedral bore bullet holes for years afterward.",
        durationSeconds: 130,
        cfiScore: 0.80,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "community_memory",
        status: "draft",
        title: "The Cathedral's Own Memory",
        scriptText:
          "The Archdiocese of Chicago has long held this history with complexity. Parishioners of the era were part of the same immigrant Catholic communities that also produced many of the Prohibition-era gang members — Irish, Italian, Polish. The cathedral served funerals for men who died in those same streets.",
        durationSeconds: 110,
        cfiScore: 0.75,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "sensory_atmosphere",
        status: "draft",
        title: "State Street, Afternoon, October 1926",
        scriptText:
          "Autumn light on stone. The cathedral bells have just rung. A street that carries both the smell of incense from the open doors and the cold exhaust of delivery trucks. The building does not know yet that it will carry bullet marks. It only knows that it has stood here since 1875.",
        durationSeconds: 65,
        cfiScore: 0.78,
        stewardApproved: false,
        version: 1,
      },
    ],
  },

  // ============================================================
  // TRAIL STOP 4: Schofield's Flower Shop
  // ============================================================
  {
    siteId: "schofields-flower-shop",
    name: "Schofield's Flower Shop",
    eraStart: 1926,
    eraEnd: 1926,
    address: "738 N State St, Chicago, IL 60654",
    coordinates: { lat: 41.8962, lng: -87.6282 },
    trailStop: 4,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.78,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "Shooters in the Weiss assassination used the second floor of this building, directly across from Holy Name Cathedral",
      architecturalStatus: "building_extant_use_changed",
      publicAccess: false,
      currentUse: "commercial building, exterior viewable",
      notableFigures: ["Hymie Weiss", "Al Capone network"],
      narrativeConnection:
        "paired with holy-name-cathedral — tells the shooter's side of the same event",
    },
    narratives: [
      {
        layerType: "historical",
        status: "draft",
        title: "The Flower Shop Window",
        scriptText:
          "Across State Street from Holy Name Cathedral stood Schofield's Flower Shop. On October 11, 1926, gunmen positioned themselves in an upstairs room with a clear line of sight to the cathedral steps. The mechanics of the ambush were ordinary: a rented room, a window, patience.",
        durationSeconds: 120,
        cfiScore: 0.78,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "community_memory",
        status: "draft",
        title: "Ordinary Buildings, Extraordinary Violence",
        scriptText:
          "What stays with historians of this period is how ordinary the infrastructure of Prohibition-era violence was. Flower shops. Garages. Laundries. The violence moved through everyday commercial spaces that continued their business before and after.",
        durationSeconds: 95,
        cfiScore: 0.74,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "sensory_atmosphere",
        status: "draft",
        title: "The Second Floor Window",
        scriptText:
          "Cut flowers. The smell of refrigerant. A room upstairs with a chair facing a window. Across the street, a cathedral. From here the steps are entirely visible. A man with patience and a rifle and a reason. The city below moves without looking up.",
        durationSeconds: 60,
        cfiScore: 0.76,
        stewardApproved: false,
        version: 1,
      },
    ],
  },

  // ============================================================
  // TRAIL STOP 5: The Four Deuces
  // ============================================================
  {
    siteId: "four-deuces",
    name: "The Four Deuces",
    eraStart: 1920,
    eraEnd: 1923,
    address: "2222 S Wabash Ave, Chicago, IL 60616",
    coordinates: { lat: 41.8499, lng: -87.6244 },
    trailStop: 5,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.82,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "Al Capone's first Chicago headquarters; Capone started here as a bouncer under Johnny Torrio",
      architecturalStatus: "demolished",
      currentUse: "vacant lot/development parcel",
      notableFigures: ["Al Capone", "Johnny Torrio", "Big Jim Colosimo"],
      narrativeSensitivity:
        "low — historical only; no living community connection to this specific site",
    },
    narratives: [
      {
        layerType: "historical",
        status: "draft",
        title: "Capone's First Office",
        scriptText:
          "In 1920, Al Capone arrived in Chicago at the invitation of Johnny Torrio to manage operations at 2222 South Wabash — the Four Deuces. Four floors, four functions: pool room at street level, gambling above that, a brothel above that, and on the fourth floor, the offices of the South Side organization. Capone started as a bouncer. Within three years, he was running it.",
        durationSeconds: 160,
        cfiScore: 0.82,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "community_memory",
        status: "draft",
        title: "The Near South Side Under Prohibition",
        scriptText:
          "The Bronzeville and Near South Side communities surrounding this location during Prohibition navigated a complex relationship with the vice economy. The same operations that generated violence also generated employment and provided community services that government and legitimate business withheld from Black Chicagoans in this era.",
        durationSeconds: 130,
        cfiScore: 0.76,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "sensory_atmosphere",
        status: "draft",
        title: "Wabash Avenue, 1921",
        scriptText:
          "The elevated train overhead. The sound of billiard balls. A street-level room open to anyone. Above you, floors you don't go to unless you're invited. The city outside is dry by law. Inside this building, the law has already negotiated its terms.",
        durationSeconds: 70,
        cfiScore: 0.80,
        stewardApproved: false,
        version: 1,
      },
    ],
  },

  // ============================================================
  // TRAIL STOP 6: Colosimo's Cafe
  // ============================================================
  {
    siteId: "colosimos-cafe",
    name: "Colosimo's Cafe",
    eraStart: 1910,
    eraEnd: 1920,
    address: "2126 S Wabash Ave, Chicago, IL 60616",
    coordinates: { lat: 41.8518, lng: -87.6244 },
    trailStop: 6,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.79,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "Big Jim Colosimo's restaurant — social center of Italian-American Chicago before Prohibition; site of Colosimo's 1920 assassination which cleared the way for the Torrio-Capone bootlegging operation",
      architecturalStatus: "building_extant_repurposed",
      publicAccess: false,
      notableFigures: ["Big Jim Colosimo", "Johnny Torrio", "Enrico Caruso"],
      narrativeSignificance:
        "Colosimo represents the pre-Prohibition vice economy transitioning into the Prohibition bootlegging economy; his assassination is the hinge point",
    },
    narratives: [
      {
        layerType: "historical",
        status: "draft",
        title: "Big Jim and the Transition",
        scriptText:
          "Colosimo's Cafe was the finest Italian restaurant in Chicago. Enrico Caruso dined here. So did judges, politicians, and opera singers. Big Jim Colosimo ran a vice empire and a legitimate restaurant with equal hospitality. When Prohibition began in 1920, his lieutenant Johnny Torrio understood the opportunity. Colosimo did not want to bootleg. On May 11, 1920, he was shot in the lobby of his own restaurant.",
        durationSeconds: 170,
        cfiScore: 0.79,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "community_memory",
        status: "draft",
        title: "The Italian-American Near South Side",
        scriptText:
          "For the Italian-American community of the Near South Side, Colosimo was a complicated figure — a Black Hand extortion target who built power to resist it, then used that power for exploitation of others. The neighborhood's memory of this period is layered with the immigrant experience of building mutual protection networks in a hostile city.",
        durationSeconds: 120,
        cfiScore: 0.72,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "sensory_atmosphere",
        status: "draft",
        title: "The Lobby, May 1920",
        scriptText:
          "White tablecloths visible through the dining room doors. The smell of garlic and red sauce. A lobby that has received presidents of railroads and of wards. A man who knew everyone is dead on the floor. The cafe will open for dinner tonight.",
        durationSeconds: 65,
        cfiScore: 0.77,
        stewardApproved: false,
        version: 1,
      },
    ],
  },

  // ============================================================
  // TRAIL STOP 7: Metro Theatre / Aragon Ballroom (Trail End)
  // ============================================================
  {
    siteId: "metro-theatre-aragon",
    name: "Metro Theatre / Aragon Ballroom",
    eraStart: 1926,
    eraEnd: 1933,
    address: "4740 N Broadway, Chicago, IL 60640",
    coordinates: { lat: 41.9643, lng: -87.6593 },
    trailStop: 7,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.75,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "The Aragon Ballroom (opened 1926) was the premier dance venue of Prohibition-era Chicago — a space where the cultural productivity of the era existed in parallel with the illegal economy",
      architecturalStatus: "operating_venue",
      currentUse: "Metro Chicago — active music venue",
      publicAccess: true,
      notableFigures: ["Lawrence Welk (early career)", "Wayne King"],
      narrativeRole: "trail_end — synthesis and reflection",
      trailendNotes:
        "Hume.ai sensory atmosphere layer is the primary experience at this stop — jazz reconstruction of 1929 Aragon atmosphere",
    },
    narratives: [
      {
        layerType: "historical",
        status: "draft",
        title: "The Aragon: What Prohibition Also Built",
        scriptText:
          "The Aragon Ballroom opened in 1926, in the middle of Prohibition. It held 8,000 people. Lawrence Welk got his start here. The illegal economy that funded much of Chicago's entertainment district in this era also funded something else: the most vibrant jazz and swing culture in American history. What Prohibition suppressed in one register, it accelerated in another.",
        durationSeconds: 140,
        cfiScore: 0.75,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "community_memory",
        status: "draft",
        title: "What Uptown Carried Forward",
        scriptText:
          "Uptown neighborhood residents hold competing memories of this era: the Aragon as a place of joy and dance, and the same streets as a place of gang territory and everyday violence. The Metro that replaced the original Aragon use has itself become a cultural anchor. Community members speak of continuity — different forms, same energy.",
        durationSeconds: 105,
        cfiScore: 0.70,
        stewardApproved: false,
        version: 1,
      },
      {
        layerType: "sensory_atmosphere",
        status: "draft",
        title: "The Aragon, 1929 — Trail End Synthesis",
        scriptText:
          "A ballroom that holds eight thousand people. The ceiling painted to look like a Spanish sky — stars that don't move, but give you the feeling of being outdoors. A bandstand. A floor that has held ten years of dancing through a decade the law called dry. Outside, the city that built all of this is still running. It has not stopped for a single night.",
        durationSeconds: 90,
        cfiScore: 0.73,
        stewardApproved: false,
        version: 1,
      },
    ],
  },

  // ============================================================
  // SUPPORTING SITES (not active trail stops)
  // ============================================================
  {
    siteId: "lexington-hotel",
    name: "Lexington Hotel (Capone HQ)",
    eraStart: 1928,
    eraEnd: 1931,
    address: "2135 S Michigan Ave, Chicago, IL 60616",
    coordinates: { lat: 41.8521, lng: -87.6237 },
    trailStop: null,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.80,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "Al Capone's primary headquarters 1928-1931; 50 rooms occupied; secret passages to neighboring buildings",
      architecturalStatus: "demolished",
      currentUse: "parking structure",
      trailRole: "supporting_context",
      note: "Not a trail stop — too close to Four Deuces for pacing; available for extended trail variant",
    },
    narratives: [],
  },
  {
    siteId: "chicago-cultural-center",
    name: "Chicago Cultural Center (Public Library, 1920s)",
    eraStart: 1920,
    eraEnd: 1933,
    address: "78 E Washington St, Chicago, IL 60602",
    coordinates: { lat: 41.8837, lng: -87.6246 },
    trailStop: null,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.77,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "The Chicago Public Library during Prohibition was a focal point of the temperance movement's cultural programming; represents the civic reform counternarrative",
      trailRole: "counter_narrative_context",
      note: "Inclusion balances the trail's gang-heavy narrative with the civic reform community that advocated for Prohibition in good faith",
    },
    narratives: [],
  },
  {
    siteId: "pullman-porters-bronzeville",
    name: "Bronzeville / Pullman Porter Community",
    eraStart: 1920,
    eraEnd: 1933,
    address: "4700 S Cottage Grove Ave, Chicago, IL 60653",
    coordinates: { lat: 41.8093, lng: -87.6065 },
    trailStop: null,
    trailId: TRAIL_ID,
    sovereigntyLevel: 0,
    cfiScore: 0.85,
    ssiScore: 0.30,
    metadata: {
      historicalSignificance:
        "The Bronzeville neighborhood and Pullman Porter community represents the intersection of the Great Migration, jazz culture, labor organizing, and the vice economy — a critical counter-narrative",
      trailRole: "extended_trail_phase2",
      note: "Phase 2 trail extension; requires dedicated community stewardship with SSI ≥ 0.70 before deployment",
      narrativeSensitivity:
        "high — active community; dedicated Boundary & Access Steward required from Bronzeville community",
    },
    narratives: [],
  },
]

/**
 * Convert a ProhibitionArtifact to Supabase insert format for the `sites` table.
 */
export function toSupabaseSiteInsert(artifact: ProhibitionArtifact) {
  return {
    site_id: artifact.siteId,
    name: artifact.name,
    era_start: artifact.eraStart,
    era_end: artifact.eraEnd,
    address: artifact.address,
    // Supabase PostGIS: pass as WKT string for geography column
    coordinates: `POINT(${artifact.coordinates.lng} ${artifact.coordinates.lat})`,
    trail_stop: artifact.trailStop,
    trail_id: artifact.trailId,
    sovereignty_level: artifact.sovereigntyLevel,
    cfi_score: artifact.cfiScore,
    ssi_score: artifact.ssiScore,
    metadata: artifact.metadata,
  }
}

/**
 * Convert NarrativeLayer to Supabase insert format for the `narratives` table.
 */
export function toSupabaseNarrativeInsert(siteId: string, layer: NarrativeLayer) {
  return {
    site_id: siteId,
    layer_type: layer.layerType,
    status: layer.status,
    title: layer.title,
    script_text: layer.scriptText,
    duration_seconds: layer.durationSeconds,
    cfi_score: layer.cfiScore,
    steward_approved: layer.stewardApproved,
    version: layer.version,
  }
}

/** Active trail stops only (trailStop !== null), ordered by stop number */
export const activeTrailStops = prohibitionArtifacts
  .filter((a) => a.trailStop !== null)
  .sort((a, b) => (a.trailStop ?? 0) - (b.trailStop ?? 0))

/** Supporting context sites (not trail stops) */
export const supportingSites = prohibitionArtifacts.filter((a) => a.trailStop === null)
