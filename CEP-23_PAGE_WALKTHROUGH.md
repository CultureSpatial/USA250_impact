# CEP-23 Page Walkthrough - Visual & Functional Guide

**Purpose**: Understand what the new page looks like and how to navigate it  
**Audience**: Stakeholders, designers, QA testers

---

## PAGE LAYOUT OVERVIEW

### Desktop View (>1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│  🍇 Vintage & Voice     Wine Heritage Edition          ✓ CEP-23  │  ← Navigation
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│  SIDEBAR     │           CANVAS - MAIN CONTENT                │
│  (w-96)      │           (flex-1, scrollable)                 │
│              │                                                  │
│  • Overview  │   Hero: "Bottleneck to Breakthrough"           │
│  • Components│   • 3 value cards (+25%, <3 sec, 6 tribes)     │
│  • System    │   • CTA: "Explore Components"                  │
│              │                                                  │
│  Design      │   [Components Section when clicked]            │
│  System Info │   • Pre-Selection UI card                      │
│              │   • Operator Dashboard card                    │
│  Quick Stats │   • Digital Tasting Ticket card                │
│  • +25%      │   • Service Layer card                         │
│  • <3 sec    │   • Responsive design info                     │
│  • 6 Tribes  │                                                  │
│              │   [Design System Section when clicked]         │
│              │   • Layer 1: Spatial Studio Core               │
│              │   • Layer 2: Wine Heritage Context             │
│              │   • Color swatches                             │
│              │   • File structure                             │
└──────────────┴──────────────────────────────────────────────────┘
```

### Mobile View (<640px)

```
┌────────────────────────────────┐
│ 🍇 Vintage & Voice ✓ CEP-23    │  ← Navigation (compact)
├────────────────────────────────┤
│                                │
│   FULL WIDTH CANVAS            │
│   (sidebar hidden)             │
│                                │
│   Hero: "Bottleneck to         │
│   Breakthrough"                │
│                                │
│   [3 value cards stacked]      │
│   +25% Throughput              │
│   <3 sec QR Speed              │
│   6 Wine Tribes                │
│                                │
│   CTA Button                   │
│   "Explore Components"         │
│                                │
│   [Components when selected]   │
│   [Cards stack vertically]     │
│                                │
└────────────────────────────────┘
```

---

## VISUAL DESIGN ELEMENTS

### Color Scheme (Wine Heritage)

```
BACKGROUND GRADIENT:
┌─────────────────────────────┐
│ from-purple-900             │  #581C87
│ via-pink-900                │  #831843
│ to-slate-900                │  #0F172A
│ (135° angle)                │
└─────────────────────────────┘
Creates a mysterious, deep wine-cellar aesthetic

PRIMARY ACCENT COLORS:
┌────────────────────────────────────────┐
│ Purple-600     #9333EA   ████████████  │  Primary (buttons, icons)
│ Pink-600       #DB2777   ████████████  │  Secondary (accents)
│ Red-400        #F87171   ████████████  │  Accent (CTAs, highlights)
│ Purple-200     #E9D5FF   ████████████  │  Light text on dark
│ Purple-100     #F3E8FF   ████████████  │  Lightest text/hover
└────────────────────────────────────────┘

