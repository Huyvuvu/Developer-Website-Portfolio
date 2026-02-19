"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

const initialMessages: Record<string, Message[]> = {
    en: [
        {
            id: "1",
            role: "assistant",
            content: "👋 Hi! I'm Huy's AI assistant. I can help you learn more about his skills, experience, and projects. What would you like to know?",
            timestamp: new Date(),
        },
    ],
    vi: [
        {
            id: "1",
            role: "assistant",
            content: "👋 Xin chào! Tôi là trợ lý AI của Huy. Tôi có thể giúp bạn tìm hiểu thêm về kỹ năng, kinh nghiệm và các dự án của anh ấy. Bạn muốn biết điều gì?",
            timestamp: new Date(),
        },
    ],
}

const quickReplies = {
    en: [
        "Tell me about Huy's experience",
        "What are his skills?",
        "Show me his projects",
        "How can I contact him?",
    ],
    vi: [
        "Cho tôi biết về kinh nghiệm của Huy",
        "Kỹ năng của anh ấy là gì?",
        "Xem các dự án",
        "Làm sao để liên hệ?",
    ],
}

const aiResponses: Record<string, Record<string, string>> = {
    en: {
        experience: "Huy has over 5 years of experience in product design and UX. He's currently a Senior Product Designer at TechCorp Inc., where he leads a team of 3 designers. Previously, he worked as a UX Designer at Design Studio X and started as a UI/UX Intern at Creative Solutions. He's passionate about creating user-centered digital experiences!",
        skills: "Huy is proficient in many tools and technologies:\n\n🎨 **Design**: Figma, Sketch, Adobe XD, Illustrator, Photoshop\n💻 **Development**: HTML/CSS, JavaScript, React, Tailwind\n🔬 **UX Methods**: User Research, Usability Testing, Prototyping\n🤝 **Soft Skills**: Team Leadership, Project Management, Client Communication",
        projects: "Huy has worked on several impressive projects! You can check them out in the Projects section above. His work spans across fintech, healthcare, and e-commerce industries. Each project showcases his attention to detail and user-centered approach.",
        contact: "You can reach Huy through:\n\n📧 **Email**: vunguyenquochuy2000@gmail.com\n📱 **Phone**: 0938628450\n📍 **Location**: Ho Chi Minh City, Vietnam\n\nHe's currently available for new projects and collaborations!",
        default: "That's an interesting question! Huy is a passionate designer and developer based in Ho Chi Minh City. Feel free to explore his portfolio to learn more, or ask me about his experience, skills, projects, or how to contact him!",
    },
    vi: {
        experience: "Huy có hơn 5 năm kinh nghiệm trong thiết kế sản phẩm và UX. Hiện tại anh ấy là Trưởng nhóm thiết kế sản phẩm tại TechCorp Inc., dẫn dắt đội ngũ 3 nhà thiết kế. Trước đó, anh làm UX Designer tại Design Studio X và bắt đầu làm thực tập sinh UI/UX tại Creative Solutions. Anh ấy đam mê tạo ra các trải nghiệm số lấy người dùng làm trung tâm!",
        skills: "Huy thành thạo nhiều công cụ và công nghệ:\n\n🎨 **Thiết kế**: Figma, Sketch, Adobe XD, Illustrator, Photoshop\n💻 **Phát triển**: HTML/CSS, JavaScript, React, Tailwind\n🔬 **Phương pháp UX**: Nghiên cứu người dùng, Kiểm thử khả năng sử dụng, Prototyping\n🤝 **Kỹ năng mềm**: Lãnh đạo nhóm, Quản lý dự án, Giao tiếp khách hàng",
        projects: "Huy đã làm việc trên nhiều dự án ấn tượng! Bạn có thể xem trong phần Dự án ở trên. Công việc của anh ấy trải rộng trong các lĩnh vực fintech, y tế và thương mại điện tử. Mỗi dự án đều thể hiện sự chú ý đến chi tiết và cách tiếp cận lấy người dùng làm trung tâm.",
        contact: "Bạn có thể liên hệ Huy qua:\n\n📧 **Email**: vunguyenquochuy2000@gmail.com\n📱 **Điện thoại**: 0938628450\n📍 **Địa điểm**: Hồ Chí Minh, Việt Nam\n\nAnh ấy hiện đang sẵn sàng cho các dự án và hợp tác mới!",
        default: "Đó là một câu hỏi thú vị! Huy là một nhà thiết kế và lập trình viên đam mê, sống tại Hồ Chí Minh. Hãy thoải mái khám phá portfolio của anh ấy để tìm hiểu thêm, hoặc hỏi tôi về kinh nghiệm, kỹ năng, dự án, hoặc cách liên hệ với anh ấy!",
    },
}

