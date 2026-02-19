import "dotenv/config"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import swaggerUi from "swagger-ui-express"

import connectToDatabase from "./config/database"
import swaggerSpec from "./swagger/swagger"
import projectRoutes from "./routes/project.routes"
import blogRoutes from "./routes/blog.routes"
import profileRoutes from "./routes/profile.routes"
import healthRoutes from "./routes/health.routes"

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ───
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// ─── Swagger UI ───
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Portfolio API Docs",
}))

// ─── API Routes ───
app.use("/api/health", healthRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/profile", profileRoutes)

// ─── Root ───
app.get("/", (_req, res) => {
    res.json({
        message: "Portfolio API Server",
        docs: `/api-docs`,
        endpoints: {
            health: "/api/health",
            projects: "/api/projects",
            blog: "/api/blog",
            profile: "/api/profile",
        },
    })
})

// ─── Start Server ───
async function start() {
    try {
        await connectToDatabase()
        app.listen(PORT, () => {
            console.log(`\n🚀 Server running on http://localhost:${PORT}`)
            console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`)
            console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`)
        })
    } catch (error) {
        console.error("❌ Failed to start server:", error)
        process.exit(1)
    }
}

start()
