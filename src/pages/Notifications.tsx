import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { Bell, CreditCard, Gift, AlertCircle, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  loan: CreditCard,
  payment: Bell,
  reward: Gift,
  alert: AlertCircle,
};

export default function Notifications() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">Stay updated on your loans, payments, and rewards</p>
        </div>

        <div className="space-y-2">
          {MOCK_NOTIFICATIONS.map((n) => {
            const Icon = iconMap[n.type] || Bell;
            return (
              <div
                key={n.id}
                className={`glass-card p-4 flex items-start gap-4 transition-colors ${
                  !n.read ? "border-primary/20 bg-primary/5" : ""
                }`}
              >
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                  !n.read ? "bg-primary/15" : "bg-muted/50"
                }`}>
                  <Icon className={`h-4 w-4 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{n.title}</p>
                    {!n.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
