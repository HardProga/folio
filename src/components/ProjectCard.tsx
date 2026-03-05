interface Props {
  title: string;
  category: string;
  year: number;
  description: string;
  color: string;
}

export default function ProjectCard({ title, category, year, description, color }: Props) {
  return (
    <div className="glass-card overflow-hidden group h-full flex flex-col">
      {/* Cover */}
      <div
        className="h-48 relative overflow-hidden rounded-t-[18px]"
        style={{ background: `${color}0d` }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 65% 35%, ${color}22, transparent 65%)`,
          }}
        />
        <div className="absolute bottom-4 left-5 right-5">
          <div className="text-[18px] font-bold text-foreground tracking-[-0.025em]">
            {title}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
            style={{ background: `${color}0f`, color }}
          >
            {category}
          </span>
          <span className="text-[11px] text-muted">{year}</span>
        </div>
        <p className="text-[13px] text-muted leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>
      </div>
    </div>
  );
}
