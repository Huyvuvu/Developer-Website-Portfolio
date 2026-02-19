import { Router, Request, Response } from "express"
import mongoose from "mongoose"

const router = Router()

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check — verify server and database status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server and database are healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 database:
 *                   type: string
 *                   example: connected
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get("/", (_req: Request, res: Response) => {
    const dbState = mongoose.connection.readyState
    const stateMap: Record<number, string> = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
    }

    res.json({
        status: dbState === 1 ? "ok" : "degraded",
        database: stateMap[dbState] || "unknown",
        timestamp: new Date().toISOString(),
    })
})

export default router
