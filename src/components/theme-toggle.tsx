import { useEffect, useMemo, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Theme = "light" | "dark" | "system"

function getSystemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const isDark = theme === "dark" || (theme === "system" && getSystemPrefersDark())
  root.classList.toggle("dark", isDark)
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) ?? "system"
    setTheme(saved)
    applyTheme(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)")
    if (!media) return

    const handler = () => {
      // Only react to OS theme changes when user selected "system"
      if (theme === "system") applyTheme("system")
    }

    media.addEventListener?.("change", handler)
    return () => media.removeEventListener?.("change", handler)
  }, [theme])

  const Icon = useMemo(() => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      (theme === "system" && typeof window !== "undefined" && getSystemPrefersDark())
    return isDark ? Moon : Sun
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <Icon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


