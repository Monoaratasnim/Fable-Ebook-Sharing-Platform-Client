"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const socials = [
  { icon: <FaFacebookF />, label: "Facebook" },
  { icon: <FaTwitter />, label: "Twitter" },
  { icon: <FaInstagram />, label: "Instagram" },
  { icon: <FaLinkedinIn />, label: "LinkedIn" },
  { icon: <FaYoutube />, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-xl">
      {/* Gradient top accent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* GRID */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* BRAND */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <img
                src="/images/logo.png"
                alt="Fable"
                className="h-12 w-12 object-contain drop-shadow-[0_0_14px_rgba(129,140,248,0.5)]"
              />

              <div>
                <h2 className="bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-2xl font-bold text-transparent">
                  Fable
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Ebook Library
                </p>
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-slate-400 sm:mx-0">
              Discover, read, and publish ebooks from creators around the world.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex justify-center gap-3 sm:justify-start">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/80 bg-white/5 text-slate-300 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-indigo-500/15 hover:text-white hover:shadow-[0_0_18px_rgba(129,140,248,0.4)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center sm:text-left">
            <h3 className="mb-5 text-base font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/about"
                  className="inline-block transition-colors duration-300 hover:text-indigo-300"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="inline-block transition-colors duration-300 hover:text-indigo-300"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="inline-block transition-colors duration-300 hover:text-indigo-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="text-center sm:text-left">
            <h3 className="mb-5 text-base font-semibold text-white">
              Newsletter
            </h3>

            <p className="mx-auto mb-5 max-w-sm text-sm text-slate-400 sm:mx-0">
              Subscribe to get latest ebook updates.
            </p>

            <form className="mx-auto flex max-w-md flex-col gap-3 sm:mx-0 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur transition focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />

              <button
                type="submit"
                className="whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2.5 font-semibold text-white shadow-[0_0_18px_rgba(129,140,248,0.35)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(129,140,248,0.6)] hover:brightness-110"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800/80 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Fable. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Crafted with <span className="text-rose-400">♥</span>
            for storytellers.
          </p>
        </div>
      </div>
    </footer>
  );
}