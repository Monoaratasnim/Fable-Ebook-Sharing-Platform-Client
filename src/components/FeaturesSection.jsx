"use client";

import Link from "next/link";
import { Smartphone, Rocket, TrendingUp, Compass, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const features = [
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "Read Anywhere",
    desc: "Your entire library syncs across phone, tablet, and desktop — pick up exactly where you left off.",
    color: "from-indigo-500 to-blue-500",
    glow: "shadow-indigo-600/30",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Publish Instantly",
    desc: "Go from draft to published in minutes with our streamlined writer studio and instant cover uploads.",
    color: "from-violet-500 to-purple-500",
    glow: "shadow-violet-600/30",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Earn From Stories",
    desc: "Keep control of your pricing and grow a loyal reader base with transparent, real-time revenue.",
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-600/30",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Curated Discovery",
    desc: "Genre tours, trending lists, and top-writer spotlights surface the right story at the right time.",
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-600/30",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-soft/40 py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-indigo-600/15 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
              Why Fable
            </span>

            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
              Everything a Story Needs
            </h2>

            <p className="mt-4 max-w-2xl text-muted">
              A complete platform for the modern reading and writing
              experience — built beautifully on purpose.
            </p>
          </div>

          <Link href="/browse" className="btn btn-outline btn-md">
            Start Exploring
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <div className="group card relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div
                  aria-hidden
                  className={`absolute -right-10 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${feature.color} opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
                />

                <div
                  className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg ${feature.glow} transition-transform duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>

                <h3 className="relative mt-5 text-lg font-bold text-ink">
                  {feature.title}
                </h3>

                <p className="relative mt-2 text-sm leading-relaxed text-muted">
                  {feature.desc}
                </p>

                <Link
                  href="/browse"
                  className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 transition-all duration-300 hover:gap-2.5 hover:text-indigo-300"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}