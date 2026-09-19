"use client";

import Link from "next/link";
import {
  MessageCircle,
  Send,
  Camera,
  Briefcase,
  Play,
} from "lucide-react";

const socials = [
  { icon: <MessageCircle className="h-[18px] w-[18px]" />, label: "Facebook" },
  { icon: <Send className="h-[18px] w-[18px]" />, label: "Twitter" },
  { icon: <Camera className="h-[18px] w-[18px]" />, label: "Instagram" },
  { icon: <Briefcase className="h-[18px] w-[18px]" />, label: "LinkedIn" },
  { icon: <Play className="h-[18px] w-[18px]" />, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-line bg-panel/60 backdrop-blur-xl">
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
                src="/images/logo.jpg"
                alt="Fable Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_14px_rgba(129,140,248,0.5)]"
              />

              <div>
                <h2 className="brand-text text-2xl font-bold">
                  Fable
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-faint">
                  Ebook Library
                </p>
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted sm:mx-0">
              Discover, read, and publish ebooks from creators around the world.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex justify-center gap-3 sm:justify-start">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-glass text-muted backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-indigo-500/15 hover:text-ink hover:shadow-[0_0_18px_rgba(129,140,248,0.4)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center sm:text-left">
            <h3 className="mb-5 text-base font-semibold text-ink">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link
                  href="/about"
                  className="inline-block transition-colors duration-300 hover:text-indigo-400"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="inline-block transition-colors duration-300 hover:text-indigo-400"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="inline-block transition-colors duration-300 hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="text-center sm:text-left">
            <h3 className="mb-5 text-base font-semibold text-ink">
              Newsletter
            </h3>

            <p className="mx-auto mb-5 max-w-sm text-sm text-muted sm:mx-0">
              Subscribe to get latest ebook updates.
            </p>

            <form className="mx-auto flex max-w-md flex-col gap-3 sm:mx-0 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
              />

              <button
                type="submit"
                className="btn btn-primary btn-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-faint sm:flex-row">
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