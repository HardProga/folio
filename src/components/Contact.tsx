import { Send } from "lucide-react";
import { useInView } from "@/lib/useInView";

export default function Contact() {
  const { ref, visible } = useInView();

  return (
    <section id="contact" className="section-shell relative" ref={ref}>
      <div className="orb orb-green w-[500px] h-[500px] right-0 -bottom-40 animate-pulse-slow" />
      <div className="orb orb-purple w-[400px] h-[400px] -left-20 top-0 animate-pulse-slow" />

      <div className="section-container max-w-2xl relative z-10">
        <div
          className={`glass-card p-10 sm:p-16 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-4">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-[2.75rem] font-bold tracking-[-0.03em] gradient-text mb-4 leading-tight">
            Let's Work Together
          </h2>
          <p className="text-muted text-[15px] mb-10 max-w-md mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Let's create
            something amazing together.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full glass text-[13px] text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/30 transition-colors bg-transparent"
            />
            <button type="submit" className="btn-primary !py-3 !px-6">
              <Send size={14} />
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
