"use client"

import { useState, useEffect } from "react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"

const METRICS = [
  { key: "jitter", label: "Jitter (%)", target: 0.45, unit: "%" },
  { key: "shimmer", label: "Shimmer (%)", target: 3.2, unit: "%" },
  { key: "hnr", label: "HNR (dB)", target: 21.5, unit: "dB" },
  { key: "f0", label: "F0 Variation", target: 15.8, unit: "Hz" },
  { key: "dda", label: "DDA", target: 0.02, unit: "" },
  { key: "ppe", label: "PPE", target: 0.18, unit: "" },
]

function simulateValue(target: number, progress: number) {
  const noise = (Math.random() - 0.5) * target * 0.2
  return Math.max(0, target * progress + noise * progress)
}

export function BiometricAnalysis({ isAnalyzing }: { isAnalyzing: boolean }) {
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState(
    METRICS.map((m) => ({ subject: m.label, value: 0, fullMark: m.target * 1.5 }))
  )

  useEffect(() => {
    if (!isAnalyzing) return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 0.02, 1)
        if (next >= 1) clearInterval(interval)
        return next
      })
    }, 50)
    return () => clearInterval(interval)
  }, [isAnalyzing])

  useEffect(() => {
    if (!isAnalyzing) return
    setData(
      METRICS.map((m) => ({
        subject: m.label,
        value: simulateValue(m.target, progress),
        fullMark: m.target * 1.5,
      }))
    )
  }, [progress, isAnalyzing])

  const displayValues = METRICS.map((m, i) => ({
    ...m,
    current: data[i]?.value ?? 0,
  }))

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Diagnostics
        </p>
        <h2
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Biometric Analysis
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Real-time vocal biomarker extraction and visualization
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Radar Chart */}
        <div className="flex items-center justify-center rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="oklch(0.90 0.01 220)" strokeWidth={0.5} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "oklch(0.50 0.02 240)",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar
                name="Metrics"
                dataKey="value"
                stroke="oklch(0.55 0.12 230)"
                fill="oklch(0.55 0.12 230)"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-3 content-start">
          {displayValues.map((m) => (
            <div
              key={m.key}
              className="rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {m.label}
              </p>
              <p
                className="text-2xl font-bold tabular-nums text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {m.current > 0 ? m.current.toFixed(2) : "---"}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((m.current / (m.target * 1.5)) * 100, 100)}%`,
                    backgroundColor:
                      m.current / m.target < 0.8
                        ? "oklch(0.72 0.1 168)"
                        : m.current / m.target < 1.2
                          ? "oklch(0.55 0.12 230)"
                          : "oklch(0.70 0.15 60)",
                  }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                {"Ref: "}
                {m.target}
                {m.unit && ` ${m.unit}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
