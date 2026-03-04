interface Props {
  title: string;
  category: string;
  year: number;
  description: string;
  color: string;
}

export default function ProjectCard({ title, category, year, description, color }: Props) {
  return (
    <div className="glass-card overflow-hidden group">
      {/* Cover */}
      <div
        className="h-44 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}12, ${color}04)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${color}, transparent 60%)`,
          }}
        />
        <div className="absolute bottom-5 left-6 right-6">
          <div className="text-xl font-bold text-foreground/90 tracking-[-0.02em]">
            {title}
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
            style={{ background: `${color}12`, color }}
          >
            {category}
          </span>
          <span className="text-[11px] text-muted">{year}</span>
        </div>
        <p className="text-[13px] text-muted leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
