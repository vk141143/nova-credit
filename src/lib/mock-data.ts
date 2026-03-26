// ==================== MOCK DATA ====================

export const MOCK_WALLET = {
  address: "0x1a2B...9cD4",
  fullAddress: "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9cD4",
  balance: "2,450.00",
  network: "Polygon",
};

export const MOCK_CREDIT_SCORE = {
  composite: 74,
  lastUpdated: "6 hours ago",
  subScores: [
    { name: "Revenue", score: 82, max: 100 },
    { name: "Transaction Stability", score: 71, max: 100 },
    { name: "Wallet Behavior", score: 68, max: 100 },
    { name: "Repayment History", score: 89, max: 100 },
    { name: "Social Trust", score: 58, max: 100 },
  ],
  history: [
    { date: "Jan", score: 62 },
    { date: "Feb", score: 65 },
    { date: "Mar", score: 64 },
    { date: "Apr", score: 68 },
    { date: "May", score: 70 },
    { date: "Jun", score: 69 },
    { date: "Jul", score: 72 },
    { date: "Aug", score: 71 },
    { date: "Sep", score: 74 },
  ],
  tips: [
    { category: "Social Trust", tip: "Link verified social accounts and build on-chain reputation through community participation." },
    { category: "Wallet Behavior", tip: "Maintain consistent transaction patterns and avoid large sudden withdrawals." },
  ],
};

export const MOCK_LOANS = [
  {
    id: "LN-0042",
    borrower: "0x1a2B...9cD4",
    amount: 5000,
    apr: 8.5,
    status: "Active" as const,
    nextPayment: "2026-04-05",
    daysOverdue: 0,
    pool: "Balanced",
    totalRepayable: 5425,
    paidInstallments: 4,
    totalInstallments: 12,
    disbursedDate: "2025-10-05",
    txHash: "0xabc123...def456",
  },
  {
    id: "LN-0039",
    borrower: "0x5e6F...1a2B",
    amount: 2500,
    apr: 7.2,
    status: "Active" as const,
    nextPayment: "2026-04-10",
    daysOverdue: 0,
    pool: "Conservative",
    totalRepayable: 2680,
    paidInstallments: 8,
    totalInstallments: 10,
    disbursedDate: "2025-07-10",
    txHash: "0x789abc...123def",
  },
  {
    id: "LN-0035",
    borrower: "0x3c4D...7e8F",
    amount: 10000,
    apr: 10.5,
    status: "Overdue" as const,
    nextPayment: "2026-03-20",
    daysOverdue: 6,
    pool: "Growth",
    totalRepayable: 11050,
    paidInstallments: 2,
    totalInstallments: 12,
    disbursedDate: "2025-12-20",
    txHash: "0xdef789...abc456",
  },
  {
    id: "LN-0028",
    borrower: "0x9cD4...5e6F",
    amount: 1500,
    apr: 6.8,
    status: "Completed" as const,
    nextPayment: "-",
    daysOverdue: 0,
    pool: "Conservative",
    totalRepayable: 1602,
    paidInstallments: 6,
    totalInstallments: 6,
    disbursedDate: "2025-04-15",
    txHash: "0x456def...789abc",
  },
  {
    id: "LN-0021",
    borrower: "0x7e8F...3c4D",
    amount: 8000,
    apr: 9.2,
    status: "Pending" as const,
    nextPayment: "-",
    daysOverdue: 0,
    pool: "Balanced",
    totalRepayable: 8736,
    paidInstallments: 0,
    totalInstallments: 12,
    disbursedDate: "-",
    txHash: "-",
  },
];

