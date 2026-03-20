import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  Settings2,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const features = [
  {
    icon: Bot,
    title: "Conversational AI Agents",
    desc: "Deploy natural language agents that handle customer inquiries, support tickets, and complex workflows 24/7 without human intervention.",
  },
  {
    icon: Zap,
    title: "Automation Bots",
    desc: "Automate repetitive business processes with intelligent bots that integrate with your existing tools and systems seamlessly.",
  },
  {
    icon: Settings2,
    title: "Process Optimization",
    desc: "Analyze and optimize your business workflows with AI-driven insights that identify bottlenecks and suggest improvements.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Get deep insights into agent performance, user interactions, and business metrics with real-time dashboards.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade encryption and compliance-ready infrastructure ensures your data and customer information stays protected.",
  },
  {
    icon: Brain,
    title: "Custom AI Solutions",
    desc: "Tailor-built AI agents designed specifically for your industry, brand voice, and unique business requirements.",
  },
];

const solutions = [
  {
    title: "Customer Support",
    desc: "Reduce ticket volume by 70% with AI agents that resolve common issues instantly.",
    stat: "70% reduction",
  },
  {
    title: "Sales Automation",
    desc: "Qualify leads, schedule meetings, and follow up prospects automatically.",
    stat: "3x more leads",
  },
  {
    title: "HR & Onboarding",
    desc: "Streamline employee onboarding, policy Q&A, and HR requests effortlessly.",
    stat: "50% faster",
  },
  {
    title: "IT Helpdesk",
    desc: "Automate password resets, troubleshooting guides, and ticket routing.",
    stat: "80% auto-resolved",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$49",
    desc: "Perfect for small businesses",
    features: [
      "2 AI Agents",
      "1,000 conversations/mo",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$199",
    desc: "Scale your operations",
    features: [
      "10 AI Agents",
      "10,000 conversations/mo",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large organizations",
    features: [
      "Unlimited agents",
      "Unlimited conversations",
      "Dedicated support",
      "SLA guarantee",
      "Custom deployment",
    ],
  },
];

export default function LandingPage() {
  const { login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-32"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.04 240) 0%, oklch(0.22 0.07 225) 50%, oklch(0.18 0.06 210) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.80 0.14 192) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.70 0.10 210) 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
              style={{
                backgroundColor: "oklch(0.80 0.14 192 / 0.15)",
                color: "oklch(var(--teal))",
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              Trusted by 500+ companies worldwide
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Build Intelligent AI Agents
              <br />
              <span style={{ color: "oklch(var(--teal))" }}>
                for Your Business
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              S TECH empowers companies to deploy powerful AI agents that
              automate workflows, delight customers, and drive measurable
              results — no coding required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 font-semibold text-base"
                style={{
                  backgroundColor: "oklch(var(--teal))",
                  color: "oklch(var(--navy))",
                }}
                onClick={login}
                disabled={loginStatus === "logging-in"}
                data-ocid="hero.primary_button"
              >
                Start Building Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-semibold text-base border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                onClick={() => navigate({ to: "/dashboard" })}
                data-ocid="hero.secondary_button"
              >
                View Dashboard
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              ["500+", "Companies"],
              ["10M+", "Conversations"],
              ["99.9%", "Uptime"],
              ["<1s", "Response time"],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  {val}
                </div>
                <div className="text-sm text-white/60">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to deploy AI agents
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete platform for building, deploying, and managing
              intelligent AI agents at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-lg transition-shadow"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(var(--teal) / 0.12)" }}
                >
                  <f.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(var(--teal))" }}
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section
        id="solutions"
        className="py-20"
        style={{ backgroundColor: "oklch(0.96 0.005 240)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Solutions for every team
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From customer service to HR, S TECH AI agents drive results across
              every department.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <div
                  className="text-2xl font-extrabold mb-1"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  {s.stat}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Start free. Scale as you grow. Cancel anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-7 border ${
                  tier.highlighted
                    ? "shadow-card-lg"
                    : "bg-card shadow-card border-border"
                }`}
                style={
                  tier.highlighted
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.22 0.07 225), oklch(0.18 0.06 215))",
                        borderColor: "oklch(var(--teal))",
                      }
                    : {}
                }
              >
                <div
                  className={`text-sm font-semibold mb-1 ${tier.highlighted ? "text-teal" : "text-muted-foreground"}`}
                  style={
                    tier.highlighted ? { color: "oklch(var(--teal))" } : {}
                  }
                >
                  {tier.name}
                </div>
                <div
                  className={`text-3xl font-extrabold mb-1 ${tier.highlighted ? "text-white" : "text-foreground"}`}
                >
                  {tier.price}
                </div>
                <div
                  className={`text-sm mb-6 ${tier.highlighted ? "text-white/60" : "text-muted-foreground"}`}
                >
                  {tier.desc}
                </div>
                <ul className="space-y-2.5 mb-7">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={tier.highlighted ? { color: "white" } : {}}
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0"
                        style={{ color: "oklch(var(--teal))" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full rounded-full font-semibold"
                  style={
                    tier.highlighted
                      ? {
                          backgroundColor: "oklch(var(--teal))",
                          color: "oklch(var(--navy))",
                        }
                      : {}
                  }
                  variant={tier.highlighted ? "default" : "outline"}
                  onClick={login}
                  data-ocid="pricing.primary_button"
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources CTA */}
      <section
        id="resources"
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.04 240), oklch(0.20 0.07 225))",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to transform your business?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Join hundreds of forward-thinking companies already using S TECH
              AI agents.
            </p>
            <Button
              size="lg"
              className="rounded-full px-10 font-semibold text-base"
              style={{
                backgroundColor: "oklch(var(--teal))",
                color: "oklch(var(--navy))",
              }}
              onClick={login}
              data-ocid="cta.primary_button"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
