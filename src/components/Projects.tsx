"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/data/projects";
import { scrollState } from "@/lib/scroll";

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(projects[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = previewRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX + 34}px, ${
        e.clientY - 132
      }px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    scrollState.focus = hoverId || openId ? 1 : 0;
    return () => {
      scrollState.focus = 0;
    };
  }, [hoverId, openId]);

  const hovered = projects.find((p) => p.id === hoverId);

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          index="03"
          title={
            <>
              Selected
              <br />
              Work
            </>
          }
          lead="Four builds. What it is, what it does, and what I built it with."
        />

        <div className="mt-14 border-t border-line md:mt-20">
          {projects.map((project, i) => {
            const open = openId === project.id;
            return (
              <Reveal key={project.id} delay={i * 0.04} className="border-b border-line">
                <article>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`detail-${project.id}`}
                      onClick={() => setOpenId(open ? null : project.id)}
                      onMouseEnter={() => setHoverId(project.id)}
                      onMouseLeave={() => setHoverId(null)}
                      onFocus={() => setHoverId(project.id)}
                      onBlur={() => setHoverId(null)}
                      data-cursor="1"
                      className="group block w-full cursor-pointer text-left"
                    >
                      <div className="grid items-baseline gap-y-3 py-7 md:grid-cols-12 md:gap-x-8 md:py-10">
                        <span className="idx md:col-span-1">{project.index}</span>

                        <span
                          className={`display block text-[clamp(1.9rem,6.5vw,4.6rem)] transition-colors duration-500 md:col-span-6 ${
                            open ? "text-amber" : "text-bone group-hover:text-amber"
                          }`}
                        >
                          {project.title}
                        </span>

                        <span className="text-[14.5px] leading-snug text-muted transition-colors duration-500 group-hover:text-bone md:col-span-3">
                          {project.subtitle}
                        </span>

                        <span className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                          <span className="label md:hidden">
                            {project.period ?? "View"}
                          </span>
                          <span className="label hidden md:inline">
                            {project.period ?? "Details"}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`grid h-8 w-8 shrink-0 place-items-center border border-line-2 font-mono text-[13px] transition-all duration-500 ${
                              open
                                ? "rotate-45 border-amber bg-amber text-ink"
                                : "text-muted group-hover:border-amber group-hover:text-amber"
                            }`}
                          >
                            +
                          </span>
                        </span>
                      </div>
                    </button>
                  </h3>

                  <div
                    id={`detail-${project.id}`}
                    className="grid transition-[grid-template-rows] duration-[650ms]"
                    style={{
                      gridTemplateRows: open ? "1fr" : "0fr",
                      transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-8 pb-12 md:grid-cols-12 md:gap-10">
                        <div className="md:col-span-5 md:col-start-2">
                          <p className="text-[16px] leading-[1.7] text-bone">
                            {project.summary}
                          </p>

                          <ul className="mt-7 space-y-3">
                            {project.details.map((d) => (
                              <li
                                key={d}
                                className="flex gap-4 border-t border-line pt-3 text-[14.5px] leading-relaxed text-muted"
                              >
                                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-amber" />
                                {d}
                              </li>
                            ))}
                          </ul>

                          {project.disclaimer ? (
                            <p className="mt-7 border border-line px-4 py-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-dim">
                              {project.disclaimer}
                            </p>
                          ) : null}
                        </div>

                        <div className="md:col-span-5">
                          <ProjectVisual
                            kind={project.visual}
                            className="aspect-[3/2] w-full"
                          />
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {project.stack.map((s) => (
                              <li
                                key={s}
                                className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-amber-soft"
                              >
                                {s}
                              </li>
                            ))}
                          </ul>
                          <p className="label mt-4">
                            Links withheld — no public repository supplied.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        style={{
          visibility: hovered ? "visible" : "hidden",
          opacity: hovered ? 1 : 0,
          transition: "opacity .35s ease, visibility .35s",
          willChange: "transform",
        }}
      >
        <div
          className="w-[330px] transition-transform duration-500"
          style={{ transform: hovered ? "scale(1)" : "scale(0.94)" }}
        >
          <ProjectVisual
            kind={(hovered ?? projects[0]).visual}
            className="aspect-[3/2] w-full"
          />
        </div>
      </div>
    </section>
  );
}
