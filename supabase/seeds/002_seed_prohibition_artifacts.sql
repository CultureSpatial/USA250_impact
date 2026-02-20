-- ============================================================
-- Seed: Chicago Prohibition Resistance Trail Artifacts
-- 10 Sites — 1920-1933 Era
-- Trail: chicago-prohibition-trail (7 active stops + 3 supporting sites)
-- ============================================================

-- ============================================================
-- TRAIL STOP 1: Green Mill Cocktail Lounge (Trailhead)
-- ============================================================
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'green-mill-tavern',
  'Green Mill Cocktail Lounge',
  1907, 1933,
  '4802 N Broadway, Chicago, IL 60640',
  ST_MakePoint(-87.6598, 41.9650)::geography,
  1, 'chicago-prohibition-trail',
  0, 0.72, 0.30,
  '{
    "historical_significance": "Al Capone-connected speakeasy with underground tunnels beneath the stage; jazz venue operated through Prohibition under machine political protection",
    "architectural_status": "operating_business",
    "public_access": true,
    "tunnel_access": false,
    "notable_figures": ["Al Capone", "Jack McGurn"],
    "current_use": "jazz bar — continuously operating since 1907",
    "trailhead_notes": "Primary entry point for trail. Map kiosk placement recommended near Uptown neighborhood signage."
  }'::jsonb
);

INSERT INTO narratives (site_id, layer_type, status, title, script_text, duration_seconds, cfi_score, steward_approved, version)
VALUES
(
  'green-mill-tavern', 'historical', 'draft',
  'The Green Mill: Jazz, Tunnels, and Protected Vice',
  'The Green Mill has been pouring drinks since 1907. By 1928, it had become one of Chicago''s most celebrated speakeasies — protected by the Capone organization through their stake held by Machine Gun Jack McGurn. The tunnels beneath this stage weren''t just for storage. They were escape routes.',
  120, 0.72, false, 1
),
(
  'green-mill-tavern', 'community_memory', 'draft',
  'What the Neighborhood Remembers',
  'Uptown residents have passed down accounts of the Green Mill as a community anchor — not just for vice, but for Black jazz musicians who found relatively integrated audiences here during a period of intense segregation elsewhere in the city.',
  90, 0.68, false, 1
),
(
  'green-mill-tavern', 'sensory_atmosphere', 'draft',
  'Circa 1929 — The Sound of Protected Space',
  'It is 1929. The smell of cigarette smoke and spilled rye. A trumpet somewhere above you. The bar moves faster than the conversation. Outside, the city''s political machine has already decided what happens here tonight.',
  60, 0.72, false, 1
);

-- ============================================================
-- TRAIL STOP 2: St. Valentine's Day Massacre Site
-- ============================================================
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'st-valentines-massacre',
  'St. Valentine''s Day Massacre Site',
  1929, 1929,
  '2122 N Clark St, Chicago, IL 60614',
  ST_MakePoint(-87.6363, 41.9224)::geography,
  2, 'chicago-prohibition-trail',
  0, 0.85, 0.30,
  '{
    "historical_significance": "February 14, 1929: Seven members of the Bugs Moran gang shot by men dressed as police officers; the defining event that turned public opinion against Capone and Prohibition-era gang violence",
    "architectural_status": "demolished_site",
    "current_use": "SMC Cartage Company building was demolished 1967; site is now a parking lot with memorial marker",
    "public_access": true,
    "memorial_marker": true,
    "notable_figures": ["Al Capone", "Bugs Moran", "Frank Gusenberg"],
    "narrative_sensitivity": "moderate — not sacred, but grave site of 7 individuals; community framing required"
  }'::jsonb
);

