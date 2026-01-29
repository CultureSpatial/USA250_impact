-- Wine Micro-Experience Schema
-- Supports: Wine Story Cards, Engagement Events, Sessions
-- Maps to V&V Evaluation Framework

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- WINE STORIES TABLE (Primitive Layer)
-- ============================================

CREATE TABLE wine_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wine_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  varietal TEXT NOT NULL,
  vintage INTEGER NOT NULL,

  -- Origin (JSONB for flexibility)
  origin JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Expected: { region, subregion?, country, coordinates?: { lat, lng } }

  -- Maker Voice (Oral-Kinetic pairing)
  maker_voice JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Expected: { name, role, perspective, quote, audio_url? }

  -- Pairing Notes
  pairing_notes JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Expected: { food: [], occasion: [], mood: [] }

  -- Cultural Attribution (Safety Gate)
  attribution JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Expected: { indigenous_territory?, labor_acknowledgment?, cultural_notes?, fpic_status }

  -- Engagement Metrics
  engagement JSONB NOT NULL DEFAULT '{"views": 0, "saves": 0, "shares": 0, "depth_score": 0}'::jsonb,

  -- Crown Status (unlock system)
  crown_status TEXT NOT NULL DEFAULT 'OPEN' CHECK (crown_status IN ('OPEN', 'LOCKED', 'PREMIUM')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_wine_stories_varietal ON wine_stories(varietal);
CREATE INDEX idx_wine_stories_region ON wine_stories((origin->>'region'));
CREATE INDEX idx_wine_stories_crown_status ON wine_stories(crown_status);

-- ============================================
-- ENGAGEMENT EVENTS TABLE (Governance Metric)
-- ============================================

CREATE TABLE engagement_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  session_id TEXT NOT NULL,
  persona TEXT NOT NULL CHECK (persona IN ('trader', 'new_buyer')),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Event properties (flexible)
  properties JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Depth signals for scoring
  depth_signals JSONB NOT NULL DEFAULT '{}'::jsonb
  -- Expected: { time_on_card_ms?, scroll_depth?, interactions_count?, audio_completion_pct? }
);

-- Indexes for analytics
CREATE INDEX idx_engagement_events_session ON engagement_events(session_id);
CREATE INDEX idx_engagement_events_type ON engagement_events(event_type);
CREATE INDEX idx_engagement_events_timestamp ON engagement_events(timestamp);
CREATE INDEX idx_engagement_events_persona ON engagement_events(persona);

-- ============================================
-- SESSIONS TABLE
-- ============================================

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  persona TEXT NOT NULL CHECK (persona IN ('trader', 'new_buyer')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,

  -- Computed depth score
  depth_score JSONB
  -- Expected: { components: { regions_explored, time_engaged, interactions, depth_per_card }, total_score }
);

CREATE INDEX idx_sessions_session_id ON sessions(session_id);

-- ============================================
-- SAVED CARDS TABLE (User Journey)
-- ============================================

CREATE TABLE saved_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  wine_id TEXT NOT NULL REFERENCES wine_stories(wine_id),
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(session_id, wine_id)
);

CREATE INDEX idx_saved_cards_session ON saved_cards(session_id);

-- ============================================
-- CULTURAL SAFETY CHECKS (Audit Log)
-- ============================================

