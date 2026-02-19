import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"

export async function GET() {
    try {
        const mongoose = await connectToDatabase()
        const dbState = mongoose.connection.readyState

        // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        const stateMap: Record<number, string> = {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting",
        }

        return NextResponse.json(
            {
                status: "ok",
                database: stateMap[dbState] || "unknown",
                timestamp: new Date().toISOString(),
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                status: "error",
                database: "disconnected",
                message: error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        )
    }
}
