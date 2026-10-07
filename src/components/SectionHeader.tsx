type Props = {
  index: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
};

export default function SectionHeader({ index, title, lead, className = "" }: Props) {
  return (
    <div className={`rule pt-6 ${className}`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-5 md:gap-8">
          <span className="idx mt-3 shrink-0">{index}</span>
          <h2 className="display text-[clamp(2.25rem,7vw,5.5rem)] text-bone">
            {title}
          </h2>
        </div>
        {lead ? (
          <p className="max-w-sm text-[15px] leading-relaxed text-muted md:pb-3 md:text-right">
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  );
}
