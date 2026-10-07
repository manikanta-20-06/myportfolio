"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/data/site";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500"
        style={{
          backgroundColor: solid ? "rgba(8,8,10,0.72)" : "transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          borderBottom: `1px solid ${solid ? "#1d1d21" : "transparent"}`,
        }}
      >
        <nav className="shell flex h-[72px] items-center justify-between">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="h-[9px] w-[9px] bg-amber transition-transform duration-500 group-hover:rotate-45" />
            <span className="font-display text-[13px] font-medium tracking-[0.22em] text-bone">
              {profile.shortName}
            </span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label link-underline transition-colors duration-300 hover:text-bone"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="label border border-line-2 px-4 py-2.5 text-bone transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                Resume
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[70] flex h-10 w-10 flex-col items-end justify-center gap-[6px] md:hidden"
          >
            <span
              className="block h-px w-7 bg-bone transition-transform duration-500"
              style={{ transform: open ? "translateY(3.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-px w-7 bg-bone transition-transform duration-500"
              style={{ transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none" }}
            />
          </button>
        </nav>
      </header>

      <div
        className="fixed inset-0 z-[65] flex flex-col justify-center backdrop-blur-xl transition-[opacity,visibility] duration-500 md:hidden"
        style={{
          backgroundColor: "rgba(8,8,10,0.97)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
      >
        <ul className="shell space-y-2">
          {[...nav, { label: "RESUME", href: profile.resume }].map((item, i) => (
            <li
              key={item.label}
              className="border-b border-line"
              style={{
                transition: `opacity .5s ${i * 70}ms, transform .6s ${i * 70}ms cubic-bezier(.16,1,.3,1)`,
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(24px)",
              }}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                target={item.label === "RESUME" ? "_blank" : undefined}
                rel={item.label === "RESUME" ? "noopener noreferrer" : undefined}
                className="display block py-5 text-[clamp(2rem,11vw,3.5rem)] text-bone"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="shell mt-10">
          <p className="label">{profile.location}</p>
          <p className="label mt-2 text-amber">{profile.email}</p>
        </div>
      </div>
    </>
  );
}
