

# DeFi Micro-Loan Platform — Full UI Build

## Design System
- **Dark mode** primary with glassmorphism cards (backdrop-blur, semi-transparent backgrounds)
- **Colors**: Deep Blue (#002645), Cyan (#11B5E4), Red (#dc3545), Green (#28c76f), Amber (#ff9f43)
- **Font**: Inter via Google Fonts
- **Components**: Neon-accented borders, soft shadows, smooth 300ms transitions, hover micro-interactions

## Navigation & Layout
- **Sidebar** with collapsible icon mode, role-based sections (Borrower, Lender, Admin)
- **Top navbar** with wallet address display (mock), notification bell, and theme toggle
- All pages wrapped in a consistent dashboard layout

## Pages to Build (all with mock/hardcoded data)

### 1. Auth / Connect Wallet
- Wallet provider selection cards (MetaMask, WalletConnect, Coinbase)
- "Sign message" modal mockup
- Loading and error states

### 2. KYC Onboarding
- Multi-step wizard: Personal Info → Document Upload → Selfie → Status
- Progress bar indicator
- Status states: Pending, Approved, Rejected with appropriate styling

### 3. Borrower Dashboard
- **Credit Score Hero**: Animated arc gauge (0–100) with color zones, composite score, last updated, refresh button
- **Sub-score bars**: Revenue, Transaction Stability, Wallet Behavior, Repayment History, Social Trust
- **Score History**: 90-day area chart (Recharts)
- **Improvement Tips**: AI-style suggestion cards for lowest-scoring categories

### 4. Loan Eligibility Calculator
- Loan amount slider ($500–$50,000)
- Frequency dropdown (Weekly/Bi-weekly/Monthly)
- Real-time EMI, APR, total repayable, interest calculation
- "Apply for Loan" CTA with loyalty discount badge

### 5. EMI Repayment Calendar
- Calendar grid with paid (green), missed (red), upcoming indicators
- Upcoming payment card with countdown timer, amount, "Pay Now" button
- Early payment reward badge, installment progress bar

### 6. Rewards Dashboard
- Token balance card, reward history list
- Stake/Unstake buttons, staking rewards panel with APY display

### 7. Lender Dashboard
- Three pool cards (Conservative, Balanced, Growth) showing APY, TVL, liquidity, default rate
- Deposit/Withdraw flow modals
- Portfolio donut chart (Recharts), reserve fund health bar

### 8. Loan Details Page
- Loan summary card, repayment schedule table
- Mock blockchain tx hashes
- Status timeline (Pending → Active → Completed)

### 9. Admin Panel
- **Loan Management**: Filterable/sortable table with status, pool, date range, overdue filters; loan detail drawer; suspend button
- **User Management**: Table with KYC status, AML flags, credit score, suspend option
- **Platform Metrics**: Cards for active loans, TVL, default rate, revenue, new users with trend indicators

### 10. Notifications
- Toast notification system
- Notification dropdown with categorized alerts (loan disbursed, payment due, rewards earned)

### 11. Shared UX
- Skeleton loaders on all data sections
- Error states with retry buttons
- Empty states with illustrations
- Transaction pending/success/failure modals
- Gas fee indicator mockup
- Fully responsive (mobile + desktop)

## Tech
- React + TypeScript + Tailwind + shadcn/ui components
- Recharts for all charts (area, donut, bar, gauge)
- React Router for page navigation
- All data hardcoded as mock constants

