#!/usr/bin/env node
/**
 * Compass Connection Validator
 *
 * Tests connection to Atlassian Compass and verifies:
 * - GitHub repo connection
 * - Component registration
 * - Jira ticket traceability
 *
 * Usage:
 *   COMPASS_API_TOKEN=your_token COMPASS_SITE_ID=your_site node scripts/check-compass-connection.js
 */

const https = require('https');

// Configuration
const COMPASS_API_URL = 'https://api.atlassian.com/graphql';
const GITHUB_REPO = 'https://github.com/cultura-d/USA250_impact';
const EXPECTED_COMPONENTS = [
  'usa250-gtm-dashboard',
  'usa250-guild-charter',
  'usa250-narrative-engine'
];
const EXPECTED_JIRA_TICKETS = ['OTEC-22', 'CUL-19', 'CUL-20'];

// Get credentials from environment
const API_TOKEN = process.env.COMPASS_API_TOKEN || process.env.ATLASSIAN_API_TOKEN;
const SITE_ID = process.env.COMPASS_SITE_ID;

if (!API_TOKEN) {
  console.error('❌ ERROR: COMPASS_API_TOKEN not set');
  console.error('\nTo fix this:');
  console.error('1. Go to https://id.atlassian.com/manage-profile/security/api-tokens');
  console.error('2. Create a new API token');
  console.error('3. Export it: export COMPASS_API_TOKEN=your_token_here');
  console.error('4. Export site ID: export COMPASS_SITE_ID=your_site_id');
  process.exit(1);
}

console.log('🔍 Compass Connection Validator');
console.log('================================\n');

/**
 * Make GraphQL request to Compass API
 */
