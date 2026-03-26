import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { ArrowRight, Award, DollarSign, Percent, Calendar } from "lucide-react";

export default function LoanCalculator() {
  const [amount, setAmount] = useState([5000]);
  const [frequency, setFrequency] = useState("monthly");

  const calc = useMemo(() => {
    const principal = amount[0];
    const apr = principal > 10000 ? 10.5 : principal > 5000 ? 8.5 : 7.2;
    const periods = frequency === "weekly" ? 52 : frequency === "biweekly" ? 26 : 12;
    const rate = apr / 100 / periods;
    const n = periods;
    const emi = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const totalRepayable = emi * n;
    const interest = totalRepayable - principal;
    return { emi, apr, totalRepayable, interest, periods: n };
  }, [amount, frequency]);

  const hasDiscount = amount[0] >= 3000;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Loan Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Estimate your loan terms before applying</p>
        </div>

        <div className="glass-card p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Loan Amount</label>
              <span className="text-2xl font-bold text-gradient">${amount[0].toLocaleString()}</span>
            </div>
            <Slider
              value={amount} onValueChange={setAmount}
              min={500} max={50000} step={100}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$500</span><span>$50,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Repayment Frequency</label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="bg-muted/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "EMI", value: `$${calc.emi.toFixed(2)}`, icon: DollarSign, sub: `per ${frequency === "weekly" ? "week" : frequency === "biweekly" ? "2 weeks" : "month"}` },
            { label: "APR", value: `${calc.apr}%`, icon: Percent, sub: "Annual rate" },
            { label: "Total Repayable", value: `$${calc.totalRepayable.toFixed(2)}`, icon: Calendar, sub: `${calc.periods} payments` },
            { label: "Total Interest", value: `$${calc.interest.toFixed(2)}`, icon: TrendingUp, sub: "Over full term" },
          ].map((item) => (
            <div key={item.label} className="glass-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </div>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>

        {hasDiscount && (
          <div className="glass-card p-4 flex items-center gap-3 border-success/30">
            <Award className="h-8 w-8 text-success shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-success">Loyalty Discount Available!</p>
                <Badge className="bg-success/10 text-success border-success/30 text-xs">-0.5% APR</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Your strong repayment history qualifies you for a reduced rate.</p>
            </div>
          </div>
        )}

        <Button className="w-full h-12 text-base font-semibold" size="lg">
          Apply for Loan <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </DashboardLayout>
  );
}

// Re-export TrendingUp at module level for the calc items
import { TrendingUp } from "lucide-react";
