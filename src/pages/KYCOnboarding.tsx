import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Upload, Camera, Clock, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const steps = ["Personal Info", "Document Upload", "Selfie Verification", "Status"];

type KycStatus = "pending" | "approved" | "rejected" | null;

export default function KYCOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [kycStatus, setKycStatus] = useState<KycStatus>(null);

  const next = () => {
    if (currentStep === 2) {
      setKycStatus("pending");
      setTimeout(() => setKycStatus("approved"), 2000);
    }
    setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">KYC Verification</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete your identity verification to access loans</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex-1 flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                i < currentStep ? "bg-success text-success-foreground" :
                i === currentStep ? "bg-primary text-primary-foreground" :
                "bg-muted text-muted-foreground"
              }`}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 flex-1 rounded-full transition-colors ${
                  i < currentStep ? "bg-success" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm font-medium text-primary">{steps[currentStep]}</p>

        <div className="glass-card p-6 animate-scale-in">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" className="bg-muted/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select>
                  <SelectTrigger className="bg-muted/50"><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="ng">Nigeria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" className="bg-muted/50" />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Upload a government-issued ID (passport, driver's license, or national ID)</p>
              <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">Drop your document here</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF up to 10MB</p>
              </div>
              <div className="glass-card p-3 flex items-center gap-3">
                <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">passport_scan.jpg</p>
                  <p className="text-xs text-muted-foreground">2.4 MB — Uploaded</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 text-center">
              <Camera className="h-16 w-16 text-primary mx-auto" />
              <h3 className="font-semibold text-lg">Take a Selfie</h3>
              <p className="text-sm text-muted-foreground">Position your face within the frame. Ensure good lighting.</p>
              <div className="h-48 w-48 rounded-full border-4 border-dashed border-primary/30 mx-auto flex items-center justify-center bg-muted/30">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
              <Button variant="outline" className="mx-auto">Open Camera</Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-4 py-4">
              {kycStatus === "pending" && (
                <>
                  <Clock className="h-16 w-16 text-warning mx-auto animate-pulse" />
                  <h3 className="font-semibold text-lg">Verification Pending</h3>
                  <p className="text-sm text-muted-foreground">Your documents are being reviewed. This usually takes 1–2 hours.</p>
                  <div className="status-badge bg-warning/10 text-warning mx-auto"><Clock className="h-3 w-3" /> Pending Review</div>
                </>
              )}
              {kycStatus === "approved" && (
                <>
                  <CheckCircle className="h-16 w-16 text-success mx-auto" />
                  <h3 className="font-semibold text-lg">Verification Approved!</h3>
                  <p className="text-sm text-muted-foreground">Your identity has been verified. You can now apply for loans.</p>
                  <div className="status-badge bg-success/10 text-success mx-auto"><CheckCircle className="h-3 w-3" /> Approved</div>
                  <Button onClick={() => window.location.href = "/dashboard"} className="mt-4">
                    Go to Dashboard <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </>
              )}
              {kycStatus === "rejected" && (
                <>
                  <XCircle className="h-16 w-16 text-destructive mx-auto" />
                  <h3 className="font-semibold text-lg">Verification Rejected</h3>
                  <p className="text-sm text-muted-foreground">Please re-upload your documents with clearer images.</p>
                  <div className="status-badge bg-destructive/10 text-destructive mx-auto"><XCircle className="h-3 w-3" /> Rejected</div>
                  <Button variant="outline" onClick={() => { setCurrentStep(1); setKycStatus(null); }}>Re-upload Documents</Button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prev} disabled={currentStep === 0}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {currentStep < 3 && (
            <Button onClick={next}>
              {currentStep === 2 ? "Submit" : "Continue"} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
