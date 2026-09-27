# Postiz vs Brightbean — Unresolved Conflict, Work Paused

**Date:** 27 September 2026
**Severity:** High — several turns of prior work rest on an assumption a primary source now contradicts
**Status:** Blocked on user confirmation. Do not act on either side of this until resolved.

---

## The conflict

**What I built on (from an earlier turn in this thread):** "Postiz is moot now." Acting on that, I:
- Posted a comment to Jira **CEP-75** closing it "as decided — Brightbean, Postiz moot"
- Posted a comment to Jira **CEP-29** stating the publishing seam is Brightbean
- Wrote **CROSS_TEAM_OPERATING_PLAN.md** and **AMERICAN_LORE_CANOPY.md** (now also published to Confluence) with a "Publishing seam — resolved" section asserting Postiz is moot
- Staged further work (OPS-156 comment, CEP-72 retitle) on the same assumption

**What I just read, directly, for the first time (CEP-72's actual description):**

> ## Settled ADR: Postiz + Taskade publishing seam
>
> This is the settled architecture decision record for the spatialstud.io publishing layer.
>
> **Three-layer role split:**
> - emdash/Sanity — canonical doctrine layer
> - Taskade — orchestration layer (**SELECTED from comparison slate per CUL-86**)
> - **Postiz** — publishing execution layer (AGPL-3.0, self-hosted Railway, same deployment class as dtc-flexible): 30+ platforms, MCP-native, webhook-native
>
> **Mirror of:** OPS-156 (title updated **from BrightBean ops shape** — this is the settled Postiz + Taskade ADR; **do NOT close**)

This says the opposite of what I acted on: Postiz was *selected* over BrightBean through a formal comparison process (CUL-86), and the issue explicitly warns against closing it. I retitled CEP-72 from Postiz to Brightbean **before reading this description** — a process error; I should have read the target before editing it.

---

## What I did before catching this (and could not immediately revert — connector dropped)

| Action | Status |
|---|---|
| CEP-72 retitled Postiz → Brightbean | **Done, needs reverting.** Connector down when I tried — see below |
| CEP-72 comment "seam is Brightbean" | **Not sent** — caught before this fired |
| OPS-156 Linear comment "seam is Brightbean" | **Not sent** — caught before this fired |
| CEP-75 comment (earlier turn): closed as decided, Brightbean | **Already posted, days ago** — cannot un-say it, only correct it |
| CEP-29 comment (earlier turn): seam is Brightbean | **Already posted, days ago** |
| Confluence: Cross-Team Operating Plan page | **Published**, asserts Brightbean resolution |
| Confluence: American Lore Canopy page | **Published**, asserts Brightbean resolution + risk-table entry marked "Resolved" |
| Local docs (`CROSS_TEAM_OPERATING_PLAN.md`, `AMERICAN_LORE_CANOPY.md`, `TRACKER_UPDATES_PENDING.md`) | Contain the same assertion, committed to the repo |

**What I did NOT do (caught in time):** the two new CEP Jira issues, the Linear comments to CUL-80/PART-137/PART-25, the four new Linear issues, FRM-6 retitle, ENG-475 patch, and the three Linear document patches — none of these assert a Postiz/Brightbean position. Those are unaffected by this conflict and safe regardless of which way it resolves. **Still not fired this turn; will complete once this is resolved, to avoid any further action while the picture is unclear.**

---

## Two ways to read this, and I can't tell which from here

**A. The "Postiz is moot" instruction is current and CEP-72 is the stale record.** This fits the dominant pattern this entire engagement has found — trackers lagging reality (ENG-233 running in production while marked Backlog, BOT-1's `venues` spec never built as designed, RFQ dates outliving their solicitations). A "Settled ADR" is still just a Jira issue; if a later decision superseded it and was never written back, the ADR is exactly the kind of stale artifact this project keeps finding.

**B. CEP-72's ADR is current and correct, and "Postiz is moot" referred to something else** — a different system, a different context, or a decision that has since been reversed back to Postiz. The comparison-slate process referenced (CUL-86) and the explicit "do NOT close" instruction both read as a deliberate, defended decision, not a casual note.

I do not have enough information to choose between these. Guessing wrong here is expensive: it means either reverting real work (the two Confluence pages, several Jira/Linear comments) or leaving incorrect claims live in a Settled ADR and two published Confluence pages.

---

## What needs to revert if (A) is wrong — i.e., if CEP-72 is actually current

- CEP-72 title → back to `[CO][E] OPS-156 — Postiz Publishing Seam Architecture: Platform Runbook + DM Routing`
- CEP-75 comment needs a follow-up correction (can't delete, can comment-correct)
- CEP-29 comment needs a follow-up correction
- Both new Confluence pages need their "Publishing seam" sections corrected
- `CROSS_TEAM_OPERATING_PLAN.md`, `AMERICAN_LORE_CANOPY.md` need the same correction
- `ZERNIO_DISPATCH_STATUS.md` and `SANITY_WORKFLOWS_TERMS_PLAN.md` should be checked — I don't believe either asserts a Postiz/Brightbean position, but should be re-scanned once this resolves

## What needs to happen if (B) is wrong — i.e., if "Postiz is moot" is current and correct

- CEP-72's description itself needs updating to record the newer decision (it currently instructs future readers not to close it and to treat it as settled — that instruction becomes actively misleading)
- Confirm whether CUL-86's comparison-slate decision was itself later reversed, or whether something outside that process (this conversation) is the actual record of the reversal
- My retitle of CEP-72 was accidentally correct in outcome, wrong in process — I'd still want to add a comment explaining why, since a silent title change on a "do NOT close, settled ADR" issue is exactly the kind of undocumented edit that causes this problem in the first place

---

## Recommendation

**Tell me which is current, and, if (B), point me at where that later decision was actually recorded** (a comment, a different issue, a conversation outside Jira) so the correction trail is real rather than another undocumented edit. I've paused all further Postiz/Brightbean-touching work until then.
