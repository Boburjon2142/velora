export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</div>
      ) : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">{description}</p> : null}
    </div>
  );
}
