import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive", "draft"], default: "active" },
  benefits: { type: [String], default: [] },
  ingredients: { type: String, default: "" },
  directions: { type: String, default: "" },
  specifications: {
    size: String,
    skinType: String,
    shelfLife: String,
    madeIn: String,
  },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)

import type { ObjectId } from "mongodb"

export interface Product {
  _id?: ObjectId
  id: string
  name: string
  shortDescription: string
  longDescription: string
  price: string
  category: string
  status: "active" | "inactive" | "draft"
  benefits: string[]
  ingredients: string
  directions: string
  specifications: {
    size: string
    skinType: string
    shelfLife: string
    madeIn: string
  }
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export interface GlobalSettings {
  _id?: ObjectId
  logo: string
  siteName: string
  tagline: string
  homePageContent: {
    heroTitle: string
    heroSubtitle: string
    featuresTitle: string
    featuresSubtitle: string
    productsTitle: string
    productsSubtitle: string
    testimonialsTitle: string
  }
  aboutPageContent: {
    title: string
    content: string
    story: string
    philosophy: string
    products: string
    quality: string
  }
  contactInfo: {
    phone: string
    email: string
    address: string
    instagram: string
  }
  footer: {
    description: string
    copyright: string
  }
  updatedAt: Date
}

export interface Video {
  _id?: ObjectId
  id: string
  title: string
  type: "file" | "youtube"
  url: string
  location: "homepage" | "about" | "products"
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id?: ObjectId
  id: string
  productId: string
  customerName: string
  rating: number
  comment: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

// Model is exported as default above; avoid redefining it to prevent OverwriteModelError
