import { type NextRequest, NextResponse } from "next/server"
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

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("video") as File

    if (!file) {
      return NextResponse.json({ message: "No video file provided" }, { status: 400 })
    }

    // In a real implementation, you would upload to a cloud storage service
    // For now, we'll return a placeholder URL
    const url = `/uploads/videos/${Date.now()}-${file.name}`

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Failed to upload video:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
