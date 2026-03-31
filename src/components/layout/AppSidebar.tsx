import {
  Wallet, LayoutDashboard, Calculator, CalendarDays, Gift,
  TrendingUp, FileText, ShieldCheck, Users, BarChart3, Bell
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const borrowerItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Loan Calculator", url: "/calculator", icon: Calculator },
  { title: "EMI Calendar", url: "/emi-calendar", icon: CalendarDays },
  { title: "Rewards", url: "/rewards", icon: Gift },
  { title: "Loan Details", url: "/loan/LN-0042", icon: FileText },
];

const lenderItems = [
  { title: "Lender Dashboard", url: "/lender", icon: TrendingUp },
];

const adminItems = [
  { title: "Loan Management", url: "/admin", icon: ShieldCheck },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Platform Metrics", url: "/admin/metrics", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const renderGroup = (label: string, items: typeof borrowerItems) => (
    <SidebarGroup key={label}>
      {!collapsed && (
        <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60 px-3 mb-1">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                    isActive(item.url)
                      ? "bg-primary/10 text-primary neon-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                  activeClassName="bg-primary/10 text-primary"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-sidebar">
      <div className="p-4 flex items-center gap-2 border-b border-border/50">
        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Wallet className="h-4 w-4 text-primary" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg text-gradient">DefiLoan</span>
        )}
      </div>
      <SidebarContent className="px-2 py-4 space-y-2">
        {renderGroup("Borrower", borrowerItems)}
        {renderGroup("Lender", lenderItems)}
        {renderGroup("Admin", adminItems)}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/notifications"
                    end
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    activeClassName="bg-primary/10 text-primary"
                  >
                    <Bell className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Notifications</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
