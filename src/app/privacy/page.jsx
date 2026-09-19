import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  Database,
  Cog,
  Share2,
  ShieldCheck,
  UserCheck,
  BarChart3,
  Send,
  Mail,
  ScrollText,
} from "lucide-react";

const sections = [
  {
    icon: <Database className="h-5 w-5" />,
    title: "Information We Collect",
    body: "We collect account details such as your name, email address, and role selection when you register. When you purchase or publish ebooks we also keep records of those transactions so your library and sales history stay accurate. If you upload an avatar, that image is stored securely too.",
  },
  {
    icon: <Cog className="h-5 w-5" />,
    title: "How We Use Your Information",
    body: "Your information powers the platform you rely on: personalizing recommendations, processing purchases and payouts, protecting your account, sending essential service updates, and improving Fable for everyone. We never sell your personal data.",
  },
  {
    icon: <Share2 className="h-5 w-5" />,
    title: "Sharing & Disclosure",
    body: "We only share your information with service providers that help run Fable — such as payment processing and cloud hosting — and always under strict contracts. We may disclose data when required by law or to protect the safety of our users and platform.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Data Security",
    body: "Your data is protected with industry-standard encryption in transit and at rest. Access to personal information is limited to authorized personnel, and we monitor our systems to detect and prevent unauthorized access.",
  },
  {
    icon: <UserCheck className="h-5 w-5" />,
    title: "Your Choices & Rights",
    body: "You can update your profile, manage your email preferences, and close your account at any time. Depending on where you live, you may also have the right to access, correct, export, or delete your personal information — just contact us and we\u2019ll help.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Cookies & Analytics",
    body: "We use cookies and similar technologies to keep you signed in, remember your theme preference, and understand how our platform is used so we can make it better. You can disable cookies in your browser, though some features may not work as intended.",
  },
];

export const metadata = {
  title: "Privacy Policy — Fable",
  description: "How Fable collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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
              <ScrollText className="h-3.5 w-3.5" />
              Privacy Policy
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Your Data, <span className="brand-text">Protected</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              At Fable, your trust means everything. This policy explains
              what we collect, why we collect it, and how you stay in
              control of your information.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-glass px-4 py-2 text-sm text-muted backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Last Updated: January 2026
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="relative border-y border-line bg-soft/40 py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              What This Policy Covers
            </h2>

            <p className="mt-4 text-muted">
              A plain-language look at how Fable handles information across
              the platform — reading, writing, buying, and publishing.
            </p>
          </Reveal>

          <div className="grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 mx-auto">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.06}>
                <div className="group card relative h-full overflow-hidden p-6 sm:p-7">
                  <div
                    aria-hidden
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
                  />

                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/10 text-indigo-400 ring-1 ring-indigo-500/20 transition-transform duration-300 group-hover:scale-110">
                      {section.icon}
                    </span>

                    <div>
                      <h3 className="text-lg font-bold text-ink">
                        {section.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {section.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-indigo-500/25 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-10 text-center sm:p-16">
              <div aria-hidden className="absolute inset-0 bg-grid-slate opacity-40" />
              <div
                aria-hidden
                className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
                  <Mail className="h-3.5 w-3.5" />
                  Questions?
                </span>

                <h2 className="mx-auto mt-6 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                  We&apos;re happy to help
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-indigo-100">
                  If you have questions about this policy or how your data
                  is handled, message our privacy team — we read every one.
                </p>

                <a
                  href="mailto:privacy@fable.com"
                  className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <Send className="h-4 w-4" />
                  privacy@fable.com
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 text-center">
            <p className="text-sm text-muted">
              Prefer the library over the support queue?{" "}
              <Link
                href="/browse"
                className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Browse some stories →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}