# FundOS Web Investor Portal

> **Investment decisions powered by intelligence** — A modern fintech investor dashboard designed for sophisticated decision-making.

## 🎯 Vision

FundOS Investor Portal is built as a **decision-making cockpit**, not a marketplace. It transforms investment data into actionable intelligence:

- **Clarity** — Understand every investment in seconds
- **Confidence** — AI-powered due diligence at your fingertips  
- **Control** — Manage portfolio and compliance effortlessly

The experience answers five critical questions in under 60 seconds:
1. Where is my money going?
2. Which projects deserve my attention?
3. Why is the AI showing me this signal?
4. What is the confidence/compliance status?
5. What action should I take next?

## 🏗️ Architecture

```
web-investor/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Login page (55/45 split)
│   │   ├── dashboard/         # Overview with AI brief
│   │   ├── discover/          # Opportunity exploration
│   │   ├── portfolio/         # Holdings management
│   │   ├── signals/           # Real-time signal feed
│   │   ├── wallet/            # Balance & transactions
│   │   ├── compliance/        # KYC & privacy
│   │   ├── activity/          # Audit log
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── Button.tsx         # 5 variants × 3 sizes
│   │   ├── Card.tsx           # Elevated, muted, clickable
│   │   ├── KPICard.tsx        # Metrics with deltas
│   │   ├── ConfidenceBadge.tsx # Semantic scores
│   │   ├── DealCard.tsx       # Deal preview cards
│   │   ├── Sidebar.tsx        # 256px nav sidebar
│   │   └── Topbar.tsx         # 72px header
│   ├── lib/
│   │   └── store.ts           # Zustand state management
│   ├── types/
│   │   └── index.ts           # 15+ TypeScript interfaces
│   └── globals.css            # Design tokens & animations
├── tailwind.config.js         # Design system tokens
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## 🎨 Design System

### Color Palette

| Token | Color | Usage |
|-------|-------|-------|
| Primary | `#0F766E` | CTAs, active states, accents |
| Background | `#F6F8FB` | Canvas background |
| Surface | `#FFFFFF` | Cards, surfaces |
| Surface Elevated | `#FCFDFE` | Lifted surfaces |
| Surface Muted | `#F2F4F7` | Secondary surfaces |
| Success | `#12B76A` | Positive states |
| Warning | `#F79009` | Attention states |
| Danger | `#F04438` | Error/risk states |
| Info | `#2E90FA` | Information |
| Text Primary | `#0F1728` | Main text |
| Text Secondary | `#667085` | Secondary text |
| Text Tertiary | `#98A2B3` | Tertiary text |
| Border | `#E4E7EC` | Light borders |

### Typography

- **Display**: Satoshi / General Sans
- **Body**: Inter
- **Numeric**: Inter (tabular figures)

### Spacing & Radius

- Padding: 24px (standard card padding)
- Gaps: 12px minimum vertical
- Radius: 8px (xs) → 24px (2xl)
- Shadows: Diffuse subtle, no harsh shadows

## 📦 Components

### Button
```tsx
<Button 
  variant="primary" | "secondary" | "ghost" | "destructive" | "tertiary"
  size="sm" | "md" | "lg"
  isLoading={false}
  icon={<Icon />}
  iconPosition="left" | "right"
/>
```

### Card
```tsx
<Card 
  elevated={false}
  muted={false}
  clickable={false}
  noPadding={false}
>
  Content
</Card>
```

### KPICard
```tsx
<KPICard 
  label="Portfolio Value"
  value="$150K"
  delta={5}
  trend="up" | "down" | "neutral"
  info="Optional info"
/>
```

### ConfidenceBadge
```tsx
<ConfidenceBadge 
  score={78}
  size="sm" | "md" | "lg"
  showLabel={true}
  variant="filled" | "outline"
/>
```

## 🚀 Features

### Implemented Pages

- ✅ **Login** — Split 55/45 design with OAuth
- ✅ **Dashboard** — AI brief hero + 6 KPI cards + charts
- ✅ **Discover** — Card/table view with sticky filters
- ✅ **Components** — 7 core components production-ready

### Coming Soon

- [ ] Portfolio holdings with drill-down
- [ ] Signals real-time feed
- [ ] Deal detail pages
- [ ] Invest flow (5 steps)
- [ ] Compliance center
- [ ] Activity audit log
- [ ] Wallet management
- [ ] Mobile responsive
- [ ] WebSocket real-time updates
- [ ] PDF export

## 📊 State Management

Uses **Zustand** for lightweight state management:

```tsx
// App state
const { investor, isAuthenticated, setInvestor, logout } = useAppStore();

// Deals state
const { deals, filters, applyFilters } = useDealsStore();

// UI state
const { sidebarOpen, selectDeal, drawerOpen } = useUIStore();
```

## 🔐 TypeScript Types

Complete domain modeling:

- `Investor` — Profile + KYC + portfolio
- `Deal` — Project details + signals
- `ConfidenceSignal` — Score breakdown + history
- `Portfolio` — Holdings + metrics
- `ComplianceStatus` — KYC granular status
- `PrivacySettings` — User consent controls
- `Transaction` — Investment rails
- `ActivityLog` — Audit trail

## 🎬 Micro-interactions

- **Hover cards** — Elevate 2px + shadow increase
- **Row hovers** — Reveal actions + background change
- **Tab switches** — Crossfade + slide 6px
- **Drawer opens** — Spring animation from right
- **Score rings** — Count-up animation on load
- **Skeleton loading** — Shimmer effect for time-real data

## 📝 Development

### Setup

```bash
cd apps/web-investor
npm install
npm run dev
```

Access at `http://localhost:3001`

### Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint check
npm run type-check # TypeScript verification
npm run format     # Prettier formatting
npm run test       # Jest tests
```

### Adding Pages

1. Create folder in `src/app/`
2. Add `page.tsx` with layout wrapper
3. Use `Sidebar`, `Topbar`, `Card` components
4. Connect to Zustand stores as needed

### Adding Components

1. Create in `src/components/ComponentName.tsx`
2. Export as named default
3. Add TypeScript `interface Props`
4. Use `forwardRef` for interactive components
5. Include Tailwind classes with token colors

## 🎯 Core Principles

1. **Clarity over Complexity** — Every element has a role
2. **Context over Clutter** — Progressive disclosure via drawers
3. **Actions over Aesthetics** — Design serves decision-making
4. **Trust and Precision** — Financial-grade polish

## 🔑 Key Differentiators

✨ **Confidence Engine** — AI-powered signal transparency showing exactly why a deal matters  
✨ **Privacy-First Design** — Granular consent controls for data aggregation  
✨ **Compliance Integration** — KYC and regulations embedded, not bolted on  
✨ **Real-time Updates** — Live signal changes with audit trail  
✨ **Contextual Intelligence** — Drill-down from overview → signals → deal detail  

## 📱 Responsive Design

- **Desktop** — Full sidebar + topbar + content (default)
- **Tablet** — Collapsible sidebar + full content
- **Mobile** — Bottom nav + stack layout

## 🤝 Contributing

Follow component conventions:
- Use Tailwind + custom tokens
- Export as default React.FC
- Include full TypeScript props
- Add JSDoc for public methods
- Test hover and focus states

## 📄 License

Apache 2.0 - See LICENSE file

---

**Built for investors who demand clarity, confidence, and control.**
