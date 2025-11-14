import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "GenAI Brand Kit Builder",
  description: "Instantly craft your unique brand identity with GenAI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="bg-brand-bg text-brand-text font-body">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="border-b border-brand-bgAlt bg-white/90 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand.primary to-brand.accent flex items-center justify-center shadow-soft">
                  <span className="text-white text-xs font-heading font-semibold">
                    AI
                  </span>
                </div>
                <span className="font-heading font-semibold tracking-tight text-sm md:text-base">
                  GenAI Brand Kit
                </span>
              </div>

              <nav className="flex gap-4 text-xs md:text-sm text-gray-600">
                <a
                  href="/"
                  className="hover:text-brand.primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="/generate"
                  className="hover:text-brand.primary transition-colors"
                >
                  Brand Kit Generator
                </a>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-brand-bgAlt bg-white mt-10">
            <div className="max-w-6xl mx-auto px-6 py-4 text-xs md:text-sm text-gray-500 flex flex-wrap gap-3 justify-between">
              <span>© {new Date().getFullYear()} Team "Proudly GAIM"</span>
              <div className="flex gap-3">
                <a href="#" className="hover:text-brand.primary">
                  About Us
                </a>
                <a href="#" className="hover:text-brand.primary">
                  Contact
                </a>
                <a href="#" className="hover:text-brand.primary">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-brand.primary">
                  Terms of Service
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