INSERT INTO narratives (site_id, layer_type, status, title, script_text, duration_seconds, cfi_score, steward_approved, version)
VALUES
(
  'st-valentines-massacre', 'historical', 'draft',
  'February 14, 1929',
  'At 10:30 in the morning, seven men were lined against the north wall of the SMC Cartage Company garage. The men who killed them wore police uniforms. Four days later, a dog named Highball was found howling beside his owner''s body. Al Capone was in Miami. He was never charged.',
  150, 0.85, false, 1
),
(
  'st-valentines-massacre', 'community_memory', 'draft',
  'What the Lincoln Park Neighborhood Carried',
  'The building stood until 1967. Neighbors in Lincoln Park tell of bricks from the demolished wall being sold as souvenirs — and a dog who survived that never recovered. The parking lot that replaced the garage has no sign. Only the memorial marker installed decades later acknowledges what happened here.',
  100, 0.78, false, 1
),
(
  'st-valentines-massacre', 'sensory_atmosphere', 'draft',
  'Clark Street, Winter Morning, 1929',
  'February cold. A garage that smells like motor oil and concrete. The city has not yet named what happened here. The radio will not carry it until evening. For now, it is just a street in Lincoln Park, and the sound of a dog that will not stop.',
  75, 0.82, false, 1
);

-- ============================================================
-- TRAIL STOP 3: Holy Name Cathedral
-- ============================================================
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'holy-name-cathedral',
  'Holy Name Cathedral',
  1926, 1926,
  '735 N State St, Chicago, IL 60654',
  ST_MakePoint(-87.6280, 41.8960)::geography,
  3, 'chicago-prohibition-trail',
  0, 0.80, 0.30,
  '{
    "historical_significance": "Site of the 1926 assassination of Hymie Weiss, leader of the North Side Gang, in the shadow of the cathedral steps; bullet holes visible in the cornerstone for decades",
    "architectural_status": "active_church",
    "public_access": true,
    "current_use": "active Roman Catholic cathedral",
    "notable_figures": ["Hymie Weiss", "Al Capone"],
    "narrative_sensitivity": "high — active place of worship; community and institutional consent required before Layer 2/3 deployment",
    "access_notes": "External approach only for trail; do not enter during services"
  }'::jsonb
);

INSERT INTO narratives (site_id, layer_type, status, title, script_text, duration_seconds, cfi_score, steward_approved, version)
VALUES
(
  'holy-name-cathedral', 'historical', 'draft',
  'The Killing on State Street',
  'On October 11, 1926, Hymie Weiss and his bodyguard were shot on the steps of Holy Name Cathedral. It was afternoon. Parishioners were inside. The shooters fired from a second-floor window across the street. The cornerstone of the cathedral bore bullet holes for years afterward.',
  130, 0.80, false, 1
),
(
  'holy-name-cathedral', 'community_memory', 'draft',
  'The Cathedral''s Own Memory',
  'The Archdiocese of Chicago has long held this history with complexity. Parishioners of the era were part of the same immigrant Catholic communities that also produced many of the Prohibition-era gang members — Irish, Italian, Polish. The cathedral served funerals for men who died in those same streets.',
  110, 0.75, false, 1
),
(
  'holy-name-cathedral', 'sensory_atmosphere', 'draft',
  'State Street, Afternoon, October 1926',
  'Autumn light on stone. The cathedral bells have just rung. A street that carries both the smell of incense from the open doors and the cold exhaust of delivery trucks. The building does not know yet that it will carry bullet marks. It only knows that it has stood here since 1875.',
  65, 0.78, false, 1
);

-- ============================================================
-- TRAIL STOP 4: Schofield's Flower Shop
-- ============================================================
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'schofields-flower-shop',
  'Schofield''s Flower Shop',
  1926, 1926,
  '738 N State St, Chicago, IL 60654',
  ST_MakePoint(-87.6282, 41.8962)::geography,
  4, 'chicago-prohibition-trail',
  0, 0.78, 0.30,
  '{
    "historical_significance": "The shooters in the Weiss assassination used the second floor of this building, directly across from Holy Name Cathedral; a flower shop as operational cover illustrates the mundane infrastructure of Prohibition-era violence",
    "architectural_status": "building_extant_use_changed",
    "public_access": false,
    "current_use": "commercial building, exterior viewable",
    "notable_figures": ["Hymie Weiss", "Al Capone network"],
    "narrative_connection": "paired with holy-name-cathedral — tells the shooter''s side of the same event"
  }'::jsonb
);

