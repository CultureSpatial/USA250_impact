# Atlassian Compass Integration & Component Crosswalk

**Date**: January 9, 2026
**Version**: 1.0.0
**Authority**: ARIA-X Technical Council + OTEC Constitutional Framework

---

## Executive Summary

This document provides a comprehensive crosswalk between the USA250 Impact GTM Component Library and Atlassian Compass component architecture. It maps React UI components to Compass service components, documents integration patterns, and provides GraphQL API examples for synchronization.

---

## Compass Overview

Atlassian Compass is a developer experience platform that brings disconnected information about engineering output together in a single place. It uses a component-based architecture where:

- **Components** = Microservices, libraries, or applications tracked in your software catalog
- **Projects** = Groups of related components working toward business objectives
- **APIs** = Specifications that define how components interact
- **Dependencies** = Relationships between components

**Our Integration Goal**: Map React UI components to Compass service components for full-stack visibility from GTM strategy → Code → Infrastructure.

---

## Component Crosswalk Matrix

### React Components → Compass Components Mapping

| React Component | Compass Component Type | Compass Component Name | Repository | Status |
|-----------------|------------------------|------------------------|------------|--------|
| GTMAcceleratorDashboard | APPLICATION | usa250-gtm-dashboard | USA250_impact | Active |
| GuildAcademyCharter | APPLICATION | usa250-guild-charter | USA250_impact | Active |
| HumancodeWine | APPLICATION | usa250-narrative-engine | USA250_impact | Active |
| UnifiedGTMDashboard | APPLICATION | usa250-unified-dashboard | USA250_impact | Active |
| FeltIntegration | LIBRARY | usa250-felt-integration | USA250_impact | Pipeline |

### Backend Services → Compass Components (To Be Created)

| Service Name | Compass Component Type | Purpose | Dependencies | Jira Ticket |
|--------------|------------------------|---------|--------------|-------------|
| GTM Analytics API | SERVICE | Real-time market propensity calculations | usa250-gtm-dashboard | OTEC-22 |
| Guild Member API | SERVICE | PBL cohort and credential management | usa250-guild-charter | CUL-19 |
| Felt.com Proxy | SERVICE | GeoJSON transformation & deployment | usa250-felt-integration | OTEC-23 |
| UMCES-CGC Connector | SERVICE | Environmental telemetry data pipeline | usa250-guild-charter | OTEC-24 |
| Narrative CMS | SERVICE | Crime-to-culture story content management | usa250-narrative-engine | CUL-20 |

### Infrastructure Components → Compass Components

| Infrastructure | Compass Component Type | Purpose | Owner |
|----------------|------------------------|---------|-------|
| Vercel Deployment | CLOUD_RESOURCE | Frontend hosting for GTM dashboards | DevOps |
| AWS Lambda (GTM Analytics) | CLOUD_RESOURCE | Serverless GTM score calculations | Backend Team |
| PostgreSQL (Guild DB) | DATA_STORE | Guild member credentials & PBL tracking | Data Team |
| Redis Cache | DATA_STORE | GTM node data caching (15min TTL) | Backend Team |

---

## Compass Project Structure

### Project: USA250 Impact GTM Platform

