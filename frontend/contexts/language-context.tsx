"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "vi"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.experience": "Experience",
        "nav.credentials": "Credentials",
        "nav.skills": "Skills",
        "nav.projects": "Projects",

        // Profile
        "profile.availableForWork": "Available for work",
        "profile.contactMe": "Contact Me",
        "profile.downloadCV": "Download CV",

        // About
        "about.title": "About Me",
        "about.focus": "Professional Focus",
        "about.languages": "Languages",
        "about.interests": "Interests",

        // Experience
        "experience.title": "Experience",
        "experience.achievements": "Key Achievements",

        // Credentials
        "credentials.title": "Credentials",
        "credentials.certifications": "Certifications",
        "credentials.education": "Education",
        "credentials.skills": "Core Skills",

        // Skills
        "skills.title": "Technical Skills",
        "skills.design": "Design Tools",
        "skills.development": "Development",
        "skills.uxMethods": "UX Methods",
        "skills.softSkills": "Soft Skills",

        // Projects
        "projects.title": "Featured Projects",
        "projects.viewAll": "View All Projects",
        "projects.viewProject": "View Project",

        // Contact
        "contact.title": "Get In Touch",
        "contact.subtitle": "Have a project in mind? Let's work together!",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.workingHours": "Working Hours",
        "contact.sendMessage": "Send Message",
        "contact.name": "Your Name",
        "contact.message": "Your Message",
    },
    vi: {
        // Navigation
        "nav.home": "Trang chủ",
        "nav.experience": "Kinh nghiệm",
        "nav.credentials": "Bằng cấp",
        "nav.skills": "Kỹ năng",
        "nav.projects": "Dự án",

        // Profile
        "profile.availableForWork": "Sẵn sàng nhận việc",
        "profile.contactMe": "Liên hệ",
        "profile.downloadCV": "Tải CV",

        // About
        "about.title": "Về tôi",
        "about.focus": "Định hướng chuyên môn",
        "about.languages": "Ngôn ngữ",
        "about.interests": "Sở thích",

        // Experience  
        "experience.title": "Kinh nghiệm",
        "experience.achievements": "Thành tựu nổi bật",

        // Credentials
        "credentials.title": "Bằng cấp & Chứng chỉ",
        "credentials.certifications": "Chứng chỉ",
        "credentials.education": "Học vấn",
        "credentials.skills": "Kỹ năng cốt lõi",

        // Skills
        "skills.title": "Kỹ năng chuyên môn",
        "skills.design": "Công cụ thiết kế",
        "skills.development": "Phát triển",
        "skills.uxMethods": "Phương pháp UX",
        "skills.softSkills": "Kỹ năng mềm",

        // Projects
        "projects.title": "Dự án nổi bật",
        "projects.viewAll": "Xem tất cả dự án",
        "projects.viewProject": "Xem dự án",

        // Contact
        "contact.title": "Liên hệ",
        "contact.subtitle": "Có dự án cần thực hiện? Hãy cùng hợp tác!",
        "contact.email": "Email",
        "contact.phone": "Điện thoại",
        "contact.workingHours": "Giờ làm việc",
        "contact.sendMessage": "Gửi tin nhắn",
        "contact.name": "Tên của bạn",
        "contact.message": "Nội dung tin nhắn",
    }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en")

    // Load language from localStorage on initial render
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "vi")) {
            setLanguageState(savedLanguage)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
    }

    const t = (key: string): string => {
        return translations[language][key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
