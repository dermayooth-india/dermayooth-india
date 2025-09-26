import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/product"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
  // products use a string `id` (UUID) field — query by that instead of _id
  const product = await Product.findOne({id : params.id})
    if (!product || product.status !== "active") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
