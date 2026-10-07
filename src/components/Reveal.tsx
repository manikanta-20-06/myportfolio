"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
};

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      show();
      return;
    }

    if (el.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      show();
      return;
    }

    let ctx: gsap.Context | undefined;
    try {
      ctx = gsap.context(() => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    } catch {
      show();
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, [delay]);

  const style = { opacity: 0, transform: `translate3d(0, ${y}px, 0)` };
  const common = { "data-reveal": "", className, style };

  if (as === "li") {
    return (
      <li ref={ref as React.Ref<HTMLLIElement>} {...common}>
        {children}
      </li>
    );
  }
  if (as === "article") {
    return (
      <article ref={ref as React.Ref<HTMLElement>} {...common}>
        {children}
      </article>
    );
  }
  if (as === "section") {
    return (
      <section ref={ref as React.Ref<HTMLElement>} {...common}>
        {children}
      </section>
    );
  }
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} {...common}>
      {children}
    </div>
  );
}
