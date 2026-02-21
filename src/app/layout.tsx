import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Screen Share Test App",
  description: "Test your browser screen sharing capability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        {/* App Shell */}
        <div className="flex min-h-screen flex-col">

          {/* Top Navigation */}
          <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <Navbar />
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="relative">
              {/* subtle background gradient */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-800 bg-slate-950">
            <Footer />
          </footer>

        </div>
      </body>
    </html>
  );
}