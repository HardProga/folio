"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-green flex items-center justify-center text-xs font-bold text-black">
            GH
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground/90 hidden sm:inline">
            GEORGE HEAVENSON
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/works"
            className="text-sm text-muted hover:text-foreground transition-colors duration-300"
          >
            Works
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted hover:text-foreground transition-colors duration-300"
          >
            About
          </Link>
          <a
            href="#contact"
            className="text-sm px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-nav border-t border-white/[0.06] px-6 py-6 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/works"
            onClick={() => setOpen(false)}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Works
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            About
          </Link>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-sm px-5 py-2 rounded-full bg-white text-black font-medium text-center hover:bg-white/90 transition-all"
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
