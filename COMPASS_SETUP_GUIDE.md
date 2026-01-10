# Atlassian Compass Setup & Connection Guide

**Repository**: https://github.com/cultura-d/USA250_impact
**Date**: January 10, 2026
**Status**: Setup Required

---

## Quick Status Check

Run this command to check your Compass connection status:

```bash
node scripts/check-compass-connection.js
```

**Expected Issues (First Time)**:
- ❌ COMPASS_API_TOKEN not set
- ⚠️ Components not registered in Compass
- ⚠️ GitHub repo not linked

This guide will fix all of these! 👇

---

## Step 1: Get Atlassian API Token

### 1.1 Create API Token

1. Go to **Atlassian API Tokens**: https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **"Create API token"**
3. Label it: `USA250 Compass Integration`
4. Click **"Create"**
5. **Copy the token immediately** (you won't see it again!)

### 1.2 Configure Environment

```bash
# Set API token
export COMPASS_API_TOKEN="your_api_token_here"

# Find your site ID (see next section)
export COMPASS_SITE_ID="your_site_id"
```

**Optional**: Add to `.env` file for persistence:

```bash
echo "COMPASS_API_TOKEN=your_token_here" >> .env
echo "COMPASS_SITE_ID=your_site_id" >> .env
```

---

## Step 2: Find Your Compass Site ID

### Method 1: From Compass URL

1. Go to your Compass dashboard: https://your-org.atlassian.net/compass
2. Look at the URL bar
3. The site ID is in the format: `your-org.atlassian.net`
4. Or click any component and look for the ARI in the URL:
   ```
   ari:cloud:compass:{SITE_ID}:component/...
   ```

### Method 2: Via GraphQL Explorer

1. Go to: https://developer.atlassian.com/console/graphql-explorer/
2. Select "Compass" from the API dropdown
3. Your site ID will be shown in the GraphQL console

---

## Step 3: Verify API Connection

Now test the connection:

```bash
node scripts/check-compass-connection.js
```

**Expected Output (If Credentials Work)**:

```
🔍 Compass Connection Validator
================================

📡 Test 1: API Connection
------------------------
✅ API Connection Successful
   Found 0 components

🔗 Test 2: GitHub Repository Connection
---------------------------------------
⚠️  No components linked to GitHub repo
   Expected: https://github.com/cultura-d/USA250_impact

   Action Required:
   - Create components in Compass UI
   - Link to GitHub repository
```

If you see this ✅ **API Connection Successful**, proceed to Step 4!

**If you see errors**, troubleshoot:
- ❌ 401 Unauthorized → Token is invalid or expired
- ❌ 403 Forbidden → Token lacks `read:compass:compass` scope
- ❌ Network error → Check internet connection / firewall

---

## Step 4: Register Components in Compass

You have **3 options** to register components:

### Option A: Manual (Compass UI) - Recommended for First Time

#### 4.1 Create GTM Accelerator Dashboard

1. Go to Compass: https://your-org.atlassian.net/compass
2. Click **"Create component"**
3. Fill in details:
   - **Name**: `usa250-gtm-dashboard`
   - **Type**: Application
   - **Description**: Spatial intelligence dashboard for Go-To-Market strategy visualization
   - **Team/Owner**: ARIA-X Technical Council
   - **Tier**: 1
   - **Lifecycle**: Active

4. Add **Links**:
   - Type: **Repository**
   - URL: `https://github.com/cultura-d/USA250_impact`

5. Add **Labels**: `gtm`, `spatial-intelligence`, `usa250`, `felt-integration`

6. Add **Custom Field** (for Jira traceability):
   - Field: `jira_tickets`
   - Value: `OTEC-22, OTEC-23`

7. Click **"Create"**

#### 4.2 Create Guild Academy Charter

Repeat above for:
- **Name**: `usa250-guild-charter`
- **Type**: Application
- **Description**: Technical infrastructure R&D framework with UMCES-CGC integration
- **Labels**: `guild`, `pbl`, `umces-cgc`, `usa250`
- **Jira Tickets**: `OTEC-22, CUL-19`

#### 4.3 Create Humancode Wine Narrative Engine

Repeat above for:
- **Name**: `usa250-narrative-engine`
- **Type**: Application
- **Description**: Crime-to-Culture narrative engine for USA250 Story Trails heritage tourism
- **Labels**: `narrative`, `tourism`, `heritage`, `usa250`
- **Jira Tickets**: `CUL-20`

### Option B: GraphQL API (Automated)

Use the GraphQL mutation from COMPASS_CROSSWALK.md:

```graphql
mutation CreateComponent {
  compass {
    createComponent(
      input: {
        name: "usa250-gtm-dashboard"
        typeId: "APPLICATION"
        description: "Spatial intelligence dashboard for Go-To-Market strategy visualization"
        ownerId: "ari:cloud:compass:site-id:team/aria-x"
        fields: {
          tier: 1
          lifecycle: "active"
        }
        links: [
          {
            type: "REPOSITORY"
            url: "https://github.com/cultura-d/USA250_impact"
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

**Where to run this**:
1. Atlassian GraphQL Explorer: https://developer.atlassian.com/console/graphql-explorer/
2. Or use `curl` (see COMPASS_CROSSWALK.md for examples)

### Option C: Automated Sync Script (Coming Soon)

```bash
node scripts/sync-to-compass.js
```

This will:
- Read component metadata from TSDoc comments
- Create/update components in Compass
- Link to GitHub repository
- Add Jira ticket references

---

## Step 5: Link Jira Tickets

### Via Compass UI

1. Open each component in Compass
2. Click **"Custom fields"** section
3. Add field:
   - **Field name**: `jira_tickets`
   - **Value**: `OTEC-22, CUL-19` (comma-separated)

### Via GraphQL

```graphql
mutation LinkJiraTickets {
  compass {
    updateComponent(
      id: "ari:cloud:compass:site-id:component/usa250-gtm-dashboard"
      input: {
        customFields: [
          {
            key: "jira_tickets"
            value: ["OTEC-22", "OTEC-23"]
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

---

## Step 6: Verify Complete Setup

Run the connection check again:

```bash
node scripts/check-compass-connection.js
```

**Expected Output (Full Success)**:

```
📊 Summary
==========
API Connection:          ✅ PASS
GitHub Repo Connection:  ✅ PASS
Component Registration:  ✅ PASS
Jira Traceability:       ✅ PASS

🎉 All checks passed! Compass integration is working perfectly.
```

---

## Step 7: Enable Automated Sync (Optional)

### GitHub Actions Workflow

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

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Sync to Compass
        env:
          COMPASS_API_TOKEN: ${{ secrets.COMPASS_API_TOKEN }}
          COMPASS_SITE_ID: ${{ secrets.COMPASS_SITE_ID }}
        run: |
          node scripts/sync-to-compass.js
```

### Add GitHub Secrets

1. Go to: https://github.com/cultura-d/USA250_impact/settings/secrets/actions
2. Click **"New repository secret"**
3. Add:
   - Name: `COMPASS_API_TOKEN`
   - Value: Your API token
4. Repeat for `COMPASS_SITE_ID`

Now every push will automatically sync components to Compass! 🚀

---

## Troubleshooting

### Issue 1: "Component not found"

**Symptom**: Connection check shows 0 components

**Solution**:
1. Verify you created components in Compass UI
2. Check component names match exactly:
   - `usa250-gtm-dashboard`
   - `usa250-guild-charter`
   - `usa250-narrative-engine`
3. Wait 2-3 minutes for Compass indexing

### Issue 2: "GitHub repo not linked"

**Symptom**: Test 2 fails

**Solution**:
1. Open component in Compass UI
2. Go to **"Links"** section
3. Add new link:
   - Type: Repository
   - URL: `https://github.com/cultura-d/USA250_impact`
4. Save

### Issue 3: "Jira tickets not found"

**Symptom**: Test 4 fails

**Solution**:
1. Compass may not have a `jira_tickets` custom field by default
2. Create it in Compass Settings → Custom Fields
3. Add to each component manually
4. Or use GraphQL mutation (see Step 5)

### Issue 4: "Permission denied"

**Symptom**: 403 Forbidden errors

**Solution**:
1. Regenerate API token with full scopes:
   - `read:compass:compass`
   - `write:compass:compass`
   - `read:jira-work:jira`
2. Ensure you're an admin in your Atlassian organization

### Issue 5: "Rate limit exceeded"

**Symptom**: 429 Too Many Requests

**Solution**:
- Compass API has rate limits (300 req/min)
- Wait 60 seconds and retry
- Use batch operations instead of individual queries

---

## Quick Reference

### Environment Variables

```bash
# Required
export COMPASS_API_TOKEN="your_api_token"
export COMPASS_SITE_ID="your_site_id"

# Optional (for custom deployments)
export COMPASS_API_URL="https://api.atlassian.com/graphql"
```

### Component Names (Must Match Exactly)

- `usa250-gtm-dashboard`
- `usa250-guild-charter`
- `usa250-narrative-engine`

### Jira Tickets

- **OTEC-22**: Guild Academy Technical Infrastructure Charter
- **CUL-19**: Linear Agent Directive Constitutional Bounds
- **OTEC-23**: Implement Felt.com Spatial Integration
- **OTEC-24**: UMCES-CGC Environmental Data Connector
- **CUL-20**: Humancode Wine Narrative CMS
- **CUL-21**: Guild Member Credential Management API

### Useful Commands

```bash
# Check connection
node scripts/check-compass-connection.js

# Sync components (when implemented)
node scripts/sync-to-compass.js

# Query Compass directly
curl -X POST https://api.atlassian.com/graphql \
  -H "Authorization: Bearer $COMPASS_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"query{compass{searchComponents(first:5){nodes{id name}}}}"}'
```

---

## Next Steps After Setup

Once all checks pass ✅:

1. **Add Dependencies**:
   - Link GTM Dashboard → Felt Integration
   - Link Guild Charter → UMCES-CGC Connector

2. **Enable Health Metrics**:
   - Connect CI/CD for deployment tracking
   - Set up incident management integration

3. **Create Service Components** (Backend):
   - GTM Analytics API (OTEC-22)
   - Guild Member API (CUL-19)
   - Felt Proxy Service (OTEC-23)
   - UMCES-CGC Connector (OTEC-24)
   - Narrative CMS (CUL-20)

4. **Add Team Ownership**:
   - Assign ARIA-X Technical Council as owner
   - Add on-call rotations
   - Link to incident runbooks

---

## Support Resources

- **Compass Documentation**: https://developer.atlassian.com/cloud/compass/
- **GraphQL API Reference**: https://developer.atlassian.com/cloud/compass/rest/intro/
- **API Token Management**: https://id.atlassian.com/manage-profile/security/api-tokens
- **GraphQL Explorer**: https://developer.atlassian.com/console/graphql-explorer/

---

## Current Status

| Check | Status | Action Required |
|-------|--------|-----------------|
| API Token | ⚠️ Not Set | Create token at link above |
| Component Registration | ⚠️ Incomplete | Create 3 components in Compass UI |
| GitHub Link | ⚠️ Missing | Add repo link to components |
| Jira Traceability | ⚠️ Missing | Add custom field with ticket IDs |

**Run `node scripts/check-compass-connection.js` to see live status!**

---

**Last Updated**: January 10, 2026
**Maintained By**: ARIA-X Technical Council
**Related Docs**: [COMPASS_CROSSWALK.md](./COMPASS_CROSSWALK.md), [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
