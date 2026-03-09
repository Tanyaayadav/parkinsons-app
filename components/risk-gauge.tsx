"use client"

import { useState, useEffect } from "react"
import { ShieldCheck, Info } from "lucide-react"

export function RiskGauge({ isAnalyzing }: { isAnalyzing: boolean }) {
  const [score, setScore] = useState(0)
  const targetScore = 24 // Low risk score

  useEffect(() => {
    if (!isAnalyzing) return
    setScore(0)
    const interval = setInterval(() => {
      setScore((prev) => {
        const next = prev + 0.5
        if (next >= targetScore) {
          clearInterval(interval)
          return targetScore
        }
        return next
      })
    }, 40)
    return () => clearInterval(interval)
  }, [isAnalyzing])

  const getRiskLabel = (s: number) => {
    if (s === 0) return { label: "Awaiting Data", color: "oklch(0.85 0.01 220)" }
    if (s < 30) return { label: "Low Indication", color: "oklch(0.72 0.1 168)" }
    if (s < 60) return { label: "Moderate Indication", color: "oklch(0.70 0.15 60)" }
    return { label: "Elevated Indication", color: "oklch(0.65 0.18 30)" }
  }

  const risk = getRiskLabel(score)

  // SVG arc for the gauge
  const radius = 120
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Results
        </p>
        <h2
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Risk Assessment
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          AI-generated screening result based on vocal biomarkers
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Gauge */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="relative">
            <svg
              width="280"
              height="160"
              viewBox="0 0 280 160"
              className="overflow-visible"
            >
              {/* Background arc */}
              <path
                d="M 20 150 A 120 120 0 0 1 260 150"
                fill="none"
                stroke="oklch(0.92 0.01 220)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Active arc */}
              <path
                d="M 20 150 A 120 120 0 0 1 260 150"
                fill="none"
                stroke={risk.color}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
              <span
                className="text-5xl font-bold tabular-nums text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {Math.round(score)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                / 100
              </span>
            </div>
          </div>

          <div
            className="mt-6 flex items-center gap-2 rounded-full px-5 py-2"
            style={{ backgroundColor: `${risk.color}20` }}
          >
            <ShieldCheck className="h-5 w-5" style={{ color: risk.color }} />
            <span
              className="text-sm font-bold"
              style={{ color: risk.color }}
            >
              {risk.label}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          {/* Disclaimer */}
          <div className="rounded-xl border border-border/60 bg-secondary/50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-foreground">
                Important Notice
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This screening tool provides preliminary indications only. It is not a medical diagnosis. 
              Please consult a qualified neurologist for professional evaluation and follow-up testing.
            </p>
          </div>

          {/* Breakdown items */}
          {[
            {
              label: "Vocal Tremor",
              value: isAnalyzing ? "Minimal" : "---",
              desc: "Stability of sustained phonation",
            },
            {
              label: "Pitch Regularity",
              value: isAnalyzing ? "Normal Range" : "---",
              desc: "Consistency of fundamental frequency",
            },
            {
              label: "Voice Quality",
              value: isAnalyzing ? "Good" : "---",
              desc: "Harmonics-to-noise profile",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/60 bg-card p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">{item.label}</p>
                <span
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground"
                >
                  {item.value}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
