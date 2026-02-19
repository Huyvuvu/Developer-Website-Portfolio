import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"

interface RouteParams {
    params: { slug: string }
}

// GET /api/blog/:slug — Get single blog post
export async function GET(_request: Request, { params }: RouteParams) {
    try {
        await connectToDatabase()
        const post = await BlogPost.findOne({ slug: params.slug }).lean()

        if (!post) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
        }

        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch blog post" },
            { status: 500 }
        )
    }
}

// PUT /api/blog/:slug — Update blog post
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        await connectToDatabase()
        const body = await request.json()

        const post = await BlogPost.findOneAndUpdate(
            { slug: params.slug },
            { $set: body },
            { new: true, runValidators: true }
        ).lean()

        if (!post) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
        }

        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update blog post" },
            { status: 500 }
        )
    }
}

// DELETE /api/blog/:slug — Delete blog post
export async function DELETE(_request: Request, { params }: RouteParams) {
    try {
        await connectToDatabase()
        const post = await BlogPost.findOneAndDelete({ slug: params.slug }).lean()

        if (!post) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to delete blog post" },
            { status: 500 }
        )
    }
}
