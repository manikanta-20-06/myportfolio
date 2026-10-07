import { profile } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-ink/85 backdrop-blur-md">
      <div className="shell flex flex-col gap-6 py-9 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="h-[9px] w-[9px] bg-amber" aria-hidden="true" />
          <span className="font-display text-[13px] font-medium tracking-[0.22em] text-bone">
            {profile.shortName}
          </span>
        </div>

        <p className="label">AI / ML · Software · Building</p>

        <p className="label">© 2026 Manikanta J N</p>
      </div>
    </footer>
  );
}
