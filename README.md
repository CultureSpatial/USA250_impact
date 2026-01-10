# USA250 Impact GTM Component Library

Content apparatus for USA250 Story Trails with after-event impact and infrastructure integration (FDAGI format), focused on tourist consumption and spatial intelligence.

## Overview

A comprehensive React component library for Go-To-Market (GTM) strategy visualization and guild management systems. Built for USA250 Story Trails infrastructure deployment, featuring spatial intelligence dashboards, market mirroring analysis, and collaborative mapping integration with Felt.com.

### Key Components

- **GTM Accelerator Dashboard** - Spatial intelligence for market strategy
- **Guild Academy Charter** - Technical infrastructure R&D framework
- **Humancode Wine** - Crime-to-Culture narrative engine for heritage tourism
- **Integration Examples** - Production-ready implementation patterns

---

## 🔗 Atlassian Compass Integration Status

**Check Connection Status**:
```bash
node scripts/check-compass-connection.js
```

| Status | Item | Action |
|--------|------|--------|
| ⚠️ | API Connection | [Setup Required](./COMPASS_SETUP_GUIDE.md) |
| ⚠️ | Component Registration | Register 3 components in Compass |
| ⚠️ | GitHub Link | Link to https://github.com/cultura-d/USA250_impact |
| ⚠️ | Jira Traceability | Add ticket references (OTEC-22, CUL-19, CUL-20) |

**Quick Setup** (~30 mins): Follow [COMPASS_SETUP_GUIDE.md](./COMPASS_SETUP_GUIDE.md)

**Full Status Report**: [COMPASS_STATUS_REPORT.md](./COMPASS_STATUS_REPORT.md)

---

## Quick Start

```bash
npm install
npm run dev
```

## Component Usage

### GTM Accelerator Dashboard

```tsx
import { GTMAcceleratorDashboard } from '@usa250/impact-gtm-components';

function App() {
  return <GTMAcceleratorDashboard />;
}
```

### Guild Academy Charter

```tsx
import { GuildAcademyCharter } from '@usa250/impact-gtm-components';

function App() {
  return <GuildAcademyCharter />;
}
```

### Humancode Wine (Narrative Engine)

```tsx
import { HumancodeWine } from '@usa250/impact-gtm-components';

function App() {
  return <HumancodeWine />;
}
```

### Unified Dashboard (Recommended)

```tsx
import { UnifiedGTMApp } from '@usa250/impact-gtm-components/examples';

function App() {
  return <UnifiedGTMApp />;
}
```

## Features

### GTM Accelerator Dashboard

- 🗺️ **Spatial Intelligence** - Market mirroring and node activation
- 📊 **GTM Scoring** - Real-time market propensity analysis
- 🌍 **Multi-Region Support** - PNW, EU-West, BC-Canada markets
- 🔗 **Felt.com Integration** - Deploy to collaborative maps
- ⚡ **Live Sync** - 30-second data refresh intervals

### Guild Academy Charter

- 🎓 **PBL Methodology** - Project-based learning framework
- 🤖 **AI Articulation Literacy** - Non-technical contribution enablement
- 🔬 **UMCES-CGC Foundation** - Environmental telemetry integration
- 🏛️ **Constitutional Bounds** - AI + Human partnership framework
- 📜 **Verifiable Credentials** - Technical architect certification

## Integration Patterns

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed patterns:

1. **Standalone Deployment** - Individual components
2. **Unified Dashboard** - Combined GTM + Guild management
3. **Felt.com Spatial Integration** - Collaborative mapping
4. **Data-Driven External API** - Live data feeds
5. **Event-Driven Communication** - Cross-component state
6. **Embedded Widget Mode** - CMS integration
7. **Multi-Tenant Guild** - Regional deployments
8. **AI Copilot Integration** - UMCES-CGC model
9. **Narrative Tourism Integration** 🆕 - Crime-to-Culture storytelling
10. **Atlassian Compass Sync** 🆕 - Full-stack component tracking

See [COMPASS_CROSSWALK.md](./COMPASS_CROSSWALK.md) for Atlassian Compass integration and component mapping.

## Architecture

```
components/
├── gtm/
│   └── GTMAcceleratorDashboard.tsx
├── guild/
│   └── GuildAcademyCharter.tsx
├── narrative/
│   └── HumancodeWine.tsx
└── index.tsx

src/
└── examples/
    ├── UnifiedGTMDashboard.tsx
    ├── FeltIntegration.tsx
    └── index.ts

docs/
├── INTEGRATION_GUIDE.md
├── COMPASS_CROSSWALK.md
└── COMPONENT_LIBRARY_SUMMARY.md
```

## Integration Outcomes

| Pattern | Performance | Complexity | Scalability | Use Case |
|---------|-------------|------------|-------------|----------|
| Standalone | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐ | Single-purpose |
| Unified Dashboard | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Operations |
| Felt Spatial | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Collaboration |
| Data-Driven API | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Enterprise |

## Tourist Consumption Layer

Components integrate with USA250 Story Trails infrastructure:

- **Sensor Deployment** - Environmental telemetry at heritage sites
- **Guild-Trained Guides** - Technical monitors for story trails
- **Revenue Transparency** - Hospitality integration tracking
- **Impact Analytics** - Ecological + economic monitoring

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Format code
npm run format
```

## Environment Variables

```bash
FELT_API_KEY=your_felt_api_key
UMCES_CGC_ENDPOINT=https://cgc.umces.edu/api
GTM_ANALYTICS_URL=https://analytics.usa250.org
```

## Documentation

- [Integration Guide](./INTEGRATION_GUIDE.md) - 10 comprehensive integration patterns
- [Compass Crosswalk](./COMPASS_CROSSWALK.md) - Atlassian Compass component mapping & GraphQL API
- [Component Library Summary](./COMPONENT_LIBRARY_SUMMARY.md) - Implementation metrics and outcomes
- [API Reference](./docs/API.md) - Component props and types (coming soon)
- [Contributing](./CONTRIBUTING.md) - Development guidelines (coming soon)

## License

MIT License - See [LICENSE](./LICENSE) for details

## Support

- **Technical**: guild-academy@usa250.org
- **Felt.com API**: https://feltmaps.notion.site/Felt-Public-API
- **UMCES-CGC**: https://cgc.umces.edu/learning-resources

## Version

**v1.0.0** | January 9, 2026 | ARIA-X Technical Council + OTEC Constitutional Framework
