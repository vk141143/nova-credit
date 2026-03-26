import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_POOLS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUpRight, ArrowDownRight, Shield } from "lucide-react";

const POOL_COLORS = ["hsl(152, 60%, 47%)", "hsl(195, 88%, 48%)", "hsl(28, 100%, 63%)"];

export default function LenderDashboard() {
  const totalDeposited = MOCK_POOLS.reduce((a, p) => a + p.deposited, 0);
  const pieData = MOCK_POOLS.map((p) => ({ name: p.name, value: p.deposited }));

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Lender Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your lending pools and deposits</p>
        </div>

        {/* Pool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_POOLS.map((pool, i) => (
            <div key={pool.name} className="glass-card-hover p-6 space-y-4" style={{ borderColor: `${POOL_COLORS[i]}20` }}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{pool.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${POOL_COLORS[i]}15`, color: POOL_COLORS[i] }}>
                  {pool.scoreRange}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">APY</p>
                  <p className="font-bold text-lg" style={{ color: POOL_COLORS[i] }}>{pool.apy}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">TVL</p>
                  <p className="font-bold">${(pool.tvl / 1e6).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Liquidity</p>
                  <p className="font-medium">${(pool.liquidity / 1e3).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Default Rate</p>
                  <p className="font-medium text-destructive">{pool.defaultRate}%</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Your deposit: <span className="font-bold text-foreground">${pool.deposited.toLocaleString()}</span></p>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> Deposit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <ArrowDownRight className="h-3.5 w-3.5 mr-1" /> Withdraw
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Chart */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="font-semibold text-lg">Portfolio Allocation</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={2} stroke="hsl(210, 50%, 8%)">
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={POOL_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(210, 45%, 11%)",
                      border: "1px solid hsl(210, 30%, 18%)",
                      borderRadius: "8px",
                      color: "hsl(200, 20%, 95%)",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4">
              {MOCK_POOLS.map((p, i) => (
                <div key={p.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: POOL_COLORS[i] }} />
                  <span className="text-muted-foreground">{p.name}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">Total Deposited: <span className="font-bold text-foreground">${totalDeposited.toLocaleString()}</span></p>
          </div>

          {/* Reserve Fund Health */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              <h2 className="font-semibold text-lg">Reserve Fund Health</h2>
            </div>
            <div className="space-y-4">
              {MOCK_POOLS.map((pool, i) => {
                const health = 100 - pool.defaultRate * 5;
                return (
                  <div key={pool.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{pool.name}</span>
                      <span className="font-medium" style={{ color: POOL_COLORS[i] }}>{health.toFixed(0)}%</span>
                    </div>
                    <Progress value={health} className="h-2" />
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Reserve funds protect lenders against defaults. Higher health = lower risk.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
