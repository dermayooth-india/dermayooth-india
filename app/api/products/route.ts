import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/product"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const url = new URL(req.url)
    const category = url.searchParams.get("category")
    const featured = url.searchParams.get("featured")
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")

    const query: any = { status: "active" } //My Product Is In Draft

    if (category) query.category = category
    if (featured) query.featured = featured === "true"

    const products = await Product.find(query).sort({ featured: -1, order: 1, createdAt: -1 }).limit(limit)
    // const products = await Product.find()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
