"use client"

import { SakuraEffect } from "@/components/sakura-effect"
import { AIChatbot } from "@/components/ai-chatbot"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"

export function GlobalComponents() {
    return (
        <>
            {/* Sakura Falling Effect */}
            <SakuraEffect />

            {/* AI Chatbot */}
            <AIChatbot />

            {/* Scroll to Top Button */}
            <EnhancedScrollIndicator />
        </>
    )
}
