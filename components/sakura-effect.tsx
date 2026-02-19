"use client"

import { useEffect, useRef } from "react"

interface Petal {
    id: number
    x: number
    y: number
    size: number
    rotation: number
    rotationSpeed: number
    fallSpeed: number
    swaySpeed: number
    swayAmount: number
    opacity: number
    type: "sakura" | "plum"
}

export function SakuraEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const petalsRef = useRef<Petal[]>([])
    const animationRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Create petals
        const createPetal = (id: number): Petal => ({
            id,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: 8 + Math.random() * 12,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            fallSpeed: 0.5 + Math.random() * 1.5,
            swaySpeed: 0.5 + Math.random() * 1,
            swayAmount: 30 + Math.random() * 50,
            opacity: 0.6 + Math.random() * 0.4,
            type: Math.random() > 0.5 ? "sakura" : "plum"
        })

        // Initialize petals
        const petalCount = 40
        petalsRef.current = Array.from({ length: petalCount }, (_, i) => createPetal(i))

        // Draw sakura petal
        const drawSakuraPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate((rotation * Math.PI) / 180)
            ctx.globalAlpha = opacity

            // Sakura petal shape (5 petals with heart-shaped tips)
            ctx.beginPath()
            ctx.fillStyle = "#FFB7C5"

            // Draw petal shape
            ctx.moveTo(0, -size / 2)
            ctx.bezierCurveTo(
                size / 2, -size / 2,
                size / 2, size / 4,
                0, size / 2
            )
            ctx.bezierCurveTo(
                -size / 2, size / 4,
                -size / 2, -size / 2,
                0, -size / 2
            )
            ctx.fill()

            // Add gradient overlay
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
            gradient.addColorStop(1, "rgba(255, 183, 197, 0)")
            ctx.fillStyle = gradient
            ctx.fill()

            ctx.restore()
        }

        // Draw plum blossom petal
        const drawPlumPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate((rotation * Math.PI) / 180)
            ctx.globalAlpha = opacity

            // Plum petal (rounder, more circular)
            ctx.beginPath()
            ctx.fillStyle = "#FF69B4"

            ctx.ellipse(0, 0, size / 2, size / 3, 0, 0, Math.PI * 2)
            ctx.fill()

            // Add highlight
            ctx.beginPath()
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
            ctx.ellipse(-size / 6, -size / 8, size / 6, size / 8, 0, 0, Math.PI * 2)
            ctx.fill()

            ctx.restore()
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            petalsRef.current.forEach((petal, index) => {
                // Update position
                petal.y += petal.fallSpeed
                petal.x += Math.sin(petal.y * 0.01 * petal.swaySpeed) * 0.5
                petal.rotation += petal.rotationSpeed

                // Reset petal when it falls off screen
                if (petal.y > canvas.height + petal.size) {
                    petalsRef.current[index] = {
                        ...createPetal(petal.id),
                        y: -petal.size,
                        x: Math.random() * canvas.width
                    }
                }

                // Draw petal
                if (petal.type === "sakura") {
                    drawSakuraPetal(ctx, petal.x, petal.y, petal.size, petal.rotation, petal.opacity)
                } else {
                    drawPlumPetal(ctx, petal.x, petal.y, petal.size, petal.rotation, petal.opacity)
                }
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="sakura-canvas"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 100,
            }}
        />
    )
}
