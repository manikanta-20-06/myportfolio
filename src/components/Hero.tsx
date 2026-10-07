"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/data/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el.querySelectorAll("[data-h]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-h='meta']",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.15 },
      )
        .fromTo(
          "[data-h='line']",
          { opacity: 0, yPercent: 105 },
          { opacity: 1, yPercent: 0, duration: 1.15, stagger: 0.09 },
          "-=0.55",
        )
        .fromTo(
          "[data-h='sub']",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6",
        )
        .fromTo(
          "[data-h='cta']",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          "-=0.65",
        )
        .fromTo(
          "[data-h='foot']",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.5",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  const lines = ["MANIKANTA J N"];

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between pt-[104px] pb-8"
    >
      <div className="shell flex flex-1 flex-col justify-center py-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2" data-h="meta">
          <span className="label text-amber">Portfolio / 2026</span>
          <span className="hidden h-px w-16 bg-line-2 sm:block" />
          <span className="label">{profile.location}</span>
          <span className="hidden h-px w-16 bg-line-2 sm:block" />
          <span className="label">Class of {profile.graduation}</span>
        </div>

        <h1 className="mt-7">
          <span className="sr-only">
            {profile.name} — {profile.role}
          </span>
          <span aria-hidden="true" className="block">
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span
                  data-h="line"
                  className="display block whitespace-nowrap text-[clamp(2.4rem,10vw,9.5rem)] text-bone"
                  style={{ opacity: 0 }}
                >
                  {line}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-8 grid gap-8 border-t border-line pt-7 md:grid-cols-12">
          <div className="md:col-span-5">
            <p
              className="font-display text-[clamp(1.1rem,2.4vw,1.7rem)] leading-tight tracking-[-0.03em] text-amber"
              data-h="sub"
              style={{ opacity: 0 }}
            >
              AI &amp; ML STUDENT
            </p>
            <p className="label mt-3" data-h="sub" style={{ opacity: 0 }}>
              {profile.degree}
            </p>
          </div>

          <div className="md:col-span-4">
            <p
              className="text-[15px] leading-relaxed text-muted"
              data-h="sub"
              style={{ opacity: 0 }}
            >
              {profile.intro}
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-3 md:col-span-3 md:justify-end">
            <a
              href="#work"
              className="btn btn-solid"
              data-h="cta"
              data-cursor="1"
              style={{ opacity: 0 }}
            >
              View Work
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              data-h="cta"
              data-cursor="1"
              style={{ opacity: 0 }}
            >
              Resume
            </a>
            <a
              href="#connect"
              className="btn"
              data-h="cta"
              data-cursor="1"
              style={{ opacity: 0 }}
            >
              Let&rsquo;s Connect
            </a>
          </div>
        </div>
      </div>

      <div
        className="shell flex items-end justify-between border-t border-line pt-5"
        data-h="foot"
        style={{ opacity: 0 }}
      >
        <span className="label">Scroll to explore</span>
        <span className="label hidden sm:block">{profile.college} · VTU</span>
        <span className="label" aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
}
