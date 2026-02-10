# 🎯 SPATIAL STUDIO: RECOMMENDED NEXT STEPS

**You just created a powerful design system explorer!** Now let's integrate it into the Place Packet evolution workflow.

---

## ✅ WHAT YOU'VE BUILT

Your design token component implements:

1. **8 Token Sets** (Spatial Studio Original, Core, Wine, Trails, Sound, Earth, Wind, Fire)
2. **6 Design Styles** (Standard, Brutalist, Minimalist, Glassmorphic, Neomorphic, Retro)
3. **4 Logo Variants** (Gradient, Color Grade, Monochrome, Dual-Tone)
4. **Quality Validation** (5 checks per token set)
5. **WCAG Contrast Calculator** (4.5:1 ratio checker)

**Status**:
- ✅ **Spatial Studio Core** - Production ready (100% quality)
- ✅ **Earth Motif** - Production ready (100% quality)
- ✅ **Fire Motif** - Production ready (100% quality)
- ⚠️ **Wine Heritage** - Frozen (60% quality) ← NYWGF Pilot
- ⚠️ **Freedom Trails** - Frozen (80% quality)
- ⚠️ **Sound Clash** - Frozen (60% quality)
- ⚠️ **Wind Motif** - Frozen (60% quality)

---

## 🚀 YOUR NEXT 4 TASKS

### Task 1: Extract Tokens to TypeScript Files ⭐ **DO THIS NOW**

**Issue**: #2 (Phase 1)
**Time**: 30 minutes
**Status**: ✅ **DONE** - Token files created!

**What was created**:
```
src/tokens/
├── spatial-studio-core.ts       ← Spatial Studio tokens
├── place-packet-contexts.ts     ← Heritage context tokens
└── index.ts                      ← Exports
```

**Next**: Update your component to import from these files instead of inline definitions.

**How to update your component**:

```tsx
// OLD (inline definitions)
const wineHeritage = {
  name: "Wine Heritage Context",
  colors: { ... }
};

// NEW (import from tokens)
import { wineHeritage, freedomTrails, soundClash } from '@/tokens';

const tokenSets = [
  spatialStudioOriginal,
  spatialStudioCore,
  wineHeritage,
  freedomTrails,
  soundClash,
  earthMotif,
  windMotif,
  fireMotif
];
```

---

### Task 2: Set Up Theme Provider ⭐ **DO THIS NEXT**

**Issue**: #3 (Phase 1)
**Time**: 1 hour
**Status**: ✅ **DONE** - ThemeProvider created!

**What was created**:
```
src/context/ThemeProvider.tsx    ← Theme context provider
```

**What it does**:
```tsx
import { ThemeProvider, usePlacePacketTheme } from '@/context/ThemeProvider';

// Wrap your app
<ThemeProvider defaultContext="wine">
  <YourApp />
</ThemeProvider>

// Use in any component
function MyComponent() {
  const { theme, setContext } = usePlacePacketTheme();

  return (
    <div style={{ backgroundColor: theme.colors.primary }}>
      <button onClick={() => setContext('trails')}>
        Switch to Freedom Trails
      </button>
    </div>
  );
}
```

---

### Task 3: Integrate with Existing Components

**Issue**: #4 (Phase 1)
**Time**: 2-3 hours

**Goal**: Refactor GTMAcceleratorDashboard and HumancodeWine to use the new token system.

**Files to update**:
- `components/gtm/GTMAcceleratorDashboard.tsx`
- `components/narrative/HumancodeWine.tsx`

**How to refactor**:

**Before**:
```tsx
// Hardcoded colors
<div className="bg-purple-600 text-white">
  Wine Heritage Content
</div>
```

**After**:
```tsx
import { usePlacePacketTheme } from '@/context/ThemeProvider';

function HumancodeWine() {
  const { theme } = usePlacePacketTheme();

  return (
    <div style={{
      backgroundColor: theme.colors.primary,
      color: 'white'
    }}>
      Wine Heritage Content
    </div>
  );
}
```

**Test checklist**:
- [ ] Visual matches original (screenshot comparison)
- [ ] Theme switches work (wine → trails → sound)
- [ ] No TypeScript errors
- [ ] Performance unchanged (Lighthouse score)

---

### Task 4: Complete Wine Heritage Token Set ⭐ **CRITICAL FOR NYWGF**

