import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { skillGroups } from "@/data/site";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="02"
          title="Skills"
          lead="A curated set — the tools I actually reach for. Projects carry the proof, not percentages."
        />

        <div className="mt-14 border-t border-line md:mt-20">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.05}
              className="group border-b border-line"
            >
              <div className="grid gap-4 py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9">
                <div className="flex items-baseline gap-5 md:col-span-4">
                  <span className="idx">{group.index}</span>
                  <h3 className="font-display text-[clamp(1.35rem,3.2vw,2.4rem)] leading-none tracking-[-0.04em] text-bone transition-transform duration-500 md:group-hover:translate-x-2">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-x-3 gap-y-2 md:col-span-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line px-3 py-1.5 font-mono text-[11.5px] tracking-[0.06em] text-muted transition-colors duration-300 group-hover:border-line-2 group-hover:text-bone"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
