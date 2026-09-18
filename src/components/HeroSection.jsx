"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Discover & Read Original Ebooks",
    desc: "Explore thousands of digital stories from creators around the world.",
    image: "/images/hero3.jpg",
  },
  {
    title: "Become a Published Writer",
    desc: "Publish your ebooks and reach global readers instantly.",
    image: "/images/hero2.jpg",
  },
  {
    title: "Read Anytime, Anywhere",
    desc: "Enjoy seamless reading experience across all your devices.",
    image: "/images/hero4.jpg",
  },
];

export default function HeroSwiper() {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        className="h-[60vh] sm:h-[70vh] lg:h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Layered gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.30),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(192,38,211,0.18),transparent_50%)]" />
              <div className="absolute inset-0 bg-grid-slate opacity-70" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-8 lg:justify-start lg:px-16">
                {/* Animated Content Wrapper */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="max-w-2xl text-center text-white lg:text-left"
                >
                  {/* Glowing Badge */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)] backdrop-blur-md sm:text-xs"
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
                    Discover • Read • Publish
                  </motion.p>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-3xl font-bold leading-[1.12] [text-shadow:0_0_40px_rgba(129,140,248,0.45)] sm:text-5xl md:text-6xl xl:text-7xl"
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
                    className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base lg:mx-0 md:text-lg"
                  >
                    {slide.desc}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
                  >
                    <Link
                      href="/browse"
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(129,140,248,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(129,140,248,0.8)]"
                    >
                      Browse Ebooks
                      <span aria-hidden>→</span>
                    </Link>

                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-400/30 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/60 hover:bg-white/10"
                    >
                      Become a Writer
                    </Link>
                  </motion.div>

                  {/* Stats */}
                  <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 lg:justify-start">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center backdrop-blur-md lg:text-left">
                      <h3 className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                        10K+
                      </h3>
                      <p className="mt-1 text-[10px] text-slate-400 sm:text-sm">
                        Ebooks
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center backdrop-blur-md lg:text-left">
                      <h3 className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                        5K+
                      </h3>
                      <p className="mt-1 text-[10px] text-slate-400 sm:text-sm">
                        Authors
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center backdrop-blur-md lg:text-left">
                      <h3 className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                        50K+
                      </h3>
                      <p className="mt-1 text-[10px] text-slate-400 sm:text-sm">
                        Readers
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 18px !important;
        }

        .swiper-pagination-bullet {
          width: 24px;
          height: 6px;
          border-radius: 999px;
          background: rgb(255 255 255 / 0.3);
          opacity: 1;
          margin: 0 4px !important;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 38px;
          background: linear-gradient(90deg, #6366f1, #c026d3);
          box-shadow: 0 0 14px rgba(129, 140, 248, 0.8);
        }
      `}</style>
    </section>
  );
}