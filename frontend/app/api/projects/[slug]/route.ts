import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Project from "@/models/Project"

interface RouteParams {
    params: { slug: string }
}

// GET /api/projects/:slug — Get single project
export async function GET(_request: Request, { params }: RouteParams) {
    try {
        await connectToDatabase()
        const project = await Project.findOne({ slug: params.slug }).lean()

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        return NextResponse.json(project, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch project" },
            { status: 500 }
        )
    }
}

// PUT /api/projects/:slug — Update project
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        await connectToDatabase()
        const body = await request.json()

        const project = await Project.findOneAndUpdate(
            { slug: params.slug },
            { $set: body },
            { new: true, runValidators: true }
        ).lean()

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        return NextResponse.json(project, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update project" },
            { status: 500 }
        )
    }
}

// DELETE /api/projects/:slug — Delete project
export async function DELETE(_request: Request, { params }: RouteParams) {
    try {
        await connectToDatabase()
        const project = await Project.findOneAndDelete({ slug: params.slug }).lean()

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to delete project" },
            { status: 500 }
        )
    }
}
