-- Cascadia Wine Cards Schema Extension
-- Adds simplified interaction logging and expands to WA, OR, BC regions
-- Run in Supabase SQL Editor

-- ============================================
-- WINE INTERACTIONS TABLE (Simplified Events)
-- ============================================

CREATE TABLE wine_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  persona TEXT CHECK (persona IN ('trader', 'buyer')),
  event_type TEXT NOT NULL,
  event_payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wine_interactions_session ON wine_interactions(session_id);
CREATE INDEX idx_wine_interactions_event ON wine_interactions(event_type);

-- ============================================
-- WINE CARDS TABLE (Simplified Stories)
-- ============================================

CREATE TABLE wine_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wine_name TEXT NOT NULL,
  region TEXT NOT NULL,
  varietal TEXT NOT NULL,
  maker_voice TEXT,
  cultural_context TEXT,
  attribution JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wine_cards_region ON wine_cards(region);
CREATE INDEX idx_wine_cards_varietal ON wine_cards(varietal);

-- ============================================
-- SEED DATA: Cascadia Wine Cards (WA, OR, BC)
-- ============================================

INSERT INTO wine_cards (wine_name, region, varietal, maker_voice, cultural_context, attribution) VALUES
-- Washington
('Cascade Ridge Riesling', 'Puget Sound, WA', 'Riesling',
 'We farm cool-climate maritime terroir that mirrors the Mosel.',
 'Coast Salish traditional camas prairies shape our rootstock selection.',
 '{"winery": "Cascade Ridge", "cultural_advisor": "TBD"}'::jsonb),

('Columbia Valley Syrah', 'Columbia Valley, WA', 'Syrah',
 'Desert sun and volcanic ash create a Rhône-style intensity unique to the Pacific Northwest.',
 'Wanapum and Yakama peoples have cultivated this land for millennia along the great river.',
 '{"winery": "Columbia Crest", "land_acknowledgment": "Wanapum, Yakama"}'::jsonb),

-- Oregon
('Willamette Reserve Pinot', 'Willamette Valley, OR', 'Pinot Noir',
 'Volcanic soils + rain-shadow microclimate = structured elegance.',
 'Kalapuya fire management historically maintained oak savanna terroir.',
 '{"winery": "Willamette Reserve", "land_acknowledgment": "Kalapuya"}'::jsonb),

('Umpqua Tempranillo', 'Umpqua Valley, OR', 'Tempranillo',
 'Oregon''s warmest valley brings Spanish varietals to unexpected life.',
 'The Cow Creek Band of Umpqua have called these hills home since time immemorial.',
 '{"winery": "Abacela", "land_acknowledgment": "Cow Creek Band of Umpqua"}'::jsonb),

-- British Columbia
('Okanagan Sun Viognier', 'Okanagan Valley, BC', 'Viognier',
 'Desert heat + glacial lakebed soils create aromatic intensity.',
 'Syilx Okanagan Nation stewardship of water rights informs our irrigation.',
 '{"winery": "Okanagan Sun", "cultural_advisor": "Syilx Nation"}'::jsonb),

('Similkameen Organic Merlot', 'Similkameen Valley, BC', 'Merlot',
 'Canada''s only organic wine region proves sustainability and quality go hand in hand.',
 'The Similkameen River corridor has sustained the Syilx and Nlaka''pamux peoples for generations.',
 '{"winery": "Clos du Soleil", "land_acknowledgment": "Syilx, Nlaka''pamux"}'::jsonb);

-- ============================================
-- VIEW: Cascadia Regional Summary
-- ============================================

CREATE VIEW cascadia_wine_summary AS
SELECT
  CASE
    WHEN region LIKE '%WA' THEN 'Washington'
    WHEN region LIKE '%OR' THEN 'Oregon'
    WHEN region LIKE '%BC' THEN 'British Columbia'
    ELSE 'Other'
  END as state_province,
  COUNT(*) as wine_count,
  array_agg(DISTINCT varietal) as varietals
FROM wine_cards
GROUP BY
  CASE
    WHEN region LIKE '%WA' THEN 'Washington'
    WHEN region LIKE '%OR' THEN 'Oregon'
    WHEN region LIKE '%BC' THEN 'British Columbia'
    ELSE 'Other'
  END;