**Project ID**: `usa250-impact-gtm`
**Owner**: ARIA-X Technical Council
**Status**: Active Development
**Links**:
- Jira Board: [OTEC Project Board](https://cultura-d.atlassian.net/browse/OTEC)
- Linear Board: [CUL Initiatives](https://linear.app/cultura-d/team/CUL)
- GitHub: [USA250_impact](https://github.com/cultura-d/USA250_impact)

**Component Hierarchy**:

```
USA250 Impact GTM Platform [PROJECT]
│
├── Frontend Applications [COMPONENT GROUP]
│   ├── usa250-gtm-dashboard [APPLICATION]
│   ├── usa250-guild-charter [APPLICATION]
│   ├── usa250-narrative-engine [APPLICATION]
│   └── usa250-unified-dashboard [APPLICATION]
│
├── Integration Libraries [COMPONENT GROUP]
│   ├── usa250-felt-integration [LIBRARY]
│   ├── usa250-component-library [LIBRARY]
│   └── usa250-shared-types [LIBRARY]
│
├── Backend Services [COMPONENT GROUP]
│   ├── gtm-analytics-api [SERVICE]
│   ├── guild-member-api [SERVICE]
│   ├── felt-proxy-service [SERVICE]
│   ├── umces-cgc-connector [SERVICE]
│   └── narrative-cms-api [SERVICE]
│
└── Infrastructure [COMPONENT GROUP]
    ├── vercel-deployment [CLOUD_RESOURCE]
    ├── aws-lambda-gtm [CLOUD_RESOURCE]
    ├── postgresql-guild-db [DATA_STORE]
    └── redis-cache [DATA_STORE]
```

---

## Jira Integration Mapping

### Existing Jira Tickets Referenced

| Jira Ticket | Title | Compass Component | Description |
|-------------|-------|-------------------|-------------|
| **OTEC-22** | Guild Academy Technical Infrastructure Charter | usa250-guild-charter | Update Jira to reference charter as source of truth |
| **CUL-19** | Linear Agent Directive Constitutional Bounds | usa250-guild-charter | Enforce AI + Human partnership framework |

### Proposed Jira Tickets for Compass Integration

| Jira Ticket | Title | Compass Component | Priority |
|-------------|-------|-------------------|----------|
| **OTEC-23** | Implement Felt.com Spatial Integration | usa250-felt-integration | High |
| **OTEC-24** | UMCES-CGC Environmental Data Connector | umces-cgc-connector | High |
| **OTEC-25** | GTM Analytics API Backend Service | gtm-analytics-api | Medium |
| **CUL-20** | Humancode Wine Narrative CMS | narrative-cms-api | Medium |
| **CUL-21** | Guild Member Credential Management API | guild-member-api | Low |

---

## Compass API Integration

### Prerequisites

1. **Atlassian Forge CLI** installed
   ```bash
   npm install -g @forge/cli
   forge login
   ```

2. **API Permissions** in `manifest.yml`
   ```yaml
   permissions:
     scopes:
       - read:compass-component
       - write:compass-component
       - read:compass-project
       - write:compass-project
   ```

3. **Environment Variables**
   ```bash
   COMPASS_API_URL=https://api.atlassian.com/graphql
   COMPASS_SITE_ID=your-site-id
   ATLASSIAN_API_TOKEN=your-api-token
   ```

### GraphQL Queries

#### 1. Create Component (GTM Dashboard)

```graphql
mutation CreateGTMDashboardComponent {
  compass {
    createComponent(
      input: {
        name: "usa250-gtm-dashboard"
        typeId: "APPLICATION"
        description: "Spatial intelligence dashboard for Go-To-Market strategy visualization"
        ownerId: "ari:cloud:compass:site-id:team/aria-x-technical-council"
        fields: {
          tier: 1
          lifecycle: "active"
        }
        links: [
          {
            type: "REPOSITORY"
            url: "https://github.com/cultura-d/USA250_impact"
          }
          {
            type: "DOCUMENTATION"
            url: "https://github.com/cultura-d/USA250_impact/blob/main/INTEGRATION_GUIDE.md"
          }
        ]
        labels: ["gtm", "spatial-intelligence", "usa250", "felt-integration"]
      }
    ) {
      success
      component {
        id
        name
        type
      }
      errors {
        message
      }
    }
  }
}
```

#### 2. Query Component

```graphql
query GetGTMDashboard {
  compass {
    searchComponents(
      query: "name:usa250-gtm-dashboard"
      first: 1
    ) {
      nodes {
        id
        name
        type
        description
        links {
          type
          url
        }
        labels {
          name
        }
        dependencies {
          nodes {
            name
          }
        }
      }
    }
  }
}
```

#### 3. Add Dependency (GTM Dashboard → Felt Integration)

```graphql
mutation AddFeltDependency {
  compass {
    updateComponent(
      id: "ari:cloud:compass:site-id:component/usa250-gtm-dashboard"
      input: {
        dependencies: [
          {
            componentId: "ari:cloud:compass:site-id:component/usa250-felt-integration"
            type: "DEPENDS_ON"
          }
        ]
      }
    ) {
      success
      errors {
        message
      }
    }
  }
}
```

#### 4. Link to Jira Ticket

```graphql
mutation LinkToJiraTicket {
  compass {
    updateComponent(
      id: "ari:cloud:compass:site-id:component/usa250-guild-charter"
      input: {
        customFields: [
          {
            key: "jira_tickets"
            value: ["OTEC-22", "CUL-19"]
          }
        ]
      }
    ) {
      success
    }
  }
}
```

---

## Automated Sync Strategy

### Option 1: GitHub Actions Workflow

Create `.github/workflows/compass-sync.yml`:

```yaml
name: Sync Components to Compass

on:
  push:
    branches: [main, claude/*]
    paths:
      - 'components/**'
      - 'src/**'

jobs:
  sync-compass:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Dependencies
        run: npm install @atlassian/forge-graphql

      - name: Sync to Compass
        env:
          COMPASS_API_TOKEN: ${{ secrets.COMPASS_API_TOKEN }}
          COMPASS_SITE_ID: ${{ secrets.COMPASS_SITE_ID }}
        run: |
          node scripts/sync-to-compass.js
```

### Option 2: Forge App Custom UI

Create a Forge app that:
1. Monitors GitHub repository for component changes
2. Parses component metadata from TSDoc comments
3. Automatically creates/updates Compass components
4. Links to Jira tickets via component custom fields

**Example Forge App Structure**:
```
forge-app/
├── manifest.yml
├── src/
│   ├── index.js          # Main Forge app logic
│   ├── compass-sync.js   # GraphQL mutations
│   └── github-webhook.js # GitHub event handler
└── package.json
```

---

## Component Metadata Standard

To enable automated sync, add metadata to each React component:

```tsx
/**
 * GTM Accelerator Dashboard
 *
 * @component
 * @compassType APPLICATION
 * @compassTier 1
 * @compassLifecycle active
 * @compassLabels gtm, spatial-intelligence, usa250, felt-integration
 * @jiraTickets OTEC-22, OTEC-23
 * @dependencies usa250-felt-integration, usa250-shared-types
 * @owner ARIA-X Technical Council
 * @repository https://github.com/cultura-d/USA250_impact
 */
const GTMAcceleratorDashboard = () => { ... }
```

---

## Crosswalk Use Cases

### Use Case 1: Track Component Health

**Scenario**: Monitor GTM dashboard performance and dependencies

**Compass Query**:
```graphql
query ComponentHealth {
  compass {
    component(id: "usa250-gtm-dashboard") {
      health {
        status
        metrics {
          deploymentFrequency
          changeFailureRate
          meanTimeToRestore
        }
      }
      dependencies {
        nodes {
          name
          health {
            status
          }
        }
      }
    }
  }
}
```

**Outcome**: Real-time visibility into component health, dependency issues, and deployment metrics

### Use Case 2: Impact Analysis

**Scenario**: Identify all components affected by UMCES-CGC API changes

**Compass Query**:
```graphql
query ImpactAnalysis {
  compass {
    component(id: "umces-cgc-connector") {
      dependents {
        nodes {
          name
          type
          owner {
            name
          }
        }
      }
    }
  }
}
```

**Outcome**: Understand blast radius of infrastructure changes before deployment

### Use Case 3: Jira Ticket → Component Traceability

**Scenario**: Find all components related to OTEC-22 Jira ticket

**Compass Query**:
```graphql
query TicketComponents {
  compass {
    searchComponents(
      query: "customFields.jira_tickets:OTEC-22"
    ) {
      nodes {
        name
        type
        links {
          type
          url
        }
      }
    }
  }
}
```

**Outcome**: Full traceability from Jira ticket → Compass component → Code repository

---

## Integration Patterns with Compass

### Pattern 1: Component Discovery

**Use Compass API to populate component library dynamically**

```tsx
import { useCompassComponents } from '@/hooks/useCompass';

function ComponentCatalog() {
  const { components, loading } = useCompassComponents({
    query: "labels:usa250"
  });

  return (
    <div>
      {components.map(comp => (
        <ComponentCard
          key={comp.id}
          name={comp.name}
          type={comp.type}
          health={comp.health.status}
          jiraTickets={comp.customFields.jira_tickets}
        />
      ))}
    </div>
  );
}
```

### Pattern 2: Real-time Dependency Graph

**Visualize component dependencies from Compass**

```tsx
import { useCompassDependencies } from '@/hooks/useCompass';

function DependencyGraph({ componentId }) {
  const { dependencies } = useCompassDependencies(componentId);

  return (
    <ForceGraph
      nodes={dependencies.map(d => ({ id: d.id, name: d.name }))}
      edges={dependencies.map(d => ({ source: componentId, target: d.id }))}
    />
  );
}
```

### Pattern 3: Health Monitoring Dashboard

**Aggregate Compass health metrics in GTM dashboard**

```tsx
function HealthDashboard() {
  const healthMetrics = useCompassHealth(['usa250-gtm-dashboard', 'usa250-guild-charter']);

  return (
    <div className="grid grid-cols-2">
      {healthMetrics.map(metric => (
        <HealthCard
          component={metric.name}
          status={metric.status}
          deploymentFrequency={metric.deploymentFrequency}
          changeFailureRate={metric.changeFailureRate}
        />
      ))}
    </div>
  );
}
```

---

## Roadmap: Compass Integration Phases

### Phase 1: Manual Component Creation (Week 1)
- [ ] Create Compass components for all 5 React components
- [ ] Link to GitHub repository
- [ ] Add Jira ticket references (OTEC-22, CUL-19)
- [ ] Define component dependencies

### Phase 2: API Integration (Week 2-3)
- [ ] Set up Forge CLI and permissions
- [ ] Create GraphQL sync scripts
- [ ] Test component creation and updates via API
- [ ] Document API authentication flow

### Phase 3: Automated Sync (Week 4)
- [ ] Implement GitHub Actions workflow
- [ ] Add TSDoc metadata to all components
- [ ] Enable automatic Compass updates on git push
- [ ] Monitor sync errors and health

### Phase 4: Advanced Features (Q1 2026)
- [ ] Build custom Forge app for bi-directional sync
- [ ] Integrate Compass health metrics into GTM dashboard
- [ ] Create dependency visualization in Unified Dashboard
- [ ] Enable Jira ticket → Compass → Code traceability

---

## API Reference

### Compass GraphQL Endpoints

- **Base URL**: `https://api.atlassian.com/graphql`
- **Authentication**: Bearer token (API token from Atlassian)
- **Rate Limits**: 300 requests/minute per user

### Required Scopes

```yaml
scopes:
  - read:compass:compass         # Read components and projects
  - write:compass:compass        # Create/update components
  - read:jira-work:jira          # Link to Jira issues
  - write:jira-work:jira         # Update Jira custom fields
```

### Example cURL Request

```bash
curl -X POST https://api.atlassian.com/graphql \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { compass { searchComponents(query: \"name:usa250\") { nodes { id name } } } }"
  }'
```

---

## Troubleshooting

### Issue: "Component not found"

**Solution**: Ensure component was created with correct site ID in ARI format:
```
ari:cloud:compass:{site-id}:component/{component-name}
```

### Issue: "Permission denied"

**Solution**: Add required scopes to `manifest.yml` and redeploy Forge app:
```yaml
permissions:
  scopes:
    - read:compass-component
    - write:compass-component
```

### Issue: "Dependency cycle detected"

**Solution**: Use Compass dependency graph to identify cycles:
```graphql
query FindCycles {
  compass {
    component(id: "usa250-gtm-dashboard") {
      dependencies(depth: 5) {
        nodes {
          id
          name
        }
      }
    }
  }
}
```

---

## Resources

### Atlassian Documentation
- [Compass Components API](https://developer.atlassian.com/cloud/compass/components/create-components-using-the-api/)
- [Compass GraphQL API Reference](https://developer.atlassian.com/cloud/compass/)
- [Forge Developer Platform](https://developer.atlassian.com/platform/forge/)
- [Jira Integration with Compass](https://support.atlassian.com/compass/docs/learn-how-compass-works/)

### USA250 Project Links
- **GitHub**: https://github.com/cultura-d/USA250_impact
- **Jira Board**: https://cultura-d.atlassian.net/browse/OTEC (assumed)
- **Linear Board**: https://linear.app/cultura-d/team/CUL (assumed)
- **Integration Guide**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

## Next Steps

1. **Immediate** (This Week)
   - [ ] Obtain Compass API credentials from Atlassian admin
   - [ ] Create `manifest.yml` for Forge app
   - [ ] Manually create first component (usa250-gtm-dashboard) in Compass UI
   - [ ] Test GraphQL query to retrieve component

2. **Short-term** (Next 2 Weeks)
   - [ ] Implement automated sync script (`scripts/sync-to-compass.js`)
   - [ ] Add TSDoc metadata to all components
   - [ ] Set up GitHub Actions workflow
   - [ ] Create Jira tickets for backend services (OTEC-23, OTEC-24, etc.)

3. **Long-term** (Q1 2026)
   - [ ] Build custom Forge app with bi-directional sync
   - [ ] Integrate Compass metrics into GTM dashboard
   - [ ] Enable real-time dependency visualization
   - [ ] Publish crosswalk methodology as Pattern Module

---

**Document Version**: 1.0.0
**Last Updated**: January 9, 2026
**Maintained By**: ARIA-X Technical Council
**Compass Site ID**: [To be configured]

---

**Sources**:
- [Create components using the API | Compass | Atlassian documentation](https://developer.atlassian.com/cloud/compass/components/create-components-using-the-api/)
- [Manage API specifications | Compass | Atlassian Support](https://support.atlassian.com/compass/docs/manage-api-specifications/)
- [Get started building Compass apps | Compass | Atlassian documentation](https://developer.atlassian.com/cloud/compass/integrations/get-started-integrating-with-Compass/)
