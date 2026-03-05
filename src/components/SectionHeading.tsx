import { motion } from "framer-motion";

interface Props {
  tag: string;
  title: string;
}

export default function SectionHeading({ tag, title }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14 lg:mb-16"
    >
      <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-3">
        {tag}
      </p>
      <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.035em] leading-[1.1] text-foreground max-w-2xl mx-auto">
        {title}
      </h2>
    </motion.div>
  );
}
