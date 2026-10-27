# Rive Capability Update — GPU Canvas, CLI/RML, Bill Plan, Work Order Changes

**Date:** 26 October 2026
**Trigger:** Rive shipped two capabilities since this engagement's last Rive-related spec work (FRM-6, ENG-396, GRAMMAR_ACTOR_RECONCILIATION.md): a CLI + text format for agent-authored Rive files, and a GPU layer that brings 3D/shaders into Rive.
**Source note:** Direct fetch to `rive.app` failed (DNS unresolved in this sandbox, consistent with other vendor-site egress blocks this engagement has hit — Sanity, Deltek). Everything below is from search-indexed official pages and the vendor's own X/community posts, not a first-party page read. Verify at `rive.app/pricing` and `rive.app/docs/cli/agents` before committing budget or architecture against this.

---

## What's actually new

### 1. GPU Canvas — 3D and shaders, not a 3D world builder

**Precision matters here, because "build 3D worlds on Rive" overstates what this is.** GPU Canvas is a low-level GPU layer added to Rive's existing 2D vector/state-machine engine — it is not a standalone 3D scene authoring tool in the Spline/Unity sense.

- Shaders written once in **WGSL**, compiled per-platform (Metal, Vulkan, Direct3D, WebGPU, WebGL)
- Drag-and-drop **.fbx/.obj/.glb** import into the Assets panel (.glb reportedly works best)
- Adds **25KB** to the runtime
- **Opt-in**, via `enableGPUCanvas` flag, requires `@rive-app/webgl2` 2.42.0+
- **Status: out of Early Access, live in the production Editor for everyone. Runtimes are explicitly described as "still catching up."** Editor-ready; runtime support incomplete.
- A Rive MCP server reportedly exists for creating/editing/recompiling/testing WGSL shaders from any MCP-compatible client — not confirmed first-party, and not currently in this environment's MCP roster. Worth checking as an addable capability, same category as Sanity/Linear/Atlassian/Port.io.

**What this actually is for us:** a way to render stylized, branded 3D objects and characters with custom shaders *inside* a Rive composition — not a competitor to Supersplat's photoreal Gaussian-splat reconstruction. These are different jobs for different content.

### 2. Rive CLI + RML — the more important one for our stack

- **RML (Rive Markup Language):** a text-based XML representation of a `.riv` file. Rive content becomes readable, writable, and **diffable** — buildable by coding agents and text-based workflows, not only through the Editor GUI.
- **Rive CLI:** compiles RML into a `.riv` (runtime) or `.rev` (editor-reopenable) file.
- **Claude Code is explicitly a supported agent workflow**: `rive create myproject` writes both `AGENTS.md` and `CLAUDE.md` into the project folder.
- **Status:** launched September 2026, technical preview, free with no limits during preview; the vendor has said publish-call limits will likely follow. Current CLI (1.6.0, ~10 days old at last check) already raised the publish limit to 1,000 scripts and added library-view-model publishing.

**What this actually is for us:** Rive files stop being GUI-only, un-diffable state. They become text that can live in this repo, get reviewed like code, and — directly — get authored by **Path B (Claude Code CLI)** in the agentic mesh model from RES-121, which this entire engagement has been operating inside.

---

## Where this lands on "more presentation styles" (Layer 4)

`STRATEGIC_FRAMEWORK.md`'s Layer 4 (Runtime Presentation) names PartyKit Terroir, grammar events, Supersplat, and `dtc-*` components. Rive sits in that layer already via FRM-6/ENG-396. With GPU Canvas, Layer 4 now has three genuinely distinct presentation styles, not two:

| Presentation style | Best for | Status |
|---|---|---|
| **Supersplat + TRELLIS** | Photoreal reconstruction of real places (vineyard rows, oyster farm layouts, environmental monitoring) | Live |
| **Rive 2D + CSS tokens** (`emotionTokenMap.ts`, `data-grammar-state`) | UI chrome, affective state surfaces, grammar-position indicators | Live |
| **Rive GPU Canvas (3D + shaders)** | Stylized/branded 3D objects and characters — e.g. the Enchanted Locale Layer's AR avatar pack | **Editor-ready, runtime incomplete** — do not commit to production yet |

