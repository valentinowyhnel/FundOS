# FundOS Investor Web App

The primary frontend for investors to research and track funding rounds.

## Quick Start
```bash
pnpm dev
```

## Features
- **Dashboard:** AI-powered insights and portfolio overview.
- **Discover:** Search and filter funding opportunities.
- **Design System Preview:**
  - `/dev/components`: Gallery of all UI components.
  - `/dev/tokens`: Visual reference for colors, fonts, and spacing.

## Architecture
- **Framework:** Next.js 14/15
- **Styling:** Tailwind CSS (via `@fundos/design-system` preset)
- **Components:** Shared components from `@fundos/ui`
- **State:** Zustand
- **Data Fetching:** SWR / Axios