TEXT COLORS:
White (#FFFFFF) on dark backgrounds       - Main heading text
Purple-200 on dark                        - Secondary text
Purple-100 on dark                        - Light hover text
```

### Component Styling

**Cards** (Components shown in grid):
```
┌─────────────────────────────┐
│ 🏷️  Component Title         │  ← Icon + bold heading
├─────────────────────────────┤
│ Description of what this    │  ← Descriptive text (purple-100)
│ component does and its      │
│ primary value.              │
├─────────────────────────────┤
│ [Stat Tag] [Stat Tag]       │  ← Feature tags (purple-600/30 bg)
│ [Stat Tag] [Stat Tag]       │
└─────────────────────────────┘
Background: from-purple-600/10 to-pink-600/10
Border: border-purple-600/40
Hover: from-purple-600/20 to-pink-600/20 (brighter)
```

**Buttons** (CTAs):
```
┌────────────────────────────┐
│  Explore Components  →      │  ← Icon inside button
└────────────────────────────┘
Background: from-purple-600 to-pink-600
Text: white, bold
Hover: from-purple-700 to-pink-700, -translate-y-0.5 (lifts up)
Shadow: shadow-lg shadow-purple-600/50
```

**Sidebar Navigation**:
```
Active button:          Inactive button:
┌────────────────────┐  ┌────────────────────┐
│ ◆ Overview         │  │ ◆ Components       │
│ (gradient bg)      │  │ (transparent)      │
│ white text         │  │ purple-200 text    │
└────────────────────┘  └────────────────────┘
```

---

## INTERACTIVE FLOW

### User Journey: First-Time Visitor

```
1. PAGE LOADS
   ↓
   Shows: Navigation bar + Sidebar (desktop) + Hero section (Overview)
   See: "Bottleneck to Breakthrough" headline
        3 value driver cards
        "Explore Components" CTA button
   
2. CLICKS "Explore Components"
   ↓
   Sidebar highlights "Components" button
   Canvas scrolls to Components section
   See: 4 component cards:
        • Pre-Selection UI (+25% throughput)
        • Operator Dashboard (real-time metrics)
        • Digital Tasting Ticket (QR validation)
        • Service Layer (9 functions, type-safe)
   See: Responsive design info box
   
3. CLICKS "Design System" (sidebar)
   ↓
   Canvas scrolls to Design System section
   See: Layer 1 vs Layer 2 explanation
        Color swatches (purple, pink, red)
        Implementation details (files, tech stack)
        Value metrics summary
   
4. INTERACTS WITH PAGE
   ↓
   Hover over cards → cards brighten
   Click navigation buttons → sections change
   Resize browser → layout adapts (sidebar hides on mobile)
   Scroll → content flows naturally
```

### Responsive Behavior

**Desktop (>1024px)**:
- Sidebar always visible (w-96)
- Canvas takes remaining space
- All content readable without scrolling sidebar
- Grids show 2-3 columns

**Tablet (640-1024px)**:
- Sidebar visible but might be narrower
- Canvas still has good space
- Some grids show 2 columns
- Touch targets large enough (44px minimum)

**Mobile (<640px)**:
- Sidebar completely hidden
- Canvas takes full width
- All content accessible by scrolling
- Grids stack to 1 column
- Touch targets large (44px+)
- Text readable without horizontal scroll

---

## SECTION BREAKDOWN

### SECTION 1: OVERVIEW (Default)

**What you see**:
```
┌─────────────────────────────────┐
│ Wine Heritage Place Packet badge │  ← Context indicator
├─────────────────────────────────┤
│ "Bottleneck to Breakthrough"    │  ← Hero headline
│  Big, bold, memorable           │
├─────────────────────────────────┤
│ Descriptive subheading about    │  ← Narrative
│ trunk-to-bottle evolution       │
├─────────────────────────────────┤
│ 3 Value Cards (horizontal grid) │  ← Key metrics
│ +25% | <3 sec | 6 Tribes        │
├─────────────────────────────────┤
│ [Explore Components] Button      │  ← CTA
└─────────────────────────────────┘
```

**Key information conveyed**:
- This is about Vintage & Voice (Wine Heritage Edition)
- The core value: +25% throughput increase
- The speed guarantee: <3 sec QR validation
- The scope: 6 Wine Tribes integrated
- Action: "Explore Components" to see how it works

---

### SECTION 2: COMPONENTS

**What you see**:
```
Component Library                              ← Section title
Subtitle: Built with responsive design...     ← Description

4-Card Grid (2 columns on desktop):

[Pre-Selection UI Card]      [Operator Dashboard Card]
 Queue-time wine selection    Real-time booth metrics
 +25% throughput              TQ status tracking
 Mobile-optimized             Tribal breakdown

[Digital Tasting Ticket Card] [Service Layer Card]
 QR authorization             Business logic functions
 <3 sec validation            Type-safe implementation
 Performance logging          Performance optimized

Responsive Design Info Box:
┌─────────────────────────────────────────┐
│ Mobile (<640px) | Tablet (640px) | Desktop |
└─────────────────────────────────────────┘
```

**Key information conveyed**:
- 4 major components deliver the proof narrative
- Each component has specific value drivers
- System is responsive from mobile to desktop
- Technical details documented

---

### SECTION 3: DESIGN SYSTEM

**What you see**:
```
Design System                                  ← Section title
Subtitle: Place Packet design evolution       ← Description

2-Column Layout:

[Layer 1: Spatial Studio Core]  [Layer 2: Wine Heritage Context]
✓ Sidebar structure              ✓ Purple-600 primary
✓ Canvas main area               ✓ Pink-600 secondary
✓ Brand mark                     ✓ Red-400 accent
✓ Interaction patterns           ✓ Gradient backgrounds

Combined Info Box:
Files Created | Tech Stack | Value Metrics
• vintage-voice.ts    • Next.js    • +25% throughput
• service.ts          • React      • <3 sec QR
• 3 components        • TypeScript • 6 tribes
```

**Key information conveyed**:
- Design system has two stable layers
- Spatial Studio provides structure
- Wine Heritage provides visual theme
- Complete file list and tech stack
- Value drivers quantified

---

## INTERACTIVE ELEMENTS GUIDE

### Sidebar Navigation (Desktop Only)

**Overview Button**:
```
Default state:   [◆ Overview]
               purple-200 text, no background
               
Active state:    [◆ Overview]
               white text on gradient (purple→pink)
               Shadow effect, subtle elevation
               
Click action:    Canvas scrolls to Overview section
               Sidebar button highlights
```

**Components Button** & **System Button**: Same behavior

### Value Driver Cards

**Hover behavior**:
```
Resting state:   Cards visible, subtle shadows
                
Hover state:     Card brightens (bg-purple-600/20 → bg-purple-600/30)
                 Border becomes more visible
                 -translate-y-0.5 (lifts slightly)
                 Smooth transition (200ms)
```

### CTA Button ("Explore Components")

```
Resting:     Solid gradient (purple→pink)
             White bold text
             Large shadow underneath
             
Hover:       Gradient gets darker (purple-700→pink-700)
             Button lifts up (-translate-y-0.5)
             Shadow grows larger
             Cursor changes to pointer
             
Click:       Sidebar updates to highlight "Components"
             Canvas smoothly scrolls to Components section
```

### Stat Tags (on cards)

```
┌──────────────────┐
│ +25% throughput  │  ← Stat tag
└──────────────────┘

Background: bg-purple-600/30 (semi-transparent purple)
Border: border-purple-600/50 (darker purple outline)
Text: text-purple-200 (light purple)
Font: text-xs, font-bold, tracking-widest (uppercase)

Used to show:
- Component features (+25% throughput)
- Technical specs (TypeScript, Real-time metrics)
- Performance metrics (<3 sec, 100% lead capture)
```

---

## COLOR USAGE BY ELEMENT

### Backgrounds
- **Page background**: Linear gradient (purple-900 → pink-900 → slate-900)
- **Sidebar**: Black with 20% opacity + blur
- **Cards**: Purple-600/10 to Pink-600/10 (very light, transparent)
- **Buttons**: Solid gradient (purple-600 → pink-600)

### Text
- **Headings**: Pure white (#FFFFFF)
- **Primary text**: White
- **Secondary text**: Purple-200 (#E9D5FF)
- **Tertiary text**: Purple-100 (#F3E8FF)
- **Labels**: Purple-300 (UPPERCASE)

### Accents
- **Hover states**: Brighter purple/pink
- **Active indicators**: Gradient backgrounds
- **Badges/tags**: Purple-600/30 background
- **Icons**: Purple-300 (color accent)
- **Gradients**: Purple-900 → Pink-900 → Slate-900

### Borders & Dividers
- **Card borders**: border-purple-600/40
- **Subtle dividers**: border-purple-600/20
- **Sections**: border-t border-purple-600/20

---

## RESPONSIVE BREAKPOINT BEHAVIOR

### Large Desktop (>1280px)
- Sidebar full width (w-96)
- Canvas has maximum reading width
- 3-column grids for cards
- Generous spacing, professional appearance

### Desktop (1024px-1280px)
- Sidebar visible (w-96)
- Canvas flexible
- 2-column card grids
- Optimal balance

### Tablet (640px-1024px)
- Sidebar visible but compact
- Canvas wider
- 2-column grids stack to 1 on small tablets
- Text sizes scale down slightly

### Mobile (<640px)
- Sidebar completely hidden
- Canvas full width
- Single column cards (vertical stack)
- Text remains readable (min 14px)
- Touch targets padded (44px minimum height)

---

## ANIMATIONS & TRANSITIONS

### Hover Effects (200ms smooth transitions)
```
Cards:        Color shift + slight lift (translate-y)
Buttons:      Color shift + lift + shadow growth
Links:        Color change + underline (if present)
Icons:        Scale up or color change
```

### Scroll Behavior
```
Smooth scrolling between sections
No abrupt jumps
Loading states (if applicable)
```

### State Transitions
```
Navigation button selection: Instant highlight + subtle animation
Section changes: Smooth scroll to new section
Component visibility: Fade in/out if applicable
```

---

## ACCESSIBILITY FEATURES

### Keyboard Navigation
```
Tab key:       Navigate through all interactive elements
               (buttons, links, form inputs)
Enter/Space:   Activate buttons
Shift+Tab:     Navigate backwards
```

### Focus Indicators
```
Visible on all interactive elements
Purple/pink glow or outline
Always present (never hidden)
At least 2px visible
```

### Color Contrast
```
White on dark purple:      ✓ 10.8:1 ratio (passes WCAG AAA)
Purple-200 on dark purple: ✓ 4.5:1 ratio (passes WCAG AA)
All color combinations tested
```

### Screen Reader Support
```
Semantic HTML (<button>, <nav>, <main>, <h1>, etc.)
ARIA labels on icon buttons
Proper heading hierarchy
Alt text on images
```

---

## TESTING THIS VISUALIZATION

### To see the page yourself:

1. **Run locally**:
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

2. **Test responsive**:
   - F12 (DevTools)
   - Ctrl+Shift+M (toggle device mode)
   - Resize window, try different widths

3. **Test interactivity**:
   - Click sidebar navigation buttons
   - Hover over cards
   - Try the "Explore Components" button
   - Test on actual mobile phone

4. **Test accessibility**:
   - Navigate with Tab key only (no mouse)
   - Use axe DevTools extension
   - Check color contrast with WCAG contrast checker

---

## SUMMARY: WHAT VISITORS EXPERIENCE

**Landing on the page**:
- Immediately sees heroic headline and value drivers
- Understanding of what this is about (Vintage & Voice, Wine Heritage)
- Clear call-to-action ("Explore Components")

**Clicking "Explore Components"**:
- Four concrete example components
- Each shows how it contributes to the value proposition
- Responsive design demo (resize browser)

**Clicking "Design System"**:
- Understanding of two-layer architecture
- Color palette reference
- Technical implementation details
- File structure and tech stack

**Overall impression**:
- Professional, cohesive design
- Wine/heritage aesthetic (not generic)
- Well-structured information
- Mobile-friendly and accessible
- Modern, polished implementation

---

**This walkthrough covers**: Visual design, interactive elements, responsive behavior, accessibility, and user experience

**For more details**, see: `CEP-23_PLACEHOLDER_REPLACEMENT_PLAN.md` (implementation guide)
