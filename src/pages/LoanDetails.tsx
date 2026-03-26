import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_LOANS, MOCK_EMI_SCHEDULE } from "@/lib/mock-data";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowRight, ExternalLink, XCircle } from "lucide-react";

const timelineSteps = ["Pending", "Active", "Completed"];

function StatusTimeline({ status }: { status: string }) {
  const currentIdx = status === "Completed" ? 2 : status === "Active" || status === "Overdue" ? 1 : 0;
  return (
    <div className="flex items-center gap-2">
      {timelineSteps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
            i <= currentIdx ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
          }`}>
            {i < currentIdx ? <CheckCircle className="h-4 w-4" /> : i + 1}
          </div>
          <span className={`text-xs ${i <= currentIdx ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
          {i < timelineSteps.length - 1 && (
            <div className={`w-8 h-0.5 ${i < currentIdx ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function LoanDetails() {
  const { id } = useParams();
  const loan = MOCK_LOANS.find((l) => l.id === id) || MOCK_LOANS[0];

  const statusColor = {
    Active: "bg-success/10 text-success",
    Overdue: "bg-destructive/10 text-destructive",
    Completed: "bg-primary/10 text-primary",
    Pending: "bg-warning/10 text-warning",
  }[loan.status] || "bg-muted text-muted-foreground";

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Loan {loan.id}</h1>
            <p className="text-sm text-muted-foreground mt-1">Detailed loan information</p>
          </div>
          <Badge className={statusColor}>{loan.status}</Badge>
        </div>

        {/* Status Timeline */}
        <div className="glass-card p-6">
          <h2 className="font-semibold mb-4">Loan Timeline</h2>
          <StatusTimeline status={loan.status} />
        </div>

        {/* Loan Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Principal", value: `$${loan.amount.toLocaleString()}` },
            { label: "APR", value: `${loan.apr}%` },
            { label: "Total Repayable", value: `$${loan.totalRepayable.toLocaleString()}` },
            { label: "Pool", value: loan.pool },
          ].map((item) => (
            <div key={item.label} className="glass-card p-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-lg font-bold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Blockchain Info */}
        <div className="glass-card p-6 space-y-3">
          <h2 className="font-semibold">Blockchain Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Disbursement Date</p>
              <p className="font-medium">{loan.disbursedDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Transaction Hash</p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-primary">{loan.txHash}</span>
                {loan.txHash !== "-" && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />}
              </div>
            </div>
          </div>
        </div>

        {/* Repayment Schedule */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold">Repayment Schedule</h2>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>#</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_EMI_SCHEDULE.map((emi, i) => (
                  <TableRow key={i} className="border-border/30">
                    <TableCell className="font-mono text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>{new Date(emi.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">${emi.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {emi.status === "paid" && <><CheckCircle className="h-3.5 w-3.5 text-success" /><span className="text-success text-sm">Paid</span></>}
                        {emi.status === "missed" && <><XCircle className="h-3.5 w-3.5 text-destructive" /><span className="text-destructive text-sm">Missed</span></>}
                        {emi.status === "upcoming" && <><Clock className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-muted-foreground text-sm">Upcoming</span></>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
