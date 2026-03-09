"use client"

import { Download, FileText, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DownloadReport({ isReady }: { isReady: boolean }) {
  const handleDownload = () => {
    // Generate a simple text report
    const report = `
=====================================
  NeuroVox - Voice Analysis Report
=====================================

Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
Time: ${new Date().toLocaleTimeString("en-US")}

VOCAL BIOMARKER RESULTS
-----------------------
Jitter:     0.45%  (Reference: <1.04%)
Shimmer:    3.20%  (Reference: <3.81%)
HNR:        21.5 dB (Reference: >20 dB)
F0 Var:     15.8 Hz
DDA:        0.02
PPE:        0.18

RISK ASSESSMENT
-----------------------
Overall Score: 24 / 100
Classification: Low Indication

DISCLAIMER
-----------------------
This report is for screening purposes only
and does not constitute a medical diagnosis.
Please consult a qualified neurologist.
=====================================
    `.trim()

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "neurovox-report.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Screening Report
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Download a detailed summary of your voice analysis and biomarker results.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            disabled={!isReady}
            className="h-12 gap-2.5 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-40"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
    </section>
  )
}
