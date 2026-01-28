# Spatial Studio — Design System & Web App Architecture

> **Brand Position:** Spatial Studio transforms learning activities and educational resources into actionable spaces that partners deploy to their customers.

---

## 1. Brand Overview

### Brand Identity
**Spatial Studio** is a B2B platform that empowers cultural institutions, educational organizations, and civic partners to create immersive, location-aware learning experiences.

### Value Proposition
*"Turn educational content into spaces your customers can explore."*

We provide the infrastructure for partners to:
- Transform static curriculum into interactive spatial experiences
- Deploy place-based learning at scale
- Measure engagement and impact across their customer base
- White-label solutions that extend their brand reach

### Target Audience (B2B)
| Segment | Description | Primary Need |
|---------|-------------|--------------|
| **Cultural Institutions** | Museums, libraries, historical societies | Extend reach beyond physical walls |
| **Educational Publishers** | Curriculum providers, EdTech companies | Differentiate with spatial learning |
| **Civic Organizations** | Government agencies, nonprofits | Community engagement at scale |
| **Tourism & DMOs** | Destination marketing organizations | Enriched visitor experiences |

---

## 2. Information Architecture

### Sitemap

```
SPATIAL STUDIO
│
├── HOME
│   └── Hero → Value Prop → Partner Types → How It Works → CTA
│
├── PLATFORM
│   ├── Overview
│   ├── Experience Builder (Studio)
│   ├── Content Library
│   ├── Analytics Dashboard
│   └── API & Integrations
│
├── SOLUTIONS
│   ├── For Cultural Institutions
│   ├── For Education
│   ├── For Civic Engagement
│   └── For Tourism & Destinations
│
├── RESOURCES
│   ├── Case Studies
│   ├── Documentation
│   ├── Webinars & Guides
│   └── Blog / Insights
│
├── PARTNERS
│   ├── Partner Program Overview
│   ├── Become a Partner
│   └── Partner Portal (Login)
│
├── COMPANY
│   ├── About
│   ├── Team
│   ├── Careers
│   └── Contact
│
└── [UTILITY]
    ├── Login / Dashboard
    ├── Pricing
    └── Demo Request
```

---

## 3. Page Structure & Wireframes

### 3.1 HOME PAGE

```
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION                                                 │
│  [Logo]  Platform  Solutions  Resources  Partners  [Login]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │  "Transform Learning Into                            │   │
│  │   Actionable Spaces"                                 │   │
│  │                                                      │   │
│  │  Enable your customers to explore educational        │   │
│  │  content through place-based experiences.            │   │
│  │                                                      │   │
│  │  [Request Demo]  [See Platform →]                    │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PARTNER SEGMENTS (4-up cards)                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Cultural │ │Education │ │  Civic   │ │ Tourism  │       │
│  │  Inst.   │ │          │ │          │ │          │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HOW IT WORKS (3-step flow)                                 │
│                                                             │
│  [1. Create]  →  [2. Deploy]  →  [3. Measure]              │
│   Build         White-label      Track engagement          │
│   experiences   for your         and learning              │
│   in Studio     customers        outcomes                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PLATFORM PREVIEW                                           │
│  [Screenshot/Video of Studio interface]                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SOCIAL PROOF                                               │
│  Partner logos │ "X experiences created" │ Testimonial      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CTA SECTION                                                │
│  "Ready to transform how your customers learn?"             │
│  [Schedule a Demo]                                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  Links │ Contact │ Legal │ Social                           │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 PLATFORM PAGE

```
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PAGE HERO                                                  │
│  "The Infrastructure for Spatial Learning"                  │
│  Everything you need to create, deploy, and measure         │
│  place-based educational experiences.                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FEATURE TABS                                               │
│  [Studio] [Library] [Analytics] [API]                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │  STUDIO - Experience Builder                         │   │
│  │                                                      │   │
│  │  • Drag-and-drop spatial content placement          │   │
│  │  • Multi-format support (AR, audio, video, text)    │   │
│  │  • Geofence and trigger configuration               │   │
│  │  • Preview and test before deployment               │   │
│  │                                                      │   │
│  │  [Screenshot of Studio interface]                    │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INTEGRATION ECOSYSTEM                                      │
│  LMS Integrations │ CMS Connectors │ Analytics Exports      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  CTA + FOOTER                                               │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 SOLUTIONS PAGE (Template)

