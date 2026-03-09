"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Mic, Square, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

type RecordingState = "idle" | "recording" | "done"

export function VoiceRecorder({
  onRecordingComplete,
}: {
  onRecordingComplete: () => void
}) {
  const [state, setState] = useState<RecordingState>("idle")
  const [elapsed, setElapsed] = useState(0)
  const [bars, setBars] = useState<number[]>(Array(48).fill(0.08))
  const animRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const animateWaveform = useCallback(() => {
    setBars((prev) =>
      prev.map((_, i) => {
        const time = Date.now() / 1000
        const base = Math.sin(time * 2 + i * 0.3) * 0.3 + 0.4
        const random = Math.random() * 0.25
        return Math.max(0.08, Math.min(1, base + random))
      })
    )
    animRef.current = requestAnimationFrame(animateWaveform)
  }, [])

  const startRecording = () => {
    setState("recording")
    setElapsed(0)
    animRef.current = requestAnimationFrame(animateWaveform)
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setState("done")
    if (animRef.current) cancelAnimationFrame(animRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    setBars(Array(48).fill(0.08))
    onRecordingComplete()
  }

  const resetRecording = () => {
    setState("idle")
    setElapsed(0)
    setBars(Array(48).fill(0.08))
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  return (
    <section className="flex flex-col items-center gap-8" id="dashboard">
      {/* Section header */}
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Voice Analysis
        </p>
        <h2
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Record Your Voice
        </h2>
        <p className="mt-3 max-w-md text-base text-muted-foreground leading-relaxed">
          {
            'Read the sentence aloud: "The rainbow appeared after the gentle rain stopped falling."'
          }
        </p>
      </div>

      {/* Waveform card */}
      <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        {/* Timer */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {state === "recording" && (
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>
            )}
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {state === "idle"
                ? "Ready"
                : state === "recording"
                  ? "Recording"
                  : "Complete"}
            </span>
          </div>
          <span
            className="font-mono text-2xl font-bold tabular-nums text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {formatTime(elapsed)}
          </span>
        </div>

        {/* Waveform */}
        <div className="flex h-32 items-center justify-center gap-[3px] rounded-xl bg-muted/50 px-4">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full transition-all duration-75"
              style={{
                height: `${h * 100}%`,
                backgroundColor:
                  state === "recording"
                    ? `oklch(0.55 0.12 ${200 + i * 1.2})`
                    : state === "done"
                      ? "oklch(0.72 0.1 168)"
                      : "oklch(0.85 0.01 220)",
                opacity: state === "recording" ? 0.9 : 0.4,
                boxShadow:
                  state === "recording"
                    ? `0 0 8px oklch(0.55 0.12 230 / 0.3)`
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {state === "idle" && (
            <Button
              onClick={startRecording}
              size="lg"
              className="h-16 gap-3 rounded-2xl bg-primary px-10 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              <Mic className="h-6 w-6" />
              Start Recording
            </Button>
          )}
          {state === "recording" && (
            <Button
              onClick={stopRecording}
              size="lg"
              variant="destructive"
              className="h-16 gap-3 rounded-2xl bg-red-500 px-10 text-lg font-bold text-card shadow-lg shadow-red-500/20 transition-all hover:bg-red-600 hover:shadow-xl"
            >
              <Square className="h-5 w-5" />
              Stop Recording
            </Button>
          )}
          {state === "done" && (
            <Button
              onClick={resetRecording}
              size="lg"
              variant="outline"
              className="h-14 gap-3 rounded-2xl border-border px-8 text-base font-semibold text-foreground hover:bg-muted"
            >
              <RotateCcw className="h-5 w-5" />
              Record Again
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
