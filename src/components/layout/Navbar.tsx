import { Bell, Wallet, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MOCK_WALLET, MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="h-14 border-b border-border/50 flex items-center justify-between px-4 bg-card/40 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold flex items-center justify-center text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>

        <div className="glass-card flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:border-primary/30 transition-colors" onClick={() => navigate("/connect")}>
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <Wallet className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">{MOCK_WALLET.address}</span>
          <span className="text-[10px] text-muted-foreground bg-primary/10 px-1.5 py-0.5 rounded-full">{MOCK_WALLET.network}</span>
        </div>
      </div>
    </header>
  );
}
