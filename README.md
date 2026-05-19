<div align="center">

<img src="https://img.shields.io/badge/IntelFeed-First--Gen%20Intelligence%20Platform-38BDF8?style=for-the-badge&labelColor=0C4A6E" />

# IntelFeed

### The invisible curriculum, finally documented.

First-generation college students lose scholarships, miss recruiting windows, and skip the right office hours — not because they lack ability, but because they never got the memo. IntelFeed fixes that. Seniors share time-sensitive, branch-specific intel. Peers verify it. Freshers get nudged before the window closes.

**[Student App →](https://intel-wise-hub.lovable.app/)** &nbsp;|&nbsp; **[Admin Dashboard →](https://intelpulse-dash.lovable.app/)**

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![TanStack](https://img.shields.io/badge/TanStack_Router-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

</div>

---

## The Problem

> *"I missed the Tata scholarship deadline by 3 days. My senior knew about it in September. Nobody told me until November."*

Privileged students inherit institutional knowledge informally — through family networks, alumni connections, and social circles. First-generation students don't have that. The result isn't a skill gap. It's an **information gap**.

IntelFeed closes it.

---

## What It Does

| For Freshers | For Seniors | For Admins |
|---|---|---|
| Personalised intel feed filtered by branch and urgency | Structured tip submission with category and deadline context | Full tip management with approval workflows |
| Proactive nudges before deadlines close — not after | Peer verification queue to validate tips before publish | College-wise coverage gap detection |
| Deadline tracker with countdown | Credibility score that builds over time | Broadcast nudges to targeted student groups |
| Conflicting intel shown side-by-side for critical thinking | Legacy profile that persists after graduation | User management with credibility oversight |

---

## Live Demos

| App | Link | Who it's for |
|---|---|---|
| 🎓 Student App | [intel-wise-hub.lovable.app](https://intel-wise-hub.lovable.app/) | Freshers and seniors |
| 🛠 Admin Dashboard | [intelpulse-dash.lovable.app](https://intelpulse-dash.lovable.app/) | College administrators |

---

## Architecture

```
intelfeed/
├── student/          # Student-facing web app
│   ├── src/
│   │   ├── routes/         # Feed, Submit, Verify, Notifications, Profile
│   │   ├── components/
│   │   │   ├── ui/         # Radix-based design system primitives
│   │   │   └── feed/       # Feed-specific components (TipCard, VerifyQueue…)
│   │   ├── server.ts       # Cloudflare Workers entry
│   │   └── router.tsx      # TanStack Router setup
│   └── wrangler.jsonc
│
├── admin/            # Admin dashboard
│   ├── src/
│   │   ├── routes/         # Overview, Tips, Users, Broadcast, Coverage, Reports
│   │   ├── components/
│   │   │   ├── ui/         # Shared Radix primitives
│   │   │   └── admin/      # Admin-specific components (DataTable, DrawerPanel…)
│   │   ├── server.ts       # Cloudflare Workers entry
│   │   └── router.tsx
│   └── wrangler.jsonc
```

Both apps are independently deployable to Cloudflare Workers and share the same design language and component patterns.

---

## How the Intelligence Engine Works

```
Senior submits tip
        │
        ▼
Tip enters branch-specific verify queue
        │
        ▼
3 peers from same dept review independently
(Confirm / Dispute / Add context — reason required for all)
        │
     ┌──┴──┐
   3/3    split
  confirm  │
     │   Both versions published as "Conflicting Intel"
     ▼
Published to feed with urgency score
(urgency = deadline proximity × credibility × recency)
        │
        ▼
Nudge fires at 7d / 3d / 1d before deadline
        │
        ▼
After deadline: "Was this accurate?" feedback loop
        │
        ▼
Contributor credibility score updated
```

This post-deadline accuracy loop is what makes IntelFeed self-improving. Every tip gets a quality signal after the event passes — something no generic knowledge-sharing platform does.

---

## Tech Stack

### Frontend (both apps)
- **React 19** — UI rendering
- **TypeScript** — type safety throughout
- **TanStack Router** — file-based routing with generated route trees
- **TanStack Query** — server state management and caching
- **Tailwind CSS** — utility-first styling
- **Radix UI** — accessible, unstyled component primitives
- **Zod** — schema validation for forms and API responses

### Infrastructure
- **Vite** — build tooling and dev server
- **Cloudflare Workers** — edge deployment via `wrangler` with `nodejs_compat`

---

## Getting Started

**Prerequisites:** Node 18+, npm or pnpm

```bash
# Clone the repository
git clone https://github.com/your-org/intelfeed.git
cd intelfeed
```

```bash
# Install and run the student app
cd student
npm install
npm run dev
```

```bash
# Install and run the admin app (separate terminal)
cd admin
npm install
npm run dev
```

Student app runs on `http://localhost:5173`
Admin app runs on `http://localhost:5174`

---

## Available Scripts

Both `student/` and `admin/` support the same scripts:

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run build:dev  # Development build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run format     # Run Prettier
```

---

## Deploying to Cloudflare Workers

```bash
# Authenticate with Cloudflare
wrangler login

# Deploy student app
cd student
npm run build
wrangler publish --config wrangler.jsonc

# Deploy admin app
cd admin
npm run build
wrangler publish --config wrangler.jsonc
```

The `wrangler.jsonc` in each app sets `main` to `src/server.ts` and enables `nodejs_compat` for full Node API support at the edge.

---

## Key Design Decisions

**Structured anonymity with accountability** — contributors can post anonymously to reduce social risk, but their college email is validated internally. Tips are traceable for abuse prevention, publicly anonymous. Different from Reddit: accountability without exposure.

**Conflicting intel display** — when verifiers dispute a tip, both versions surface side-by-side with their evidence rather than collapsing into a single answer. First-gen students learn to evaluate conflicting signals, not just consume one truth.

**Academic calendar awareness** — nudges fire relative to calendar phase (internship season, mid-sem, add-drop week), not just raw dates. "Internship season starts in 2 weeks — 4 tips you haven't read" is more useful than "deadline in 14 days."

**Contributor legacy profiles** — seniors who graduate leave behind a Legacy Score: verified tips that kept helping students after they left. Incentive to give back, not just consume.

---

## Roadmap

- [ ] Consolidate shared UI into top-level `packages/ui`
- [ ] GitHub Actions CI for lint, format, and build on PRs
- [ ] Vitest unit tests for UI components
- [ ] Playwright E2E tests for critical flows (submit → verify → publish)
- [ ] Native push notifications via Web Push API
- [ ] College admin SSO via institutional email domains

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes confined to the relevant app (`admin/` or `student/`) unless updating shared patterns
4. Run `npm run lint` and `npm run format` before committing
5. Open a pull request with a clear description of what changed and why

---

## License

Private repository. All rights reserved. Add a `LICENSE` file before open-sourcing.

---

<div align="center">

Built for the students who had to figure it out alone — so the next batch doesn't have to.

**[intel-wise-hub.lovable.app](https://intel-wise-hub.lovable.app/)** &nbsp;·&nbsp; **[intelpulse-dash.lovable.app](https://intelpulse-dash.lovable.app/)**

</div>
