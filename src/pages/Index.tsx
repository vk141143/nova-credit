import { ArrowRight, Shield, Zap, TrendingUp, Users, Lock, BarChart3, ChevronRight, Wallet, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const textReveal = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={className}>
      {inView ? children : <div style={{ opacity: 0 }}>{children}</div>}
    </div>
  );
}

/* ── data ── */
const stats = [
  { label: "Total Value Locked", value: "$12.4M", change: "+18.2%", icon: Lock },
  { label: "Active Loans", value: "1,247", change: "+24.5%", icon: BarChart3 },
  { label: "Users Onboarded", value: "8,930", change: "+31.1%", icon: Users },
  { label: "Avg. APY for Lenders", value: "9.8%", change: "+2.1%", icon: TrendingUp },
];

const features = [
  {
    icon: Shield,
    title: "AI Credit Scoring",
    description: "On-chain behavioral analysis powered by machine learning. No traditional credit bureau needed.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Zap,
    title: "Instant Micro-Loans",
    description: "Get approved in minutes. Funds disbursed directly to your wallet with transparent terms.",
    gradient: "from-success/20 to-success/5",
  },
  {
    icon: TrendingUp,
    title: "Earn as a Lender",
    description: "Provide liquidity to curated pools and earn competitive yields with risk-adjusted returns.",
    gradient: "from-warning/20 to-warning/5",
  },
  {
    icon: Lock,
    title: "Fully On-Chain",
    description: "Every transaction recorded on Polygon. Immutable, transparent, and verifiable by anyone.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "No borders, no banks. Anyone with a wallet can access fair financial services.",
    gradient: "from-success/20 to-success/5",
  },
  {
    icon: Sparkles,
    title: "Reputation Rewards",
    description: "Build your credit passport NFT. Earn tokens for on-time repayments and loyalty.",
    gradient: "from-warning/20 to-warning/5",
  },
];

const steps = [
  { step: "01", title: "Connect Wallet", desc: "Link your MetaMask, WalletConnect, or Coinbase wallet in seconds." },
  { step: "02", title: "Complete KYC", desc: "Quick identity verification to comply with regulations and unlock access." },
  { step: "03", title: "Get Your Score", desc: "Our AI analyzes on-chain activity to generate a DeFi credit score." },
  { step: "04", title: "Borrow or Lend", desc: "Access micro-loans or provide liquidity to earn yield on Polygon." },
];

const trustedBy = ["Polygon", "Chainlink", "The Graph", "Aave", "OpenZeppelin"];

export default function Index() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl text-gradient">DefiLoan</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {["Features", "How It Works", "Stats"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="relative py-1 hover:text-foreground transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              onClick={() => navigate("/connect")}
              size="sm"
              className="gap-2 group transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
            >
              Launch App
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-36 px-6">
        {/* Glow orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[150px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 0.6 } : {}}
          transition={{ duration: 2.5, delay: 0.3 }}
          className="absolute top-60 -right-20 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 0.4 } : {}}
          transition={{ duration: 2.5, delay: 0.5 }}
          className="absolute bottom-10 -left-20 w-[300px] h-[300px] rounded-full bg-success/5 blur-[100px] pointer-events-none"
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            variants={textReveal}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            custom={0}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-10 tracking-wide uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Live on Polygon Mainnet
          </motion.div>

          <motion.h1
            variants={textReveal}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            custom={1}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8"
          >
            DeFi Micro-Loans
            <br />
            <span className="text-gradient">Powered by AI</span>
          </motion.h1>

          <motion.p
            variants={textReveal}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            custom={2}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Borrow, lend, and earn with on-chain credit scoring. No banks, no paperwork —
            just transparent, AI-driven micro-lending on Polygon.
          </motion.p>

          <motion.div
            variants={textReveal}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate("/connect")}
              className="text-base px-10 py-7 gap-2 group transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/lender")}
              className="text-base px-10 py-7 gap-2 group transition-all duration-500 hover:bg-accent/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Become a Lender
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trusted by */}
          <motion.div
            variants={textReveal}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            custom={4}
            className="mt-20 pt-10 border-t border-border/30"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">Trusted by leading protocols</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {trustedBy.map((name) => (
                <span key={name} className="text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 cursor-default">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="py-20 px-6 border-y border-border/30 bg-card/20">
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass-card p-6 text-center group cursor-default transition-shadow duration-500 hover:shadow-[0_0_25px_hsl(var(--primary)/0.1)]"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                <span className="text-xs font-semibold text-success mt-2 inline-block">{s.change}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <motion.p
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4"
            >
              Platform Features
            </motion.p>
            <motion.h2
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-3xl md:text-5xl font-bold"
            >
              Everything You Need for{" "}
              <span className="text-gradient">DeFi Lending</span>
            </motion.h2>
            <motion.div
              variants={lineReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-px w-24 bg-primary/40 mx-auto mt-6 origin-left"
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-card p-7 group cursor-default relative overflow-hidden transition-shadow duration-500 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12)]"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <f.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 md:py-32 px-6 bg-card/20">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <motion.p
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4"
            >
              Simple Process
            </motion.p>
            <motion.h2
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-3xl md:text-5xl font-bold"
            >
              How <span className="text-gradient">DefiLoan</span> Works
            </motion.h2>
            <motion.div
              variants={lineReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-px w-24 bg-primary/40 mx-auto mt-6 origin-left"
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative text-center group cursor-default"
              >
                <div className="text-6xl font-black text-primary/10 mb-4 group-hover:text-primary/20 transition-colors duration-500">{s.step}</div>
                <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-5 w-5 text-primary/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto glass-card p-12 md:p-20 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-[80px] group-hover:bg-primary/10 transition-all duration-700 pointer-events-none" />
          <div className="relative z-10">
            <motion.h2
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-3xl md:text-5xl font-bold mb-5"
            >
              Ready to Start{" "}
              <span className="text-gradient">Lending?</span>
            </motion.h2>
            <motion.p
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-muted-foreground mb-10 max-w-lg mx-auto text-base md:text-lg"
            >
              Join thousands of borrowers and lenders on the most transparent DeFi micro-loan platform built on Polygon.
            </motion.p>
            <motion.div
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              <Button
                size="lg"
                onClick={() => navigate("/connect")}
                className="text-base px-12 py-7 gap-2 group/btn transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.35)] hover:scale-[1.03] active:scale-[0.98]"
              >
                Connect Wallet
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-lg text-gradient">DefiLoan</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 DefiLoan. Built on Polygon. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            {["Docs", "GitHub", "Discord", "Twitter"].map((link) => (
              <a
                key={link}
                href="#"
                className="relative hover:text-foreground transition-colors duration-300 group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
