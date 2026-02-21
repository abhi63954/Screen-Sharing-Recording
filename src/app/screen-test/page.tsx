"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useScreenShare } from "@/hooks/useScreenShare";
import { Button } from "@/components/ui/Button";
import { ScreenPreview } from "@/components/Screen-Preview";

export default function ScreenTest() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);

  const {
    status,
    stream,
    startShare,
    stopShare,
    recording,
    startRecording,
    stopRecording,
    recordedUrl,
  } = useScreenShare();

  /* recording timer */
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (recording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => clearInterval(interval);
  }, [recording]);

  /* mm:ss formatter */
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      {/* Page Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-4">
          Screen Share Test
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto">
          Start screen sharing and optionally record it locally.
          Recordings are temporary and cleared on refresh.
        </p>
      </div>

      {/* Share Status Indicator */}
      <div className="flex justify-center mb-10">
        {status === "idle" && (
          <span className="px-4 py-2 rounded-full bg-slate-800 text-sm">
            Ready to start
          </span>
        )}

        {status === "requesting" && (
          <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
            Waiting for permission…
          </span>
        )}

        {status === "active" && (
          <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm">
            Screen sharing active
          </span>
        )}

        {status === "error" && (
          <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm">
            Something went wrong
          </span>
        )}

        {status === "stopped" && (
          <span className="px-4 py-2 rounded-full bg-slate-700 text-sm">
            Screen sharing stopped
          </span>
        )}
      </div>

      {/* Initial Action */}
      {status === "idle" && (
        <div className="text-center">
          <Button onClick={startShare}>
            Start Screen Share
          </Button>
        </div>
      )}

      {/* Active Share View */}
      {status === "active" && (
        <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">

          {/* Floating Controls */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full bg-slate-950/90 backdrop-blur border border-slate-700 shadow-lg">

            {recording && (
              <div className="flex items-center gap-2 text-red-500 font-medium">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                REC {formatTime(seconds)}
              </div>
            )}

            {!recording ? (
              <Button onClick={startRecording}>
                Start Recording
              </Button>
            ) : (
              <Button variant="danger" onClick={stopRecording}>
                Stop Recording
              </Button>
            )}

            <Button variant="secondary" onClick={stopShare}>
              Stop Sharing
            </Button>
          </div>

          {/* Screen Preview */}
          <div className="max-h-[70vh] overflow-auto">
            <ScreenPreview stream={stream} />
          </div>
        </div>
      )}

      {/* Recorded Output */}
      {recordedUrl && (
        <div className="mt-12 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-semibold mb-4">
            Recorded Video
          </h3>

          <video
            src={recordedUrl}
            controls
            className="w-full max-h-[400px] rounded-lg"
          />

          <a
            href={recordedUrl}
            download="screen-recording.webm"
            className="inline-block mt-4 text-blue-400 hover:underline"
          >
            Download recording
          </a>
        </div>
      )}

      {/* Post-Share Actions */}
      {status === "stopped" && (
        <div className="mt-12 text-center space-y-4">
          <Button onClick={startShare}>
            Start Again
          </Button>

          <div>
            <Button
              variant="secondary"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}