import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/product"
import { authMiddleware } from "@/lib/middleware"
import { productValidation } from "@/lib/validation"

export const GET = authMiddleware(async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB()

    // Products use a separate string `id` field (UUID). Query by that first.
    const product = await Product.findOne({ id: params.id })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})

export const PUT = authMiddleware(async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB()

    const body = await req.json()
    const { error, value } = productValidation.validate(body)

    if (error) {
      return NextResponse.json(
        { error: "Validation error", details: error.details.map((d) => d.message) },
        { status: 400 },
      )
    }

    // Update by the string `id` field (UUID)
    const product = await Product.findOneAndUpdate(
      { id: params.id },
      { ...value, updatedAt: new Date() },
      { new: true, runValidators: true },
    )

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})

export const DELETE = authMiddleware(async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB()

    const product = await Product.findOneAndDelete({ id: params.id })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
