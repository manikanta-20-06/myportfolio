"use client";

import { useEffect, useRef } from "react";

const TARGETS = "a, button, input, textarea, [data-cursor]";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let active = false;
    let hidden = false;
    let raf = 0;

    const apply = () => {
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        dot.current.style.opacity = hidden ? "0" : "1";
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${active ? 2.1 : 1})`;
        ring.current.style.opacity = hidden ? "0" : "1";
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (hidden) {
        hidden = false;
      }
      active = !!(e.target as HTMLElement | null)?.closest?.(TARGETS);
    };
    const onOver = (e: Event) => {
      active = !!(e.target as HTMLElement | null)?.closest?.(TARGETS);
    };
    const onLeave = () => {
      hidden = true;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      apply();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="cursor-root pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-amber"
        style={{ opacity: 0, transition: "opacity .25s" }}
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-bone/50"
        style={{ opacity: 0, transition: "opacity .25s" }}
      />
    </div>
  );
}
