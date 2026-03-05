import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Mail, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
];

function TwoLineIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <line x1="0" y1="1.5" x2="22" y2="1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="5" y1="14.5" x2="22" y2="14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-black/[0.08]">
        <div className="section-container h-14 flex items-center justify-between">

          {/* Left: 2-line hamburger (mobile only) */}
          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors p-1"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <TwoLineIcon />
          </button>

          {/* Center: desktop nav pill */}
          <div className="hidden md:flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-black/[0.02] p-1 mx-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-1.5 rounded-full text-[13px] tracking-tight transition-all duration-200 ${
                  pathname === l.to
                    ? "text-foreground bg-white shadow-sm shadow-black/[0.07]"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: Contact button (desktop) / Mail icon (mobile) */}
          <div className="flex items-center">
            <a
              href="#contact"
              className="btn-primary !py-1.5 !px-4 !text-[13px] hidden md:inline-flex"
            >
              Contact
            </a>
            <a
              href="#contact"
              aria-label="Contact"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-foreground/60 hover:text-foreground hover:bg-black/[0.05] transition-all"
            >
              <Mail size={17} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-white/[0.98] backdrop-blur-2xl flex flex-col"
          >
            {/* Top bar: matches nav height */}
            <div className="h-14 flex items-center justify-between px-6 border-b border-black/[0.06]">
              <span className="text-[13px] font-semibold text-foreground tracking-tight">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/60 hover:text-foreground hover:bg-black/[0.05] transition-all"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav items — large Apple-style type */}
            <div className="flex flex-col flex-1 px-6 pt-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-5 border-b border-black/[0.06] group transition-colors ${
                      pathname === l.to
                        ? "text-foreground"
                        : "text-foreground/35 hover:text-foreground"
                    }`}
                  >
                    <span className="text-[38px] font-semibold tracking-[-0.03em] leading-none">
                      {l.label}
                    </span>
                    <span className="text-[11px] tracking-[0.08em] uppercase text-muted/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      {pathname === l.to ? "Current" : "Go"}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="px-6 pb-10 pt-6"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary block w-full text-center py-4 text-[16px]"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
