import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-black/[0.08]">
      <div className="section-container h-14 flex items-center justify-between gap-5">
        {/* Balance spacer (desktop) */}
        <div className="hidden md:block w-[88px]" />

        {/* Center nav pill */}
        <div className="hidden md:flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-black/[0.02] p-1">
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary !py-1.5 !px-4 !text-[13px] hidden md:inline-flex">
            Contact
          </a>
          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/[0.06] bg-white/95 px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`text-[15px] transition-colors ${
                pathname === l.to ? "text-foreground font-medium" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary !text-[13px] text-center mt-1"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
