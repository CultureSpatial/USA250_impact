# Synthesis — DACUM Stress Test × Gesture Block Library (OPS-147) × Wine Discovery (Dekart)

**Date:** 27 October 2026
**Status:** The deferred synthesis promised last turn. Built from three sources: `DACUM_Stress_Test_Marias_Culinary_Framework.pdf` (read prior turn), `Gesture_Block_Library_-_standalone_1.html` (OPS-147, rendered this turn — it's a self-unpacking bundle, not static HTML, so it was headlessly rendered rather than text-read), and `Experience-wine-like-data-Data-like-stories.pdf` (Spatial Studio / Dekart, extracted this turn via PyMuPDF since the sandbox's `poppler-utils` couldn't install — package mirror 404).
**Not yet done:** COR-13 and CUL-75 ("earlier brainwriting") — Linear has been down across every retry this session. Flagged, not guessed at. Everything below stands independent of those two, but should be re-checked against them once reachable.

---

## 1. The load-bearing finding: OPS-147 already answers "how does induction mode actually work"

WO-009 §4 and FRM-48 both specify induction mode as *content* — a second lookup table on `VesselData`, keyed to a DACUM duty. Neither specifies the *interaction* — how a user's thumb actually moves through that content. **OPS-147 is that answer, already built to v0.1, not hypothetical:**

- Explicitly labeled "INDUCTION SURFACES · GESTURE LIBRARY" — the same word this engagement has been using.
- Explicitly tagged "WINE · FLIES · FREE" — the same campaign as WO-009.
- 12 one-thumb gesture primitives (B-01–B-12: Tilt, Lift, Pour, Swirl, Witness-Hold, Catch, Route-Drag, Threshold, Stamp-Tap, Whisper, Shake, Edge-Peel), each with a `gesture` type, a reach `zone`, and a phrase `set`.
- 6 recipes (2–3 blocks + a phrase = a minigame shape), 5 phrase sets.
- Has its own delivery dependency already recorded: `OPS-33 (dec 31 · optional)`.

**Consequence for FRM-48:** the induction-mode lookup table shouldn't be designed in isolation and then paired with a yet-to-be-decided interaction later. It should be designed *against* OPS-147's existing gesture/recipe vocabulary from the start — the interaction layer already exists; FRM-48's job is content, not invention.

---

## 2. Mapping OPS-147's 6 recipes onto the DACUM stress test's 4 frames

This is a genuine structural fit, not a forced one — the recipes sort cleanly by *register*, and the stress test's own central finding (STRESS TEST 5: frame collision) is precisely that vocational and cultural registers must not be treated identically. OPS-147 already encodes that distinction at the interaction level, independently:

| OPS-147 recipe | Blocks | Register (OPS-147's own words) | Best-fit DACUM frame | Why |
|---|---|---|---|---|
| **R-03 Read the Glass** | Swirl → Pour → Stamp | "1 prompt, 1 reply" | **Vocational** | Its own line — "Swirl to release notes from the glass. Tilt-pour the bottle to pour an answer" — is almost verbatim PART-98's D3 competency text ("pour technique, tasting-note vocabulary"). This may be the single cleanest content/interaction match in the whole set. |
| **R-02 The Witnessing** | Witness-Hold → Whisper | "meditative · no-fail" | **Cultural** | No score, no win condition, explicitly reverent ("Come to the table, not to consume, but to witness"). This is the correct register for Cultural Sovereignty Stewardship — a scored minigame here would be the exact extraction risk the stress test flags. |
| **R-04 Cross the Meridian** | Route-Drag → Threshold → Edge-Peel | "5 waypoints," tagged "food heritage" | **Educational** | Geographic waypoint-crossing maps directly onto "Regional Food Systems Literacy" 's foundational→advanced progression, and onto the stress test's own PNW-vs-Coastal-Mexico framing. |
| **R-01 Catch the Flight**, **R-06 Shuffle the Branch** | Lift→Catch→Stamp / Shake→Tilt→Catch | "score," "branch choice" | **Avocational** | Playful, scored, low-stakes — matches the Community Food Educator / farmers-market register, not the cultural one. |
| **R-05 What the Hand Lifts** | Lift → Whisper → Stamp | "single artifact" | Cultural or Educational (single-moment use) | Shares Witness's reverent tone; could serve either, depending on content. |

**This is a proposal, not a confirmed design decision** — it falls out of reading both documents side by side, but neither document states this mapping explicitly. Worth validating with whoever owns OPS-147 before FRM-48 commits to it.

---

## 3. A real tension the two documents create together, not papered over

OPS-147's own design rule #5: *"Use exactly one [branch primitive] per induction reel; chained branches read as a quiz, which kills the witnessing register."* Rule #3: *"never five [blocks]... if the recipe needs instructions, it is too long for the feed."*

The DACUM stress test's competency model has **three levels per competency** (foundational/intermediate/advanced), validated by evidence. Naively chaining gesture checks to "assess" all three levels in one reel would violate both of OPS-147's own rules at once — and would be exactly the "quiz" failure mode OPS-147 was designed to avoid.

**Resolution implied, not yet decided by anyone:** competency *levels* likely need to be separate reels (foundational = simplest 1–2 block recipe; advanced = fuller 3-block recipe), rather than one reel assessing a whole competency. This is a design consequence worth surfacing to whoever picks up FRM-48, not something to silently assume.

---

## 4. Wine Discovery / Dekart — a different surface, but two real structural echoes

Dekart is a web dashboard product (Spatial Studio), not a Rive mobile surface — it doesn't answer the "how do we build this as Rive components" question directly. But it echoes two things already live in this engagement, worth naming as corroborating evidence rather than ignoring:

- **Three Phases (Explore → Measure → Improve)** is the same three-stage shape as SCID's Scaffolded Execution (Guided → Assisted → Autonomous) and DACUM's own foundational→intermediate→advanced levels. Third independent arrival at the same shape in this engagement's materials — the kind of convergence this engagement has flagged before as worth citing as corroborating, not coincidental.
- **Founding Guild revenue share** ("contribute 5 best practices... when other wineries license those practices, you get a small revenue share") is structurally the same mechanism as the DACUM stress test's **Gap 2** (originating-community revenue split override, 50/40/10 vs default 70/20/10 Ubuntu split). Both are "contributor earns when their knowledge gets reused by others." These may be the same underlying mechanism built twice rather than two separate inventions — worth checking, not assumed here.

Dekart's "Five Ways to Explore Wine" also roughly tracks four stakeholder registers (self-directed visitor, parity/equity-focused, producer-facing, organizer-facing) that loosely echo DACUM's four frames, though this is a looser fit than the OPS-147 mapping above and shouldn't be over-read.

---

## 5. Updated axis table — one row changed, one row added

Extending `DACUM_STRESS_TEST_REFRAMING_AND_AXES.md`'s table:

| Axis | Prior state | Updated by this turn |
|---|---|---|
| **8. CompetencyFrame** (vocational/cultural/educational/avocational) | Named, not reconciled against VesselData mode or D3 | **Still open**, but now has a concrete interaction-layer candidate per frame (§2 above), not just content-layer |
| **9. Induction-surface interaction model** *(new)* | Did not exist as a named axis | OPS-147's 12 gestures / 6 recipes — exists, v0.1, already tagged "induction surfaces," already tied to the Wine Flies Free campaign. Known action: confirm with OPS-147's owner whether FRM-48 should build against it directly, and resolve the level-chaining tension in §3 |

---

## Still pending

- COR-13, CUL-75 — Linear unreachable all session; re-check these against everything above once reconnected, per your instruction.
- The §2 recipe-to-frame mapping is this document's own proposal, not yet validated by OPS-147's or FRM-48's owners.
- The §3 level-chaining tension has no proposed owner yet.