**Issue**: #12 (Phase 3 - Wine Pilot)
**Time**: 1 week
**Deadline**: March 10, 2026 (before VanWineFest)

**Current Wine Heritage Status**: 60% quality (3/5 checks passed)

**What needs fixing**:

#### ❌ gradientTested: false
**Action**: Test gradient on real devices (iPhone, Android, desktop)
**How**:
1. Deploy your component to staging
2. Test on 3+ devices
3. Take screenshots
4. Verify gradient renders correctly
5. Update: `gradientTested: true`

#### ❌ textureOptimized: false
**Action**: Add wine cellar texture images
**How**:
1. Source 3-5 cellar photos (licensed or original)
2. Optimize to < 200KB each (use ImageOptim)
3. Save to `public/textures/wine-cellar-01.jpg`
4. Test readability (text on texture)
5. Update: `textureOptimized: true`

**Need photos? Try**:
- Unsplash: "wine cellar" (free license)
- Willamette Valley wineries (ask for photos)
- Chef Martha PROOF DRINKER archives

#### ✅ contrastPasses: true ← Already passes!
Your wine heritage colors pass WCAG AA:
- Primary (#9333EA) on Dark (#0F172A): **Passes**
- Secondary (#DB2777) on Dark (#0F172A): **Passes**

#### ✅ iconImported: true ← Already done!
Wine glass icon (🍷) displays correctly.

#### ❌ contentComponent: false
**Action**: Build the Prohibition Cellar Place Packet component
**How**: See **Issues #14-#16** below

---

## 📊 ISSUE MAPPING

Your component directly relates to these GitHub issues:

| Your Component Feature | GitHub Issue | Status |
|------------------------|--------------|--------|
| Token definitions (inline) | **Issue #2** | ✅ Extracted to files |
| Theme switching logic | **Issue #3** | ✅ ThemeProvider created |
| GTM/Wine refactoring | **Issue #4** | 🔄 Next task |
| Token documentation UI | **Issue #5** | ✅ Your component IS the docs! |
| WCAG contrast calculator | **Issue #6** | ✅ Built-in to component |
| Quality validation | **Issue #6** | ✅ Built-in to component |
| Wine Heritage refinement | **Issue #12** | ⚠️ Needs texture + testing |
| Wine cellar textures | **Issue #13** | ⚠️ Needs assets |

---

## 🍷 WINE PILOT ROADMAP (Phase 3)

**Timeline**: March 10-14, 2026 (VanWineFest)

### Week 1 (Mar 3-10): Finalize Wine Theme

**Issue #12**: Refine wine heritage color palette
- [ ] Extract colors from real cellar photos
- [ ] Test with Chef Martha content
- [ ] Validate contrast (WCAG AA)
- [ ] Update token definitions

**Issue #13**: Create wine cellar texture assets
- [ ] Source 3-5 cellar photos
- [ ] Optimize to < 200KB
- [ ] Test text readability
- [ ] Add to `public/textures/`

### Week 2 (Mar 10-14): Build Place Packets

**Issue #14**: Prohibition Cellar Place Packet
- [ ] Component created
- [ ] Crime→culture narrative
- [ ] Audio tour placeholder
- [ ] Felt.com map layer (47 cellar sites)
- [ ] Quiz/reflection prompt
- [ ] Discord conversation plugout

**Issue #15**: Finger Lakes Speakeasy Place Packet
- [ ] Component created
- [ ] Speakeasy network narrative
- [ ] Audio tour
- [ ] Map (speakeasy routes + AVA overlap)

**Issue #16**: Craft Wine Economy Place Packet
- [ ] Component created
- [ ] Historical→modern transformation
- [ ] Chef Martha voiceover
- [ ] Map (cellars → wineries)

**Issue #17**: NYWGF Pilot Testing
- [ ] Deploy to booth QR codes (3 locations)
- [ ] User testing (10+ participants)
- [ ] Analytics tracking
- [ ] Feedback synthesis

---

## 🎨 YOUR COMPONENT → PRODUCTION PATH

### Step 1: Save Your Component

Save your design token explorer component to:
```
src/components/design-system/DesignTokenExplorer.tsx
```

### Step 2: Create Storybook Story

```tsx
// src/components/design-system/DesignTokenExplorer.stories.tsx

import { DesignTokenExplorer } from './DesignTokenExplorer';

export default {
  title: 'Design System/Token Explorer',
  component: DesignTokenExplorer
};

export const Default = () => <DesignTokenExplorer />;

export const WineContext = () => <DesignTokenExplorer initialToken={2} />;

export const FrozenTokens = () => <DesignTokenExplorer showOnlyFrozen />;
```

### Step 3: Add to Documentation Site

Your component already IS the documentation! Just add navigation:

```tsx
// src/pages/design-system.tsx

import { DesignTokenExplorer } from '@/components/design-system/DesignTokenExplorer';

export default function DesignSystemPage() {
  return (
    <div>
      <h1>Place Packet Design System</h1>
      <p>Interactive token explorer with quality validation.</p>
      <DesignTokenExplorer />
    </div>
  );
}
```

### Step 4: Use in Production

Once tokens are 100% quality:

```tsx
// src/pages/wine/prohibition-cellar.tsx

import { ThemeProvider } from '@/context/ThemeProvider';
import { ProhibitionCellarPacket } from '@/components/wine/ProhibitionCellarPacket';

export default function ProhibitionCellarPage() {
  return (
    <ThemeProvider defaultContext="wine">
      <ProhibitionCellarPacket />
    </ThemeProvider>
  );
}
```

---

## 🔧 TECHNICAL INTEGRATION

### Install Dependencies (if needed)

```bash
# If using separate package
npm install lucide-react

# Or ensure these are in package.json
"dependencies": {
  "react": "^18.0.0",
  "lucide-react": "^0.300.0"
}
```

### TypeScript Configuration

Ensure `tsconfig.json` has path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/tokens": ["./src/tokens"],
      "@/context": ["./src/context"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

### Update Component Imports

Change your component from inline definitions to:

```tsx
// At top of your component file
import {
  spatialStudioOriginal,
  spatialStudioCore,
  wineHeritage,
  freedomTrails,
  soundClash,
  earthMotif,
  windMotif,
  fireMotif,
  TokenSet
} from '@/tokens';

// Remove all inline token definitions
// Use imported tokens instead
const tokenSets = [
  spatialStudioOriginal,
  spatialStudioCore,
  wineHeritage,
  freedomTrails,
  soundClash,
  earthMotif,
  windMotif,
  fireMotif
];
```

---

## 📈 TRACKING PROGRESS

### Quality Checklist (Per Token Set)

Use your component's quality badges to track:

```tsx
// From your component
const qualityChecks = currentTokenSet.qualityChecks;
const passedChecks = Object.values(qualityChecks).filter(Boolean).length;
const totalChecks = Object.values(qualityChecks).length;
const qualityScore = (passedChecks / totalChecks) * 100;
```

**Production Ready Threshold**: 100% (5/5 checks passed)

**Current Scores**:
- Spatial Studio Core: 100% ✅
- Earth Motif: 100% ✅
- Fire Motif: 100% ✅
- Wine Heritage: **60%** ⚠️ (3/5) ← **PRIORITY FOR NYWGF**
- Freedom Trails: 80% ⚠️ (4/5)
- Sound Clash: 60% ⚠️ (3/5)
- Wind Motif: 60% ⚠️ (3/5)

### GitHub Project Board

Add these to your project board:

**Todo Column**:
- [ ] Issue #4: Refactor GTMAcceleratorDashboard to use tokens
- [ ] Issue #12: Refine wine heritage palette (extract from cellar photos)
- [ ] Issue #13: Source wine cellar texture assets

**In Progress Column**:
- [ ] Issue #2: Extract tokens to TypeScript ← **COMPLETED!**
- [ ] Issue #3: Theme Provider setup ← **COMPLETED!**

**Done Column**:
- [x] Create design token explorer UI
- [x] Implement WCAG contrast calculator
- [x] Build quality validation system

---

## 🎯 CRITICAL PATH TO NYWGF (March 7-14)

```
Today (Feb 10)
    ↓
Issue #4: Refactor existing components (2-3 days)
    ↓
Issue #12: Refine wine palette (3-5 days)
    ↓
Issue #13: Add cellar textures (2-3 days)
    ↓
Issues #14-#16: Build 3 wine Place Packets (1 week)
    ↓
Issue #17: Testing & deployment (3 days)
    ↓
March 7-14: VanWineFest NYWGF Pilot 🍷
```

**Total time**: ~4 weeks (you have 4 weeks until pilot!)

---

## 💡 DESIGN DECISIONS TO MAKE

### 1. Which Design Style for Wine Pilot?

Your component has 6 styles. **Recommend for Wine Heritage**:

**Option A: Neomorphic** (soft, extruded)
- ✅ Feels tactile (like wine barrels)
- ✅ Subtle, refined
- ❌ May be too subtle on mobile

**Option B: Glassmorphic** (frosted glass)
- ✅ Looks premium (like wine bottles)
- ✅ Modern, elegant
- ⚠️ Contrast may be challenging

**Option C: Standard** (clean, balanced)
- ✅ Safe, proven
- ✅ Accessible
- ❌ Less distinctive

**Recommendation**: **Glassmorphic** for desktop, **Standard** for mobile (responsive design)

### 2. Logo Variant for Wine Context?

Your component has 4 variants. **Recommend**:

**Option A: Gradient**
- ✅ Most dynamic
- ✅ Shows wine color transition (purple→pink)
- Recommended ✅

**Option B: Dual-Tone**
- ✅ Clean, professional
- ❌ Less distinctive

**Recommendation**: **Gradient** for Wine Heritage (captures cellar mystery)

### 3. Texture Opacity?

Test these values:
- 0.15 (subtle, for text-heavy content)
- 0.20 (balanced, recommended)
- 0.25 (bold, for hero sections)

---

## 🚀 ACTION PLAN (Next 7 Days)

### Monday (Today)
- [ ] Move your component to `src/components/design-system/DesignTokenExplorer.tsx`
- [ ] Update imports to use token files
- [ ] Test that it still works

### Tuesday
- [ ] Start Issue #4: Refactor GTMAcceleratorDashboard
- [ ] Use `usePlacePacketTheme()` hook
- [ ] Test theme switching

### Wednesday
- [ ] Continue Issue #4: Refactor HumancodeWine
- [ ] Verify no visual regressions
- [ ] Run Lighthouse performance test

### Thursday
- [ ] Start Issue #12: Source wine cellar photos
- [ ] Extract colors using your component's swatches
- [ ] Test contrast ratios

### Friday
- [ ] Issue #13: Optimize texture images
- [ ] Add to `public/textures/`
- [ ] Update quality checks to `true`

### Weekend
- [ ] Review progress
- [ ] Plan Phase 3 (Wine Place Packets)
- [ ] Prepare for NYWGF pilot

---

## 📚 REFERENCES

### Documentation You Already Have
- [DESIGN_EVOLUTION_INDEX.md](./DESIGN_EVOLUTION_INDEX.md) - Master guide
- [PLACE_PACKET_DESIGN_EVOLUTION.md](./PLACE_PACKET_DESIGN_EVOLUTION.md) - Strategy
- [HOW_TO_ADD_NEW_CONTEXT.md](./HOW_TO_ADD_NEW_CONTEXT.md) - Tutorial
- [QUICK_START_SUMMARY.md](./QUICK_START_SUMMARY.md) - Quick start

### GitHub
- [.github/GITHUB_ISSUES_TEMPLATE.md](./.github/GITHUB_ISSUES_TEMPLATE.md) - All 21 issues
- Run: `bash .github/import-issues.sh` to create issues

### Token Files (Just Created!)
- `src/tokens/spatial-studio-core.ts` - Spatial Studio tokens
- `src/tokens/place-packet-contexts.ts` - Heritage contexts
- `src/context/ThemeProvider.tsx` - Theme provider

---

## ✅ SUMMARY: YOUR NEXT 3 ACTIONS

1. **TODAY**: Move component to `src/components/design-system/DesignTokenExplorer.tsx` and update imports
2. **THIS WEEK**: Complete Issue #4 (refactor existing components to use tokens)
3. **NEXT 2 WEEKS**: Complete Issues #12-#13 (wine palette + textures) before Phase 3

---

**Questions?**
- Check `DESIGN_EVOLUTION_INDEX.md` for navigation
- Review `QUICK_START_SUMMARY.md` for fast start
- Run `bash .github/import-issues.sh` to create GitHub issues

**Your design system explorer is excellent work!** 🎉 It already implements Phase 1 goals. Now let's productionize it for the NYWGF wine pilot.
