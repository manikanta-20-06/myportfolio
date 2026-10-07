"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { profile } from "@/data/site";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "manikanta-jn-9a567b373", href: profile.linkedin },
  { label: "Resume", value: "View / Download", href: profile.resume },
];

export default function Connect() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio enquiry${form.name ? ` — ${form.name}` : ""}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}${form.email ? `\n${form.email}` : ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full border border-line bg-[#0b0b0f] px-4 py-3.5 text-[15px] text-bone placeholder:text-dim transition-colors duration-300 focus:border-amber focus:outline-none";

  return (
    <section id="connect" className="relative pb-24 pt-24 md:pb-32 md:pt-36">
      <div className="shell">
        <SectionHeader index="06" title="Let's Connect" />

        <Reveal className="mt-14 md:mt-20">
          <p className="max-w-4xl font-display text-[clamp(1.9rem,6vw,4.4rem)] leading-[1.05] tracking-[-0.045em] text-bone">
            If you have a problem worth solving, I&rsquo;m interested.
            <span className="text-amber"> Let&rsquo;s make it work.</span>
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <p className="label border-t border-line pt-6">Channels</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.label === "Email" ? undefined : "_blank"}
                    rel={c.label === "Email" ? undefined : "noopener noreferrer"}
                    className="group flex items-center justify-between gap-5 py-5"
                    data-cursor="1"
                  >
                    <span className="label shrink-0">{c.label}</span>
                    <span className="truncate text-right text-[15px] text-bone transition-colors duration-300 group-hover:text-amber">
                      {c.value}
                      <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[14px] leading-relaxed text-dim">
              No public GitHub profile supplied — add one and it goes here.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <p className="label border-t border-line pt-6">Send a message</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Name</span>
                  <input
                    required
                    className={field}
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Email</span>
                  <input
                    required
                    type="email"
                    className={field}
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
              </div>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  required
                  rows={5}
                  className={`${field} resize-none`}
                  placeholder="What are you building?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-solid" data-cursor="1">
                  Send
                </button>
                <span className="label">Opens in your email client</span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
