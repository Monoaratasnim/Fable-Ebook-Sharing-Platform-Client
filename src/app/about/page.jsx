import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  Sparkles,
  Rocket,
  Users,
  Globe,
  HeartHandshake,
  BadgeCheck,
  TrendingUp,
  Quote,
  ArrowRight,
  BookOpen,
  Feather,
} from "lucide-react";

const values = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Create Freely",
    desc: "Writers own their voice. We give them the canvas, tools, and reach to tell stories their way.",
    color: "from-indigo-500 to-blue-500",
    glow: "shadow-indigo-600/30",
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: "Community First",
    desc: "Readers, writers, and reviewers grow together in a respectful, inspiring home for stories.",
    color: "from-purple-500 to-fuchsia-500",
    glow: "shadow-purple-600/30",
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: "Quality Stories",
    desc: "We surface the best of every genre with thoughtful curation and transparent rankings.",
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-600/30",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Fair, Real Revenue",
    desc: "Transparent pricing and instant payouts mean success is shared with the people who create.",
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-600/30",
  },
];

const journey = [
  {
    icon: <Feather className="h-5 w-5" />,
    year: "2021",
    title: "The First Page",
    desc: "Fable began as a small experiment to give indie writers a modern home for their stories.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    year: "2023",
    title: "Writers Go Live",
    desc: "We launched publishing tools, real-time sales, and our first wave of global authors.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    year: "2026",
    title: "A Global Library",
    desc: "Millions of story views every day, across every genre, in the hands of eager readers.",
  },
];

export const metadata = {
  title: "About Us — Fable",
  description: "Learn about Fable, the home where every story finds its reader.",
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          aria-hidden
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-indigo-600/20 blur-[130px]"
        />
        <div
          aria-hidden
          className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
              About Fable
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
              Every Story Deserves{" "}
              <span className="brand-text">A Reader</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Fable is a modern ebook marketplace where readers discover
              unforgettable stories and writers build thriving careers —
              with beautiful tools, honest revenue, and a community that
              truly cares.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(129,140,248,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(129,140,248,0.8)]"
              >
                Browse Ebooks
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-2xl border border-line bg-glass px-8 py-3.5 font-semibold text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/60 hover:bg-soft"
              >
                Start Writing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative overflow-hidden border-y border-line bg-soft/40 py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
                Our Mission
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-ink md:text-4xl">
                Built by storytellers, for storytellers
              </h2>

              <p className="mt-6 leading-relaxed text-muted">
                Millions of incredible stories are written every year —
                yet most never find the readers they deserve. Fable closes
                that gap with a platform engineered around the writing and
                reading experience, not the algorithm.
              </p>

              <p className="mt-4 leading-relaxed text-muted">
                From elegant reading tools for readers to instant publishing
                and fair pay for writers, everything we build puts the
                story first.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-600/30">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink">120,000+</p>
                  <p className="text-sm text-muted">Readers & writers worldwide</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="card relative overflow-hidden p-8 sm:p-10">
                <div
                  aria-hidden
                  className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
                />

                <Quote className="h-8 w-8 text-indigo-400" />

                <blockquote className="mt-6 text-xl leading-relaxed text-ink sm:text-2xl">
                  &ldquo;Fable gave my debut novel the audience it deserved.
                  I went from zero readers to thousands — and I kept every
                  cent of what I earned.&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-base font-bold text-white">
                    RM
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Riya Malik</p>
                    <p className="text-sm text-muted">Romance & Fantasy Author</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6 text-center">
                  <div>
                    <h4 className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent">
                      2M+
                    </h4>
                    <p className="text-xs text-muted">Stories Read</p>
                  </div>
                  <div>
                    <h4 className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent">
                      150+
                    </h4>
                    <p className="text-xs text-muted">Countries</p>
                  </div>
                  <div>
                    <h4 className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent">
                      12k+
                    </h4>
                    <p className="text-xs text-muted">Writers</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="absolute right-1/3 -top-10 h-72 w-72 rounded-full bg-purple-600/15 blur-[110px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
              Our Values
            </span>

            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
              What We Stand For
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="group card relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1.5">
                  <div
                    aria-hidden
                    className={`absolute -right-10 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${value.color} opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
                  />

                  <div
                    className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} text-white shadow-lg ${value.glow} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {value.icon}
                  </div>

                  <h3 className="relative mt-5 text-lg font-bold text-ink">
                    {value.title}
                  </h3>

                  <p className="relative mt-2 text-sm leading-relaxed text-muted">
                    {value.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="relative overflow-hidden border-y border-line bg-soft/40 py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
              Our Journey
            </span>

            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
              Turning The Page, Together
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {journey.map((step, i) => (
              <Reveal key={step.year} delay={i * 0.1}>
                <div className="group card relative h-full overflow-hidden p-6">
                  <div
                    aria-hidden
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
                  />

                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </span>

                    <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent">
                      {step.year}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-indigo-500/25 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-10 text-center sm:p-16">
              <div
                aria-hidden
                className="absolute inset-0 bg-grid-slate opacity-40"
              />
              <div
                aria-hidden
                className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
                  <BookOpen className="h-3.5 w-3.5" />
                  Join Fable Today
                </span>

                <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  Start your story. Find your readers.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-indigo-100">
                  Whether you&apos;re here to read the next great book or
                  publish your own, your story starts now.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/browse"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    Explore Library
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}