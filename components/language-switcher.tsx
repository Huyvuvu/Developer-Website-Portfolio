"use client"

import { useLanguage, type Language } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "vi" : "en")
    }

    return (
        <button
            onClick={toggleLanguage}
            className={cn(
                "flex items-center gap-1.5 px-2 py-1.5 rounded-md",
                "bg-zinc-800/50 hover:bg-zinc-700/50",
                "border border-zinc-700/50 hover:border-zinc-600/50",
                "transition-all duration-300",
                "text-sm font-medium"
            )}
            aria-label={`Switch to ${language === "en" ? "Vietnamese" : "English"}`}
        >
            <span className={cn(
                "transition-all duration-300",
                language === "en" ? "opacity-100 scale-100" : "opacity-50 scale-90"
            )}>
                🇺🇸
            </span>
            <span className="text-zinc-500">/</span>
            <span className={cn(
                "transition-all duration-300",
                language === "vi" ? "opacity-100 scale-100" : "opacity-50 scale-90"
            )}>
                🇻🇳
            </span>
        </button>
    )
}
