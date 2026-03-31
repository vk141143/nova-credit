import { ArrowRight, Shield, Zap, TrendingUp, Users, Lock, BarChart3, ChevronRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Value Locked", value: "$12.4M", change: "+18.2%" },
  { label: "Active Loans", value: "1,247", change: "+24.5%" },
  { label: "Users Onboarded", value: "8,930", change: "+31.1%" },
  { label: "Avg. APY for Lenders", value: "9.8%", change: "+2.1%" },
];

const features = [
  {
    icon: Shield,
    title: "AI Credit Scoring",
    description: "On-chain behavioral analysis powered by machine learning. No traditional credit bureau needed.",
  },
  {
    icon: Zap,
    title: "Instant Micro-Loans",
    description: "Get approved in minutes. Funds disbursed directly to your wallet with transparent terms.",
  },
  {
    icon: TrendingUp,
    title: "Earn as a Lender",
    description: "Provide liquidity to curated pools and earn competitive yields with risk-adjusted returns.",
  },
  {
    icon: Lock,
    title: "Fully On-Chain",
    description: "Every transaction recorded on Polygon. Immutable, transparent, and verifiable by anyone.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track your portfolio, repayments, and rewards with a comprehensive data dashboard.",
  },
  {
    icon: Users,
    title: "Reputation Rewards",
    description: "Build your credit passport NFT. Earn tokens for on-time repayments and loyalty.",
  },
];

const steps = [
  { step: "01", title: "Connect Wallet", desc: "Link your MetaMask, WalletConnect, or Coinbase wallet in seconds." },
  { step: "02", title: "Complete KYC", desc: "Quick identity verification to comply with regulations and unlock full access." },
  { step: "03", title: "Get Your Score", desc: "Our AI analyzes your on-chain activity to generate a DeFi credit score." },
  { step: "04", title: "Borrow or Lend", desc: "Access micro-loans or provide liquidity to earn yield — all on Polygon." },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl text-gradient">DefiLoan</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
          </div>
          <Button onClick={() => navigate("/connect")} size="sm" className="gap-2">
            Launch App <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        {/* Glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[300px] h-[300px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Live on Polygon Mainnet
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            DeFi Micro-Loans{" "}
            <span className="text-gradient">Powered by AI</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Borrow, lend, and earn with on-chain credit scoring. No banks, no paperwork — just transparent, 
            AI-driven micro-lending on Polygon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/connect")} className="text-base px-8 py-6 gap-2 animate-pulse-glow">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/lender")} className="text-base px-8 py-6 gap-2">
              Become a Lender <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-6 border-y border-border/30">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              <span className="text-xs font-medium text-success mt-2 inline-block">{s.change}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need for <span className="text-gradient">DeFi Lending</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-card-hover p-6 group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              How <span className="text-gradient">DefiLoan</span> Works
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                <div className="text-5xl font-extrabold text-primary/10 mb-4">{s.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-5 w-5 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto glass-card p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start <span className="text-gradient">Lending?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of borrowers and lenders on the most transparent DeFi micro-loan platform built on Polygon.
            </p>
            <Button size="lg" onClick={() => navigate("/connect")} className="text-base px-10 py-6 gap-2">
              Connect Wallet <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-gradient">DefiLoan</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 DefiLoan. Built on Polygon. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
