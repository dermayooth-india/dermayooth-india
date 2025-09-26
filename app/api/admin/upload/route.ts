import { type NextRequest, NextResponse } from "next/server"
import { authMiddleware } from "@/lib/middleware"
import { uploadImage, uploadVideo } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

export const POST = authMiddleware(async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File | null

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    const contentType = file.type || ""
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let url: string
    if (contentType.startsWith("video/")) {
      url = await uploadVideo(buffer)
    } else {
      url = await uploadImage(buffer)
    }

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error("Failed to upload file:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
})
