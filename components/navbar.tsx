"use client"

import { useState } from "react"
import { Activity, Home, LayoutDashboard, Mail, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "Contact", href: "#contact", icon: Mail },
  { label: "Profile", href: "#profile", icon: User },
]

export function Navbar() {
  const [activeLink, setActiveLink] = useState("Home")
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5" onClick={() => setActiveLink("Home")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              NeuroVox
            </span>
            <span className="ml-1.5 hidden rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:inline-block">
              Beta
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = activeLink === link.label
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex">
            Get Started
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-card/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = activeLink === link.label
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.label)
                      setMobileOpen(false)
                    }}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </a>
                </li>
              )
            })}
            <li className="mt-2">
              <Button className="w-full rounded-lg bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
