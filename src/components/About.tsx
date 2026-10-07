import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const facts = [
  { k: "Focus", v: "Applied AI, web systems, APIs" },
  { k: "Based in", v: "Bengaluru, Karnataka" },
  { k: "Studying", v: "B.E. AI & Machine Learning" },
  { k: "Graduating", v: "2028 · VTU" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="01"
          title="About"
          lead="A short, honest account of what I study and what I spend my time building."
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-display text-[clamp(1.35rem,3vw,2.35rem)] leading-[1.25] tracking-[-0.035em] text-bone">
              I&rsquo;m an undergraduate in Artificial Intelligence &amp; Machine
              Learning at VTU, building things I can actually run.
            </p>
            <div className="mt-8 max-w-xl space-y-5 text-[15.5px] leading-[1.75] text-muted">
              <p>
                Most of my work sits where machine learning meets the web: a
                Flask service wrapping a vision model, a REST API that an Angular
                client talks to, a translation layer that puts course content
                into regional languages.
              </p>
              <p>
                I care about the parts that make a project real — authentication,
                data modelling, responsive interfaces, and APIs you can verify
                with Postman. The goal is straightforward: ship systems that hold
                up when someone else uses them.
              </p>
              <p className="text-bone">
                Currently looking for problems worth solving and people to solve
                them with.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5 md:pl-8">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <dt className="label shrink-0">{f.k}</dt>
                  <dd className="text-right text-[15px] text-bone transition-colors duration-300 group-hover:text-amber">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#connect" className="btn" data-cursor="1">
                Let&rsquo;s Connect
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                data-cursor="1"
              >
                View Resume
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
