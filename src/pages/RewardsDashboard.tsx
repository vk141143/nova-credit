import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_REWARDS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, ArrowUpRight, ArrowDownRight, Gift } from "lucide-react";

export default function RewardsDashboard() {
  const { tokenBalance, tokenSymbol, stakedAmount, stakingAPY, history } = MOCK_REWARDS;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Rewards</h1>
          <p className="text-sm text-muted-foreground mt-1">Earn tokens for on-time payments and staking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coins className="h-4 w-4" /><span className="text-xs">Token Balance</span>
            </div>
            <p className="text-3xl font-bold text-gradient">{tokenBalance.toLocaleString()} <span className="text-sm text-muted-foreground">{tokenSymbol}</span></p>
          </div>

          <div className="glass-card p-6 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" /><span className="text-xs">Staked</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stakedAmount.toLocaleString()} <span className="text-sm text-muted-foreground">{tokenSymbol}</span></p>
            <p className="text-xs text-success">{stakingAPY}% APY</p>
          </div>

          <div className="glass-card p-6 space-y-3">
            <p className="text-xs text-muted-foreground">Staking Actions</p>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> Stake
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <ArrowDownRight className="h-3.5 w-3.5 mr-1" /> Unstake
              </Button>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-lg">Reward History</h2>
          </div>
          <div className="space-y-2">
            {history.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Coins className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.type}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-success">+{r.amount} {tokenSymbol}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
