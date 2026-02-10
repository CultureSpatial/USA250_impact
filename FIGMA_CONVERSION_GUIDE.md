# FIGMA CONVERSION GUIDE

**Converting SVG Boilerplate to Figma Design System**

---

## OVERVIEW

This guide shows how to convert the SVG visual boilerplate files into a professional Figma design system for Place Packet design evolution.

**SVG Files to Convert**:
1. `design-tokens-visual.svg` - Token architecture diagram
2. `spatial-studio-logo-evolution.svg` - Logo lockups
3. `place-packet-card-examples.svg` - Card component examples
4. `layout-structure-diagram.svg` - Layout patterns

**Target**: Figma file with:
- Design token library (colors, typography, spacing)
- Component library (buttons, cards, layouts)
- Logo assets (all variations)
- Template pages (for designers to start from)

---

## METHOD 1: DIRECT SVG IMPORT (RECOMMENDED)

### Step 1: Create New Figma File

1. Go to Figma.com → Create new Design file
2. Name it: **"Place Packet Design System"**
3. Create these pages:
   - 🎨 **Design Tokens**
   - 🧩 **Components**
   - 🖼️ **Logo Assets**
   - 📐 **Layout Templates**
   - 📖 **Documentation**

### Step 2: Import SVG Files

**For each SVG file**:

1. Open SVG in browser or code editor
2. Copy the SVG code
3. In Figma:
   - Press **Cmd/Ctrl + V** to paste
   - OR: File → Place Image → Select SVG file
4. SVG will import as a vector group

**Tips**:
- SVGs import at their native size
- You may need to scale down (maintain aspect ratio)
- Ungroup layers to access individual elements

### Step 3: Convert to Figma Components

#### Import `design-tokens-visual.svg` → Design Tokens Page

