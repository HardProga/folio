interface Props {
  tag: string;
  title: string;
}

export default function SectionHeading({ tag, title }: Props) {
  return (
    <div className="text-center mb-16">
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-3">
        {tag}
      </p>
      <h2 className="text-3xl sm:text-[2.5rem] font-bold tracking-[-0.03em] leading-[1.1] gradient-text max-w-2xl mx-auto">
        {title}
      </h2>
    </div>
  );
}
