"use client"

import { User, Settings, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileSection() {
  return (
    <section id="profile" className="w-full px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Account
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your Profile
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Manage your account settings and screening history
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h3
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Guest User
              </h3>
              <p className="text-sm text-muted-foreground">
                Sign in to save your screening history and reports
              </p>
            </div>
            <div className="ml-auto hidden md:block">
              <Button
                variant="outline"
                className="h-11 rounded-xl border-border px-6 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Settings items */}
          <div className="mt-8 grid gap-3">
            {[
              {
                icon: Settings,
                label: "Account Settings",
                desc: "Update your personal information and preferences",
              },
              {
                icon: Bell,
                label: "Notifications",
                desc: "Manage alerts for screening reminders",
              },
              {
                icon: LogOut,
                label: "Privacy & Data",
                desc: "Control how your data is stored and processed",
              },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-border/60 bg-background p-4 text-left transition-all hover:border-primary/30 hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
