# Sanity Platform Review 2026 — Replanning Impact

**Date:** 23 September 2026
**Trigger:** Vendor shipped major upgrades — a "content = context" mandate, agentic coordination for quality, and performance work around shared functions and workflows. This re-reviews our documented Sanity dependencies against what is actually available.

> **Source note:** Sanity MCP is disconnected and `sanity.io` is egress-blocked from this container, so this is assembled from search results and third-party coverage rather than first-party docs. **Verify against `search_docs`/`read_docs` before implementing.** Where I could not confirm something, it is marked.

> **"Project Horizon" — confirmed real, and it is not what it sounds like.** My earlier note said it could not be verified; that was wrong. **Project Horizon is a Sanity Labs project, open for early access**, announced at Everything \*[NYC] 2026 alongside **Resonance**.
>
> But the description "agentic coordination for quality with a CMS bias" matches **Resonance**, not Horizon. The two are very different, and the difference matters — see §1.5.

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

### 1.5 Sanity Labs — Horizon vs Resonance

| | What it actually is | Risk posture |
|---|---|---|
| **Resonance** | Builds a living model of your company, audiences and content. **Reads your content the way each audience would**, backs every finding with evidence, and produces a prioritised list of what to improve and why | Low. Analysis and evidence-backed findings. This is the "agentic coordination for quality" capability |
| **Project Horizon** | `sanity-labs/horizon-connector`: **lets Horizon agents run commands on your machine** over an outbound WebSocket. Experimental, requires your own API key, dials outbound so no inbound port, OTP auth for approving shell execution | **High.** This is agent *execution* on a host, not content quality |

**Resonance is the one that matches the brief.** It maps directly onto the register work — reading content as each audience would is Axis 3 with evidence attached, and it could inform the civic-memory vs K-12 expression test in CEP-29 that currently has no tooling behind it.

**Project Horizon deserves a hard look before adoption, and the reason is close to home.** This thread has spent considerable effort establishing that agents must not emit `CO_SIGN` or `CARRY_FORWARD` — that consent becomes synthetic if a machine can perform the witnessing. Horizon is a tool for letting agents run shell commands on a host. Adopted casually, it bypasses every guard we have specified, not at the content tier but underneath it. The OTP approval on shell execution is the right instinct and is the feature to scrutinise.

Sanity's own framing of both — *"content operations where the repetitive work runs itself and people hold the decisions"* — is the same constitutional bound we have been writing. Worth holding them to it.

### 1.6 Maturity — material for planning

| Stage | Capabilities |
|---|---|
| **GA** | Functions, Blueprints, Agent Actions, MCP server, Studio v6.13, App SDK |
| **Beta** (opt-in; org admin enables in Manage) | **Knowledge Bases, Workflows** |
| **Early access** | Durable Functions, Blueprints-first setup, **Project Horizon, Resonance** |

**This qualifies §2.1 below.** I recommended modelling Transmission Terms as Workflows. Workflows is **beta** — features and limits may change before GA, plans cap counts, and the published numbers are incomplete. That is not a reason to avoid it, but it is a reason to keep the terms model expressible in more than one substrate, and to not let a beta gate participant consent in production.

### 1.7 Functions constraints that bear on a governance gate

If terms enforcement runs as a Function on publish, these are the operating limits:

| Constraint | Value |
|---|---|
| Execution time | **10s default**, configurable 1–900s in Blueprint config |
| Per-document rate | 200 invocations / 30s, then stopped |
| Per-project rate | 4000 invocations / 30s, then stopped |
| **Mutation chain depth** | **Capped at 16** |
| Cost (Growth) | $1 per 1M invocations; $1 per 20K GB-seconds |

Two of these matter directly. A terms resolution that checks venue authority against an `at://` record makes an external call, so the **10s default is probably too low** — set it explicitly in the Blueprint. And if enforcement mutates the document (stamping a resolved grant, say), it **counts toward the 16-deep mutation chain**, which a publish→function→mutate→function loop can reach faster than expected.

### 1.8 Workflows already carries an actor model

The workflow definition is described as naming *"the stages content moves through, the activities that must be completed, **the actions people or systems can take**, and the conditions that move the process forward."*

**That is the actor guard, first-party.** And the documented example is exactly our proposed split: *a person submits a draft; an agent checks it against the style guide and moves it forward or sends it back.* The agent may advance or reject; the person submits.