INSERT INTO narratives (site_id, layer_type, status, title, script_text, duration_seconds, cfi_score, steward_approved, version)
VALUES
(
  'schofields-flower-shop', 'historical', 'draft',
  'The Flower Shop Window',
  'Across State Street from Holy Name Cathedral stood Schofield''s Flower Shop. On October 11, 1926, gunmen positioned themselves in an upstairs room with a clear line of sight to the cathedral steps. The mechanics of the ambush were ordinary: a rented room, a window, patience. The flower shop continued operating afterward.',
  120, 0.78, false, 1
),
(
  'schofields-flower-shop', 'community_memory', 'draft',
  'Ordinary Buildings, Extraordinary Violence',
  'What stays with historians of this period is how ordinary the infrastructure of Prohibition-era violence was. Flower shops. Garages. Laundries. The violence was not confined to back alleys — it moved through everyday commercial spaces that continued their business before and after.',
  95, 0.74, false, 1
),
(
  'schofields-flower-shop', 'sensory_atmosphere', 'draft',
  'The Second Floor Window',
  'Cut flowers. The smell of refrigerant. A room upstairs with a chair facing a window. Across the street, a cathedral. From here the steps are entirely visible. A man with patience and a rifle and a reason. The city below moves without looking up.',
  60, 0.76, false, 1
);

-- ============================================================
-- TRAIL STOP 5: The Four Deuces (2222 S. Wabash)
-- ============================================================
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'four-deuces',
  'The Four Deuces',
  1920, 1923,
  '2222 S Wabash Ave, Chicago, IL 60616',
  ST_MakePoint(-87.6244, 41.8499)::geography,
  5, 'chicago-prohibition-trail',
  0, 0.82, 0.30,
  '{
    "historical_significance": "Al Capone''s first Chicago headquarters — a four-story building containing a pool room (front), gambling house (second floor), brothel (third), and administrative offices (fourth). Capone worked here as a bouncer under Johnny Torrio before taking over the South Side operation.",
    "architectural_status": "demolished",
    "current_use": "site is a vacant lot/development parcel",
    "notable_figures": ["Al Capone", "Johnny Torrio", "Big Jim Colosimo"],
    "period": "1920-1923",
    "narrative_sensitivity": "low — historical only; no living community connection to this specific site"
  }'::jsonb
);

INSERT INTO narratives (site_id, layer_type, status, title, script_text, duration_seconds, cfi_score, steward_approved, version)
VALUES
(
  'four-deuces', 'historical', 'draft',
  'Capone''s First Office',
  'In 1920, Al Capone arrived in Chicago at the invitation of Johnny Torrio to manage operations at 2222 South Wabash — the Four Deuces. The building''s name came from its address. Its four floors served four functions: pool room at street level, gambling above that, a brothel above that, and on the fourth floor, the offices of the South Side organization. Capone started as a bouncer. Within three years, he was running it.',
  160, 0.82, false, 1
),
(
  'four-deuces', 'community_memory', 'draft',
  'The Near South Side Under Prohibition',
  'The Bronzeville and Near South Side communities surrounding this location during Prohibition navigated a complex relationship with the vice economy. The same operations that generated violence also generated employment and provided community services that government and legitimate business withheld from Black Chicagoans in this era.',
  130, 0.76, false, 1
),
(
  'four-deuces', 'sensory_atmosphere', 'draft',
  'Wabash Avenue, 1921',
  'The elevated train overhead. The sound of billiard balls. A street-level room open to anyone. Above you, floors you don''t go to unless you''re invited. The city outside is dry by law. Inside this building, the law has already negotiated its terms.',
  70, 0.80, false, 1
);

