import { Router, Request, Response } from "express"
import Project from "../models/Project"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     GalleryImage:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         caption:
 *           type: string
 *     RelatedProject:
 *       type: object
 *       properties:
 *         slug:
 *           type: string
 *         title:
 *           type: string
 *         category:
 *           type: string
 *         image:
 *           type: string
 *     Project:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - category
 *         - shortDescription
 *         - coverImage
 *         - thumbnailImage
 *         - timeline
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *         slug:
 *           type: string
 *           example: job-finder-app
 *         title:
 *           type: string
 *           example: Job Finder App
 *         category:
 *           type: string
 *           example: Mobile App
 *         shortDescription:
 *           type: string
 *         description:
 *           type: array
 *           items:
 *             type: string
 *         features:
 *           type: array
 *           items:
 *             type: string
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *         coverImage:
 *           type: string
 *         thumbnailImage:
 *           type: string
 *         gallery:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GalleryImage'
 *         client:
 *           type: string
 *         timeline:
 *           type: string
 *         role:
 *           type: string
 *         liveUrl:
 *           type: string
 *         githubUrl:
 *           type: string
 *         relatedProjects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RelatedProject'
 *         isPublished:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all published projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get("/", async (_req: Request, res: Response) => {
    try {
        const projects = await Project.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .lean()
        res.json(projects)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch projects" })
    }
})

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        const project = await Project.create(req.body)
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create project" })
    }
})

/**
 * @swagger
 * /api/projects/{slug}:
 *   get:
 *     summary: Get a project by slug
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: job-finder-app
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 */
router.get("/:slug", async (req: Request, res: Response) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug }).lean()
        if (!project) return res.status(404).json({ error: "Project not found" })
        res.json(project)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch project" })
    }
})

/**
 * @swagger
 * /api/projects/{slug}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated
 *       404:
 *         description: Project not found
 */
router.put("/:slug", async (req: Request, res: Response) => {
    try {
        const project = await Project.findOneAndUpdate(
            { slug: req.params.slug },
            { $set: req.body },
            { new: true, runValidators: true }
        ).lean()
        if (!project) return res.status(404).json({ error: "Project not found" })
        res.json(project)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update project" })
    }
})

/**
 * @swagger
 * /api/projects/{slug}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
router.delete("/:slug", async (req: Request, res: Response) => {
    try {
        const project = await Project.findOneAndDelete({ slug: req.params.slug }).lean()
        if (!project) return res.status(404).json({ error: "Project not found" })
        res.json({ message: "Project deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete project" })
    }
})

export default router
