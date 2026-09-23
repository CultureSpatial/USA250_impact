# Sanity Platform Review 2026 — Replanning Impact

**Date:** 23 September 2026
**Trigger:** Vendor shipped major upgrades — a "content = context" mandate, agentic coordination for quality, and performance work around shared functions and workflows. This re-reviews our documented Sanity dependencies against what is actually available.

> **Source note:** Sanity MCP is disconnected and `sanity.io` is egress-blocked from this container, so this is assembled from search results and third-party coverage rather than first-party docs. **Verify against `search_docs`/`read_docs` before implementing.** Where I could not confirm something, it is marked.

> **"Project Horizon" — not externally confirmed.** No public reference under that name. It may be an internal, partner, or private-preview codename. What it evidently describes — agentic coordination for quality with a CMS bias — maps onto the Content Agent + Agent Context + Workflows cluster below, so the substance is addressable even though the name is not verifiable from here.

---

## 1. What shipped

Announced at **Everything \*[NYC] 2026**, positioned as "the Content Operating System for the AI era" on three pillars: *model your business, automate everything, power anything*.

| Capability | What it does |
|---|---|
| **Sanity Context** | Compresses the schema so agents *understand* content rather than retrieving it — natural language → precise queries against the real data model. Explicitly rejects "vector guesswork, or flattened embeddings that strip away the relationships" |
| **Knowledge Bases** | Part of Context; extracts facts from content and organizes them by topic |
| **Content Agent** | Runs complex content operations — audits thousands of pages, surfaces strategy gaps, stages content for publishing — inside the editorial workflow |
| **Agent Actions** | Programmatic create/transform/publish via an API designed for agents. **Every edit is staged in the Changes panel; changes are proposals; all require approval** |
| **Functions** | Event-driven, single-purpose code living in the project, firing on create/update/delete/publish |
| **Durable Functions** | State, retries and recovery across long-running multi-step processes |
| **Workflows** | Model the stages a document moves through, **next to the content**, each stage triggering the work it needs. Defined in TypeScript, versioned and deployed like code — **"so it can't drift"** |
| **Blueprints** | Declarative deployment; Editorial Workflows can be declared as a Blueprint resource |
| **MCP server** | Governed access for external agents, "eliminating duplicate data stores and custom integration work" |
| **Studio v6.13.0 / App SDK** | Performance and stability; `useApplyReleaseActions` hook for release workflows |

---

## 2. Impact on our documented architecture

### 2.1 The reproducibility spec needs revising — upward

`AXIS_PACKET_COMPARISON.md` §5 called validation rules "the single highest-value implementation detail — governance enforced at write, not at review." That was right in direction and **too weak in mechanism**.

**Workflows is the better home.** Stages modelled next to the content, each triggering its own work, defined in TypeScript and deployed like code. The phrase in the vendor's own framing — **"so it can't drift"** — is a direct answer to the problem this thread has hit five times (ENG-233 running while marked Backlog, the BOT-1 scaffold stale in both directions, Postiz surviving in an API path).

Revised recommendation: **model Transmission Terms as Workflow stages, not as validation rules.** Validation rules check a field; a workflow stage can gate a transition and trigger the check that permits it.

### 2.2 Workflows and GrammarActor are the same shape at two tiers

This is the structural finding.

| | Unit | Tier |
|---|---|---|
| **GrammarActor** (ENG-111) | An encounter — `idle → induction → hold → carry → verified` | Runtime, participant-facing |
| **Sanity Workflows** | A document — stages it moves through | Authoring, content-facing |

Both are statecharts. Both gate transitions. Both are the natural home for terms.

**Implication:** `verified` in GrammarActor should correspond to a Workflow stage in Sanity. A document that has reached "granted for `open-social-carryforward`" is in a workflow stage, and that stage is what the packet publishing layer should read before dispatch — instead of the current situation, where nothing is read at all.

This also makes the terms primitive cheaper: rather than building enforcement bespoke in `substrate/packages/shared`, the content-tier half can be a Workflow definition. ENG-475 should be re-scoped to reflect that the runtime half and content half have different homes.

### 2.3 Agent Actions validates the actor guard — but does not satisfy it

Sanity's approval posture is exactly the constitutional bound this thread argued for: agents propose, humans approve, nothing publishes without sign-off. **The vendor made the same call independently at the content tier**, which is good evidence the guard is right rather than fussy.

**But it is necessary, not sufficient**, and the distinction matters:

> Approving a draft edit is not granting circulation. Agent Actions protects **content integrity**. It does not protect **participant consent**.

This is the same gap named in `PACKET_ANGLE_ANALYSIS.md` — the Taskade operator review gate approves *drafts*, which is not a terms check. Sanity's Changes-panel approval is a better-built version of the same insufficient thing. The `CO_SIGN` guard still has to exist separately, because the person approving the edit is generally not the steward granting the circulation.

### 2.4 Agent Context vs our embedding work — a real tension worth facing

Sanity explicitly positions Context *against* the approach we have built: "no vector guesswork, or flattened embeddings that strip away the relationships."

We currently run Vectorize indexes in `vj-runner` (`VECTORIZE` bundle-manifests, `KNOWLEDGE_INDEX`) and `steward-obsi` reads `nov4-vault` R2 + Vectorize at 768 dimensions.

**The honest split:**
- For **Sanity-resident** content (`placePacket`, `loreEntry`, `storyGem`), Agent Context is likely better than our custom index — it preserves references and relationships that embeddings flatten, which matters enormously for `routeGraph` and steward links
- For the **Obsidian vault**, Agent Context does not apply — that content is not in Sanity, and `steward-obsi` stays as is

