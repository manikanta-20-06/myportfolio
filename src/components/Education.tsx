import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { education } from "@/data/site";

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="04"
          title="Education"
          lead="Where the fundamentals come from."
        />

        <div className="mt-14 md:mt-20">
          {education.map((e, i) => (
            <Reveal
              key={e.degree}
              delay={i * 0.07}
              className="border-t border-line last:border-b"
            >
              <div className="grid gap-y-5 py-9 md:grid-cols-12 md:gap-x-8 md:py-11">
                <div className="md:col-span-4">
                  <p className="label">{e.period}</p>
                  <p className="mt-3 font-display text-[15px] tracking-[-0.01em] text-bone">
                    {e.metric}
                  </p>
                </div>

                <div className="md:col-span-6">
                  <h3 className="font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-tight tracking-[-0.035em] text-bone">
                    {e.degree}
                  </h3>
                  <p className="mt-2 text-[15px] text-amber">{e.field}</p>
                  <p className="mt-3 text-[14.5px] text-muted">{e.school}</p>
                  <p className="label mt-2">{e.note}</p>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <span className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.05em] text-bone">
                    {e.value}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