-- ============================================================
-- TRAIL STOP 6: Colosimo's Cafe / The 226 Club
-- ============================================================
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'colosimos-cafe',
  'Colosimo''s Cafe',
  1910, 1920,
  '2126 S Wabash Ave, Chicago, IL 60616',
  ST_MakePoint(-87.6244, 41.8518)::geography,
  6, 'chicago-prohibition-trail',
  0, 0.79, 0.30,
  '{
    "historical_significance": "Big Jim Colosimo''s restaurant — the social center of Italian-American Chicago before Prohibition, and the site of Colosimo''s 1920 assassination (likely ordered by Johnny Torrio) which cleared the way for the Torrio-Capone operation to pivot fully into bootlegging",
    "architectural_status": "building_extant_repurposed",
    "public_access": false,
    "notable_figures": ["Big Jim Colosimo", "Johnny Torrio", "Enrico Caruso"],
    "period": "1910-1920",
    "narrative_significance": "Colosimo represents the pre-Prohibition vice economy transitioning into the Prohibition bootlegging economy; his assassination is the hinge point"
  }'::jsonb
);

INSERT INTO narratives (site_id, layer_type, status, title, script_text, duration_seconds, cfi_score, steward_approved, version)
VALUES
(
  'colosimos-cafe', 'historical', 'draft',
  'Big Jim and the Transition',
  'Colosimo''s Cafe was the finest Italian restaurant in Chicago. Enrico Caruso dined here. So did judges, politicians, and opera singers. Big Jim Colosimo ran a vice empire and a legitimate restaurant with equal hospitality. When Prohibition began in 1920, his lieutenant Johnny Torrio understood the opportunity. Colosimo did not want to bootleg. On May 11, 1920, he was shot in the lobby of his own restaurant. Torrio''s associate Al Capone was seen in the building that afternoon.',
  170, 0.79, false, 1
),
(
  'colosimos-cafe', 'community_memory', 'draft',
  'The Italian-American Near South Side',
  'For the Italian-American community of the Near South Side, Colosimo was a complicated figure — a Black Hand extortion target who built power to resist it, then used that power for exploitation of others. The neighborhood''s memory of this period is layered with the immigrant experience of building networks of mutual protection in a hostile city.',
  120, 0.72, false, 1
),
(
  'colosimos-cafe', 'sensory_atmosphere', 'draft',
  'The Lobby, May 1920',
  'White tablecloths visible through the dining room doors. The smell of garlic and red sauce. A lobby that has received presidents of railroads and of wards. A man who knew everyone is dead on the floor. The cafe will open for dinner tonight. The city will read about it tomorrow.',
  65, 0.77, false, 1
);

-- ============================================================
-- TRAIL STOP 7: Aragon Ballroom / Metro Theatre (Trail End)
-- ============================================================
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'metro-theatre-aragon',
  'Metro Theatre / Aragon Ballroom',
  1926, 1933,
  '4740 N Broadway, Chicago, IL 60640',
  ST_MakePoint(-87.6593, 41.9643)::geography,
  7, 'chicago-prohibition-trail',
  0, 0.75, 0.30,
  '{
    "historical_significance": "The Aragon Ballroom (opened 1926) was the premier dance venue of Prohibition-era Chicago — a space where the cultural productivity of the era (jazz, swing, interracial dancing) existed in parallel with the illegal economy. The Metro opened in its space later. Represents the creative inheritance of Prohibition.",
    "architectural_status": "operating_venue",
    "current_use": "Metro Chicago — active music venue",
    "public_access": true,
    "notable_figures": ["Lawrence Welk (early career)", "Wayne King"],
    "narrative_role": "trail_end — synthesis and reflection",
    "trailend_notes": "Hume.ai sensory atmosphere layer is the primary experience at this stop — jazz reconstruction of 1929 Aragon atmosphere"
  }'::jsonb
);

