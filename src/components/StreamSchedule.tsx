"use client";

import { motion } from "framer-motion";
import { streamSchedule } from "@/lib/data";
import { Twitch, Youtube } from "lucide-react";

export default function StreamSchedule() {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-3">
            Live Streams
          </h2>
          <p className="text-3xl sm:text-4xl font-bold gradient-text">
            Stream Schedule
          </p>
        </motion.div>

        <motion.div
          className="glass-card p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {streamSchedule.map((slot, i) => {
              const isToday = slot.day === today;
              return (
                <motion.div
                  key={slot.day}
                  className={`text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 ${
                    isToday
                      ? "bg-accent/15 border border-accent/30"
                      : "glass"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div
                    className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 ${
                      isToday ? "text-accent" : "text-muted"
                    }`}
                  >
                    {slot.day}
                  </div>
                  {slot.time ? (
                    <>
                      <div className="text-sm sm:text-base font-bold text-foreground">
                        {slot.time}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-muted mt-1">
                        {slot.platform}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-muted/50">—</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            {[
              { icon: Twitch, label: "Twitch", href: "https://twitch.tv" },
              { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-xs font-medium text-muted hover:text-foreground hover:bg-white/10 transition-all duration-300"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
