import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Brain, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: "/dashboard" });
    }
  }, [identity, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.04 240) 0%, oklch(0.22 0.07 225) 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl shadow-card-lg border border-border p-8 w-full max-w-sm text-center"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "oklch(var(--teal))" }}
        >
          <Brain className="w-7 h-7" style={{ color: "oklch(var(--navy))" }} />
        </div>
        <div className="text-2xl font-extrabold tracking-wider text-foreground mb-1">
          S TECH
        </div>
        <div
          className="text-sm font-medium mb-2"
          style={{ color: "oklch(var(--teal))" }}
        >
          AI Agent Platform
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          Sign in to access your company dashboard and manage AI agents.
        </p>

        {isInitializing ? (
          <div
            className="flex items-center justify-center gap-2 text-muted-foreground"
            data-ocid="login.loading_state"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          <Button
            className="w-full rounded-xl font-semibold py-5"
            style={{
              backgroundColor: "oklch(var(--teal))",
              color: "oklch(var(--navy))",
            }}
            onClick={login}
            disabled={loginStatus === "logging-in"}
            data-ocid="login.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        )}

        {loginStatus === "loginError" && (
          <p
            className="text-xs text-destructive mt-3"
            data-ocid="login.error_state"
          >
            Login failed. Please try again.
          </p>
        )}

        <p className="text-xs text-muted-foreground mt-6">
          By signing in you agree to our{" "}
          <span className="underline cursor-pointer hover:text-foreground">
            Terms of Service
          </span>
        </p>
      </motion.div>
    </div>
  );
}
