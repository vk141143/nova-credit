import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_LOANS, MOCK_USERS, MOCK_PLATFORM_METRICS } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertTriangle, Download, Ban, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MetricCard({ label, value, trend, icon: Icon }: { label: string; value: string; trend: number; icon: React.ElementType }) {
  const isPositive = trend >= 0;
  return (
    <div className="glass-card p-5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/30",
  Overdue: "bg-destructive/10 text-destructive border-destructive/30",
  Completed: "bg-primary/10 text-primary border-primary/30",
  Pending: "bg-warning/10 text-warning border-warning/30",
};

const kycColors: Record<string, string> = {
  Approved: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Rejected: "bg-destructive/10 text-destructive",
};

const amlColors: Record<string, string> = {
  Clear: "bg-success/10 text-success",
  Review: "bg-warning/10 text-warning",
  Flagged: "bg-destructive/10 text-destructive",
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [overdueMin, setOverdueMin] = useState([0]);
  const m = MOCK_PLATFORM_METRICS;

  const filteredLoans = MOCK_LOANS.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (l.daysOverdue < overdueMin[0]) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        <Tabs defaultValue="loans">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="loans">Loan Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="metrics">Platform Metrics</TabsTrigger>
          </TabsList>

          {/* ===== LOANS ===== */}
          <TabsContent value="loans" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36 bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1 w-48">
                <label className="text-xs text-muted-foreground">Min days overdue: {overdueMin[0]}</label>
                <Slider value={overdueMin} onValueChange={setOverdueMin} min={0} max={30} step={1} />
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
              </Button>
            </div>

            <div className="glass-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>APR</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Payment</TableHead>
                    <TableHead>Overdue</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLoans.map((loan) => (
                    <TableRow key={loan.id} className="border-border/30 cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/loan/${loan.id}`)}>
                      <TableCell className="font-mono text-primary">{loan.id}</TableCell>
                      <TableCell className="font-mono text-xs">{loan.borrower}</TableCell>
                      <TableCell className="font-medium">${loan.amount.toLocaleString()}</TableCell>
                      <TableCell>{loan.apr}%</TableCell>
                      <TableCell><Badge className={statusColors[loan.status]}>{loan.status}</Badge></TableCell>
                      <TableCell className="text-sm">{loan.nextPayment}</TableCell>
                      <TableCell>
                        {loan.daysOverdue > 0 ? (
                          <span className="text-destructive font-medium flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> {loan.daysOverdue}d
                          </span>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); navigate(`/loan/${loan.id}`); }}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => e.stopPropagation()}>
                            <Ban className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ===== USERS ===== */}
          <TabsContent value="users" className="space-y-4 mt-4">
            <div className="glass-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>User ID</TableHead>
                    <TableHead>Wallet</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>AML</TableHead>
                    <TableHead>Credit Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_USERS.map((user) => (
                    <TableRow key={user.id} className="border-border/30">
                      <TableCell className="font-mono text-primary">{user.id}</TableCell>
                      <TableCell className="font-mono text-xs">{user.address}</TableCell>
                      <TableCell><Badge className={kycColors[user.kyc]}>{user.kyc}</Badge></TableCell>
                      <TableCell><Badge className={amlColors[user.aml]}>{user.aml}</Badge></TableCell>
                      <TableCell className="font-bold">{user.creditScore}</TableCell>
                      <TableCell><Badge className={user.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}>{user.status}</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                          <Ban className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ===== METRICS ===== */}
          <TabsContent value="metrics" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <MetricCard label="Active Loans" value={m.activeLoans.toLocaleString()} trend={m.trends.activeLoans} icon={Activity} />
              <MetricCard label="Total Value Locked" value={`$${(m.tvl / 1e6).toFixed(1)}M`} trend={m.trends.tvl} icon={DollarSign} />
              <MetricCard label="Default Rate" value={`${m.defaultRate}%`} trend={m.trends.defaultRate} icon={AlertTriangle} />
              <MetricCard label="Revenue" value={`$${(m.revenue / 1e3).toFixed(0)}K`} trend={m.trends.revenue} icon={TrendingUp} />
              <MetricCard label="New Users (30d)" value={m.newUsers.toString()} trend={m.trends.newUsers} icon={Users} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
