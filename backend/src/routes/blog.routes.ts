import { Router, Request, Response } from "express"
import BlogPost from "../models/BlogPost"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogPost:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - excerpt
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *         slug:
 *           type: string
 *           example: my-first-blog-post
 *         title:
 *           type: string
 *           example: My First Blog Post
 *         excerpt:
 *           type: string
 *           example: A short preview of the blog post
 *         content:
 *           type: string
 *           example: Full markdown content of the blog post...
 *         coverImage:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["react", "mongodb", "nextjs"]
 *         author:
 *           type: string
 *           example: Vũ Nguyễn Quốc Huy
 *         isPublished:
 *           type: boolean
 *           default: false
 *         publishedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BlogListResponse:
 *       type: object
 *       properties:
 *         posts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlogPost'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             totalPages:
 *               type: integer
 */

/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get published blog posts (with pagination)
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by tag
 *     responses:
 *       200:
 *         description: Paginated list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogListResponse'
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const tag = req.query.tag as string | undefined
        const limit = parseInt(req.query.limit as string) || 10
        const page = parseInt(req.query.page as string) || 1
        const skip = (page - 1) * limit

        const query: Record<string, unknown> = { isPublished: true }
        if (tag) query.tags = tag

        const [posts, total] = await Promise.all([
            BlogPost.find(query).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
            BlogPost.countDocuments(query),
        ])

        res.json({
            posts,
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
        })
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch blog posts" })
    }
})

/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogPost'
 *     responses:
 *       201:
 *         description: Blog post created
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.create(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create blog post" })
    }
})

/**
 * @swagger
 * /api/blog/{slug}:
 *   get:
 *     summary: Get a blog post by slug
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post details
 *       404:
 *         description: Blog post not found
 */
router.get("/:slug", async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug }).lean()
        if (!post) return res.status(404).json({ error: "Blog post not found" })
        res.json(post)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch blog post" })
    }
})

/**
 * @swagger
 * /api/blog/{slug}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blog]
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
 *             $ref: '#/components/schemas/BlogPost'
 *     responses:
 *       200:
 *         description: Blog post updated
 *       404:
 *         description: Blog post not found
 */
router.put("/:slug", async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.findOneAndUpdate(
            { slug: req.params.slug },
            { $set: req.body },
            { new: true, runValidators: true }
        ).lean()
        if (!post) return res.status(404).json({ error: "Blog post not found" })
        res.json(post)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update blog post" })
    }
})

/**
 * @swagger
 * /api/blog/{slug}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted
 *       404:
 *         description: Blog post not found
 */
router.delete("/:slug", async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.findOneAndDelete({ slug: req.params.slug }).lean()
        if (!post) return res.status(404).json({ error: "Blog post not found" })
        res.json({ message: "Blog post deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete blog post" })
    }
})

export default router
