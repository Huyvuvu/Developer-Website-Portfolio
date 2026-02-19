import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Profile from "@/models/Profile"

// GET /api/profile — Get profile
export async function GET() {
    try {
        await connectToDatabase()
        const profile = await Profile.findOne().lean()

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 })
        }

        return NextResponse.json(profile, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch profile" },
            { status: 500 }
        )
    }
}

// PUT /api/profile — Update profile (upsert)
export async function PUT(request: Request) {
    try {
        await connectToDatabase()
        const body = await request.json()

        const profile = await Profile.findOneAndUpdate(
            {},
            { $set: body },
            { new: true, upsert: true, runValidators: true }
        ).lean()

        return NextResponse.json(profile, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update profile" },
            { status: 500 }
        )
    }
}
