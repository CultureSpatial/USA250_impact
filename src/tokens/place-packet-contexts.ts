// Place Packet Context Tokens (Layer 2: Adaptive)

import { TokenSet } from './spatial-studio-core';

// Wine Heritage Context (NYWGF Pilot - March 7-14, 2026)
export const wineHeritage: TokenSet = {
  name: "Wine Heritage Context",
  colors: {
    primary: '#9333EA',     // purple-600 (cellar mystery)
    secondary: '#DB2777',   // pink-600 (prohibition rosa)
    accent: '#581C87',      // purple-900 (deep ferment)
    dark: '#0F172A',        // slate-900
    slate: '#831843'        // pink-900
  },
  background: {
    from: '#581C87',        // Deep purple (cellar entrance)
    via: '#831843',         // Wine stain pink
    to: '#0F172A'           // Dark depth
  },
  qualityChecks: {
    gradientTested: false,        // TODO: Test on devices
    textureOptimized: false,      // TODO: Add cellar textures
    contrastPasses: true,         // ✅ Passes WCAG AA
    iconImported: true,           // ✅ Wine glass icon ready
    contentComponent: false       // TODO: Issue #14-#16
  }
};

// Freedom Trails Context (Underground Railroad, heritage routes)
export const freedomTrails: TokenSet = {
  name: "Freedom Trails Context",
  colors: {
    primary: '#1E40AF',     // blue-800 (archival ink)
    secondary: '#B45309',   // amber-700 (aged paper)
    accent: '#1E293B',      // slate-800 (historical depth)
    dark: '#0F172A',
    slate: '#1E3A8A'        // blue-900
  },
  background: {
    from: '#1E293B',        // Historical slate
    via: '#1E3A8A',         // Archive blue
    to: '#0F172A'           // Deep history
  },
  qualityChecks: {
    gradientTested: false,
    textureOptimized: true,       // ✅ Map texture ready
    contrastPasses: true,
    iconImported: true,           // ✅ Map pin icon ready
    contentComponent: false
  }
};

// Sound Clash Context (Carnival, embodied memory, sonic heritage)
export const soundClash: TokenSet = {
  name: "Sound Clash Context",
  colors: {
    primary: '#EA580C',     // orange-500 (vibrant energy)
    secondary: '#DB2777',   // pink-600 (electric)
    accent: '#9333EA',      // purple-600 (sound wave)
    dark: '#F59E0B',        // amber-500
    slate: '#06B6D4'        // cyan-500
  },
  background: {
    from: '#EA580C',        // Orange surge
    via: '#DB2777',         // Pink pulse
    to: '#9333EA'           // Purple wave
  },
  qualityChecks: {
    gradientTested: false,
    textureOptimized: false,
    contrastPasses: false,        // ⚠️ Needs contrast fixes
    iconImported: true,           // ✅ Music note icon ready
    contentComponent: false
  }
};

// Elemental Motifs (for nature-based heritage contexts)

export const earthMotif: TokenSet = {
  name: "Earth Motif",
  colors: {
    primary: '#15803D',     // green-700 (forest)
    secondary: '#92400E',   // amber-800 (soil)
    accent: '#78350F',      // amber-900 (root)
    dark: '#44403C',        // stone-700
    slate: '#A8A29E'        // stone-400
  },
  background: {
    from: '#78350F',
    via: '#92400E',
    to: '#15803D'
  },
  qualityChecks: {
    gradientTested: true,
    textureOptimized: true,
    contrastPasses: true,
    iconImported: true,
    contentComponent: true
  }
};

export const windMotif: TokenSet = {
  name: "Wind Motif",
  colors: {
    primary: '#0EA5E9',     // sky-500
    secondary: '#E0F2FE',   // sky-100
    accent: '#0284C7',      // sky-600
    dark: '#64748B',        // slate-500
    slate: '#CBD5E1'        // slate-300
  },
  background: {
    from: '#F0F9FF',        // sky-50
    via: '#BAE6FD',         // sky-200
    to: '#0EA5E9'           // sky-500
  },
  qualityChecks: {
    gradientTested: false,
    textureOptimized: true,
    contrastPasses: false,        // ⚠️ Light backgrounds need work
    iconImported: true,
    contentComponent: false
  }
};

export const fireMotif: TokenSet = {
  name: "Fire Motif",
  colors: {
    primary: '#DC2626',     // red-600
    secondary: '#F59E0B',   // amber-500
    accent: '#7C2D12',      // amber-900
    dark: '#9A3412',        // orange-800
    slate: '#FED7AA'        // orange-200
  },
  background: {
    from: '#7C2D12',
    via: '#DC2626',
    to: '#F59E0B'
  },
  qualityChecks: {
    gradientTested: true,
    textureOptimized: true,
    contrastPasses: true,
    iconImported: true,
    contentComponent: true
  }
};

// Context registry (for dynamic loading)
export const contextRegistry = {
  wine: wineHeritage,
  trails: freedomTrails,
  sound: soundClash,
  earth: earthMotif,
  wind: windMotif,
  fire: fireMotif
} as const;

export type ContextKey = keyof typeof contextRegistry;

// Helper: Get context by key
export function getContext(key: ContextKey): TokenSet {
  return contextRegistry[key];
}

// Helper: Get all contexts that are production-ready
export function getProductionReadyContexts(): TokenSet[] {
  return Object.values(contextRegistry).filter(context => {
    const checks = context.qualityChecks;
    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.values(checks).length;
    return (passed / total) === 1; // 100% checks passed
  });
}

// Helper: Get contexts that need work (frozen)
export function getFrozenContexts(): TokenSet[] {
  return Object.values(contextRegistry).filter(context => {
    const checks = context.qualityChecks;
    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.values(checks).length;
    return (passed / total) < 1; // Less than 100%
  });
}