```
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SOLUTION HERO                                              │
│  "Spatial Studio for [Segment]"                             │
│  [Segment-specific value proposition]                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CHALLENGE / OPPORTUNITY                                    │
│  "Your [customers] expect [outcome].                        │
│   Spatial Studio makes it possible."                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  USE CASES (3-4 specific applications)                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Use Case 1 │ │  Use Case 2 │ │  Use Case 3 │           │
│  │             │ │             │ │             │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CASE STUDY SPOTLIGHT                                       │
│  [Partner logo] + Results + Quote                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  CTA + FOOTER                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Visual Design Language

### 4.1 Design Principles

| Principle | Application |
|-----------|-------------|
| **Spatial** | Design conveys depth, layers, and place |
| **Professional** | Clean, enterprise-ready aesthetic |
| **Actionable** | Clear hierarchy, obvious CTAs |
| **Educational** | Supports comprehension and exploration |

### 4.2 Color Palette

```
PRIMARY
┌──────────────┐
│ Studio Blue  │  #1E3A5F  — Primary brand, headers, CTAs
└──────────────┘
┌──────────────┐
│ Action Teal  │  #0D9488  — Interactive elements, links
└──────────────┘

SECONDARY
┌──────────────┐
│ Warm Sand    │  #F5F0E8  — Backgrounds, cards
└──────────────┘
┌──────────────┐
│ Slate        │  #475569  — Body text
└──────────────┘

ACCENT
┌──────────────┐
│ Civic Gold   │  #D97706  — Highlights, badges
└──────────────┘
┌──────────────┐
│ Success      │  #059669  — Confirmations, metrics up
└──────────────┘
```

### 4.3 Typography

```
HEADINGS
Font: Inter or IBM Plex Sans
Weight: 600-700
Tracking: -0.02em

Display (Hero):     48-64px
H1:                 36-40px
H2:                 28-32px
H3:                 22-24px

BODY
Font: Inter or System UI
Weight: 400-500
Size: 16-18px
Line-height: 1.6

