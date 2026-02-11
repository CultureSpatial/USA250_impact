/**
 * USA250 Impact Component Library
 *
 * A comprehensive component library for USA250 Story Trails GTM interfaces.
 * Includes spatial intelligence dashboards, guild management, Vintage & Voice (CEP-23) components,
 * and integration patterns.
 *
 * @module components
 */

// GTM Components
export { default as GTMAcceleratorDashboard } from './gtm/GTMAcceleratorDashboard';

// Guild Components
export { default as GuildAcademyCharter } from './guild/GuildAcademyCharter';

// Narrative Components
export { default as HumancodeWine } from './narrative/HumancodeWine';

// CEP-23 Vintage & Voice Components
export { default as PreSelectionUI } from './vintage-voice/PreSelectionUI';
export { default as OperatorDashboard } from './vintage-voice/OperatorDashboard';
export { default as DigitalTastingTicket } from './vintage-voice/DigitalTastingTicket';

// Re-export types for consumers
export type GTMPhase = 'pilot' | 'scale' | 'global';
export type GTMSegment = 'synergy' | 'propensity' | 'activation';
export type NarrativePhase = 'research' | 'pilot' | 'scale';

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

export interface NarrativeNode {
  id: string;
  title: string;
  era: string;
  location: string;
  crimeContext: string;
  cultureTransformation: string;
  gtmScore: number;
  status: 'Active' | 'Pipeline' | 'Research';
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
