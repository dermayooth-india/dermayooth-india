import { NextResponse } from "next/server"
import { adminService } from "@/lib/admin-service"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const settings = await adminService.getGlobalSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Failed to fetch global settings:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
