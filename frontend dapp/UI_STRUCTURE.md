# BlockVote UI - Component Structure

## Overview

This is a comprehensive voting blockchain DApp UI built with React and TypeScript. The application follows a modular component architecture with clear separation of concerns.

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── MainLayout.tsx   # Main app layout with sidebar and header
│   ├── MainLayout.css
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Sidebar.css
│   ├── Header.tsx       # Header with network and user info
│   ├── Header.css
│   ├── Card.tsx         # Generic card component
│   ├── Card.css
│   ├── StatBox.tsx      # Statistics display component
│   ├── StatBox.css
│   ├── VoteProgressBar.tsx  # Voting progress visualization
│   ├── VoteProgressBar.css
│   ├── VotersTable.tsx  # Voters list table
│   ├── VotersTable.css
│   ├── ProposalCard.tsx # Individual proposal card
│   └── ProposalCard.css
├── pages/               # Page components for different views
│   ├── Dashboard.tsx    # Main dashboard with stats
│   ├── Dashboard.css
│   ├── Voters.tsx       # Voters management page
│   ├── Voters.css
│   ├── Proposals.tsx    # Proposals voting page
│   ├── Proposals.css
│   ├── MyVotes.tsx      # User's voting history
│   ├── MyVotes.css
│   ├── Delegates.tsx    # Delegates management
│   ├── Delegates.css
│   ├── Admin.tsx        # Admin settings and management
│   └── Admin.css
├── types/               # TypeScript type definitions
│   └── index.ts
├── styles/              # Global styles
│   └── theme.css        # Theme colors and variables
├── App.tsx              # Main app component
├── App.css
├── index.css            # Global CSS reset
└── main.tsx             # React entry point
```

## Component Documentation

### Layout Components

#### MainLayout
**Path:** `src/components/MainLayout.tsx`

The main layout component that combines sidebar and header with content area.

**Props:**
```typescript
interface MainLayoutProps {
  children: ReactNode
  currentPage: string
  onNavigate: (page: string) => void
  headerTitle: string
  headerSubtitle?: string
  userAddress?: string
  userRole?: string
}
```

#### Sidebar
**Path:** `src/components/Sidebar.tsx`

Collapsible navigation sidebar with menu items.

**Features:**
- Collapsible/expandable mode
- Active page highlighting
- Admin-specific menu items
- User address display
- Disconnect button

#### Header
**Path:** `src/components/Header.tsx`

Top header displaying page title and user information.

**Features:**
- Network indicator (Ethereum Sepolia)
- User address with avatar
- Connected status pulse animation

### Reusable Components

#### Card
**Path:** `src/components/Card.tsx`

Generic card container component.

**Props:**
```typescript
interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
}
```

#### StatBox
**Path:** `src/components/StatBox.tsx`

Statistics display with optional trend indicator.

**Props:**
```typescript
interface StatBoxProps {
  title: string
  value: string | number
  icon?: string
  trend?: 'up' | 'down'
  trendValue?: string
  color?: 'primary' | 'success' | 'danger' | 'warning'
}
```

**Colors:** Primary (purple), Success (green), Danger (red), Warning (orange)

#### VoteProgressBar
**Path:** `src/components/VoteProgressBar.tsx`

Visual representation of vote distribution.

**Props:**
```typescript
interface VoteProgressBarProps {
  yesPercentage: number
  noPercentage: number
  total?: number
  showLabels?: boolean
}
```

#### VotersTable
**Path:** `src/components/VotersTable.tsx`

Table for displaying voters list.

**Props:**
```typescript
interface VotersTableProps {
  voters: Voter[]
  onRowClick?: (voter: Voter) => void
}
```

**Columns:** STT, Address, Name, Weight, Status, Actions

#### ProposalCard
**Path:** `src/components/ProposalCard.tsx`

Individual proposal display card.

**Props:**
```typescript
interface ProposalCardProps {
  proposal: Proposal
  onVote?: (proposalId: number, vote: 'yes' | 'no') => void
  onDetails?: (proposalId: number) => void
}
```

### Page Components

#### Dashboard
**Path:** `src/pages/Dashboard.tsx`

Main dashboard showing:
- Statistics grid (total voters, proposals, votes)
- Recent activity list
- Voting statistics

#### Voters
**Path:** `src/pages/Voters.tsx`

Voter management page with:
- Voters list table
- Add voter button
- Selected voter details panel

#### Proposals
**Path:** `src/pages/Proposals.tsx`

Proposals voting page with:
- Filter and sort options
- Proposal cards grid
- Vote and details buttons

#### MyVotes
**Path:** `src/pages/MyVotes.tsx`

User's voting history showing:
- List of voted proposals
- Vote details and dates
- Vote result visualization

#### Delegates
**Path:** `src/pages/Delegates.tsx`

Delegates management with:
- Delegate cards
- Statistics per delegate
- Delegation actions
- Information about delegation

#### Admin
**Path:** `src/pages/Admin.tsx`

Admin management panel with:
- Quick action buttons (manage voters, proposals, roles)
- System settings
- Toggle switches and input fields

## Type Definitions

**Path:** `src/types/index.ts`

```typescript
interface Voter {
  id: string
  name: string
  address: string
  hasVoted: boolean
  votedProposal?: string
  weight: number
}