**The concrete new application:** `ENCHANTED_LOCALE_LAYER_SYNTHESIS.md` recommended the Hume-AI emotionally-reactive avatar pack map onto `SENTIMENT_SHIFT`. GPU Canvas is now the plausible actual rendering target for that avatar — a real 3D object with a WGSL shader reacting to sentiment score, inside the same Rive file that already drives the grammar-state CSS tokens — rather than a flat sprite or an externally-hosted video asset.

---

## Bill plan

**Two official Rive pages disagree on price, and I can't resolve which is current without a first-party fetch this sandbox can't make. Printing both rather than picking one — same discipline as every other vendor-maturity check this engagement has run.**

| Tier | `rive.app/pricing` | `rive.app/docs/account-admin/pricing` |
|---|---|---|
| Free | $0 | $0 |
| Cadet (cap 3 seats) | **$9/seat/mo** | **$17/seat/mo** ($108/seat/yr) |
| Voyager (cap 25 seats) | **$32/seat/mo** | **$39/seat/mo** ($304/seat/yr) |
| Enterprise | **$120/seat/mo** | **$1,440/seat/yr** ($120/seat/mo equivalent) |

Enterprise adds subteam workspaces, a custom S3 bucket, org-wide permissions, dedicated support, SSO, SOC 2 Type II, centralized billing — and is explicitly positioned for companies with **$10M+ annual revenue**. Not a near-term tier for us.

**CLI:** free during technical preview, no current limits beyond the 1,000-script publish cap; expect publish-call limits post-preview, timing unannounced.

**Recommendation:** budget against the lower figures ($9/$32 Cadet/Voyager) as the working assumption, flag the discrepancy to whoever owns the Rive relationship, and confirm directly against `rive.app/pricing` before any purchase order — the two pages disagreeing by roughly 2x on Cadet is too large a gap to average over.

---

## Recognition of changes to the work order

Formal change-recognition against existing specs, so FRM-6/ENG-396 don't get built against a Rive feature set that's already behind what's shipped.

### FRM-6 — GrammarActor CSS State Contract (Form Authoring Spec)

**Change recognized:** the spec currently assumes the Editor GUI as the sole authoring path for the `data-grammar-state`/`data-emotion`/`data-spatial` contract (per the three-way split recommended in `GRAMMAR_ACTOR_RECONCILIATION.md`). **RML/CLI is now a second, text-based authoring path for the same contract.** This doesn't change FRM-6's scope, but it changes *how* it can be built and reviewed — as diffable text, through Path B, rather than only through manual Editor work. Worth noting in FRM-6 before it unblocks from ENG-392.

### ENG-396 — Nordcraft → Rive + Bit.dev migration

**Change recognized:** this migration was scoped before GPU Canvas left Early Access and before the CLI/RML existed. The migration target should explicitly account for both — otherwise it migrates onto a Rive feature set that's already one release behind.

### GRAMMAR_ACTOR_RECONCILIATION.md — "Rive renders; GrammarActor decides"

**Change recognized:** this line still holds structurally. It needs one addition: "renders" now includes GPU Canvas 3D/shader output, not only 2D vector/CSS-token-driven state art. No change to the actor-guard logic — GrammarActor still decides what state to be in; Rive still only renders it, in more forms than before.

### ENCHANTED_LOCALE_LAYER_SYNTHESIS.md — Hume-AI avatar pack

**Change recognized:** the avatar pack's rendering target was unspecified. GPU Canvas is now the concrete candidate — flagged here as **not yet production-ready on the runtime side**, so this doesn't change HOW-223's urgency, only its eventual implementation path once runtime support catches up to the editor.

### STRATEGIC_FRAMEWORK.md — Layer 4 (Runtime Presentation)

**Change recognized:** Layer 4's component list should name GPU Canvas as a third presentation style distinct from Supersplat and the existing Rive/CSS-token layer, per the table above, next time that document gets revised.

---

## What I'm not doing

Not recommending a purchase, not committing any spec to GPU Canvas in production (runtime support is explicitly incomplete), and not confirming the Rive MCP server exists in a form addable to this environment — all three need a first-party check this sandbox couldn't make today.
