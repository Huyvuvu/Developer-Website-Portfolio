import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { AnimationProvider } from "@/contexts/animation-context"
import { LanguageProvider } from "@/contexts/language-context"
import { GlobalComponents } from "@/components/global-components"
import { getMetaInfo } from "@/lib/data"

const inter = Inter({ subsets: ["latin"] })

const metaInfo = getMetaInfo()

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
  generator: 'VuNguyenQuocHuy'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <AnimationProvider>
            <ScrollProgressIndicator />
            {children}
            <GlobalComponents />
          </AnimationProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
