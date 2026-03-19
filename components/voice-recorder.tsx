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
    <section className="relative flex flex-col items-center gap-8 py-10 animate-fadeIn">

      {/* Background glow */}
      <div className="bg-glow left-0 bg-primary"></div>
      <div className="bg-glow right-0 bg-accent"></div>

      {/* Header */}
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Voice Analysis
        </p>
        <h2 className="text-3xl font-bold md:text-4xl font-heading">
          Record Your Voice
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Read aloud: "The rainbow appeared after the gentle rain stopped falling."
        </p>
      </div>

      {/* Gradient Border */}
      <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-primary via-accent to-chart-2 animate-gradient">

        {/* Glass Card */}
        <div className="w-full max-w-2xl rounded-3xl glass-card shadow-3d p-8 hover-3d">

          {/* Timer */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {state === "recording" && (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive" />
                </span>
              )}
              <span className="text-sm font-semibold uppercase text-muted-foreground">
                {state === "idle"
                  ? "Ready"
                  : state === "recording"
                  ? "Recording"
                  : "Complete"}
              </span>
            </div>

            <span className="font-mono text-2xl font-bold">
              {formatTime(elapsed)}
            </span>
          </div>

          {/* Waveform */}
          <div className="flex h-32 items-center justify-center gap-[3px] rounded-xl bg-muted/40 px-4">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`w-[3px] rounded-full transition-all duration-75 ${
                  state === "recording" ? "glow-primary" : ""
                }`}
                style={{
                  height: `${h * 100}%`,
                  background:
                    state === "recording"
                      ? "linear-gradient(to top, var(--color-primary), var(--color-accent))"
                      : "var(--color-muted-foreground)",
                  opacity: state === "recording" ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex justify-center gap-4">
            {state === "idle" && (
              <Button
                onClick={startRecording}
                size="lg"
                className="h-16 gap-3 rounded-2xl bg-primary text-primary-foreground px-10 text-lg font-bold shadow-3d hover-3d"
              >
                <Mic className="h-6 w-6" />
                Start Recording
              </Button>
            )}

            {state === "recording" && (
              <div className="relative">
                <span className="absolute inset-0 rounded-2xl animate-ping bg-destructive opacity-30"></span>

                <Button
                  onClick={stopRecording}
                  size="lg"
                  className="relative h-16 gap-3 rounded-2xl bg-destructive text-white px-10 text-lg font-bold shadow-3d"
                >
                  <Square className="h-5 w-5" />
                  Stop Recording
                </Button>
              </div>
            )}

            {state === "done" && (
              <Button
                onClick={resetRecording}
                size="lg"
                variant="outline"
                className="h-14 gap-3 rounded-2xl px-8 hover-3d"
              >
                <RotateCcw className="h-5 w-5" />
                Record Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
