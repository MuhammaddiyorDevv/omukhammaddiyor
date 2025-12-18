import { Languages } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLanguage, type SupportedLanguage } from "@/i18n"

const labels: Record<SupportedLanguage, string> = {
  uz: "O‘zbek",
  en: "English",
  ru: "Русский",
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.language?.slice(0, 2) as SupportedLanguage) ?? "en"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change language">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(labels).map(([lng, label]) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => void setLanguage(lng as SupportedLanguage)}
          >
            {label}
            {current === lng ? <span className="ml-2 text-xs text-muted-foreground">(✓)</span> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


