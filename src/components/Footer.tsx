import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-green flex items-center justify-center text-[8px] font-bold text-black">
            GH
          </div>
          <span className="text-[11px] text-muted tracking-[-0.01em]">
            &copy; {new Date().getFullYear()} George Oti-Adjei. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors duration-300"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors duration-300"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
