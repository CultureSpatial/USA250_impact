# Spatial Studio — Brand Tokens

Quick reference for design implementation.

---

## Colors

### Primary
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Studio Blue | `#1E3A5F` | 30, 58, 95 | Headers, primary CTAs, brand anchors |
| Action Teal | `#0D9488` | 13, 148, 136 | Interactive elements, links, secondary CTAs |

### Neutral
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Warm Sand | `#F5F0E8` | 245, 240, 232 | Page backgrounds, card fills |
| Slate | `#475569` | 71, 85, 105 | Body text |
| Slate Light | `#64748B` | 100, 116, 139 | Secondary text, captions |
| Slate Dark | `#1E293B` | 30, 41, 59 | Headings on light backgrounds |

### Accent
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Civic Gold | `#D97706` | 217, 119, 6 | Highlights, badges, attention |
| Success | `#059669` | 5, 150, 105 | Confirmations, positive metrics |
| Error | `#DC2626` | 220, 38, 38 | Errors, destructive actions |

### Backgrounds
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Cards, modals |
| Off-white | `#FAFAF9` | Alternate sections |
| Warm Sand | `#F5F0E8` | Primary background |
| Dark | `#1E293B` | Footer, dark sections |

---

## Typography

### Font Stack
```css
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Scale
| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `display` | 64px | 700 | 1.1 | -0.02em |
| `h1` | 40px | 700 | 1.2 | -0.02em |
| `h2` | 32px | 600 | 1.25 | -0.01em |
| `h3` | 24px | 600 | 1.3 | -0.01em |
| `h4` | 20px | 600 | 1.4 | 0 |
| `body-lg` | 18px | 400 | 1.6 | 0 |
| `body` | 16px | 400 | 1.6 | 0 |
| `body-sm` | 14px | 400 | 1.5 | 0 |
| `caption` | 12px | 500 | 1.4 | 0.02em |
| `button` | 14px | 500 | 1 | 0.01em |

---

## Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

---

## Borders & Radii

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

--border-width: 1px;
--border-color: #E2E8F0;
--border-color-dark: #CBD5E1;
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

---

## Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## Motion

```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## Component Tokens

### Buttons
```css
/* Primary */
--btn-primary-bg: var(--color-studio-blue);
--btn-primary-text: #FFFFFF;
--btn-primary-hover: #162D4A;

/* Secondary */
--btn-secondary-bg: transparent;
--btn-secondary-border: var(--color-studio-blue);
--btn-secondary-text: var(--color-studio-blue);

/* Ghost */
--btn-ghost-text: var(--color-action-teal);
--btn-ghost-hover-bg: rgba(13, 148, 136, 0.1);

/* Sizing */
--btn-height-sm: 36px;
--btn-height-md: 44px;
--btn-height-lg: 52px;
--btn-padding-x: 24px;
```

### Cards
```css
--card-bg: #FFFFFF;
--card-border: var(--border-color);
--card-radius: var(--radius-md);
--card-padding: var(--space-6);
--card-shadow: var(--shadow-sm);
--card-shadow-hover: var(--shadow-md);
```

### Inputs
```css
--input-height: 44px;
--input-padding-x: 16px;
--input-bg: #FFFFFF;
--input-border: var(--border-color);
--input-border-focus: var(--color-action-teal);
--input-radius: var(--radius-md);
```

---

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'studio-blue': '#1E3A5F',
        'action-teal': '#0D9488',
        'warm-sand': '#F5F0E8',
        'civic-gold': '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

---

*Token Version: 1.0*