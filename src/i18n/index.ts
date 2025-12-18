import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "@/i18n/locales/en.json"
import ru from "@/i18n/locales/ru.json"
import uz from "@/i18n/locales/uz.json"

export const supportedLanguages = ["uz", "en", "ru"] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

const storageKey = "lang"

function detectInitialLanguage(): SupportedLanguage {
  const saved = localStorage.getItem(storageKey)
  if (saved && (supportedLanguages as readonly string[]).includes(saved)) {
    return saved as SupportedLanguage
  }
  const browser = navigator.language?.toLowerCase() ?? "en"
  if (browser.startsWith("ru")) return "ru"
  if (browser.startsWith("uz")) return "uz"
  return "en"
}

export function setLanguage(lng: SupportedLanguage) {
  localStorage.setItem(storageKey, lng)
  return i18n.changeLanguage(lng)
}

void i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: detectInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export default i18n