Worth an evaluation, not a migration. The `KNOWLEDGE_INDEX` in particular may be doing work Context now does natively.

### 2.5 MCP server may retire custom integration

"Eliminating duplicate data stores and custom integration work" speaks directly to `vj-runner`'s `/api/sanity/query` raw GROQ proxy, the KV-cached packet reads with Sanity fallback, and `SHAPE_STORE`. Some of that may be replaceable. **Audit, do not rewrite** — the KV cache exists for latency reasons the MCP server does not necessarily solve.

### 2.6 Durable Functions and the Zernio reliability gap

`ZERNIO_DELIVERY_QUEUE` (Gap 3) still does not exist, leaving a free-tier engine with documented sleep cycles without a retry buffer. Durable Functions handle "state, retries, and recovery across long-running multi-step processes."

Caveat: Zernio dispatch is Cloudflare-side, and a CF Queue remains the more natural fit for that leg. Durable Functions are worth considering for the **Sanity-side** portion of the chain, not the dispatch itself.

---

## 3. Zernio Seasonal-only dispatch — runbook

**I cannot do this.** Connecting Zernio accounts requires an operator login and per-platform OAuth with your credentials, and the `vinejocket` repo is not in this workspace. This is the standing "OPERATOR ACTION REQUIRED" item.

### One refinement to last turn's recommendation

Seasonal routes to **all five platforms** under `ANGLE_PLATFORMS`. So "Seasonal only" still means five OAuth connections and five live posts.

**Better minimal spike: one angle, one platform, dates only.** Connect **Instagram alone**, and restrict Seasonal to Instagram for the validation run. That proves the entire chain — GROQ fetch, per-angle composition, `metadata` round-trip, ACTIVITY_KV correlation, `contextRecord` upsert — with the smallest possible blast radius. Widen after.

### Steps

```
1. zernio.com → Settings → Connected Accounts → connect Instagram
2. curl https://zernio.com/api/v1/accounts -H "Authorization: Bearer $ZERNIO_API_KEY"
3. In workers/vj-bot/wrangler.toml:
     ZERNIO_ACCOUNT_INSTAGRAM = "{id}"
     ANGLE_ENABLED            = "seasonal"      # new allowlist
     ANGLE_PLATFORM_OVERRIDE  = "instagram"     # new, spike-only
4. Guard in zernio-distribution.ts: skip any angle not in ANGLE_ENABLED
5. npx wrangler deploy   (from workers/vj-bot/)
6. POST https://api.humancode.codes/api/distribution/packet-version
     { "packetId": "{test-slug}", "packetProvenanceToken": "{token}" }
```

### Verify

- One Zernio post created, `status` progresses to `published`
- `metadata.packetId` and `metadata.angle` survive the round-trip into the webhook
- `ACTIVITY_KV` key `zernio:{postId}` → `{packetId, angle:"seasonal"}`
- Port.io `contextRecord` upserted with correct angle and packetId

**Do not widen** to Maker voice, Economic or Ritual until terms exist. Those publish practitioner-governed material, economic posture, and route edges respectively.

---

## 4. Replanning recommendations

1. **Re-scope ENG-475.** The terms primitive has two homes, not one: Workflow stages for the content tier, `substrate/packages/shared` for the runtime tier. Build them as one model with two bindings.
2. **Model Transmission Terms as a Sanity Workflow** rather than validation rules. Stages gate transitions; validation rules only check fields.
3. **Map GrammarActor states to Workflow stages** explicitly. `verified` ↔ a granted stage is the join between runtime and content tiers, and it is currently missing in both directions.
4. **Evaluate Agent Context against `KNOWLEDGE_INDEX`** for Sanity-resident content. Keep `steward-obsi` on Vectorize — the vault is not Sanity.
5. **Audit what the MCP server retires** in `vj-runner` — the GROQ proxy especially. Audit, not rewrite.
6. **Adopt Blueprints for Editorial Workflow deployment** so the workflow is versioned with the code. This is the vendor's own answer to drift, and drift is our documented recurring failure.
7. **Run the one-angle one-platform spike** before any of the above. It is independent of all this replanning and has been blocked three months.
8. **Verify everything here against first-party docs** when the Sanity connector returns — `search_docs` then `read_docs`. This review is secondary-source and the vendor moves fast.

---

## Sources

- [Sanity — The Content Operating System for the AI era](https://www.sanity.io/) *(egress-blocked from this container; via search)*
- [Everything \*[NYC] 2026 Announcements](https://www.sanity.io/everything-2026-recap)
- [Sanity Context](https://www.sanity.io/context) · [Agent Actions](https://www.sanity.io/agent-actions) · [Content Agent docs](https://www.sanity.io/docs/content-agent/introduction)
- [Sanity Docs — Changelog](https://www.sanity.io/docs/changelog) · [Blueprints deploy action](https://www.sanity.io/docs/blueprints/blueprint-action)
- [Sanity Launches The AI Content Operating System for the AI Era — PR Newswire](https://www.prnewswire.com/news-releases/sanity-launches-the-ai-content-operating-system-for-the-ai-era-302704294.html)
- [Sanity's AI Content Operating System — CMS Critic](https://cmscritic.com/sanitys-ai-content-operating-system-powers-intelligence-with-structure-and-agents-with-context)
- [Sanity Agent Functions & Blueprints — FocusReactive](https://focusreactive.com/sanity-agent-actions-functions-and-blueprints/) *(egress-blocked; via search)*
- [Sanity Agent Actions — Webstacks](https://www.webstacks.com/blog/sanity-agent-actions-ai-content-workflow-automation)
