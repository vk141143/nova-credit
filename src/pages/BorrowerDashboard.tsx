import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_CREDIT_SCORE } from "@/lib/mock-data";
import { RefreshCw, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function getScoreColor(score: number) {
  if (score >= 80) return "hsl(152, 60%, 47%)";
  if (score >= 65) return "hsl(174, 60%, 45%)";
  if (score >= 50) return "hsl(28, 100%, 63%)";
  if (score >= 35) return "hsl(16, 80%, 55%)";
  return "hsl(354, 70%, 54%)";
}

function CreditGauge({ score }: { score: number }) {
  const color = getScoreColor(score);
  const circumference = 251.2; // 2 * π * 40
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold" style={{ color }}>{score}</span>
        <span className="text-xs text-muted-foreground mt-1">Credit Score</span>
      </div>
    </div>
  );
}

function SubScoreBar({ name, score }: { name: string; score: number }) {
  const color = getScoreColor(score);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{name}</span>
        <span className="font-semibold" style={{ color }}>{score}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function BorrowerDashboard() {
  const { composite, lastUpdated, subScores, history, tips } = MOCK_CREDIT_SCORE;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Borrower Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Your DeFi credit profile overview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credit Score Hero */}
          <div className="lg:col-span-1 glass-card p-6 text-center space-y-4">
            <h2 className="font-semibold text-lg">Credit Score</h2>
            <CreditGauge score={composite} />
            <p className="text-xs text-muted-foreground">Last updated {lastUpdated}</p>
            <Button variant="outline" size="sm" disabled>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh (24h cooldown)
            </Button>
          </div>

          {/* Sub-scores */}
          <div className="lg:col-span-2 glass-card p-6 space-y-4">
            <h2 className="font-semibold text-lg">Score Breakdown</h2>
            <div className="space-y-4">
              {subScores.map((s) => (
                <SubScoreBar key={s.name} name={s.name} score={s.score} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score History */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-lg">Score History (90 Days)</h2>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(195, 88%, 48%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(195, 88%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="hsl(210,15%,35%)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[50, 100]} stroke="hsl(210,15%,35%)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 45%, 11%)",
                      border: "1px solid hsl(210, 30%, 18%)",
                      borderRadius: "8px",
                      color: "hsl(200, 20%, 95%)",
                    }}
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(195, 88%, 48%)" strokeWidth={2} fill="url(#scoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Improvement Tips */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" />
              <h2 className="font-semibold text-lg">Improvement Tips</h2>
            </div>
            <div className="space-y-3">
              {tips.map((t, i) => (
                <div key={i} className="glass-card p-4 space-y-1.5 border-warning/20">
                  <p className="text-xs font-semibold text-warning uppercase tracking-wider">{t.category}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