INTERFACE
Font: Inter
Weight: 500
Size: 14px
Used for: buttons, labels, navigation
```

### 4.4 Component Patterns

**Cards**
- Subtle shadow (0 1px 3px rgba)
- 8px border radius
- 24px internal padding
- Hover: lift effect (translateY -2px)

**Buttons**
- Primary: Solid fill, white text
- Secondary: Outline style
- Ghost: Text only with underline hover
- Height: 44px (touch-friendly)

**Forms**
- Label above input
- Clear error states
- Inline validation
- Progress indicators for multi-step

---

## 5. B2B Copy Guidelines

### 5.1 Voice & Tone

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Professional** | Enterprise-appropriate, no jargon overload | "Deploy experiences" not "Drop pins" |
| **Enabling** | Focus on what partners can achieve | "Enable your customers to..." |
| **Outcome-oriented** | Lead with results | "Increase engagement by..." |
| **Clear** | Accessible to non-technical buyers | Avoid unexplained acronyms |

### 5.2 Key Messaging Framework

**Primary Message:**
> "Spatial Studio transforms educational content into place-based experiences your customers can explore."

**Supporting Messages:**

1. **For Scale:**
> "Deploy spatial learning experiences to thousands of end users through your existing channels."

2. **For Differentiation:**
> "Give your customers something competitors can't—learning that happens in context, in place."

3. **For Measurement:**
> "Understand how your customers engage with content across locations, times, and learning paths."

4. **For Ease:**
> "No development team required. Build and launch experiences through our visual Studio interface."

### 5.3 Page-Specific Copy

#### HOME PAGE

**Hero Headline:**
> Transform Learning Into Actionable Spaces

**Hero Subhead:**
> Enable your customers to explore educational content through place-based experiences. Spatial Studio provides the infrastructure to create, deploy, and measure spatial learning at scale.

**CTA:**
> Request a Demo | See the Platform

---

**Partner Segments Section:**

*Cultural Institutions*
> Extend your mission beyond physical walls. Create spatial experiences that bring collections, history, and stories to communities wherever they are.

*Education*
> Transform curriculum into explorable spaces. Give educators tools to create place-based learning that connects concepts to real-world context.

*Civic Engagement*
> Meet citizens where they are. Deploy community programs, historical tours, and civic education through accessible spatial experiences.

*Tourism & Destinations*
> Enrich every visit. Provide visitors with layered, educational experiences that deepen connection to place.

---

**How It Works:**

*Step 1: Create*
> Build spatial experiences in Studio. Import your content, place it on maps, configure triggers and pathways—no code required.

*Step 2: Deploy*
> White-label for your brand. Publish to your apps, websites, or our universal player. Reach customers through your existing channels.

*Step 3: Measure*
> Track engagement and outcomes. Understand how customers interact with content across locations, learning paths, and time.

---

**Social Proof Section:**
> Trusted by [X] partners to deliver [Y] experiences to [Z] end users.

---

**Bottom CTA:**
> Ready to transform how your customers learn?
> [Schedule a Demo]

---

#### PLATFORM PAGE

**Page Hero:**
> The Infrastructure for Spatial Learning

> Everything you need to create, deploy, and measure place-based educational experiences—without building from scratch.

---

**Studio Tab:**
> **Experience Builder**
>
> Design spatial learning experiences through an intuitive visual interface. Place content on maps, define triggers and pathways, preview in real-time.
>
> - Drag-and-drop content placement
> - Multi-format support: audio, video, AR, text, quizzes
> - Geofence and proximity trigger configuration
> - Branching pathways and conditional content
> - Real-time preview and testing

---

**Library Tab:**
> **Content Library**
>
> Organize, manage, and reuse content across experiences. Import from existing systems or create directly in Studio.
>
> - Centralized asset management
> - Version control and publishing workflows
> - Tagging and search
> - Import from CMS, DAM, or direct upload

---

**Analytics Tab:**
> **Analytics Dashboard**
>
> Understand engagement across your entire spatial learning portfolio. Track completions, dwell time, popular pathways, and learning outcomes.
>
> - Real-time engagement metrics
> - Cohort and segment analysis
> - Learning outcome tracking
> - Export to your BI tools

---

**API Tab:**
> **API & Integrations**
>
> Connect Spatial Studio to your existing technology stack. Automate content sync, user management, and analytics export.
>
> - RESTful API with comprehensive documentation
> - LMS integrations (SCORM, xAPI, LTI)
> - SSO and identity provider support
> - Webhook notifications

---

#### SOLUTIONS: Cultural Institutions

**Hero:**
> Spatial Experiences for Cultural Institutions

> Extend your mission beyond physical walls. Create place-based experiences that bring collections, stories, and history to communities—wherever they are.

---

**Challenge:**
> Your visitors want to engage with your institution beyond the museum floor. Your collections tell stories that connect to places across your community and beyond. But building custom apps is expensive, and maintaining them is unsustainable.

---

**Use Cases:**

*Community History Trails*
> Connect your collections to the places where history happened. Create walking tours that link artifacts to actual locations.

*Educator Resources*
> Give teachers place-based curriculum tied to your collections. Enable field trips that extend into neighborhoods and continue in classrooms.

*Traveling Exhibitions*
> Take your exhibitions on the road—digitally. Create spatial experiences that partner institutions can deploy in their communities.

*Membership Engagement*
> Offer members exclusive spatial content. Deepen relationships through experiences they can explore on their own time.

---

#### SOLUTIONS: Education

**Hero:**
> Spatial Learning for Education Partners

> Transform curriculum into explorable spaces. Give educators the tools to create place-based learning experiences that connect concepts to real-world context.

---

**Use Cases:**

*Place-Based Curriculum*
> Tie learning objectives to specific locations. Students explore concepts through the lens of their own communities.

*Field Trip Enhancement*
> Extend field trips before, during, and after. Provide structured exploration with built-in assessment.

*STEM in Context*
> Connect science, math, and engineering concepts to observable phenomena in the environment.

*Social Studies & Civics*
> Make history and government tangible through location-based primary sources and civic engagement activities.

---

#### SOLUTIONS: Civic Engagement

**Hero:**
> Spatial Experiences for Civic Organizations

> Meet citizens where they are. Deploy community programs, historical interpretation, and civic education through accessible, place-based experiences.

---

**Use Cases:**

*Heritage Trails*
> Interpret historic sites, districts, and cultural landscapes through rich, location-triggered content.

*Community Programs*
> Deploy health initiatives, environmental education, and public safety information tied to relevant locations.

*Civic Participation*
> Guide citizens through civic processes with location-aware information about voting, public meetings, and community resources.

*Event Programming*
> Create spatial experiences for festivals, commemorations, and public events that visitors explore independently.

---

## 6. Interaction Patterns

### 6.1 Partner Journey

```
AWARENESS          CONSIDERATION         DECISION           ONBOARDING
    │                    │                   │                   │
    ▼                    ▼                   ▼                   ▼
