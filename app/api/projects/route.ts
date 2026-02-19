import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Project from "@/models/Project"

// GET /api/projects — List all projects
export async function GET() {
    try {
        await connectToDatabase()
        const projects = await Project.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json(projects, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch projects" },
            { status: 500 }
        )
    }
}

// POST /api/projects — Create a new project
export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const body = await request.json()

        const project = await Project.create(body)
        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to create project" },
            { status: 500 }
        )
    }
}
