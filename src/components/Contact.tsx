import { Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="section-shell">
      <div className="section-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-card p-10 sm:p-16 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-4">
            Get in Touch
          </p>
          <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.035em] text-foreground mb-4 leading-tight">
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
              className="flex-1 px-5 py-3 rounded-full border border-black/[0.1] text-[13px] text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/40 transition-colors bg-white"
            />
            <button type="submit" className="btn-primary !py-3 !px-6">
              <Send size={13} />
              Send
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
