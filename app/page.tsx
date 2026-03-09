"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { VoiceRecorder } from "@/components/voice-recorder"
import { BiometricAnalysis } from "@/components/biometric-analysis"
import { RiskGauge } from "@/components/risk-gauge"
import { DownloadReport } from "@/components/download-report"
import { ContactSection } from "@/components/contact-section"
import { ProfileSection } from "@/components/profile-section"
import { Footer } from "@/components/footer"

export default function Page() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* Dashboard sections */}
        <div className="mx-auto flex max-w-5xl flex-col gap-24 px-6 pb-24">
          {/* Voice Recording */}
          <VoiceRecorder onRecordingComplete={() => setIsAnalyzing(true)} />

          {/* Biometric Analysis */}
          <BiometricAnalysis isAnalyzing={isAnalyzing} />

          {/* Risk Assessment */}
          <RiskGauge isAnalyzing={isAnalyzing} />

          {/* Download Report */}
          <DownloadReport isReady={isAnalyzing} />

          {/* Contact */}
          <ContactSection />

          {/* Profile */}
          <ProfileSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