INSERT INTO narratives (site_id, layer_type, status, title, script_text, duration_seconds, cfi_score, steward_approved, version)
VALUES
(
  'metro-theatre-aragon', 'historical', 'draft',
  'The Aragon: What Prohibition Also Built',
  'The Aragon Ballroom opened in 1926, in the middle of Prohibition. It held 8,000 people. Lawrence Welk got his start here. The illegal economy that funded much of Chicago''s entertainment district in this era also funded something else: the most vibrant jazz and swing culture in American history. What Prohibition suppressed in one register, it accelerated in another.',
  140, 0.75, false, 1
),
(
  'metro-theatre-aragon', 'community_memory', 'draft',
  'What Uptown Carried Forward',
  'Uptown neighborhood residents hold competing memories of this era: the Aragon as a place of joy and dance, and the same streets as a place of gang territory and everyday violence. The Metro that replaced the original Aragon use has itself become a cultural anchor. Community members speak of continuity — different forms, same energy.',
  105, 0.70, false, 1
),
(
  'metro-theatre-aragon', 'sensory_atmosphere', 'draft',
  'The Aragon, 1929 — Trail End Synthesis',
  'A ballroom that holds eight thousand people. The ceiling painted to look like a Spanish sky — stars that don''t move, but give you the feeling of being outdoors. A bandstand. A floor that has held ten years of dancing through a decade the law called dry. Outside, the city that built all of this is still running. It has not stopped for a single night.',
  90, 0.73, false, 1
);

-- ============================================================
-- SUPPORTING SITES (not active trail stops — archival context)
-- ============================================================

-- Lexington Hotel (Capone HQ 1928-1931)
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'lexington-hotel',
  'Lexington Hotel (Capone HQ)',
  1928, 1931,
  '2135 S Michigan Ave, Chicago, IL 60616',
  ST_MakePoint(-87.6237, 41.8521)::geography,
  NULL, 'chicago-prohibition-trail',
  0, 0.80, 0.30,
  '{
    "historical_significance": "Al Capone''s primary headquarters from 1928 to his 1931 tax evasion conviction; 50 rooms occupied; secret passages to neighboring buildings",
    "architectural_status": "demolished",
    "current_use": "parking structure",
    "trail_role": "supporting_context",
    "note": "Not a trail stop — too close to Four Deuces for pacing; available for extended trail variant"
  }'::jsonb
);

-- Chicago Cultural Center (context: civic Prohibition opposition)
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'chicago-cultural-center',
  'Chicago Cultural Center (Public Library, 1920s)',
  1920, 1933,
  '78 E Washington St, Chicago, IL 60602',
  ST_MakePoint(-87.6246, 41.8837)::geography,
  NULL, 'chicago-prohibition-trail',
  0, 0.77, 0.30,
  '{
    "historical_significance": "The Chicago Public Library during Prohibition was a focal point of the temperance movement''s cultural programming; represents the civic, reform-minded counternarrative to the vice economy that dominates most Prohibition history",
    "trail_role": "counter_narrative_context",
    "note": "Inclusion balances the trail''s gang-heavy narrative with the civic reform community that advocated for Prohibition in good faith"
  }'::jsonb
);

-- Pullman District (labor movement intersection)
INSERT INTO sites (
  site_id, name, era_start, era_end, address,
  coordinates, trail_stop, trail_id,
  sovereignty_level, cfi_score, ssi_score, metadata
) VALUES (
  'pullman-porters-bronzeville',
  'Bronzeville / Pullman Porter Community',
  1920, 1933,
  '4700 S Cottage Grove Ave, Chicago, IL 60653',
  ST_MakePoint(-87.6065, 41.8093)::geography,
  NULL, 'chicago-prohibition-trail',
  0, 0.85, 0.30,
  '{
    "historical_significance": "The Bronzeville neighborhood and Pullman Porter community during Prohibition represents the intersection of the Great Migration, jazz culture, labor organizing, and the vice economy — a critical counter-narrative to the Italian-Irish gang narrative that dominates Prohibition history",
    "trail_role": "extended_trail_phase2",
    "note": "Phase 2 trail extension: Bronzeville Prohibition trail as companion to downtown trail; requires dedicated community stewardship with SSI ≥ 0.70 before deployment",
    "narrative_sensitivity": "high — active community; dedicated Boundary & Access Steward required from Bronzeville community"
  }'::jsonb
);