interface Proposal {
  id: number
  title: string
  description: string
  status: 'Active' | 'Pending' | 'Closed'
  voteCount: number
  yesVotes: number
  noVotes: number
  yesPercentage: number
  noPercentage: number
  deadline?: string
}

interface User {
  address: string
  name: string
  role: 'Admin' | 'Delegate' | 'Voter' | 'User'
  isConnected: boolean
}

interface VotingStats {
  totalVoters: number
  totalProposals: number
  activeProposals: number
  closedProposals: number
  totalVotes: number
  delegateCount: number
}

interface Delegate {
  id: string
  name: string
  address: string
  followers: number
  votingPower: number
  status: 'Active' | 'Inactive'
}
```

## Theme & Styling

**Path:** `src/styles/theme.css`

### Color Variables

- **Primary:** `--primary-color: #7c5eff` (Purple)
- **Success:** `--success: #48bb78` (Green)
- **Danger:** `--danger: #f56565` (Red)
- **Warning:** `--warning: #ed8936` (Orange)
- **Info:** `--info: #4299e1` (Blue)

### Background Colors

- `--bg-primary: #0f1419`
- `--bg-secondary: #1a1f2a`
- `--bg-tertiary: #252d3d`

### Text Colors

- `--text-primary: #ffffff`
- `--text-secondary: #a0aec0`
- `--text-tertiary: #718096`

## Navigation Structure

```
Dashboard
├── Dashboard
├── Voters
├── Proposals
├── My Votes
├── Delegates
└── [Admin Only]
    ├── Admin
    └── Settings
```

## Features

### Responsive Design

- Works on desktop, tablet, and mobile
- Sidebar collapses on smaller screens
- Grid layouts adapt based on screen size

### Dark Theme

- Dark color scheme optimized for eye comfort
- Consistent styling across all components
- Smooth transitions and hover effects

### Interactive Elements

- Collapsible sidebar
- Status badges
- Progress bars with animations
- Clickable cards and tables
- Toggle switches

### Accessibility

- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance

## Getting Started

1. Import components into pages:

```typescript
import { Card } from '../components/Card'
import { StatBox } from '../components/StatBox'
```

2. Use in your component:

```typescript
<Card title="Example">
  <StatBox
    title="Total Votes"
    value={156}
    icon="🗳️"
    color="primary"
  />
</Card>
```

3. Add custom styling:

```typescript
<Card className="custom-class">
  Content here
</Card>
```

## State Management

Currently uses React `useState` for local state. For more complex state management, consider:

- Redux
- Zustand
- Context API
- Jotai

## Next Steps

1. Connect blockchain integration (Web3/Ethers.js)
2. Implement smart contract interactions
3. Add form validation and submission
4. Implement real-time updates
5. Add authentication/wallet connection
6. Add error handling and loading states
7. Implement data persistence

## Styling Guidelines

### CSS Organization

- Component CSS files mirror component structure
- Use CSS custom properties (variables) for theming
- Mobile-first approach with media queries
- Consistent spacing using `var(--spacing-*)` variables

### Naming Conventions

- BEM methodology: `.block__element--modifier`
- Class names in kebab-case
- Descriptive class names

### Responsive Breakpoints

- Desktop: `1024px` and above
- Tablet: `768px` to `1024px`
- Mobile: Below `768px`

## License

This UI framework is ready for integration with your blockchain voting smart contracts.
