/**
 * USA250 Impact Component Library
 *
 * A comprehensive component library for USA250 Story Trails GTM interfaces.
 * Includes spatial intelligence dashboards, guild management, and integration patterns.
 *
 * @module components
 */

// GTM Components
export { default as GTMAcceleratorDashboard } from './gtm/GTMAcceleratorDashboard';

// Guild Components
export { default as GuildAcademyCharter } from './guild/GuildAcademyCharter';

// Re-export types for consumers
export type GTMPhase = 'pilot' | 'scale' | 'global';
export type GTMSegment = 'synergy' | 'propensity' | 'activation';

export interface MarketNode {
  id: number;
  territory: string;
  gtmScore: number;
  status: 'Active' | 'Pipeline' | 'Planning';
  growth: string;
}

export interface GuildMember {
  id: string;
  name: string;
  role: string;
  guild: string;
  credentials: string[];
}

/**
 * Integration Patterns
 *
 * The components in this library support multiple integration patterns:
 *
 * 1. **Standalone Mode**: Each component can be used independently
 * 2. **Composed Dashboard**: Multiple components composed into unified interface
 * 3. **Data-Driven**: Connect to external data sources (APIs, Felt.com, etc.)
 * 4. **Event-Driven**: Components communicate via custom events
 * 5. **Embedded Mode**: Components can be embedded in existing applications
 */