This is strong corroboration for ENG-475's guard table — agent may `HOLD`, may not `CO_SIGN` — arrived at independently by the vendor at the content tier.

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

### Secret handling — do not export the key to a shell

`ZERNIO_API_KEY` is already bound from **CF Secrets Store** (`Zernio_ApiKey`), per the Packet Publishing Layer security model. GSM is the origin store; that same model states secrets are **never fetched from GSM at runtime**.

So the `/accounts` lookup should not go through a local `curl` with an exported env var — that pulls a production secret onto a workstation, into shell history and process args, for no reason.

**Preferred:** add a temporary diagnostic route to `vj-bot`, which already holds the binding, and read the account IDs from its response. The key never leaves the Worker runtime.

```ts
// workers/vj-bot/src/  — TEMPORARY, remove after Spike 0b
app.get('/internal/zernio/accounts', async (c) => {
  const r = await fetch('https://zernio.com/api/v1/accounts', {
    headers: { Authorization: `Bearer ${c.env.ZERNIO_API_KEY}` },
  })
  return c.json(await r.json())
})
```

Gate it behind the existing internal-auth guard, deploy, call once, record the IDs, remove the route.

**If a local call is unavoidable**, read from the store at invocation without persisting — never `export`:

```
curl https://zernio.com/api/v1/accounts \
  -H @<(printf 'Authorization: Bearer %s' "$(gcloud secrets versions access latest --secret=Zernio_ApiKey)")
```

### What goes where

| Value | Home | Secret? |
|---|---|---|
| `Zernio_ApiKey` | **CF Secrets Store** (already bound as `ZERNIO_API_KEY`) | Yes — never in `wrangler.toml`, never in the repo |
| `ZERNIO_WEBHOOK_SECRET` | CF Secrets Store | Yes |
| `ZERNIO_ACCOUNT_*` | `wrangler.toml` `[vars]` | No — account identifiers, not credentials |
| `ANGLE_ENABLED`, `ANGLE_PLATFORM_OVERRIDE` | `wrangler.toml` `[vars]` | No |

### Steps

```
1. zernio.com → Settings → Connected Accounts → connect Instagram
2. Retrieve account IDs via the diagnostic route above (not a local curl)
3. In workers/vj-bot/wrangler.toml [vars] — non-secret config only:
     ZERNIO_ACCOUNT_INSTAGRAM = "{id}"
     ANGLE_ENABLED            = "seasonal"      # new allowlist
     ANGLE_PLATFORM_OVERRIDE  = "instagram"     # new, spike-only
4. Guard in zernio-distribution.ts: skip any angle not in ANGLE_ENABLED
5. npx wrangler deploy   (from workers/vj-bot/)
6. Remove the temporary diagnostic route
7. POST https://api.humancode.codes/api/distribution/packet-version
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
2. **Model Transmission Terms as a Sanity Workflow** rather than validation rules — stages gate transitions, validation rules only check fields — **but keep the model substrate-independent.** Workflows is beta with capped, partly unpublished limits. Define terms once as a shared model; bind it to Workflows at the content tier and `substrate/packages/shared` at the runtime tier. Do not let a beta feature be the only thing standing between practitioner material and publication.
3. **Map GrammarActor states to Workflow stages** explicitly. `verified` ↔ a granted stage is the join between runtime and content tiers, and it is currently missing in both directions.
4. **Evaluate Agent Context against `KNOWLEDGE_INDEX`** for Sanity-resident content. Keep `steward-obsi` on Vectorize — the vault is not Sanity.
5. **Audit what the MCP server retires** in `vj-runner` — the GROQ proxy especially. Audit, not rewrite.
6. **Adopt Blueprints for Editorial Workflow deployment** so the workflow is versioned with the code. This is the vendor's own answer to drift, and drift is our documented recurring failure.
7. **Run the one-angle one-platform spike** before any of the above. It is independent of all this replanning and has been blocked three months.
8. **Evaluate Resonance, not Horizon, for the quality brief.** Resonance matches what was wanted and is low-risk. Project Horizon is agent shell execution on a host — assess it on its own terms, against the actor-guard position this project already holds, and treat its OTP approval on shell execution as the feature to scrutinise rather than a formality.
9. **Verify everything here against first-party docs** when the Sanity connector returns — `search_docs` then `read_docs`. This review is secondary-source and the vendor moves fast.

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
