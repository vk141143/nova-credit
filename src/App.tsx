import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import ConnectWallet from "./pages/ConnectWallet";
import KYCOnboarding from "./pages/KYCOnboarding";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import LoanCalculator from "./pages/LoanCalculator";
import EMICalendar from "./pages/EMICalendar";
import RewardsDashboard from "./pages/RewardsDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import LoanDetails from "./pages/LoanDetails";
import AdminPanel from "./pages/AdminPanel";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/connect" element={<ConnectWallet />} />
            <Route path="/kyc" element={<KYCOnboarding />} />
            <Route path="/dashboard" element={<BorrowerDashboard />} />
            <Route path="/calculator" element={<LoanCalculator />} />
            <Route path="/emi-calendar" element={<EMICalendar />} />
            <Route path="/rewards" element={<RewardsDashboard />} />
            <Route path="/lender" element={<LenderDashboard />} />
            <Route path="/loan/:id" element={<LoanDetails />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/users" element={<AdminPanel />} />
            <Route path="/admin/metrics" element={<AdminPanel />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
