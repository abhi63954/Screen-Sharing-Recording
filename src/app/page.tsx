"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSupported =
        !!navigator.mediaDevices &&
        !!navigator.mediaDevices.getDisplayMedia;

      setSupported(isSupported);
    }
  }, []);

  const handleStart = () => {
    if (!supported) return;
    router.push("/screen-test");
  };

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-24">

      {/* subtle background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />

      {/* HERO SECTION */}
      <div className="grid lg:grid-cols-2 gap-20 items-center">

        <div>
          <span className="inline-block mb-4 text-xs font-semibold tracking-wide text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full">
            Secure · Private · Browser Native
          </span>

          <h1 className="text-5xl xl:text-6xl font-bold leading-tight mb-6">
            Secure Screen Sharing
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Directly in Your Browser
            </span>
          </h1>

          <p className="text-slate-400 mb-10 text-lg max-w-xl">
            Test your browser’s screen sharing capability and
            optionally record it — all processed locally with
            zero uploads and no backend.
          </p>

          {supported === false && (
            <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
              <span className="font-semibold">Unsupported Browser</span>
              <span className="text-red-400">
                Please use Chrome or Edge for screen sharing.
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6">
            <Button
              onClick={handleStart}
              disabled={!supported}
              className="px-8 py-6 text-base font-semibold"
            >
              Start Screen Test
            </Button>

            <span className="text-slate-500 text-sm">
              No installation · No sign-up
            </span>
          </div>
        </div>

        {/* HOW IT WORKS CARD */}
        <div className="rounded-3xl p-10 border border-slate-800 bg-slate-900/80 backdrop-blur shadow-2xl">
          <h3 className="font-semibold text-xl mb-8">
            How It Works
          </h3>

          <ul className="space-y-5 text-slate-400 text-sm">
            <li><span className="text-slate-300 font-medium">1.</span> Click “Start Screen Test”</li>
            <li><span className="text-slate-300 font-medium">2.</span> Grant browser permission</li>
            <li><span className="text-slate-300 font-medium">3.</span> Choose tab, window, or full screen</li>
            <li><span className="text-slate-300 font-medium">4.</span> Preview live feed instantly</li>
            <li><span className="text-slate-300 font-medium">5.</span> Optionally record locally</li>
            <li><span className="text-slate-300 font-medium">6.</span> Stop anytime safely</li>
          </ul>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="mt-36">
        <h2 className="text-3xl font-bold text-center mb-20">
          Built with Native Web APIs
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/40 hover:shadow-lg transition">
            <h4 className="font-semibold mb-3 text-lg">
              Permission Control
            </h4>
            <p className="text-sm text-slate-400">
              Handles permission granted, denied, and cancellation
              states clearly and safely.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/40 hover:shadow-lg transition">
            <h4 className="font-semibold mb-3 text-lg">
              Live Screen Preview
            </h4>
            <p className="text-sm text-slate-400">
              Displays real-time screen feed using
              getDisplayMedia API.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/40 hover:shadow-lg transition">
            <h4 className="font-semibold mb-3 text-lg">
              Local Recording
            </h4>
            <p className="text-sm text-slate-400">
              Records your screen locally using MediaRecorder.
              No backend. No uploads.
            </p>
          </div>

        </div>
      </div>

      {/* SECURITY NOTICE */}
      <div className="mt-36 text-center max-w-3xl mx-auto">
        <p className="text-slate-500 text-sm">
          This application never uploads or stores your data.
          Everything runs entirely inside your browser session.
        </p>
      </div>
    </div>
  );
}