import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Brain, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Resources", href: "/#resources" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const isLoggedIn = !!identity;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "oklch(var(--navy))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="nav.link"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "oklch(var(--teal))" }}
            >
              <Brain
                className="w-5 h-5"
                style={{ color: "oklch(var(--navy))" }}
              />
            </div>
            <div>
              <div className="text-white font-bold text-lg tracking-wider leading-none">
                S TECH
              </div>
              <div
                className="text-xs leading-none"
                style={{ color: "oklch(var(--teal))" }}
              >
                AI Agent Platform
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/5"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/5"
                  data-ocid="nav.link"
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clear}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  data-ocid="nav.secondary_button"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={login}
                  disabled={loginStatus === "logging-in"}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  data-ocid="nav.secondary_button"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={login}
                  disabled={loginStatus === "logging-in"}
                  className="ml-2 rounded-full text-sm font-semibold px-5"
                  style={{
                    backgroundColor: "oklch(var(--teal))",
                    color: "oklch(var(--navy))",
                  }}
                  data-ocid="nav.primary_button"
                >
                  Get Started
                </Button>
              </>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10"
            style={{ backgroundColor: "oklch(var(--navy-deep))" }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-2.5 px-3 text-white/80 hover:text-white rounded-md hover:bg-white/5 text-sm"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="py-2.5 px-3 text-white/80 hover:text-white rounded-md hover:bg-white/5 text-sm"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={login}
                  className="py-2.5 px-3 text-left rounded-full mt-2 font-semibold text-sm"
                  style={{
                    backgroundColor: "oklch(var(--teal))",
                    color: "oklch(var(--navy))",
                  }}
                  data-ocid="nav.primary_button"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
