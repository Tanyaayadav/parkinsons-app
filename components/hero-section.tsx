"use client"

import { ArrowDown, Shield, Brain, Mic2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, oklch(0.55 0.12 230 / 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 60%, oklch(0.72 0.1 168 / 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 shadow-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            FDA Informed Design
          </span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span className="text-xs font-semibold text-primary">
            Non-Invasive
          </span>
        </div>

        <h1
          className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {"Early Screening for "}
          <span className="text-primary">{"Parkinson's"}</span>
          {" Through Voice"}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed">
          NeuroVox uses advanced AI to analyze vocal biomarkers, 
          providing a fast, non-invasive preliminary screening in under 60 seconds.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="h-14 gap-2.5 rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            <a href="#dashboard">
              <Mic2 className="h-5 w-5" />
              Begin Screening
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 gap-2.5 rounded-2xl border-border px-8 text-base font-semibold text-foreground hover:bg-muted"
          >
            <a href="#about">Learn How It Works</a>
          </Button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: Mic2,
            title: "Voice Capture",
            desc: "Simple 30-second voice recording with guided prompts",
          },
          {
            icon: Brain,
            title: "AI Analysis",
            desc: "Extracts Jitter, Shimmer, HNR and 20+ vocal features",
          },
          {
            icon: Shield,
            title: "Secure Results",
            desc: "HIPAA-compliant processing with encrypted data handling",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#dashboard"
        className="mt-16 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll to dashboard"
      >
        <span className="text-xs font-semibold uppercase tracking-wider">
          Start Analysis
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
