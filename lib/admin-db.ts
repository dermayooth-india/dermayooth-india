// Simulated database for admin functionality
// In production, replace with actual database operations

interface Product {
  id: string
  name: string
  shortDescription: string
  longDescription: string
  price: string
  category: string
  status: "active" | "draft" | "archived"
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
  createdAt: string
  updatedAt: string
}

interface GlobalSettings {
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
}

interface Video {
  id: string
  title: string
  type: "file" | "youtube"
  url: string
  location: "homepage" | "about" | "products"
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

interface Review {
  id: string
  productId: string
  customerName: string
  rating: number
  comment: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
}

// Initialize with existing products
import { products as initialProducts } from "@/data/products"

class AdminDatabase {
  private products: Product[] = []
  private globalSettings: GlobalSettings
  private videos: Video[] = []
  private reviews: Review[] = []

  constructor() {
    // Initialize with existing products
    this.products = initialProducts.map((p) => ({
      ...p,
      status: "active" as const,
      ingredients:
        p.id === "melayooth-serum"
          ? "Aqua, Glycerine, Polyacrylamide, Kojic Acid Dipalmitate, Retinol, Alpha-arbutin, Vitamin E"
          : "Premium skincare ingredients - contact for full ingredient list",
      directions: "Apply to clean skin. Use as directed. Patch test recommended.",
      specifications: {
        size: "30gm",
        skinType: "All Skin Types",
        shelfLife: "24 Months",
        madeIn: "India",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    // Initialize global settings
    this.globalSettings = {
      logo: "/dermayooth-logo.png",
      siteName: "DERMAYOOTH",
      tagline: "Premium aesthetic solutions for your skin",
      homePageContent: {
        heroTitle: "DERMAYOOTH",
        heroSubtitle:
          "Discover range of advanced skincare products designed to revitalize, rejuvenate, and transform your skin.",
        featuresTitle: "Why Choose DERMAYOOTH",
        featuresSubtitle: "",
        productsTitle: "Featured Products",
        productsSubtitle:
          "Discover our most popular skincare solutions designed to address a variety of skin concerns.",
        testimonialsTitle: "What Our Customers Say",
      },
      aboutPageContent: {
        title: "About DERMAYOOTH",
        content:
          "DERMAYOOTH is a premium aesthetic solution provider from India, dedicated to creating innovative and effective skincare products.",
        story: "Founded with a passion for combining traditional skincare wisdom with modern scientific advancements.",
        philosophy: "We believe that beautiful skin is healthy skin.",
        products: "Our product range includes specialized serums, creams, supplements, and treatments.",
        quality: "All DERMAYOOTH products undergo rigorous testing to ensure quality and effectiveness.",
      },
      contactInfo: {
        phone: "+91 79 7715 0012",
        email: "info@dermayooth.com",
        address: "Mumbai, Maharashtra, India",
        instagram: "https://instagram.com/dermayooth",
      },
      footer: {
        description:
          "Premium aesthetic solutions for your skin. Dermatologist recommended products for all your skincare needs.",
        copyright: "© 2024 DERMAYOOTH. All rights reserved.",
      },
    }

    // Initialize sample videos
    this.videos = [
      {
        id: "video-1",
        title: "Homepage Hero Video",
        type: "file",
        url: "/hero-video.mp4",
        location: "homepage",
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    // Initialize sample reviews
    this.reviews = [
      {
        id: "review-1",
        productId: "melayooth-serum",
        customerName: "Priya M.",
        rating: 5,
        comment: "This product has completely transformed my skin!",
        status: "approved",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "review-2",
        productId: "facecool-cream",
        customerName: "Rahul S.",
        rating: 4,
        comment: "Very good product. Noticed improvement in skin texture.",
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  // Product methods
  getProducts(): Product[] {
    return this.products
  }

  getProduct(id: string): Product | undefined {
    return this.products.find((p) => p.id === id)
  }

  createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const newProduct: Product = {
      ...productData,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.products.push(newProduct)
    return newProduct
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.products[index]
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    return true
  }

  // Global settings methods
  getGlobalSettings(): GlobalSettings {
    return this.globalSettings
  }

  updateGlobalSettings(updates: Partial<GlobalSettings>): GlobalSettings {
    this.globalSettings = { ...this.globalSettings, ...updates }
    return this.globalSettings
  }

  // Video methods
  getVideos(): Video[] {
    return this.videos
  }

  createVideo(videoData: Omit<Video, "id" | "createdAt" | "updatedAt">): Video {
    const newVideo: Video = {
      ...videoData,
      id: `video-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.videos.push(newVideo)
    return newVideo
  }

  deleteVideo(id: string): boolean {
    const index = this.videos.findIndex((v) => v.id === id)
    if (index === -1) return false

    this.videos.splice(index, 1)
    return true
  }

  // Review methods
  getReviews(): Review[] {
    return this.reviews
  }

  updateReview(id: string, updates: Partial<Review>): Review | null {
    const index = this.reviews.findIndex((r) => r.id === id)
    if (index === -1) return null

    this.reviews[index] = {
      ...this.reviews[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.reviews[index]
  }

  deleteReview(id: string): boolean {
    const index = this.reviews.findIndex((r) => r.id === id)
    if (index === -1) return false

    this.reviews.splice(index, 1)
    return true
  }

  // Dashboard stats
  getDashboardStats() {
    return {
      totalProducts: this.products.length,
      totalVideos: this.videos.filter((v) => v.status === "active").length,
      totalReviews: this.reviews.length,
      pendingReviews: this.reviews.filter((r) => r.status === "pending").length,
      monthlyViews: Math.floor(Math.random() * 20000) + 10000,
      recentActivity: [
        {
          action: `Updated product '${this.products[0]?.name || "Product"}'`,
          type: "Product",
          timestamp: "2 hours ago",
        },
        {
          action: "Added new video to homepage",
          type: "Video",
          timestamp: "5 hours ago",
        },
        {
          action: "Approved customer review",
          type: "Review",
          timestamp: "1 day ago",
        },
      ],
    }
  }
}

// Create singleton instance
export const adminDB = new AdminDatabase()

// Export types
export type { Product, GlobalSettings, Video, Review }
