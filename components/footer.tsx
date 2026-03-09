import { Activity, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span
              className="text-lg font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              NeuroVox
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Privacy Policy", "Terms of Service", "Research", "Accessibility"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border/50 pt-8 text-center">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {"Built with"}
            <Heart className="h-3.5 w-3.5 text-red-400" />
            {"for early detection research"}
          </p>
          <p className="text-xs text-muted-foreground">
            {"NeuroVox is a screening tool, not a diagnostic device. Always consult a healthcare professional."}
          </p>
        </div>
      </div>
    </footer>
  )
}