┌─────────┐        ┌───────────┐      ┌───────────┐      ┌───────────┐
│ Content │   →    │  Demo     │  →   │ Proposal  │  →   │ Training  │
│ & SEO   │        │  Request  │      │ & Contract│      │ & Launch  │
└─────────┘        └───────────┘      └───────────┘      └───────────┘
    │                    │                   │                   │
    │                    │                   │                   │
 Blog, Case         Guided demo,        Pricing,          Documentation,
 Studies,           Use case            SOW,              Success mgr,
 Webinars           workshop            Pilot             Certification
```

### 6.2 Demo Request Flow

1. User clicks "Request Demo"
2. Modal/page with form:
   - Organization name
   - Your role
   - Organization type (dropdown: Cultural, Education, Civic, Tourism, Other)
   - Primary use case (brief text)
   - Email
   - Phone (optional)
3. Confirmation with next steps
4. Calendar scheduling link in follow-up email

### 6.3 Partner Portal (Authenticated)

```
DASHBOARD
├── My Experiences (list/grid view)
├── Analytics Overview
├── Content Library
├── Team & Permissions
├── Account & Billing
└── Help & Documentation
```

---

## 7. Technical Considerations

### 7.1 Recommended Stack

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Frontend** | Next.js + React | SEO for marketing, app-like dashboard |
| **Styling** | Tailwind CSS | Rapid development, design system alignment |
| **CMS** | Headless (Sanity/Contentful) | Marketing team independence |
| **Auth** | Auth0 or Clerk | Enterprise SSO requirements |
| **Analytics** | Segment + Mixpanel | Event tracking, funnel analysis |

### 7.2 Performance Targets

- LCP < 2.5s (marketing pages)
- FID < 100ms
- CLS < 0.1
- Lighthouse score > 90

### 7.3 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Screen reader optimization
- Reduced motion support

---

## 8. Implementation Phases

### Phase 1: Foundation
- [ ] Marketing site (Home, Platform, Solutions)
- [ ] Demo request flow
- [ ] Basic analytics

### Phase 2: Resources & Content
- [ ] Blog/Insights
- [ ] Case studies
- [ ] Documentation site

### Phase 3: Partner Experience
- [ ] Partner portal authentication
- [ ] Dashboard MVP
- [ ] Self-service onboarding

### Phase 4: Scale
- [ ] Full analytics dashboard
- [ ] API documentation
- [ ] Partner program management

---

## Appendix: USA250 Context

Spatial Studio is positioned to support **USA250**—the 250th anniversary of the United States in 2026. This provides:

- **Urgency:** Partners preparing for commemorative programming
- **Relevance:** Place-based learning aligns with anniversary themes
- **Scale:** National scope with local implementation
- **Legacy:** Infrastructure that outlasts the commemoration

---

*Document Version: 1.0*
*Last Updated: 2026-01-28*
