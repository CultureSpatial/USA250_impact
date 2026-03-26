# Event Playbook & Partner Enablement Guide
**OPS-68 / CEAZ-193 — VanWineFest Corridor Anchor**
*Version 1.0 | March 2026*

---

## Purpose

This playbook defines the division of responsibility between **Stadium Soundwave (SS)** and each **Festival / Hospitality Partner** for corridor events in the VanWineFest / FIFA 2026 pilot.

It is the operational companion to:
- CEAZ-193 (VanWineFest anchor city)
- CEAZ-184 (Cross-border clause precedent)
- CEAZ-183 (Permit templates)
- `docs/compliance_matrix.csv` (colour-coded responsibility grid)

---

## 1. What Stadium Soundwave Supplies

| Capability | Description | Delivery |
|---|---|---|
| **Narrative infrastructure** | Place Packet CMS, producer story recording, QR code generation | Pre-event |
| **Telemetry pipeline** | TQ metrics, pour-count capture, Campfire topic ingestion | Real-time |
| **DtC attribution dashboard** | Partner view at `/dashboards/partner/{partnerId}` | Post-event |
| **Cultural governance** | CIP Overlay toggles, consent gating, refusal rights enforcement | Always-on |
| **Discord continuity bot** | Post-event cohort engagement (Vintage & Voice channel) | 30/60/90 days post |
| **SLO harness** | p95 < 1.5s, error rate < 0.5%, Grafana dashboard | Operational |
| **Sovereignty compliance** | CARE Principles as code, ABAC enforcement, audit log | Always-on |

---

## 2. What the Festival / Hospitality Partner Supplies

| Capability | Description | Deadline |
|---|---|---|
| **Staffing** | Floor staff for kiosk assistance and QR onboarding | Event date |
| **Permits** | Venue permits, liquor licensing, data collection notices | 30 days pre-event |
| **Kiosk maintenance** | Hardware provisioning, power, network connectivity | 48h pre-event |
| **Producer coordination** | Securing producer consent for story recording | 60 days pre-event |
| **Indigenous liaison** | Introduction to territorial knowledge holders | 90 days pre-event |
| **Marketing permissions** | Written approval for post-event DtC follow-up | 45 days pre-event |

---

## 3. Cross-Border Template Clauses

*Pending CEAZ-193-A drafting. To be inserted when available.*

Placeholder clauses:

**3.1 Data Residency**
> All visitor interaction data collected within Canada shall be stored in Canadian data centres (AWS ca-central-1 or equivalent). Data collected within US territory shall be stored in US data centres (AWS us-west-2 or equivalent). Cross-border data transfer requires explicit visitor consent captured at the point of QR scan.

**3.2 Tribal Sovereignty (US Events)**
> For events on or adjacent to tribal lands, the Tribal Nation's data sovereignty protocols take precedence over platform defaults. The CIP Overlay's `communityVeto` toggle will be set to `true` for all such events. Stadium Soundwave shall not collect, transmit, or store any data related to tribal knowledge without explicit Tribal Council approval.

**3.3 Section 35 (Canadian Events)**
> Indigenous knowledge shared within the platform is subject to Section 35 Aboriginal rights protections. No knowledge designated `visibility: steward` shall be made publicly accessible without the knowledge holder's written consent. The CIP Overlay `refusalRights` toggle enforces this technically.

---

## 4. RMAC Role Definitions

*Imported from `governance-plane/rmac.yaml` (v0-move-culture repo). Pending integration.*

| Role | Responsibility | Permission Level |
|---|---|---|
| **Steward** | Knowledge holder or designated cultural guardian | Full CIP toggle control |
| **Producer** | Wine/venue producer recording their story | Story upload, edit own content |
| **Moderator** | Festival/event floor staff | TQ dashboard read, Purple Alert |
| **Visitor** | Festival attendee | QR scan, story playback, DtC link |
| **Operator** | Stadium Soundwave staff | Platform admin, SLO dashboard |
| **Partner** | Festival organisation | Partner dashboard, aggregate metrics only |

---

## 5. Pilot Timeline — VanWineFest 2026

| Date | Milestone | Owner |
|---|---|---|
| Jan 2026 | Issue #9 Tourism Vancouver scaffold | SS + Tourism Vancouver |
| Feb 2026 | Internal testing, Recon build live (#16) | SS |
| Feb 28 | All producer consents signed | Partner |
| Mar 1 | Indigenous liaison introductions complete | Partner |
| Mar 7 | Festival opens — Recon build active | SS |
| Mar 14 | Festival closes — data collection ends | SS |
| Mar 15 | Partner dashboard available | SS |
| Apr 14 | 30-day DtC conversion report | SS |
| May 14 | 60-day DtC conversion report | SS |
| Jun 14 | 90-day DtC conversion report — pilot conclusion | SS |

---

## 6. Escalation Paths

| Situation | Contact | Response Time |
|---|---|---|
| TQ_PAUSED alert | Moderator on floor → SS ops channel | Immediate |
| Cultural boundary concern | Steward → Knowledge holder | 1 hour |
| Partner data request | SS ops → Legal review | 48 hours |
| Cross-border data issue | SS Legal → Partner Legal | 24 hours |
| SLO breach (p95 > 1.5s) | SS engineering → Grafana alert | 15 minutes |
