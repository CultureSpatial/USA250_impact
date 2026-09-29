-- ==========================================
-- USA250 Story Trails - Prohibition Artifacts Schema
-- Voice-Driven Cartography Database
-- ==========================================

-- Enable PostGIS for spatial/geographic data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- Core Narratives Table
-- ==========================================
CREATE TABLE narratives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL DEFAULT 'NARRATIVE',

  -- Content fields
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  era TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Audio/Voice fields (for voice-driven cartography)
  audio_url TEXT, -- URL to audio narration file in Supabase Storage
  audio_duration_seconds INT, -- Length of audio playback
  voice_artist TEXT, -- Voice actor/narrator name
  audio_transcript TEXT, -- Full transcript for search/accessibility

  -- Geospatial fields (PostGIS)
  location GEOGRAPHY(POINT, 4326) NOT NULL, -- WGS84 coordinates
  proximity_trigger_radius_meters INT DEFAULT 50, -- How close user must be to trigger

  -- Metadata
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Historical Metadata Table
-- (Structured fields pulled from metadata JSONB)
-- ==========================================
CREATE TABLE narrative_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  narrative_id UUID NOT NULL REFERENCES narratives(id) ON DELETE CASCADE,

  -- Historical accuracy
  historical_accuracy TEXT CHECK (historical_accuracy IN ('verified', 'documented', 'oral_history', 'contested')),
  sources TEXT[], -- Array of historical sources

  -- Crown/Status system (from your example)
  crown_status TEXT DEFAULT 'OPEN' CHECK (crown_status IN ('OPEN', 'LOCKED', 'PREMIUM')),

  -- UGC tracking
  contributor_id UUID, -- User who submitted (for UGC)
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),

  -- Engagement metrics
  play_count INT DEFAULT 0,
  favorite_count INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Audio Assets Table
-- (For managing multiple audio versions)
-- ==========================================
CREATE TABLE audio_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  narrative_id UUID NOT NULL REFERENCES narratives(id) ON DELETE CASCADE,

  -- Audio file details
  file_url TEXT NOT NULL,
  file_format TEXT NOT NULL, -- mp3, ogg, wav
  duration_seconds INT NOT NULL,
  file_size_bytes BIGINT,

  -- Version/Language support
  language_code TEXT DEFAULT 'en-US',
  version_label TEXT, -- "original", "remastered", "dramatic_reading"

  -- Voice metadata
  voice_artist TEXT,
  voice_style TEXT, -- "narrative", "first_person", "documentary"

  -- Status
  is_primary BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Indexes for Performance
-- ==========================================

-- Spatial index for proximity queries (CRITICAL for voice-driven cartography)
CREATE INDEX narratives_location_gist ON narratives USING GIST(location);

-- Full-text search on content (for semantic search)
CREATE INDEX narratives_title_search ON narratives USING GIN(to_tsvector('english', title));
CREATE INDEX narratives_body_search ON narratives USING GIN(to_tsvector('english', body));
CREATE INDEX narratives_transcript_search ON narratives USING GIN(to_tsvector('english', audio_transcript));

-- Tag search (for filtering)
CREATE INDEX narratives_tags_gin ON narratives USING GIN(tags);

-- Era filtering
CREATE INDEX narratives_era_idx ON narratives(era);

-- Metadata relationship
CREATE INDEX narrative_metadata_narrative_id ON narrative_metadata(narrative_id);
CREATE INDEX audio_assets_narrative_id ON audio_assets(narrative_id);

-- ==========================================
-- Helper Functions
-- ==========================================

-- Function: Get narratives within radius (meters)
CREATE OR REPLACE FUNCTION get_narratives_within_radius(
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  radius_meters INT DEFAULT 100
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  distance_meters DOUBLE PRECISION,
  audio_url TEXT,
  body TEXT,
  tags TEXT[],
  era TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    n.id,
    n.title,
    ST_Distance(n.location, ST_MakePoint(lon, lat)::geography) AS distance_meters,
    n.audio_url,
    n.body,
    n.tags,
    n.era
  FROM narratives n
  WHERE ST_DWithin(n.location, ST_MakePoint(lon, lat)::geography, radius_meters)
  ORDER BY distance_meters ASC;
END;
$$ LANGUAGE plpgsql;

-- Function: Update timestamp on row update
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at
CREATE TRIGGER narratives_updated_at
BEFORE UPDATE ON narratives
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ==========================================
-- Sample Query Examples (commented out)
-- ==========================================

-- Find stories within 100m of Green Mill:
-- SELECT * FROM get_narratives_within_radius(41.9642, -87.6593, 100);

-- Find all speakeasy stories:
-- SELECT * FROM narratives WHERE 'speakeasy' = ANY(tags);

-- Full-text search for "bootlegger":
-- SELECT title, ts_rank(to_tsvector('english', body), plainto_tsquery('bootlegger')) AS rank
-- FROM narratives
-- WHERE to_tsvector('english', body) @@ plainto_tsquery('bootlegger')
-- ORDER BY rank DESC;
