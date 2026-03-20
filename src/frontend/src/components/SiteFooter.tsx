import { Brain } from "lucide-react";
import { SiFacebook, SiGithub, SiLinkedin, SiX } from "react-icons/si";

const footerLinks = {
  Product: ["Features", "Solutions", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "API Reference", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const socialLinks = [
  { Icon: SiLinkedin, name: "LinkedIn" },
  { Icon: SiX, name: "X" },
  { Icon: SiGithub, name: "GitHub" },
  { Icon: SiFacebook, name: "Facebook" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      style={{ backgroundColor: "oklch(var(--navy))" }}
      className="text-white/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
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
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Empowering companies worldwide with intelligent AI agents that
              automate, optimize, and scale your business.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map(({ Icon, name }) => (
                <a
                  key={name}
                  href="/"
                  aria-label={name}
                  className="w-8 h-8 rounded-md flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="text-white font-semibold text-sm mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="/"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>© {year} S TECH. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
