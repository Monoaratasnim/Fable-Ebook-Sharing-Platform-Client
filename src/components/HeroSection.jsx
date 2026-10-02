"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Users, BadgeCheck, Star, BookOpen, TrendingUp } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Discover & Read Original Ebooks",
    desc: "Explore thousands of digital stories from creators around the world.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2400&auto=format&fit=crop",
  },
  {
    title: "Become a Published Writer",
    desc: "Publish your ebooks and reach global readers instantly.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2400&auto=format&fit=crop",
  },
  {
    title: "Read Anytime, Anywhere",
    desc: "Enjoy seamless reading experience across all your devices.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2400&auto=format&fit=crop",
  },
];

function HeroArt() {
  return (
    <div className="relative hidden w-full max-w-lg lg:block">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-fuchsia-500/20 blur-3xl"
      />

      {/* MAIN NOW-READING CARD */}
      <div className="relative mx-auto w-[22rem] animate-float rounded-3xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl shadow-indigo-950/70 backdrop-blur-xl">
        <div
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/80 to-transparent"
        />

        <div className="flex gap-5">
          <Image
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop"
            alt="Now reading"
            width={160}
            height={220}
            className="h-48 w-32 shrink-0 rounded-2xl object-cover shadow-2xl ring-1 ring-white/20"
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-indigo-200/90">
              Now Reading
            </p>

            <h4 className="mt-2 text-xl font-bold leading-snug">
              The Midnight Library
            </h4>
            <p className="mt-1 text-xs text-slate-300">Matt Haig</p>

            {/* rating pill */}
            <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
              <span className="flex text-amber-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              4.9
            </div>

            {/* progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[10px] text-slate-300">
                <span>68% complete</span>
                <span>Ch. 14 / 22</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
              </div>
            </div>

            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg shadow-indigo-950/50">
              <BookOpen className="h-3 w-3" />
              Keep Reading
            </span>
          </div>
        </div>
      </div>

      {/* LIVE READERS BADGE */}
      <div
        className="absolute -left-4 top-10 animate-float rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-xl shadow-indigo-950/60 backdrop-blur-xl xl:-left-8"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
            <Users className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-emerald-400 ring-2 ring-slate-950/60" />
          </span>
          <div>
            <p className="text-sm font-bold leading-none text-white">128 Readers</p>
            <p className="mt-1 text-[10px] text-slate-300">online right now</p>
          </div>
        </div>
      </div>

      {/* TRENDING BADGE */}
      <div
        className="absolute -right-2 top-1/3 z-10 animate-float rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-xl shadow-indigo-950/60 backdrop-blur-xl xl:-right-4"
        style={{ animationDelay: "2.1s" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/20 text-orange-300 ring-1 ring-orange-400/30">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-bold leading-none text-white">#1 Trending</p>
            <p className="mt-1 text-[10px] text-slate-300">Fantasy · 2.4k loves</p>
          </div>
        </div>
      </div>

      {/* RATING PILL */}
      <div
        className="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 animate-float rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-xl shadow-indigo-950/60 backdrop-blur-xl"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex text-amber-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </span>
          <p className="text-xs font-semibold text-white">4.9 avg · 12k reviews</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroSwiper() {
  return (
    // Pulled up by EXACTLY the navbar height (single source of truth =
    // --nav-h in globals.css), so the hero always starts flush with the
    // top of the viewport and can never drift away from the header.
    <section
      id="home-hero"
      className="relative -mt-[var(--nav-h)] w-full overflow-hidden"
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className="relative w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={85}
                className="object-cover"
              />

              {/* Layered gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.28),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(192,38,211,0.16),transparent_50%)]" />
              <div className="absolute inset-0 bg-grid-slate opacity-60" />

              {/* Content — height is driven by the copy, never by a fixed
                  pixel value, so nothing is clipped on short screens.
                  `min-h` keeps it filling the fold on tall ones.
                  `pt-[var(--nav-h)]` guarantees clearance beneath the
                  sticky navbar on every breakpoint. */}
              <div className="relative z-10 mx-auto flex min-h-[calc(100svh-1rem)] w-full max-w-7xl flex-col justify-center px-4 pb-20 pt-[calc(var(--nav-h)+2rem)] sm:px-6 sm:pb-24 sm:pt-[calc(var(--nav-h)+3rem)] lg:px-12 lg:pb-28 lg:pt-[calc(var(--nav-h)+4rem)]">
                {/* two-column split */}
                <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-8">
                  {/* LEFT — text */}
                  <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="w-full min-w-0 max-w-2xl"
                    >
                      {/* Glowing Badge */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)] backdrop-blur-md sm:px-4 sm:text-[10px] sm:tracking-[0.3em] sm:text-xs"
                      >
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
                        Discover • Read • Publish
                      </motion.p>

                      {/* Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-[1.75rem] font-extrabold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_14px_rgba(2,6,23,0.6)] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
                      >
                        {slide.title}
                      </motion.h1>

                      {/* Gradient accent */}
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "6rem" }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-transparent lg:mx-0"
                      />

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-200 [text-shadow:0_1px_10px_rgba(2,6,23,0.6)] sm:text-base md:text-lg lg:mx-0"
                      >
                        {slide.desc}
                      </motion.p>

                      {/* Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="mt-6 flex w-full flex-col flex-wrap items-center justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start"
                      >
                        <Link
                          href="/browse"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3.5 text-center font-semibold text-white shadow-[0_0_30px_rgba(129,140,248,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(129,140,248,0.8)] sm:w-auto sm:px-8"
                        >
                          Browse Ebooks
                          <span aria-hidden>→</span>
                        </Link>

                        <Link
                          href="/register"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-400/30 bg-white/5 px-6 py-3.5 text-center font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/60 hover:bg-white/10 sm:w-auto sm:px-8"
                        >
                          Become a Writer
                        </Link>
                      </motion.div>

                      {/* Stats */}
                      <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-3 gap-2 sm:mt-10 sm:gap-4 lg:mx-0 lg:max-w-lg">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur-md sm:px-4 sm:py-4 lg:text-left">
                          <h3 className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl">
                            10K+
                          </h3>
                          <p className="mt-1 text-[10px] text-slate-400 sm:text-xs md:text-sm">
                            Ebooks
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur-md sm:px-4 sm:py-4 lg:text-left">
                          <h3 className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl">
                            5K+
                          </h3>
                          <p className="mt-1 text-[10px] text-slate-400 sm:text-xs md:text-sm">
                            Authors
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur-md sm:px-4 sm:py-4 lg:text-left">
                          <h3 className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl">
                            50K+
                          </h3>
                          <p className="mt-1 text-[10px] text-slate-400 sm:text-xs md:text-sm">
                            Readers
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* RIGHT — floating glass composition */}
                  <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
                    <HeroArt />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}