function getAIResponse(message: string, lang: "en" | "vi"): string {
    const lowerMessage = message.toLowerCase()
    const responses = aiResponses[lang]

    if (lowerMessage.includes("experience") || lowerMessage.includes("kinh nghiệm") || lowerMessage.includes("work")) {
        return responses.experience
    }
    if (lowerMessage.includes("skill") || lowerMessage.includes("kỹ năng") || lowerMessage.includes("tool") || lowerMessage.includes("công nghệ")) {
        return responses.skills
    }
    if (lowerMessage.includes("project") || lowerMessage.includes("dự án") || lowerMessage.includes("portfolio")) {
        return responses.projects
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("liên hệ") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
        return responses.contact
    }
    return responses.default
}

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { language } = useLanguage()

    // Initialize messages based on language
    useEffect(() => {
        setMessages(initialMessages[language] || initialMessages.en)
    }, [language])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: content.trim(),
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        // Simulate AI thinking delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: getAIResponse(content, language as "en" | "vi"),
            timestamp: new Date(),
        }

        setIsTyping(false)
        setMessages((prev) => [...prev, aiResponse])
    }

    const handleQuickReply = (reply: string) => {
        handleSendMessage(reply)
    }

    const labels = {
        placeholder: language === "vi" ? "Nhập tin nhắn..." : "Type a message...",
        aiAgent: language === "vi" ? "Trợ lý AI" : "AI Assistant",
        typing: language === "vi" ? "Đang nhập..." : "Typing...",
    }

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-28 right-6 z-50",
                    "w-14 h-14 rounded-full",
                    "bg-gradient-to-r from-purple-500 to-pink-500",
                    "hover:from-purple-600 hover:to-pink-600",
                    "shadow-lg shadow-purple-500/30",
                    "flex items-center justify-center",
                    "transition-all duration-300",
                    "hover:scale-110",
                    isOpen && "rotate-90"
                )}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <div className="relative">
                        <MessageCircle className="w-6 h-6 text-white" />
                        <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-44 right-6 z-50",
                    "w-[360px] max-w-[calc(100vw-3rem)]",
                    "bg-zinc-900/95 backdrop-blur-xl",
                    "rounded-2xl border border-zinc-700/50",
                    "shadow-2xl shadow-purple-500/10",
                    "flex flex-col",
                    "transition-all duration-300 origin-bottom-right",
                    isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                )}
                style={{ height: "480px" }}
            >
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-zinc-700/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-2xl">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-white">{labels.aiAgent}</h3>
                        <p className="text-xs text-zinc-400">{language === "vi" ? "Trực tuyến" : "Online"}</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4 text-zinc-400" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-2",
                                message.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    message.role === "user"
                                        ? "bg-cyan-500"
                                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                                )}
                            >
                                {message.role === "user" ? (
                                    <User className="w-4 h-4 text-white" />
                                ) : (
                                    <Bot className="w-4 h-4 text-white" />
                                )}
                            </div>
                            <div
                                className={cn(
                                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap",
                                    message.role === "user"
                                        ? "bg-cyan-500 text-white rounded-br-none"
                                        : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                                )}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-zinc-800 text-zinc-400 rounded-2xl rounded-bl-none px-4 py-2 text-sm">
                                <span className="typing-dots flex gap-1">
                                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && !isTyping && (
                    <div className="px-4 pb-2">
                        <div className="flex flex-wrap gap-2">
                            {(quickReplies[language as "en" | "vi"] || quickReplies.en).map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply)}
                                    className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors border border-zinc-700/50"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-zinc-700/50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSendMessage(inputValue)
                        }}
                        className="flex gap-2"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={labels.placeholder}
                            className="flex-1 bg-zinc-800/70 border border-zinc-700/50 rounded-xl px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className={cn(
                                "p-2 rounded-xl transition-all",
                                inputValue.trim() && !isTyping
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
                                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            )}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
