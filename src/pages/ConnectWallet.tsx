import { Wallet, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const wallets = [
  { name: "MetaMask", icon: "🦊", desc: "Popular browser extension wallet" },
  { name: "WalletConnect", icon: "🔗", desc: "Connect via QR code" },
  { name: "Coinbase", icon: "🔵", desc: "Coinbase Wallet" },
];

type ConnectState = "idle" | "connecting" | "signing" | "error" | "connected";

export default function ConnectWallet() {
  const [state, setState] = useState<ConnectState>("idle");
  const [selected, setSelected] = useState<string | null>(null);

  const handleConnect = (name: string) => {
    setSelected(name);
    setState("connecting");
    setTimeout(() => setState("signing"), 1500);
  };

  const handleSign = () => {
    setState("connecting");
    setTimeout(() => setState("connected"), 1200);
  };

  const handleRetry = () => {
    setState("idle");
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Wallet className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gradient">Connect Wallet</h1>
          <p className="text-sm text-muted-foreground">
            Connect your wallet to access the PolyLend platform
          </p>
        </div>

        {state === "signing" && (
          <div className="glass-card p-6 text-center space-y-4 animate-scale-in">
            <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
            <div>
              <h3 className="font-semibold text-foreground">Sign Message in Wallet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please sign the authentication message in {selected} to verify ownership.
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-mono bg-muted/50 p-3 rounded-lg">
              Nonce: 0x7f3a...b2c1 — Sign to prove wallet ownership
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleRetry}>Cancel</Button>
              <Button className="flex-1" onClick={handleSign}>
                Simulate Sign <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {state === "error" && (
          <div className="glass-card p-6 text-center space-y-4 animate-scale-in border-destructive/30">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold text-foreground">Connection Failed</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Could not connect to {selected}. Please try again.
              </p>
            </div>
            <Button onClick={handleRetry} className="w-full">Retry</Button>
          </div>
        )}

        {state === "connected" && (
          <div className="glass-card p-6 text-center space-y-4 animate-scale-in border-success/30">
            <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center mx-auto">
              <span className="text-success text-xl">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Connected!</h3>
              <p className="text-xs font-mono text-muted-foreground mt-2 bg-muted/50 p-2 rounded-lg">
                0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9cD4
              </p>
            </div>
            <Button className="w-full" onClick={() => window.location.href = "/dashboard"}>
              Go to Dashboard <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {(state === "idle" || state === "connecting") && (
          <div className="space-y-3">
            {wallets.map((w) => (
              <button
                key={w.name}
                onClick={() => handleConnect(w.name)}
                disabled={state === "connecting"}
                className="glass-card-hover w-full flex items-center gap-4 p-4 text-left disabled:opacity-50"
              >
                <span className="text-2xl">{w.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.desc}</p>
                </div>
                {state === "connecting" && selected === w.name ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          By connecting, you agree to the Terms of Service
        </p>
      </div>
    </div>
  );
}
