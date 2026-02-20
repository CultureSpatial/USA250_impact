-- ============================================================
-- CCM Narratives Schema — Cultural Current Mesh
-- Migration: 001_create_narratives_schema.sql
-- Requires: PostGIS extension, pgvector extension
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE narrative_layer_type AS ENUM (
  'historical',
  'community_memory',
  'sensory_atmosphere'
);

CREATE TYPE narrative_status AS ENUM (
  'draft',
  'pending_review',
  'active',
  'suspended',
  'archived'
);

CREATE TYPE governance_event_type AS ENUM (
  'tier1_veto',
  'tier2_recertification',
  'tier3_enhancement',
  'cfi_update',
  'ssi_update',
  'steward_assigned',
  'steward_removed'
);

CREATE TYPE contribution_type AS ENUM (
  'oral_history',
  'photo',
  'correction',
  'contextual_note',
  'community_endorsement'
);

-- ============================================================
-- SITES TABLE — Geographic anchor points
-- ============================================================

CREATE TABLE sites (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id         TEXT UNIQUE NOT NULL,          -- human-readable slug e.g. 'green-mill-tavern'
  name            TEXT NOT NULL,
  era_start       INTEGER,                        -- e.g. 1920
  era_end         INTEGER,                        -- e.g. 1933
  address         TEXT,
  coordinates     GEOGRAPHY(Point, 4326) NOT NULL,-- WGS84
  trail_stop      INTEGER,                        -- 1-7 for Chicago Prohibition Trail
  trail_id        TEXT,                           -- e.g. 'chicago-prohibition-trail'
  sovereignty_level INTEGER NOT NULL DEFAULT 0 CHECK (sovereignty_level BETWEEN 0 AND 3),
  cfi_score       NUMERIC(4,3) CHECK (cfi_score BETWEEN 0 AND 1),
  ssi_score       NUMERIC(4,3) CHECK (ssi_score BETWEEN 0 AND 1),
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX sites_coordinates_idx ON sites USING GIST (coordinates);
CREATE INDEX sites_trail_idx ON sites (trail_id, trail_stop);
CREATE INDEX sites_sovereignty_idx ON sites (sovereignty_level);

-- ============================================================
-- NARRATIVES TABLE — Content units per site
-- ============================================================

CREATE TABLE narratives (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id         TEXT NOT NULL REFERENCES sites(site_id) ON DELETE CASCADE,
  layer_type      narrative_layer_type NOT NULL,
  status          narrative_status NOT NULL DEFAULT 'draft',
  title           TEXT,
  script_text     TEXT,
  audio_url       TEXT,                           -- Supabase Storage URL
  sanity_doc_id   TEXT,                           -- Sanity CMS document ID
  duration_seconds INTEGER,
  cfi_score       NUMERIC(4,3) CHECK (cfi_score BETWEEN 0 AND 1),
  steward_approved BOOLEAN NOT NULL DEFAULT false,
  steward_id      UUID,                           -- Descope user ID of approving steward
  version         INTEGER NOT NULL DEFAULT 1,     -- palimpsest version
  embedding       vector(1536),                   -- pgvector for Phase 2 semantic search
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (site_id, layer_type, version)
);

CREATE INDEX narratives_site_layer_idx ON narratives (site_id, layer_type);
CREATE INDEX narratives_status_idx ON narratives (status);
CREATE INDEX narratives_embedding_idx ON narratives
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- ============================================================
-- SOVEREIGNTY_RULES TABLE — IGNIS-ADAPT governance hooks
-- ============================================================

CREATE TABLE sovereignty_rules (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id         TEXT NOT NULL REFERENCES sites(site_id) ON DELETE CASCADE,
  rule_type       TEXT NOT NULL,                  -- 'cfi_gate' | 'ssi_gate' | 'layer_access' | 'ecp_distribution'
  rule_config     JSONB NOT NULL,                 -- rule parameters
  active          BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Default ECP distribution rule
CREATE OR REPLACE FUNCTION insert_default_ecp_rule()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO sovereignty_rules (site_id, rule_type, rule_config)
  VALUES (
    NEW.site_id,
    'ecp_distribution',
    '{"creators": 0.70, "community": 0.20, "platform": 0.10}'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_ecp_rule
  AFTER INSERT ON sites
  FOR EACH ROW
  EXECUTE FUNCTION insert_default_ecp_rule();

-- ============================================================
-- GOVERNANCE_EVENTS TABLE — Audit log
-- ============================================================

CREATE TABLE governance_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id         TEXT REFERENCES sites(site_id),
  narrative_id    UUID REFERENCES narratives(id),
  event_type      governance_event_type NOT NULL,
  actor_id        UUID,                           -- Descope steward user ID
  cfi_score       NUMERIC(4,3),
  ssi_score       NUMERIC(4,3),
  payload         JSONB DEFAULT '{}',
  triggered_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX governance_events_site_idx ON governance_events (site_id);
CREATE INDEX governance_events_type_idx ON governance_events (event_type);

-- ============================================================
-- CONTRIBUTION_QUEUE TABLE — Tend loop inputs
-- ============================================================

CREATE TABLE contribution_queue (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id         TEXT NOT NULL REFERENCES sites(site_id),
  steward_id      UUID,
  contribution_type contribution_type NOT NULL,
  payload_url     TEXT,
  cfi_estimate    NUMERIC(4,3),
  review_notes    TEXT,
  status          TEXT NOT NULL DEFAULT 'pending_review'
                  CHECK (status IN ('pending_review', 'approved', 'rejected', 'archived')),
  reviewed_by     UUID,
  reviewed_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- SHARE_EVENTS TABLE — Transmit loop tracking
-- ============================================================

CREATE TABLE share_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id         TEXT NOT NULL REFERENCES sites(site_id),
  channel         TEXT NOT NULL CHECK (channel IN ('link', 'qr', 'nfc', 'social')),
  share_url       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PROXIMITY QUERIES — Helper functions
-- ============================================================

-- Get sites within radius (meters) of a point
CREATE OR REPLACE FUNCTION sites_within_radius(
  lat FLOAT,
  lng FLOAT,
  radius_meters FLOAT DEFAULT 500
)
RETURNS TABLE (
  site_id TEXT,
  name TEXT,
  distance_meters FLOAT,
  trail_stop INTEGER,
  sovereignty_level INTEGER,
  cfi_score NUMERIC
) AS $$
SELECT
  s.site_id,
  s.name,
  ST_Distance(s.coordinates, ST_MakePoint(lng, lat)::geography) AS distance_meters,
  s.trail_stop,
  s.sovereignty_level,
  s.cfi_score
FROM sites s
WHERE ST_DWithin(
  s.coordinates,
  ST_MakePoint(lng, lat)::geography,
  radius_meters
)
ORDER BY distance_meters ASC;
$$ LANGUAGE sql STABLE;

-- Determine proximity zone (0-3) for a user's location relative to a site
CREATE OR REPLACE FUNCTION get_proximity_zone(
  user_lat FLOAT,
  user_lng FLOAT,
  site_site_id TEXT
)
RETURNS INTEGER AS $$
DECLARE
  dist_meters FLOAT;
BEGIN
  SELECT ST_Distance(
    coordinates,
    ST_MakePoint(user_lng, user_lat)::geography
  ) INTO dist_meters
  FROM sites WHERE site_id = site_site_id;

  RETURN CASE
    WHEN dist_meters < 10    THEN 3   -- Immersion
    WHEN dist_meters < 100   THEN 2   -- Threshold
    WHEN dist_meters < 500   THEN 1   -- Approach
    ELSE                          0   -- Ambient
  END;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================
-- ROW LEVEL SECURITY (IGNIS-ADAPT enforcement)
-- ============================================================

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE narratives ENABLE ROW LEVEL SECURITY;
ALTER TABLE sovereignty_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE governance_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution_queue ENABLE ROW LEVEL SECURITY;

-- Public read of active sites (Level 0+)
CREATE POLICY "public_read_active_sites" ON sites
  FOR SELECT USING (true);

-- Narratives: public read of active + steward-approved records
CREATE POLICY "public_read_active_narratives" ON narratives
  FOR SELECT USING (
    status = 'active' AND steward_approved = true
  );

-- Governance: IGNIS-ADAPT Tier 1 — only activate narratives with CFI >= 0.50
CREATE POLICY "cfi_activation_gate" ON narratives
  FOR UPDATE USING (cfi_score >= 0.50);

-- Contribution queue: authenticated stewards only
CREATE POLICY "steward_contribution_insert" ON contribution_queue
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Governance events: insert by authenticated actors only
CREATE POLICY "governance_insert_authenticated" ON governance_events
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Governance events: read by stewards only
CREATE POLICY "governance_read_stewards" ON governance_events
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- ============================================================
-- UPDATED_AT triggers
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sites_updated_at BEFORE UPDATE ON sites
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER narratives_updated_at BEFORE UPDATE ON narratives
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
