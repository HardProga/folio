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
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08]">
      <div className="section-container h-14 flex items-center justify-between gap-5">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-green flex items-center justify-center text-[10px] font-bold text-black tracking-tight">
            GH
          </div>
          <span className="text-[12px] font-semibold tracking-[0.12em] text-foreground/90 hidden sm:inline">
            GEORGE
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-1.5 rounded-full text-xs tracking-[0.02em] transition-all duration-300 ${
                pathname === l.to
                  ? "text-foreground bg-white/[0.14]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a href="#contact" className="btn-primary !py-2 !px-4 !text-xs hidden md:inline-flex">
          Contact
        </a>

        <button
          className="md:hidden text-foreground/80"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-nav border-t border-white/[0.06] px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`text-sm transition-colors ${
                pathname === l.to ? "text-foreground" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary !text-xs text-center mt-1"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
