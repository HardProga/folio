import { Twitch, Youtube } from "lucide-react";
import { streamSchedule } from "@/lib/data";
import { useInView } from "@/lib/useInView";
import SectionHeading from "./SectionHeading";

export default function StreamSchedule() {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  const { ref, visible } = useInView();

  return (
    <section className="section-shell relative" ref={ref}>
      <div className="section-container relative z-10">
        <SectionHeading tag="Live Streams" title="Stream Schedule" />

        <div
          className={`glass-card p-8 max-w-2xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-7 gap-2">
            {streamSchedule.map((slot) => {
              const isToday = slot.day === today;
              return (
                <div
                  key={slot.day}
                  className={`text-center py-4 px-1 rounded-2xl transition-all duration-300 ${
                    isToday
                      ? "bg-accent/12 border border-accent/25"
                      : "bg-white/[0.02] border border-transparent"
                  }`}
                >
                  <div
                    className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] mb-2 ${
                      isToday ? "text-accent" : "text-muted/70"
                    }`}
                  >
                    {slot.day}
                  </div>
                  {slot.time ? (
                    <>
                      <div className="text-sm sm:text-base font-bold text-foreground tracking-[-0.02em]">
                        {slot.time}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-muted mt-0.5">
                        {slot.platform}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-muted/30">—</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {[
              { icon: Twitch, label: "Twitch", href: "https://twitch.tv" },
              { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[11px] font-medium text-muted hover:text-foreground hover:bg-white/[0.08] transition-all duration-300"
              >
                <Icon size={13} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
