import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_EMI_SCHEDULE } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Gift, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Due now"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      setTimeLeft(`${d}d ${h}h`);
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, [targetDate]);

  return <span className="text-primary font-mono font-bold">{timeLeft}</span>;
}

export default function EMICalendar() {
  const paid = MOCK_EMI_SCHEDULE.filter((e) => e.status === "paid").length;
  const total = MOCK_EMI_SCHEDULE.length;
  const upcoming = MOCK_EMI_SCHEDULE.find((e) => e.status === "upcoming");
  const progress = (paid / total) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">EMI Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your repayment schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Payment */}
          {upcoming && (
            <div className="glass-card p-6 space-y-4 neon-border">
              <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Next Payment</h2>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">${upcoming.amount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{new Date(upcoming.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Due in</span>
                <Countdown targetDate={upcoming.date} />
              </div>
              <Button className="w-full">
                Pay Now <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <div className="glass-card p-3 flex items-center gap-2 border-success/20 bg-success/5">
                <Gift className="h-4 w-4 text-success" />
                <span className="text-xs text-success font-medium">Pay early & earn 3% PLY rewards!</span>
              </div>
            </div>
          )}

          {/* Progress & Calendar Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <div className="glass-card p-6 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Repayment Progress</h2>
                <span className="text-sm font-mono text-primary">{paid}/{total}</span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
            </div>

            {/* Calendar Grid */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-semibold">Schedule</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {MOCK_EMI_SCHEDULE.map((emi, i) => {
                  const date = new Date(emi.date);
                  const isUpcoming = emi.status === "upcoming" && i === MOCK_EMI_SCHEDULE.findIndex(e => e.status === "upcoming");
                  return (
                    <div
                      key={i}
                      className={`glass-card p-3 text-center space-y-1 transition-all duration-200 ${
                        emi.status === "paid" ? "border-success/30" :
                        emi.status === "missed" ? "border-destructive/30" :
                        isUpcoming ? "border-primary/40 neon-border" : ""
                      }`}
                    >
                      <p className="text-xs text-muted-foreground">
                        {date.toLocaleDateString("en-US", { month: "short" })}
                      </p>
                      <p className="text-lg font-bold">{date.getDate()}</p>
                      {emi.status === "paid" && <CheckCircle className="h-4 w-4 text-success mx-auto" />}
                      {emi.status === "missed" && <XCircle className="h-4 w-4 text-destructive mx-auto" />}
                      {emi.status === "upcoming" && <Clock className="h-4 w-4 text-muted-foreground mx-auto" />}
                      <p className="text-xs font-medium">${emi.amount.toFixed(0)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