CREATE TABLE cultural_safety_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wine_id TEXT NOT NULL,
  check_type TEXT NOT NULL,
  flags JSONB NOT NULL DEFAULT '{}'::jsonb,
  passed BOOLEAN NOT NULL,
  blocked_reason TEXT,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cultural_safety_wine ON cultural_safety_checks(wine_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wine_stories_updated_at
  BEFORE UPDATE ON wine_stories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA (BC Wine Region Examples)
-- ============================================

INSERT INTO wine_stories (wine_id, name, varietal, vintage, origin, maker_voice, pairing_notes, attribution, crown_status)
VALUES
  (
    'bc-okanagan-pinot-2022',
    'Okanagan Valley Pinot Noir Reserve',
    'Pinot Noir',
    2022,
    '{
      "region": "Okanagan Valley",
      "subregion": "Naramata Bench",
      "country": "Canada",
      "coordinates": { "lat": 49.5935, "lng": -119.6027 }
    }'::jsonb,
    '{
      "name": "Sandra Oldfield",
      "role": "winemaker",
      "perspective": "incumbent",
      "quote": "Thirty years teaching in this valley, and the vines still surprise me. Climate change isnt coming—its here. We adapt or we disappear."
    }'::jsonb,
    '{
      "food": ["Duck confit", "Wild mushroom risotto", "Aged gruyère"],
      "occasion": ["Intimate dinner", "Anniversary", "Fall harvest"],
      "mood": ["Reflective", "Celebratory", "Romantic"]
    }'::jsonb,
    '{
      "indigenous_territory": "Syilx (Okanagan) Nation",
      "labor_acknowledgment": "Hand-harvested by seasonal workers with living wage commitment",
      "fpic_status": "verified"
    }'::jsonb,
    'OPEN'
  ),
  (
    'bc-similkameen-riesling-2023',
    'Similkameen Organic Riesling',
    'Riesling',
    2023,
    '{
      "region": "Similkameen Valley",
      "subregion": "Cawston",
      "country": "Canada",
      "coordinates": { "lat": 49.1736, "lng": -119.7553 }
    }'::jsonb,
    '{
      "name": "Maya Chen",
      "role": "viticulturist",
      "perspective": "digital_native",
      "quote": "I came to wine through sustainability apps, not family tradition. The data says organic isnt just ethical—its the only future."
    }'::jsonb,
    '{
      "food": ["Sushi", "Thai green curry", "Fresh oysters"],
      "occasion": ["Summer patio", "First date", "Brunch"],
      "mood": ["Playful", "Fresh", "Adventurous"]
    }'::jsonb,
    '{
      "indigenous_territory": "Syilx (Okanagan) Nation / Nlaka''pamux Nation",
      "labor_acknowledgment": "Certified organic operation with worker wellness program",
      "fpic_status": "pending"
    }'::jsonb,
    'OPEN'
  ),
  (
    'bc-fraser-gewurz-2021',
    'Fraser Valley Gewürztraminer',
    'Gewürztraminer',
    2021,
    '{
      "region": "Fraser Valley",
      "subregion": "Abbotsford",
      "country": "Canada",
      "coordinates": { "lat": 49.0504, "lng": -122.3045 }
    }'::jsonb,
    '{
      "name": "James Baptiste",
      "role": "owner",
      "perspective": "incumbent",
      "quote": "My grandmother planted these vines. When I pour this wine, Im pouring her story. Thats not marketing—thats lineage."
    }'::jsonb,
    '{
      "food": ["Spicy Asian cuisine", "Charcuterie", "Soft cheeses"],
      "occasion": ["Family gathering", "Book club", "Casual entertaining"],
      "mood": ["Nostalgic", "Warm", "Welcoming"]
    }'::jsonb,
    '{
      "indigenous_territory": "Stó:lō Nation",
      "cultural_notes": "Third-generation family vineyard with deep community ties",
      "fpic_status": "not_applicable"
    }'::jsonb,
    'OPEN'
  ),
  (
    'bc-vancouver-island-2022',
    'Vancouver Island Ortega',
    'Ortega',
    2022,
    '{
      "region": "Vancouver Island",
      "subregion": "Cowichan Valley",
      "country": "Canada",
      "coordinates": { "lat": 48.7886, "lng": -123.7086 }
    }'::jsonb,
    '{
      "name": "River Thompson",
      "role": "sommelier",
      "perspective": "digital_native",
      "quote": "I discovered BC wine through TikTok, no joke. Now I spend my weekends driving these backroads. The algorithm knew something I didnt."
    }'::jsonb,
    '{
      "food": ["Salmon", "Local shellfish", "Garden salads"],
      "occasion": ["Picnic", "Seafood feast", "Wine club"],
      "mood": ["Curious", "Coastal", "Laid-back"]
    }'::jsonb,
    '{
      "indigenous_territory": "Quw''utsun (Cowichan) Tribes",
      "labor_acknowledgment": "Small-lot production with owner-harvested grapes",
      "fpic_status": "verified"
    }'::jsonb,
    'OPEN'
  ),
  (
    'bc-okanagan-icewine-2021',
    'Okanagan Late Harvest Ice Wine',
    'Vidal',
    2021,
    '{
      "region": "Okanagan Valley",
      "subregion": "Oliver",
      "country": "Canada",
      "coordinates": { "lat": 49.1822, "lng": -119.5516 }
    }'::jsonb,
    '{
      "name": "Dr. Helen Park",
      "role": "winemaker",
      "perspective": "incumbent",
      "quote": "Ice wine is patience made liquid. Harvesting at -8°C at 3am... you either love this madness or you find another profession."
    }'::jsonb,
    '{
      "food": ["Foie gras", "Blue cheese", "Crème brûlée"],
      "occasion": ["Special celebration", "Dessert course", "Gift"],
      "mood": ["Luxurious", "Indulgent", "Memorable"]
    }'::jsonb,
    '{
      "indigenous_territory": "Syilx (Okanagan) Nation",
      "labor_acknowledgment": "Night harvest crew with premium compensation",
      "fpic_status": "verified"
    }'::jsonb,
    'PREMIUM'
  );

-- ============================================
-- ANALYTICS VIEWS
-- ============================================

-- Engagement depth score calculation view
CREATE VIEW engagement_depth_summary AS
SELECT
  e.session_id,
  e.persona,
  COUNT(DISTINCT CASE WHEN e.event_type = 'region_explored' THEN e.properties->>'region' END) as regions_explored,
  SUM(COALESCE((e.depth_signals->>'time_on_card_ms')::int, 0)) as total_time_ms,
  COUNT(*) as total_interactions,
  ROUND(
    (
      COUNT(DISTINCT CASE WHEN e.event_type = 'region_explored' THEN e.properties->>'region' END) * 25 +
      LEAST(SUM(COALESCE((e.depth_signals->>'time_on_card_ms')::int, 0)) / 60000.0 * 25, 25) +
      LEAST(COUNT(*) * 2.5, 25) +
      AVG(COALESCE((e.depth_signals->>'audio_completion_pct')::numeric, 0)) * 0.25
    )::numeric,
    2
  ) as depth_score
FROM engagement_events e
GROUP BY e.session_id, e.persona;

-- Event type distribution view
CREATE VIEW event_type_distribution AS
SELECT
  event_type,
  persona,
  COUNT(*) as event_count,
  DATE_TRUNC('hour', timestamp) as hour
FROM engagement_events
GROUP BY event_type, persona, DATE_TRUNC('hour', timestamp);
