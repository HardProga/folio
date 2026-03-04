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
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 flex items-center justify-between h-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-green flex items-center justify-center text-[10px] font-bold text-black tracking-tight">
            GH
          </div>
          <span className="text-[13px] font-semibold tracking-[-0.02em] text-foreground/80 hidden sm:inline">
            GEORGE HEAVENSON
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs tracking-[-0.01em] transition-colors duration-300 ${
                pathname === l.to
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href="#contact" className="btn-primary !py-2 !px-5 !text-xs">
            Get in Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground/80"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
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
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
