import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import { Poppins, Merriweather } from "next/font/google";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Fable",
  description: "Ebook Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${merriweather.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("fable-theme")||"dark";var el=document.documentElement;el.classList.remove("dark","light");el.classList.add(t);el.setAttribute("data-theme",t);}catch(e){}}());`,
          }}
        />
      </head>
      <body className="bg-page text-body antialiased">
        {/* Ambient gradient lighting */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-48 -top-48 h-[44rem] w-[44rem] animate-glow rounded-full bg-indigo-600/25 blur-[130px]" />
          <div
            className="absolute -right-48 top-1/4 h-[38rem] w-[38rem] animate-glow rounded-full bg-purple-600/20 blur-[130px]"
            style={{ animationDelay: "2.5s" }}
          />
          <div
            className="absolute -bottom-48 left-1/3 h-[42rem] w-[42rem] animate-glow rounded-full bg-fuchsia-600/15 blur-[140px]"
            style={{ animationDelay: "5s" }}
          />
        </div>

        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}