1. Import SVG to Figma
2. Ungroup layers
3. Extract colors:
   - Select each color circle
   - Note the fill color (e.g., #10B981)
   - Add to Figma color styles (see Step 4 below)
4. Extract typography:
   - Note font families, sizes, weights from text layers
   - Create text styles (see Step 5 below)
5. Delete the imported SVG (you've extracted what you need)

#### Import `spatial-studio-logo-evolution.svg` → Logo Assets Page

1. Import SVG to Figma
2. Ungroup to access individual logo variations
3. For each logo:
   - Select the logo group
   - Right-click → Create Component
   - Name it: "Logo / Primary", "Logo / Monochrome", etc.
4. Arrange components in a grid
5. Add descriptions (usage notes)

#### Import `place-packet-card-examples.svg` → Components Page

1. Import SVG to Figma
2. Ungroup to access individual cards (Wine, Trails, Sound)
3. For each card:
   - Select the card group
   - Right-click → Create Component
   - Name it: "Place Packet Card / Wine", etc.
4. Create variants:
   - Select all card components
   - Right-click → Combine as Variants
   - Add property: **Context** (Wine, Trails, Sound)
   - Add property: **State** (Default, Hover, Active)

#### Import `layout-structure-diagram.svg` → Layout Templates Page

1. Import SVG to Figma
2. This becomes your reference for building actual page layouts
3. Create frames at standard sizes:
   - Desktop: 1440 x 900
   - Tablet: 768 x 1024
   - Mobile: 375 x 812
4. Recreate the layout using Figma components (not SVG import)

---

## METHOD 2: MANUAL RECREATION (HIGHER QUALITY)

If SVG imports look pixelated or lose quality, recreate in Figma natively.

### Step 1: Set Up Color Styles

**From `design-tokens-visual.svg`**, create these color styles:

#### Spatial Studio Core
```
Brand/Primary        #10B981  (emerald-600)
Brand/Secondary      #312E81  (indigo-900)
Brand/Dark           #0F172A  (slate-900)
```

#### Wine Heritage Context
```
Wine/Primary         #9333EA  (purple-600)
Wine/Secondary       #DB2777  (pink-600)
Wine/Accent          #F87171  (red-400)
Wine/Light           #E9D5FF  (purple-200)
Wine/Lighter         #F3E8FF  (purple-100)
```

#### Freedom Trails Context
```
Trails/Primary       #1E40AF  (blue-800)
Trails/Secondary     #B45309  (amber-700)
Trails/Accent        #FDE047  (yellow-300)
Trails/Light         #BFDBFE  (blue-200)
Trails/Lighter       #DBEAFE  (blue-100)
```

#### Sound Clash Context
```
Sound/Primary        #EA580C  (orange-500)
Sound/Secondary      #06B6D4  (cyan-500)
Sound/Accent         #F59E0B  (amber-500)
Sound/Light          #FEF3C7  (amber-100)
Sound/Lighter        #FFFBEB  (amber-50)
```

**How to Create**:
1. Select any shape
2. Click fill color
3. Click "+" icon next to "Color styles"
4. Name it using the pattern above
5. Repeat for all colors

### Step 2: Set Up Typography Styles

**From layout diagrams**, create these text styles:

```
Heading/H1           32px, Bold, Sans-serif
Heading/H2           24px, Bold, Sans-serif
Heading/H3           20px, Bold, Sans-serif
Heading/H4           18px, Bold, Sans-serif

Body/Large           16px, Regular, Sans-serif
Body/Base            14px, Regular, Sans-serif
Body/Small           12px, Regular, Sans-serif

Label/Uppercase      10px, Bold, Sans-serif, Letter spacing: 0.1em, All caps
Label/Badge          9px, Bold, Sans-serif

Code/Mono            12px, Regular, Monaco/Monospace
```

**How to Create**:
1. Create a text layer
2. Style it (size, weight, etc.)
3. Click "..." next to Text style
4. Create new style
5. Name it using pattern above

### Step 3: Set Up Effect Styles (Shadows)

**From component examples**, create:

```
Shadow/Small         0px 2px 4px rgba(0,0,0,0.1)
Shadow/Medium        0px 4px 8px rgba(0,0,0,0.15)
Shadow/Large         0px 10px 30px rgba(0,0,0,0.2)
Shadow/Wine Glow     0px 10px 30px rgba(147,51,234,0.5)
Shadow/Trail Glow    0px 10px 30px rgba(59,130,246,0.5)
Shadow/Sound Glow    0px 10px 30px rgba(234,88,12,0.5)
```

**How to Create**:
1. Select any shape
2. Add "Drop shadow" effect
3. Configure blur, offset, color
4. Click "..." → Create style
5. Name it

### Step 4: Create Logo Components

**From `spatial-studio-logo-evolution.svg`**:

#### Primary Logo
1. Create a frame 200x200
2. Draw circle (r=35px), fill: Brand/Primary (#10B981)
3. Draw triangle inside circle (white)
4. Add circle inside triangle (white, r=4px)
5. Add text below: "SPATIAL" (Heading/H3)
6. Add text below: "STUDIO" (Label/Uppercase)
7. Group all → Right-click → Create Component
8. Name: "Logo / Primary"

#### Context Variations
Repeat for each context (Wine, Trails, Sound):
1. Duplicate "Logo / Primary"
2. Change circle fill to context primary color
3. Add context icon overlay (Wine glass, Map pin, Music note)
4. Change text color to context light color
5. Create component: "Logo / Wine", "Logo / Trails", etc.

**Pro Tip**: Use component properties to switch between contexts

### Step 5: Create Place Packet Card Components

**From `place-packet-card-examples.svg`**:

#### Base Card Structure
1. Create frame 380x650, rounded corners 24px
2. Add background: Wine/Primary with 20% opacity
3. Add border: Wine/Primary, 2px
4. Add shadow: Shadow/Wine Glow

#### Card Header
1. Frame 380x100, rounded top corners 24px
2. Linear gradient fill: Wine/Primary → Wine/Secondary
3. Add icon circle (r=28px, white 20% opacity)
4. Add emoji: 🍷
5. Add title text: "Prohibition Cellar" (Body/Large, Bold)
6. Add subtitle: "Willamette Valley, OR" (Body/Small)

#### Card Content
1. Section title: "Crime Context (1920-1933)" (Body/Base, Bold, Wine/Accent)
2. Body text: Description (Body/Base, white 80%)
3. Divider line: Wine/Primary 30% opacity
4. Section title: "Cultural Transformation (Today)" (Body/Base, Bold, Wine/Light)
5. Body text: Description (Body/Base, white 90%)

#### Interactive Elements
1. Map preview frame: 320x140, rounded 12px, Wine/Primary 30% opacity
2. Button 1: "🎧 Audio Tour" (Wine/Primary fill, white text)
3. Button 2: "💬 Join Discussion" (transparent, Wine/Primary border)

#### Create Component Variants
1. Select all layers → Create Component
2. Add variant property: **Context** (Wine, Trails, Sound)
3. Duplicate and change colors for each context
4. Add variant property: **State** (Default, Hover, Active)

### Step 6: Create Layout Templates

**From `layout-structure-diagram.svg`**:

#### Desktop Layout (1440 x 900)
1. Create frame: 1440 x 900
2. Left sidebar: 384px wide, white background
   - Logo area at top
   - Phase selector buttons
   - Card list (use Place Packet Card components)
   - CTA footer
3. Right canvas: Flex fill remaining width
   - Header bar: 80px tall
   - Content area: Flex fill
   - Apply context gradient background

#### Tablet Layout (768 x 1024)
1. Create frame: 768 x 1024
2. Collapsible sidebar (280px when open)
3. Canvas fills remaining space

#### Mobile Layout (375 x 812)
1. Create frame: 375 x 812
2. Bottom sheet navigation (slides up)
3. Canvas fills full screen

**Use Auto Layout**:
- Sidebar items stack vertically
- Header items horizontal
- Buttons use padding: 12px 20px

---

## METHOD 3: USE FIGMA PLUGIN (AUTOMATED)

### SVG to Figma Plugin

1. Install plugin: "SVGOMG" or "SVG Import"
2. Open plugin in Figma
3. Select SVG file from your computer
4. Plugin imports and optimizes SVG
5. Ungroup and extract elements

### Color Palette Plugin

1. Install plugin: "Stark" or "Color Contrast Checker"
2. Run plugin on your design
3. Plugin extracts all colors
4. Create color styles automatically
5. Check WCAG compliance

---

## DESIGN TOKEN LIBRARY STRUCTURE

Once colors, typography, and effects are created, organize them:

### Figma File Structure
```
📄 Place Packet Design System.fig
├── 🎨 Design Tokens
│   ├── Colors (all color styles visible as swatches)
│   ├── Typography (all text styles with examples)
│   ├── Spacing (grid showing 4px, 8px, 12px, 16px, etc.)
│   ├── Shadows (shapes with each shadow applied)
│   └── Border Radius (rectangles showing rounded corners)
│
├── 🧩 Components
│   ├── Buttons
│   │   ├── Primary (variants: Default, Hover, Active, Disabled)
│   │   ├── Secondary (variants)
│   │   └── Ghost (variants)
│   ├── Cards
│   │   └── Place Packet Card (variants: Wine, Trails, Sound x Default, Hover, Active)
│   ├── Navigation
│   │   ├── Sidebar
│   │   └── Header Bar
│   └── Forms (if needed later)
│
├── 🖼️ Logo Assets
│   ├── Logo / Primary
│   ├── Logo / Monochrome
│   ├── Logo / Icon Only
│   ├── Logo / Horizontal
│   ├── Logo / Wine
│   ├── Logo / Trails
│   └── Logo / Sound
│
├── 📐 Layout Templates
│   ├── Desktop (1440x900)
│   ├── Tablet (768x1024)
│   └── Mobile (375x812)
│
└── 📖 Documentation
    ├── Cover page (project overview)
    ├── How to use this file
    ├── Color usage guidelines
    ├── Typography hierarchy
    └── Component usage examples
```

---

## EXPORTING FROM FIGMA

### For Developers

**Export Design Tokens** (JSON):
1. Install plugin: "Design Tokens"
2. Run plugin
3. Export tokens as JSON
4. Import into your codebase

**Export Components** (SVG/PNG):
1. Select component
2. Right panel → Export settings
3. Add export: SVG (vector) or PNG (raster)
4. Click Export

**Export Code Snippets**:
1. Select component
2. Right panel → "Code" tab
3. Copy CSS/React code

### For Handoff

**Use Figma's Dev Mode**:
1. Share file with developers
2. They can inspect components
3. Get CSS, measurements, colors automatically

---

## MAINTENANCE

### Keeping Figma in Sync with Code

**Weekly**:
- Review code changes
- Update Figma components to match
- Version the Figma file (duplicate for each major version)

**Monthly**:
- Audit color usage (are all colors from library?)
- Check for unused components
- Update documentation

**After Major Updates**:
- Create new page: "V2.0 Archive"
- Move old components there
- Update main pages with new designs

---

## COLLABORATION WORKFLOW

### For Design Team

1. **Designer creates variation**:
   - Duplicate component
   - Modify colors/layout
   - Share link with team

2. **Team reviews**:
   - Comment in Figma
   - Suggest changes
   - Approve

3. **Designer publishes**:
   - Update component in library
   - Notify developers
   - Document changes

### For Developers

1. **Developer needs asset**:
   - Open Figma file (Dev Mode)
   - Find component
   - Inspect properties
   - Copy code or export asset

2. **Developer has question**:
   - Add comment in Figma
   - Tag designer
   - Designer responds with clarification

---

## TOOLS & PLUGINS RECOMMENDED

### Essential Plugins

1. **Color Contrast Checker** - WCAG compliance
2. **Design Tokens** - Export to JSON
3. **Iconify** - Import Lucide icons (Wine, MapPin, Music)
4. **Auto Layout** - Better responsive design
5. **Component Inspector** - See all instances of a component

### Optional Plugins

1. **Content Reel** - Populate with realistic content
2. **Unsplash** - Add placeholder images
3. **Lorem Ipsum** - Generate text
4. **Figma to Code** - Generate React components

---

## FIGMA FILE CHECKLIST

Before sharing with team:

- [ ] All colors added as styles (30+ colors)
- [ ] All text styles created (12+ styles)
- [ ] Logo components created (7+ variations)
- [ ] Place Packet Card variants created (Wine, Trails, Sound)
- [ ] Layout templates created (Desktop, Tablet, Mobile)
- [ ] Documentation page with usage guidelines
- [ ] Cover page with project overview
- [ ] File organized into pages
- [ ] Layers properly named (no "Rectangle 1", "Group 2")
- [ ] Components published to library
- [ ] Accessibility checked (contrast ratios)
- [ ] File shared with team (View or Edit access)

---

## QUICK START WORKFLOW

**For someone starting from scratch** (30-60 minutes):

1. **Create file** (5 min)
   - New Figma file
   - Name it
   - Create pages

2. **Import SVGs** (10 min)
   - Import all 4 SVG files
   - Place on appropriate pages
   - Ungroup layers

3. **Extract colors** (10 min)
   - Note all colors from SVGs
   - Create color styles (30+ colors)
   - Apply to test shapes

4. **Create logo** (15 min)
   - Recreate primary logo
   - Create context variations
   - Make components

5. **Create card** (20 min)
   - Build wine heritage card
   - Add variants (hover, active)
   - Create trails and sound variants

**Done!** You now have a functional Figma design system.

---

## RESOURCES

**Figma Tutorials**:
- [Figma Learn: Components](https://www.figma.com/community/file/903303571898472063)
- [Figma Learn: Design Systems](https://www.figma.com/community/file/903303571898472063)
- [Figma Learn: Variants](https://www.figma.com/best-practices/creating-and-organizing-variants/)

**Design Token Tools**:
- [Figma Tokens Plugin](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens)
- [Style Dictionary](https://amzn.github.io/style-dictionary/) - Transform tokens to code

**Accessibility**:
- [Stark Plugin](https://www.figma.com/community/plugin/732603254453395948/Stark) - Check contrast
- [A11y Color Tokens](https://www.figma.com/community/plugin/774493311505865905) - Generate accessible palettes

---

## NEXT STEPS

1. **Start with Method 1** (Import SVGs) for quick prototype
2. **Upgrade to Method 2** (Manual recreation) for production quality
3. **Share Figma file** with design team
4. **Export tokens** to JSON for developers
5. **Iterate** based on NYWGF pilot feedback

**Questions?** Reference the [Design Evolution Index](DESIGN_EVOLUTION_INDEX.md)
