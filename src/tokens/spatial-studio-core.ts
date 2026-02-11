// Spatial Studio Core Tokens (Layer 1: Stable)

export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  slate: string;
  warmSand?: string;
}

export interface BackgroundTokens {
  from: string;
  via: string;
  to: string;
}

export interface QualityChecks {
  gradientTested: boolean;
  textureOptimized: boolean;
  contrastPasses: boolean;
  iconImported: boolean;
  contentComponent: boolean;
}

export interface TokenSet {
  name: string;
  colors: ColorTokens;
  background: BackgroundTokens;
  qualityChecks: QualityChecks;
}

// Spatial Studio Core (Emerald brand, professional layout)
export const spatialStudioCore: TokenSet = {
  name: "Spatial Studio Core",
  colors: {
    primary: '#10B981',     // emerald-600
    secondary: '#312E81',   // indigo-900
    accent: '#0F172A',      // slate-900
    dark: '#0F172A',
    slate: '#475569',
    warmSand: '#F8FAFC'
  },
  background: {
    from: '#F8FAFC',
    via: '#F1F5F9',
    to: '#E2E8F0'
  },
  qualityChecks: {
    gradientTested: true,
    textureOptimized: true,
    contrastPasses: true,
    iconImported: true,
    contentComponent: true
  }
};

// Original Spatial Studio (for reference/migration)
export const spatialStudioOriginal: TokenSet = {
  name: "Spatial Studio Original",
  colors: {
    primary: '#1E3A5F',
    secondary: '#0D9488',
    accent: '#D97706',
    dark: '#0F172A',
    slate: '#475569',
    warmSand: '#F5F0E8'
  },
  background: {
    from: '#F5F0E8',
    via: '#FAFAF9',
    to: '#FFFFFF'
  },
  qualityChecks: {
    gradientTested: true,
    textureOptimized: true,
    contrastPasses: true,
    iconImported: true,
    contentComponent: true
  }
};

// Typography tokens
export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'Monaco, Consolas, "Courier New", monospace'
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem'  // 36px
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
};

// Spacing tokens
export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem'      // 96px
};

// Border radius tokens
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
};

// Shadow tokens
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
};

// Layout tokens
export const layout = {
  sidebar: {
    width: '24rem',    // w-96 (384px)
    minWidth: '18rem', // min-w-72 (288px)
    maxWidth: '28rem'  // max-w-112 (448px)
  },
  canvas: {
    minWidth: '0',
    flex: '1'
  },
  container: {
    maxWidth: '80rem'  // max-w-7xl (1280px)
  }
};
