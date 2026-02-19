import { Router, Request, Response } from "express"
import Profile from "../models/Profile"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     BilingualString:
 *       type: object
 *       properties:
 *         en:
 *           type: string
 *         vi:
 *           type: string
 *     Profile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: Vũ Nguyễn Quốc Huy
 *         title:
 *           $ref: '#/components/schemas/BilingualString'
 *         location:
 *           $ref: '#/components/schemas/BilingualString'
 *         avatar:
 *           type: string
 *           example: /avatar-huy.png
 *         email:
 *           type: string
 *           example: vunguyenquochuy2000@gmail.com
 *         phone:
 *           type: string
 *         workingHours:
 *           $ref: '#/components/schemas/BilingualString'
 *         availableForWork:
 *           type: boolean
 *         bio:
 *           $ref: '#/components/schemas/BilingualString'
 *         social:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *               url:
 *                 type: string
 *               icon:
 *                 type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get personal profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Profile data with bilingual support
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 */
router.get("/", async (_req: Request, res: Response) => {
    try {
        const profile = await Profile.findOne().lean()
        if (!profile) return res.status(404).json({ error: "Profile not found" })
        res.json(profile)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch profile" })
    }
})

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update personal profile (upsert)
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put("/", async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            {},
            { $set: req.body },
            { new: true, upsert: true, runValidators: true }
        ).lean()
        res.json(profile)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update profile" })
    }
})

export default router
