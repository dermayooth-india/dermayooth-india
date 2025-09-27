export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/product";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;

    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const query: any = { status: "active" }; //My Product Is In Draft

    if (category) query.category = category;
    if (featured) query.featured = featured === "true";

    const products = await Product.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(limit);
    // const products = await Product.find()

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
