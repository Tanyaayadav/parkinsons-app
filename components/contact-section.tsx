"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="w-full px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Support
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get in Touch
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Have questions about the screening process? Our team is here to help.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "support@neurovox.health",
              href: "mailto:support@neurovox.health",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+1 (800) 555-0199",
              href: "tel:+18005550199",
            },
            {
              icon: MapPin,
              title: "Location",
              value: "San Francisco, CA",
              href: "#",
            },
          ].map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="flex flex-col items-center rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-bold text-foreground">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
            </a>
          ))}
        </div>

        {/* Quick contact form */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-bold text-foreground">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-foreground">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="mb-2 block text-sm font-bold text-foreground">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="How can we help you?"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="h-12 rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground hover:bg-primary/90">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
