import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Admin from "@/lib/models/Admin"
import { comparePassword, generateToken } from "@/lib/auth"
import { loginValidation } from "@/lib/validation"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { error, value } = loginValidation.validate(body)

    if (error) {
      return NextResponse.json(
        { error: "Validation error", details: error.details.map((d) => d.message) },
        { status: 400 },
      )
    }

    const { email, password } = value

    // Find admin by email
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return NextResponse.json({ error: "Admin Not Found Fuck You" }, { status: 401 })
    }

    // Check password
    const isValidPassword = await comparePassword(password, admin.passwordHash)
    // const isValidPassword = true;
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate JWT token
    const token = generateToken({
      id: admin._id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    })

    return NextResponse.json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
