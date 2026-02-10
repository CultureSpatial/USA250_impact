# HOW TO ADD A NEW PLACE PACKET CONTEXT

**Quick Reference Guide for Developers & Historical Societies**

---

## TL;DR

To add a new heritage context (e.g., "Labor History", "Indigenous Heritage"), you need to:

1. Define a color palette (3-4 colors)
2. Create or source a heritage texture image
3. Add the context to the `placePacketContexts` object
4. Write your narrative content component

**Time Required**: 30-60 minutes

---

## STEP 1: DEFINE YOUR COLOR PALETTE

### Extract Colors from Heritage Photos

**Recommended Tools**:
- [Coolors.co](https://coolors.co/image-picker) - Upload a photo, extract palette
- [Adobe Color](https://color.adobe.com/create/image) - Sophisticated extraction
- Eyedropper tool in your browser DevTools

**What You Need**:
- **Primary color**: Dominant heritage color (e.g., wine = purple, trails = blue)
- **Secondary color**: Complementary accent (e.g., wine = pink, trails = amber)
- **Accent color**: Highlight color for CTAs (e.g., red for danger, gold for hope)
- **Light/Lighter colors**: Text colors on dark backgrounds

### Example: Adding "Labor History" Context

**Source Image**: Historical factory photo (steel, coal, brick tones)

```typescript
laborHistory: {
  palette: {
    primary: '#991B1B',      // red-800 (solidarity, labor movement)
    secondary: '#475569',    // slate-600 (steel, machinery)
    accent: '#F59E0B',       // amber-500 (warning, worker safety)
    light: '#FCA5A5',        // red-300 (light on dark)
    lighter: '#FECACA',      // red-200 (lightest on dark)
  }
}
```

**Pro Tip**: Use Tailwind color names when possible for consistency.

---

## STEP 2: CREATE YOUR GRADIENT

### Gradient Formula

```
Gradient = Dark version of primary → Dark version of secondary → Slate-900 (base)
```

**Example Conversions**:

| Context | Primary | Secondary | Gradient |
|---------|---------|-----------|----------|
| Wine | Purple-600 | Pink-600 | `from-purple-900 via-pink-900 to-slate-900` |
| Trails | Blue-800 | Amber-700 | `from-slate-800 via-blue-900 to-slate-900` |
| Labor | Red-800 | Slate-600 | `from-red-900 via-slate-700 to-slate-900` |

**CSS Version** (for inline styles):

```typescript
gradientCSS: 'linear-gradient(135deg, #7F1D1D 0%, #334155 50%, #0F172A 100%)'
//                                     ↑ red-900   ↑ slate-700  ↑ slate-900
```

**Tool**: Use [CSS Gradient Generator](https://cssgradient.io/) to preview

---

## STEP 3: PREPARE YOUR TEXTURE IMAGE

### Texture Requirements

- **Format**: JPEG or PNG
- **Size**: 1920x1080px minimum (covers most screens)
- **File size**: < 200KB (optimize with [TinyPNG](https://tinypng.com/))
- **Subject**: Heritage imagery relevant to context
  - Wine: Cellar walls, barrel rooms, vineyard landscapes
  - Trails: Archival maps, historical documents, aged paper
  - Labor: Factory interiors, machinery, brick walls

### Texture Opacity

```typescript
textureOpacity: 0.2  // Start here
// Lower (0.1-0.15): Subtle, doesn't compete with text
// Higher (0.25-0.3): Strong atmosphere, ensure text contrast
```

**Pro Tip**: Test with actual text overlaid. Can you read white text clearly?

---

## STEP 4: ADD TO `placePacketContexts` OBJECT

### Location
Open: `/components/place-packet/PlacePacketShell.tsx`

Find the `placePacketContexts` object (around line 60)

### Template

```typescript
const placePacketContexts = {
  // ... existing contexts (wine, freedomTrails, soundClash)

  // YOUR NEW CONTEXT
  yourContextName: {
    id: 'yourContextName',
    name: 'Your Context Display Name',
    subtitle: 'Edition Name (optional)',
    icon: YourLucideIcon,  // Import from 'lucide-react'
    palette: {
      primary: '#XXXXXX',
      secondary: '#XXXXXX',
      accent: '#XXXXXX',
      light: '#XXXXXX',
      lighter: '#XXXXXX',
    },
    gradient: 'from-your-900 via-colors-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #XXXXXX 0%, #XXXXXX 50%, #0F172A 100%)',
    textureUrl: '/textures/your-texture.jpg',
    textureOpacity: 0.2,
    emotionalTone: 'Describe the feeling (3-5 words)',
  },
};
```

### Real Example: Labor History

```typescript
import { Hammer } from 'lucide-react';  // Icon for labor/industry

const placePacketContexts = {
  // ... existing contexts

  laborHistory: {
    id: 'laborHistory',
    name: 'Labor History',
    subtitle: 'Worker Movement Edition',
    icon: Hammer,
    palette: {
      primary: '#991B1B',      // red-800
      secondary: '#475569',    // slate-600
      accent: '#F59E0B',       // amber-500
      light: '#FCA5A5',        // red-300
      lighter: '#FECACA',      // red-200
    },
    gradient: 'from-red-900 via-slate-700 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #7F1D1D 0%, #334155 50%, #0F172A 100%)',
    textureUrl: '/textures/factory-brick.jpg',
    textureOpacity: 0.25,
    emotionalTone: 'Solidarity-focused, gritty, authentic',
  },
};
```

---

## STEP 5: UPDATE TYPESCRIPT TYPES

### Add to Type Union

Find this line (around line 105):

```typescript
type PlacePacketContextType = keyof typeof placePacketContexts;
```

TypeScript will automatically include your new context! No changes needed.

---

## STEP 6: CREATE YOUR CONTENT COMPONENT

### Template

```typescript
export const YourContextPlacePacket: React.FC = () => {
  const { theme } = usePlacePacketTheme();

  return (
    <div className="max-w-4xl w-full">
      {/* Title */}
      <div className="text-center mb-12">
        <h2
          className="text-5xl font-black mb-4 bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.palette.primary}, ${theme.palette.light}, ${theme.palette.primary})`,
          }}
        >
          Your Place Packet Title
        </h2>
        <p className="text-xl text-white/60 italic">
          Location • Era (1900-1950)
        </p>
      </div>

      {/* Historical Context Card */}
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">⚡</span>
          <h3
            className="text-lg font-bold"
            style={{ color: theme.palette.accent }}
          >
            Historical Context
          </h3>
        </div>
        <p className="text-white/80 leading-relaxed">
          Your historical constraint narrative here. What was the challenge?
          What knowledge was hidden or suppressed?
        </p>
      </div>

      {/* Modern Transformation Card */}
      <div
        className="backdrop-blur-xl border rounded-3xl p-8 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${theme.palette.primary}20, ${theme.palette.secondary}20)`,
          borderColor: `${theme.palette.primary}30`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <YourIcon
            className="w-5 h-5"
            style={{ color: theme.palette.light }}
          />
          <h3
            className="text-lg font-bold"
            style={{ color: theme.palette.lighter }}
          >
            Living Heritage (Today)
          </h3>
        </div>
        <p className="text-white/90 leading-relaxed mb-6">
          How has this constraint transformed into cultural asset? What can
          visitors experience today?
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all border font-semibold text-sm bg-white/10 border-white/20 hover:bg-white/20">
            🎧 Audio Tour
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all border font-semibold text-sm bg-white/10 border-white/20 hover:bg-white/20">
            📍 Visit Site
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all border font-semibold text-sm bg-white/10 border-white/20 hover:bg-white/20">
            💬 Discussion
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## STEP 7: CREATE DEMO COMPONENT

### Add at Bottom of `PlacePacketShell.tsx`

```typescript
export const YourContextDemo = () => (
  <PlacePacketShell context="yourContextName">
    <YourContextPlacePacket />
  </PlacePacketShell>
);
```

### Test It

```typescript
// In your app or Storybook
import { YourContextDemo } from './components/place-packet/PlacePacketShell';

function App() {
  return <YourContextDemo />;
}
```

---

## STEP 8: ACCESSIBILITY CHECK

### Required Tests

1. **Color Contrast**
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - White text on your primary gradient: Must be 4.5:1 or higher
   - If fails: Increase gradient darkness or use lighter text color

2. **Keyboard Navigation**
   - Tab through all interactive elements
   - Focus states should be visible (ring around buttons/cards)

3. **Screen Reader**
   - Turn on VoiceOver (Mac) or NVDA (Windows)
   - Listen to page read aloud - does it make sense?

---

## QUICK REFERENCE: COMMON ICONS

**From `lucide-react` package**:

| Context | Icon | Import |
|---------|------|--------|
| Wine | `Wine` | `import { Wine } from 'lucide-react'` |
| Trails | `MapPin` | `import { MapPin } from 'lucide-react'` |
| Sound | `Music` | `import { Music } from 'lucide-react'` |
| Labor | `Hammer` | `import { Hammer } from 'lucide-react'` |
| Indigenous | `Feather` | `import { Feather } from 'lucide-react'` |
| LGBTQ+ | `Heart` | `import { Heart } from 'lucide-react'` |
| Resilience | `Sprout` | `import { Sprout } from 'lucide-react'` |

[Browse all icons](https://lucide.dev/icons/)

---

## TROUBLESHOOTING

### Problem: Colors Look Washed Out

**Solution**: Increase saturation in your palette. Use darker versions of colors.

```typescript
// Instead of:
primary: '#EF4444'  // red-500 (too bright on dark background)

// Use:
primary: '#DC2626'  // red-600 (more saturated)
// or
primary: '#991B1B'  // red-800 (even darker/richer)
```

### Problem: Text Is Hard to Read

**Solution 1**: Lower texture opacity

```typescript
textureOpacity: 0.1  // Instead of 0.2 or 0.3
```

**Solution 2**: Add stronger backdrop blur to content cards

```css
backdrop-blur-xl  /* Already strong */
backdrop-blur-2xl /* Even stronger */
```

### Problem: Gradient Looks "Muddy"

**Solution**: Ensure gradient colors are from similar hue families

```typescript
// Bad (jarring transition):
gradient: 'from-purple-900 via-green-900 to-slate-900'  ❌

// Good (smooth transition):
gradient: 'from-purple-900 via-pink-900 to-slate-900'   ✅
```

### Problem: Icon Doesn't Match Theme

**Solution**: Check [Lucide Icons](https://lucide.dev/) for alternatives

```typescript
// Generic:
icon: Star

// More specific:
icon: Sparkles  // For celebratory contexts
icon: Shield    // For protective/safety contexts
icon: Compass   // For navigation/journey contexts
```

---

## COMMUNITY CONTRIBUTION WORKFLOW

### For Historical Societies / Partners

1. **Gather Assets**
   - 3-5 high-quality heritage photos
   - Historical documents (optional)
   - Community narrative (500-800 words)

2. **Color Extraction**
   - Upload photos to [Coolors.co/image-picker](https://coolors.co/image-picker)
   - Export palette as JSON

3. **Submit to Stadium Soundwave**
   - Email: [email TBD]
   - Include: Photos, palette JSON, narrative text
   - We create the context in 1-2 business days

4. **Review & Iterate**
   - You review live preview
   - Request color/texture adjustments
   - Approve final version

5. **Deploy**
   - Context goes live in production
   - You can create unlimited Place Packets with your theme

---

## ADVANCED: SEASONAL OR EVENT THEMES

### Example: Holiday Edition

```typescript
wineHolidayEdition: {
  id: 'wineHolidayEdition',
  name: 'Wine Heritage',
  subtitle: 'Holiday Edition',  // Override subtitle
  icon: Wine,
  palette: {
    primary: '#DC2626',    // red-600 (holiday red)
    secondary: '#059669',  // green-600 (holiday green)
    accent: '#F59E0B',     // amber-500 (gold accents)
    light: '#FCA5A5',
    lighter: '#FECACA',
  },
  gradient: 'from-red-900 via-green-900 to-slate-900',
  gradientCSS: 'linear-gradient(135deg, #7F1D1D 0%, #064E3B 50%, #0F172A 100%)',
  textureUrl: '/textures/wine-cellar-holiday.jpg',
  textureOpacity: 0.2,
  emotionalTone: 'Festive, celebratory, seasonal',
}
```

**Use Case**: Switch between `wine` and `wineHolidayEdition` based on date

```typescript
const context = isHolidaySeason() ? 'wineHolidayEdition' : 'wine';
<PlacePacketShell context={context}>
  ...
</PlacePacketShell>
```

---

## CHECKLIST

Before considering your context "production-ready":

- [ ] Color palette extracted from heritage imagery
- [ ] Gradient tested on actual device (not just design tool)
- [ ] Texture image optimized (< 200KB)
- [ ] Text contrast passes WCAG AA (4.5:1 minimum)
- [ ] Icon imported and displays correctly
- [ ] Content component created with crime→culture narrative
- [ ] Demo component exported and tested
- [ ] Keyboard navigation works (Tab through elements)
- [ ] Screen reader announces content logically
- [ ] Tested on mobile device (responsive)
- [ ] Emotional tone matches heritage content

---

## NEXT STEPS

1. **Test with real users** from the heritage community
2. **Gather feedback** on emotional resonance
3. **Iterate** on colors/textures based on feedback
4. **Document** your context in the Style Guide
5. **Share** your success with other historical societies

---

## SUPPORT

**Questions?**
- GitHub Issues: [Stadium Soundwave Repo]
- Email: [TBD]
- Slack: #place-packet-design

**Want to see examples?**
- Wine Heritage: `/examples/wine`
- Freedom Trails: `/examples/trails`
- Sound Clash: `/examples/sound`

---

**Remember**: The goal is to honor the heritage specificity while maintaining professional infrastructure. Your context should FEEL authentic to the place it represents.