async function compassQuery(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });

    const options = {
      hostname: 'api.atlassian.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed);
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Test 1: Verify API Connection
 */
async function testApiConnection() {
  console.log('📡 Test 1: API Connection');
  console.log('------------------------');

  try {
    const query = `
      query {
        compass {
          searchComponents(first: 1) {
            nodes {
              id
              name
            }
          }
        }
      }
    `;

    const response = await compassQuery(query);

    if (response.errors) {
      console.error('❌ API Connection Failed');
      console.error('Errors:', JSON.stringify(response.errors, null, 2));
      return false;
    }

    console.log('✅ API Connection Successful');
    console.log(`   Found ${response.data?.compass?.searchComponents?.nodes?.length || 0} components\n`);
    return true;
  } catch (error) {
    console.error('❌ API Connection Failed');
    console.error('   Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Verify API token is valid');
    console.error('2. Check token has compass:read scope');
    console.error('3. Ensure network connectivity\n');
    return false;
  }
}

/**
 * Test 2: Check GitHub Repository Connection
 */
async function testGitHubConnection() {
  console.log('🔗 Test 2: GitHub Repository Connection');
  console.log('---------------------------------------');

  try {
    const query = `
      query SearchComponents($repoUrl: String!) {
        compass {
          searchComponents(
            query: $repoUrl
            first: 10
          ) {
            nodes {
              id
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
    `;

    const response = await compassQuery(query, {
      repoUrl: GITHUB_REPO
    });

    if (response.errors) {
      console.error('❌ GitHub Connection Check Failed');
      console.error('Errors:', JSON.stringify(response.errors, null, 2));
      return false;
    }

    const components = response.data?.compass?.searchComponents?.nodes || [];
    const linkedComponents = components.filter(comp =>
      comp.links?.some(link =>
        link.type === 'REPOSITORY' && link.url === GITHUB_REPO
      )
    );

    if (linkedComponents.length === 0) {
      console.log('⚠️  No components linked to GitHub repo');
      console.log(`   Expected: ${GITHUB_REPO}`);
      console.log('\n   Action Required:');
      console.log('   - Create components in Compass UI');
      console.log('   - Link to GitHub repository');
      console.log('   - Or run: node scripts/sync-to-compass.js\n');
      return false;
    }

    console.log(`✅ GitHub Connection Verified`);
    console.log(`   Found ${linkedComponents.length} component(s) linked to repo:`);
    linkedComponents.forEach(comp => {
      console.log(`   - ${comp.name} (${comp.type})`);
    });
    console.log('');
    return true;
  } catch (error) {
    console.error('❌ GitHub Connection Check Failed');
    console.error('   Error:', error.message, '\n');
    return false;
  }
}

/**
 * Test 3: Verify Component Registration
 */
async function testComponentRegistration() {
  console.log('📦 Test 3: Component Registration');
  console.log('---------------------------------');

  const results = [];

  for (const componentName of EXPECTED_COMPONENTS) {
    try {
      const query = `
        query SearchComponent($name: String!) {
          compass {
            searchComponents(
              query: $name
              first: 1
            ) {
              nodes {
                id
                name
                type
                description
                labels {
                  name
                }
              }
            }
          }
        }
      `;

      const response = await compassQuery(query, { name: componentName });

      if (response.errors) {
        console.log(`❌ ${componentName}: Query failed`);
        results.push({ name: componentName, registered: false });
        continue;
      }

      const components = response.data?.compass?.searchComponents?.nodes || [];
      const found = components.find(c => c.name === componentName);

      if (found) {
        console.log(`✅ ${componentName}`);
        console.log(`   Type: ${found.type}`);
        console.log(`   Labels: ${found.labels?.map(l => l.name).join(', ') || 'none'}`);
        results.push({ name: componentName, registered: true, component: found });
      } else {
        console.log(`⚠️  ${componentName}: Not registered`);
        results.push({ name: componentName, registered: false });
      }
    } catch (error) {
      console.log(`❌ ${componentName}: ${error.message}`);
      results.push({ name: componentName, registered: false });
    }
  }

  const registeredCount = results.filter(r => r.registered).length;
  console.log(`\n   Status: ${registeredCount}/${EXPECTED_COMPONENTS.length} components registered\n`);

  return registeredCount === EXPECTED_COMPONENTS.length;
}

/**
 * Test 4: Validate Jira Ticket Traceability
 */
async function testJiraTraceability() {
  console.log('🎫 Test 4: Jira Ticket Traceability');
  console.log('-----------------------------------');

  try {
    // Search for components with Jira ticket references
    const query = `
      query {
        compass {
          searchComponents(
            first: 20
          ) {
            nodes {
              id
              name
              customFields {
                key
                value
              }
            }
          }
        }
      }
    `;

    const response = await compassQuery(query);

    if (response.errors) {
      console.error('❌ Jira Traceability Check Failed');
      console.error('Errors:', JSON.stringify(response.errors, null, 2));
      return false;
    }

    const components = response.data?.compass?.searchComponents?.nodes || [];

    let foundTickets = 0;
    const ticketMap = {};

    components.forEach(comp => {
      const jiraField = comp.customFields?.find(f =>
        f.key === 'jira_tickets' || f.key.includes('jira')
      );

      if (jiraField) {
        const tickets = Array.isArray(jiraField.value) ? jiraField.value : [jiraField.value];
        tickets.forEach(ticket => {
          if (EXPECTED_JIRA_TICKETS.includes(ticket)) {
            if (!ticketMap[ticket]) {
              ticketMap[ticket] = [];
              foundTickets++;
            }
            ticketMap[ticket].push(comp.name);
          }
        });
      }
    });

    if (foundTickets === 0) {
      console.log('⚠️  No Jira tickets linked to components');
      console.log('\n   Expected tickets:', EXPECTED_JIRA_TICKETS.join(', '));
      console.log('\n   Action Required:');
      console.log('   - Add custom field "jira_tickets" to components');
      console.log('   - Link components to Jira issues\n');
      return false;
    }

    console.log(`✅ Jira Traceability Verified`);
    console.log(`   Found ${foundTickets} ticket(s):`);
    Object.entries(ticketMap).forEach(([ticket, comps]) => {
      console.log(`   - ${ticket}: ${comps.join(', ')}`);
    });
    console.log('');
    return true;
  } catch (error) {
    console.error('❌ Jira Traceability Check Failed');
    console.error('   Error:', error.message, '\n');
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  const results = {
    apiConnection: false,
    githubConnection: false,
    componentRegistration: false,
    jiraTraceability: false
  };

  // Run all tests
  results.apiConnection = await testApiConnection();

  if (results.apiConnection) {
    results.githubConnection = await testGitHubConnection();
    results.componentRegistration = await testComponentRegistration();
    results.jiraTraceability = await testJiraTraceability();
  }

  // Summary
  console.log('📊 Summary');
  console.log('==========');
  console.log(`API Connection:          ${results.apiConnection ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`GitHub Repo Connection:  ${results.githubConnection ? '✅ PASS' : '⚠️  INCOMPLETE'}`);
  console.log(`Component Registration:  ${results.componentRegistration ? '✅ PASS' : '⚠️  INCOMPLETE'}`);
  console.log(`Jira Traceability:       ${results.jiraTraceability ? '✅ PASS' : '⚠️  INCOMPLETE'}`);

  const allPassed = Object.values(results).every(r => r === true);

  if (allPassed) {
    console.log('\n🎉 All checks passed! Compass integration is working perfectly.');
  } else if (results.apiConnection) {
    console.log('\n⚠️  Some checks incomplete. See action items above to complete setup.');
  } else {
    console.log('\n❌ API connection failed. Check credentials and try again.');
  }

  console.log('\nFor detailed setup instructions, see: COMPASS_CROSSWALK.md\n');

  process.exit(allPassed ? 0 : 1);
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  testApiConnection,
  testGitHubConnection,
  testComponentRegistration,
  testJiraTraceability
};
