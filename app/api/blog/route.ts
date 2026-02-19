import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"

// GET /api/blog — List published blog posts
export async function GET(request: Request) {
    try {
        await connectToDatabase()

        const { searchParams } = new URL(request.url)
        const tag = searchParams.get("tag")
        const limit = parseInt(searchParams.get("limit") || "10")
        const page = parseInt(searchParams.get("page") || "1")
        const skip = (page - 1) * limit

        // Build query
        const query: Record<string, unknown> = { isPublished: true }
        if (tag) {
            query.tags = tag
        }

        const [posts, total] = await Promise.all([
            BlogPost.find(query)
                .sort({ publishedAt: -1, createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            BlogPost.countDocuments(query),
        ])

        return NextResponse.json(
            {
                posts,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch blog posts" },
            { status: 500 }
        )
    }
}

// POST /api/blog — Create a new blog post
export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const body = await request.json()

        const post = await BlogPost.create(body)
        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to create blog post" },
            { status: 500 }
        )
    }
}
