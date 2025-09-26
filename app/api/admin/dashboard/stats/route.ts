import { type NextRequest, NextResponse } from "next/server"
import { adminService } from "@/lib/admin-service"
import { authMiddleware } from "@/lib/middleware"

export const dynamic = "force-dynamic"

export const GET = authMiddleware(async (request: NextRequest) => {
  try {
    const stats = await adminService.getDashboardStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
})