export const MOCK_EMI_SCHEDULE = [
  { date: "2025-11-05", amount: 452.08, status: "paid" as const },
  { date: "2025-12-05", amount: 452.08, status: "paid" as const },
  { date: "2026-01-05", amount: 452.08, status: "paid" as const },
  { date: "2026-02-05", amount: 452.08, status: "paid" as const },
  { date: "2026-03-05", amount: 452.08, status: "missed" as const },
  { date: "2026-04-05", amount: 452.08, status: "upcoming" as const },
  { date: "2026-05-05", amount: 452.08, status: "upcoming" as const },
  { date: "2026-06-05", amount: 452.08, status: "upcoming" as const },
  { date: "2026-07-05", amount: 452.08, status: "upcoming" as const },
  { date: "2026-08-05", amount: 452.08, status: "upcoming" as const },
  { date: "2026-09-05", amount: 452.08, status: "upcoming" as const },
  { date: "2026-10-05", amount: 452.08, status: "upcoming" as const },
];

export const MOCK_REWARDS = {
  tokenBalance: 1250,
  tokenSymbol: "PLY",
  stakedAmount: 800,
  stakingAPY: 12.5,
  history: [
    { date: "2026-03-05", amount: 25, type: "Repayment Reward" },
    { date: "2026-02-05", amount: 25, type: "Repayment Reward" },
    { date: "2026-02-01", amount: 50, type: "Staking Reward" },
    { date: "2026-01-15", amount: 100, type: "Early Payment Bonus" },
    { date: "2026-01-05", amount: 25, type: "Repayment Reward" },
    { date: "2026-01-01", amount: 50, type: "Staking Reward" },
  ],
};

export const MOCK_POOLS = [
  {
    name: "Conservative",
    apy: 6.8,
    tvl: 2450000,
    liquidity: 890000,
    defaultRate: 1.2,
    scoreRange: "75–100",
    color: "hsl(var(--success))",
    deposited: 5000,
  },
  {
    name: "Balanced",
    apy: 9.5,
    tvl: 5200000,
    liquidity: 1450000,
    defaultRate: 3.8,
    scoreRange: "50–74",
    color: "hsl(var(--primary))",
    deposited: 12000,
  },
  {
    name: "Growth",
    apy: 14.2,
    tvl: 1800000,
    liquidity: 420000,
    defaultRate: 7.5,
    scoreRange: "35–49",
    color: "hsl(var(--warning))",
    deposited: 3000,
  },
];

export const MOCK_USERS = [
  { id: "U-001", address: "0x1a2B...9cD4", kyc: "Approved" as const, aml: "Clear" as const, creditScore: 74, status: "Active" as const },
  { id: "U-002", address: "0x5e6F...1a2B", kyc: "Approved" as const, aml: "Clear" as const, creditScore: 82, status: "Active" as const },
  { id: "U-003", address: "0x3c4D...7e8F", kyc: "Pending" as const, aml: "Review" as const, creditScore: 45, status: "Active" as const },
  { id: "U-004", address: "0x9cD4...5e6F", kyc: "Rejected" as const, aml: "Flagged" as const, creditScore: 28, status: "Suspended" as const },
  { id: "U-005", address: "0x7e8F...3c4D", kyc: "Approved" as const, aml: "Clear" as const, creditScore: 91, status: "Active" as const },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, type: "loan" as const, title: "Loan Disbursed", message: "Your loan LN-0042 for $5,000 has been disbursed.", time: "2 hours ago", read: false },
  { id: 2, type: "payment" as const, title: "Payment Due", message: "EMI payment of $452.08 is due on April 5th.", time: "1 day ago", read: false },
  { id: 3, type: "reward" as const, title: "Rewards Earned", message: "You earned 25 PLY tokens for on-time repayment.", time: "2 days ago", read: true },
  { id: 4, type: "alert" as const, title: "Credit Score Updated", message: "Your credit score improved to 74 (+3).", time: "3 days ago", read: true },
  { id: 5, type: "loan" as const, title: "APY Rate Change", message: "Balanced pool APY updated to 9.5%.", time: "5 days ago", read: true },
];

export const MOCK_PLATFORM_METRICS = {
  activeLoans: 1247,
  tvl: 9450000,
  defaultRate: 3.2,
  revenue: 284000,
  newUsers: 89,
  trends: {
    activeLoans: 12.5,
    tvl: 8.3,
    defaultRate: -0.5,
    revenue: 15.2,
    newUsers: 23.1,
  },
};
