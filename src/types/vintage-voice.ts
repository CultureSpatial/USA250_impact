/**
 * CEP-23: Vintage & Voice Type System
 *
 * Defines all TypeScript interfaces for the Vintage & Voice submission package
 * including Wine Tribes, Digital Tasting Tickets, TQ Safety Gate, and more.
 */

// Wine Tribes - User segmentation by flavor preference
export type WineTribe = 'Bold Reds' | 'Crisp Whites' | 'Rosé All Day' | 'Sparkling & Champagne' | 'Natural & Orange' | 'Dessert & Fortified';

// Transition Quotient Status - Age/consent verification gate
export type TQStatus = 'GREEN' | 'YELLOW' | 'RED';

// User identity in Digital Salon model
export interface ProvisionalUser {
  uuid: string;
  createdAt: Date;
  tribeSelection?: WineTribe;
  tqStatus: TransitionQuotientStatus;
  isVIP: boolean;
}

// Transition Quotient Safety Gate specification
export interface TransitionQuotientStatus {
  ageVerified: boolean;        // Must be 19+ for BC
  fpicConsent: boolean;        // Free, Prior, Informed Consent
  storyGemConsent: boolean;    // Permission to capture story
  status: TQStatus;
  verifiedAt?: Date;
}

// Digital Tasting Ticket - QR-based pour authorization
export interface DigitalTastingTicket {
  id: string;
  userId: string;
  tribeSelection: WineTribe;
  vintage: string;
  qrCode: string;
  tqStatus: TransitionQuotientStatus;
  validUntil: Date;
  boothId: string;
  pourAuthorized: boolean;
}

// Vintage selection with metadata
export interface VintageOption {
  id: string;
  name: string;
  year: number;
  tribe: WineTribe;
  description: string;
  abv: number;
  price?: number;
  inStock: boolean;
}

// Operator dashboard real-time metrics
export interface OperatorMetrics {
  totalPours: number;
  poursPerHour: number;
  averagePourTime: number;
  pendingTickets: number;
  tqGreenCount: number;
  tqYellowCount: number;
  tqRedCount: number;
}

// Booth operator interface data
export interface BoothOperator {
  id: string;
  name: string;
  boothId: string;
  winery: string;
  shift: {
    startTime: Date;
    endTime: Date;
  };
}

// Tribal breakdown for analytics
export interface TribeBreakdown {
  tribe: WineTribe;
  count: number;
  percentage: number;
  color: string;
}

// Pre-selection form state
export interface PreSelectionState {
  selectedTribe?: WineTribe;
  selectedVintage?: string;
  qrGenerated: boolean;
  estimatedWaitTime: number;
}

// Dynamic content configuration
export interface DynamicContent {
  activeQuest: string;
  wayfindingTarget: string;
  arWayfindingEnabled: boolean;
  sponsoredSkyCanvas: {
    sponsor: string;
    visualLayer: string;
    rpm: number;
  };
}

// AR Infinite Shelf data for vertical flight display
export interface ARVerticalFlight {
  vintages: VintageOption[];
  currentBottle: VintageOption;
  relatedBottles: VintageOption[];
  dtcEnabled: boolean;
}

// Tribal Heatmap position data
export interface TribePosition {
  userId: string;
  tribe: WineTribe;
  latitude: number;
  longitude: number;
  timestamp: Date;
  boothId?: string;
}

// Real-time analytics for organizer
export interface TribalHeatmapData {
  positions: TribePosition[];
  tribeConcentrations: Array<{
    tribe: WineTribe;
    boothId: string;
    count: number;
  }>;
  recommendedRedirects: Array<{
    fromBooth: string;
    toBooth: string;
    reason: string;
  }>;
}

// Tribe reward tracking
export interface TribeReward {
  id: string;
  userId: string;
  tribe: WineTribe;
  bottlesCompleted: number;
  targetBottles: number;
  rewardName: string;
  unlockedAt?: Date;
}

// API response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}
