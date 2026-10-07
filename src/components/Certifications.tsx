import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { achievements, certifications } from "@/data/site";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="05"
          title="Certifications"
          lead="Verified credentials only — name, issuer, year and ID where one exists."
        />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <ol className="border-t border-line">
              {certifications.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.05} as="li">
                  <div className="group flex flex-col gap-3 border-b border-line py-7 md:flex-row md:items-baseline md:gap-8">
                    <span className="idx shrink-0 md:w-10">{c.id}</span>

                    <div className="flex-1">
                      <p className="font-display text-[clamp(1.05rem,2vw,1.4rem)] leading-snug tracking-[-0.025em] text-bone transition-colors duration-300 group-hover:text-amber">
                        {c.title}
                      </p>
                      <p className="label mt-2 text-muted">{c.issuer}</p>
                      {c.detail ? (
                        <p className="mt-2 text-[13px] leading-relaxed text-muted">
                          {c.detail}
                        </p>
                      ) : null}
                    </div>

                    <div className="shrink-0 md:text-right">
                      <p className="label text-bone">{c.year}</p>
                      {c.credential ? (
                        <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-amber">
                          {c.credential}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1} className="md:col-span-4">
            <p className="label border-t border-line pt-6">Achievements</p>
            <ul className="mt-6 space-y-8">
              {achievements.map((a) => (
                <li key={a.label}>
                  <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.05em] text-amber">
                    {a.value}
                  </p>
                  <p className="mt-3 text-[15px] text-bone">{a.label}</p>
                  <p className="mt-1 text-[14px] text-muted">{a.sub}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-line pt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full justify-center"
                data-cursor="1"
              >
                View Resume
              </a>
              <a
                href="/resume.pdf"
                download="Manikanta-J-N-Resume.pdf"
                className="btn mt-3 w-full justify-center"
                data-cursor="1"
              >
                Download Resume
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
