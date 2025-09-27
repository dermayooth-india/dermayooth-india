export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/product";
import crypto from "crypto";
import { authMiddleware } from "@/lib/middleware";
import { productValidation } from "@/lib/validation";

export const GET = authMiddleware(async (req: NextRequest) => {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;

    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const query: any = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (featured) query.featured = featured === "true";

    const products = await Product.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = authMiddleware(async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { error, value } = productValidation.validate(body);

    if (error) {
      console.error("Product validation failed:", error.message);
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.message,
        },
        { status: 400 }
      );
    }

    // ensure a unique id field is present (schema requires `id`)
    if (!value.id) {
      value.id = crypto.randomUUID();
    }

    const product = new Product(value);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    // If Mongoose validation failed, return 400 with details
    if ((error as any)?.name === "ValidationError") {
      const errs = Object.values((error as any).errors || {}).map(
        (e: any) => e.message
      );
      return NextResponse.json(
        { error: "Product validation failed", details: errs },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
