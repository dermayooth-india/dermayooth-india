import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // In a stateless JWT system, logout is handled client-side by removing the token
  // This endpoint exists for consistency and future enhancements
  return NextResponse.json({ message: "Logged out successfully" })
}
