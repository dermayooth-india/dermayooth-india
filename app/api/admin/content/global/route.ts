import { type NextRequest, NextResponse } from "next/server"
import { adminService } from "@/lib/admin-service"
import jwt from "jsonwebtoken"

export const dynamic = "force-dynamic"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const settings = await adminService.getGlobalSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Failed to fetch global settings:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()
    const settings = await adminService.updateGlobalSettings(updates)
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Failed to update global settings:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
