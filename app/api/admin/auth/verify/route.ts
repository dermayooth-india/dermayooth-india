import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractTokenFromHeader } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import Admin from "@/lib/models/Admin"

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      return NextResponse.json({ error: "Access denied. No token provided." }, { status: 401 })
    }

    let decoded
    try {
      decoded = verifyToken(token)
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    await connectDB()
    const admin = await Admin.findById(decoded.id).select("-passwordHash")

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: admin._id,
      email: admin.email,
      username: admin.username,
      name: admin.name,
      role: admin.role,
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
