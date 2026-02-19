"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

interface Particle {
    size: number
    uplift: number
    posX: number
    duration: number
    delay: number
}

export function GooeyFooter() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { language } = useLanguage()

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Clear existing particles
        container.innerHTML = ""

        const fragment = document.createDocumentFragment()
        const particleCount = 80

        for (let i = 0; i < particleCount; i++) {
            const span = document.createElement("span")
            span.classList.add("particle")

            const size = 3 + Math.random() * 6
            const distance = 10 + Math.random() * 15
            const position = Math.random() * 100
            const time = 3 + Math.random() * 3
            const delay = -1 * (Math.random() * 10)

            span.style.setProperty("--dim", `${size}rem`)
            span.style.setProperty("--uplift", `${distance}rem`)
            span.style.setProperty("--pos-x", `${position}%`)
            span.style.setProperty("--dur", `${time}s`)
            span.style.setProperty("--delay", `${delay}s`)

            fragment.appendChild(span)
        }

        container.appendChild(fragment)
    }, [])

    const footerLinks = {
        company: {
            title: language === "vi" ? "Công ty" : "Company",
            links: [
                { label: language === "vi" ? "Giới thiệu" : "About", href: "#" },
                { label: language === "vi" ? "Tuyển dụng" : "Careers", href: "#" },
                { label: language === "vi" ? "Thương hiệu" : "Brand", href: "#" },
            ]
        },
        resources: {
            title: language === "vi" ? "Tài nguyên" : "Resources",
            links: [
                { label: language === "vi" ? "Trung tâm hỗ trợ" : "Help Center", href: "#" },
                { label: language === "vi" ? "Quyền riêng tư" : "Privacy", href: "#" },
                { label: language === "vi" ? "Điều khoản" : "Terms", href: "#" },
            ]
        },
        social: {
            title: language === "vi" ? "Mạng xã hội" : "Social",
            links: [
                { label: "Instagram", href: "https://www.instagram.com/huytega/" },
                { label: "Twitter", href: "https://x.com/huytega" },
                { label: "GitHub", href: "https://github.com/huytega" },
            ]
        }
    }

    return (
        <>
            <footer className="gooey-footer">
                <div className="gooey-animations" ref={containerRef}></div>

                <div className="footer-content">
                    {Object.values(footerLinks).map((column, index) => (
                        <div key={index} className="footer-column">
                            <h4>{column.title}</h4>
                            {column.links.map((link, linkIndex) => (
                                <a
                                    key={linkIndex}
                                    href={link.href}
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="footer-copyright">
                    <p>© {new Date().getFullYear()} Vũ Nguyễn Quốc Huy. All rights reserved.</p>
                </div>
            </footer>

            {/* SVG Filter for Gooey Effect */}
            <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
                <defs>
                    <filter id="liquid-effect">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="liquid"
                        />
                    </filter>
                </defs>
            </svg>

            <style jsx>{`
        .gooey-footer {
          position: relative;
          background: #4CD9B0;
          min-height: 250px;
          padding-bottom: 2rem;
          margin-top: 8rem;
          width: 100%;
        }

        .gooey-animations {
          position: absolute;
          top: 0;
          width: 120%;
          left: -10%;
          height: 6rem;
          background: #4CD9B0;
          transform: translateY(-99%);
          z-index: 0;
          filter: url('#liquid-effect');
          overflow: visible;
          pointer-events: none;
        }

        .gooey-animations :global(.particle) {
          position: absolute;
          background: #4CD9B0;
          border-radius: 50%;
          top: 50%;
          left: var(--pos-x, 50%);
          width: var(--dim, 5rem);
          height: var(--dim, 5rem);
          transform: translate(-50%, -50%);
          animation: float-up var(--dur, 4s) ease-in infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes float-up {
          0% {
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            top: calc(var(--uplift) * -1);
            transform: translate(-50%, -50%) scale(0);
          }
        }

        .footer-content {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-column h4 {
          color: #2E2E2E;
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-column a {
          color: #2E2E2E;
          opacity: 0.8;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          transition: opacity 0.3s, transform 0.3s;
        }

        .footer-column a:hover {
          opacity: 1;
          transform: translateY(-3px);
          font-weight: 600;
        }

        .footer-copyright {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 2rem;
          color: #2E2E2E;
          opacity: 0.7;
          font-size: 0.875rem;
        }

        .footer-copyright p {
          margin: 0;
        }

        @media (max-width: 600px) {
          .footer-content {
            text-align: center;
          }
        }
      `}</style>
        </>
    )
}
