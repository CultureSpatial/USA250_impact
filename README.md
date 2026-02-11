# USA 250 · FIFA 2026  │  VineSight Corridor Execution Hub
_CultureSpatial / Stadium Soundwave_

> "From terroir to telemetry" — bridging partner activations, federal compliance and
> community sovereignty in one place.

---

## 1 · Why this repo exists

| Layer | What lives here | Up-stream | Down-stream |
|-------|-----------------|-----------|-------------|
| **Specs & policy** | `docs/` – DMAC v1.0 spec, FADGI mapping table, partner playbooks, Story-Trail deck | Jira CEAZ-196 / CEAZ-203 | State proposals (`HOW-202`), partner MOUs |
| **Schemas** | `schemas/` – *temporal-sovereignty.json* + future Campfire tags | Linear HOW-91 | Visible-Flame dashboard (STA-40 / CEAZ-197) |
| **Governance** | `governance-plane/` – RMAC matrix, consent ledger proto | v0-move-culture repo | Compliance matrix (OPS-68), DMO consent interface (OPS-71) |
| **Value flow** | `value-flow/au-ledger/` – AU accounting API stub | Linear HOW-150 v2 | Partner statements → corridor revenue model |
| **Observability** | `observability/slo-harness/` – Grafana / NR configs | — | SLOs for CEAZ-197 endpoints |
| **Experience seeds** | `narrative-assets/`, `pwa/`, Discord bot, wire-frames | legacy repos | VanWineFest & Lighthouse pilots |

_Think of this repo as **ESXi for ideas**: every artifact that drives the corridor is staged here before being shipped to partner-facing infrastructure._

---

## 2 · Live development board

👉  **[GitHub Project — "FIFA Wine Corridor 2026"](<paste board URL>)**

Custom fields: `Jira Epic`, `Linear Ref`, `Corridor Phase`, `Metric Lineage`.

Cards labelled `fifa-corridor` auto-land in Backlog.

---

## 3 · Seed issues (Jan-2026)

| # | Title | Jira | Linear | Phase |
|---|-------|------|--------|-------|
| #3 | DMAC spec v1.0 (FADGI) | CEAZ-196 | — | **In Progress** |
| #4 | Hospitality Phenomenology kit | CEAZ-203 | RES-11 | Pilot |
| #5 | Vintage & Voice Discord bot | CEAZ-203 | ENG-11 | Lighthouse |
| #6 | Event Playbook + Compliance | CEAZ-193 | OPS-68 | Pilot |
| #7 | Seattle–Van DMO PWA | CEAZ-193 | OPS-57 | Pilot |
| #8 | Data-loop dashboard MVP | CEAZ-203/197 | OPS-72 | Lighthouse |
| #9 | Tourism Van partnership scaffold | CEAZ-193 | OPS-70 | Pilot |
| #10| SLO harness integration | CEAZ-197 | — | **In Progress** |

---

## 4 · Usage

### Developer bootstrap
```bash
git clone https://github.com/CultureSpatial/USA250_impact.git
cd USA250_impact
npm i            # for any dashboard/PWA work
make pdf         # renders docs/dmac-spec-draft.md -> build/dmac-spec-v1.pdf
```

### Editing specs
1. Update markdown in `docs/`
2. Run `make pdf`
3. Attach PDF to the matching Jira epic

### Syncing schemas
1. Author change in **Campfire** repo  
2. `npm run schema:import <tag>` – copies to `schemas/` here  
3. Commit & open PR (auto-links to HOW-91)

---

## 5 · Open branches worth exploring

| Branch | Fossil | Re-use |
|--------|--------|--------|
| `idea/prototype-lighthouse` | Early PWA venue selector | Basis for OPS-57 |
| `schema-draft` | First schema w/ `pourVolume` field | Rationale captured in DMAC appendix |
| `wireframes/wine-lighthouse` | PNG set | Partner deck visuals |

See `/ARCHAEOLOGY.md` for full commit-history log.

---

## 6 · License

Apache 2.0 – **but** all cultural-content exemplars remain subject to community licenses described in `/governance-plane/CONSENT_LICENSES.md`.

---

*Maintained by Stadium Soundwave / CultureSpatial.  Contact*  
`tbd@culturespatial.org` for partnerships •  
`ops-alerts` channel on Discord for uptime/SLO issues.
