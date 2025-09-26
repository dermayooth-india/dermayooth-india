import connectDB from "./mongodb"
import ProductModel from "./models/product"
import GlobalSettingsModel from "./models/GlobalSettings"
import VideoModel from "./models/Video"
import ReviewModel from "./models/Review"
import type { Product, GlobalSettings, Video, Review } from "./models/product"

export class AdminService {
  // Using Mongoose models, connectDB ensures mongoose is connected
  private async ensureConnection() {
    await connectDB()
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    await this.ensureConnection()
  return (await ProductModel.find({}).lean()) as unknown as Product[]
  }

  async getProduct(id: string): Promise<Product | null> {
    await this.ensureConnection()
  return (await ProductModel.findOne({ id }).lean()) as unknown as Product | null
  }

  async createProduct(productData: Omit<Product, "_id" | "id" | "createdAt" | "updatedAt">): Promise<Product> {
    await this.ensureConnection()
    const newProduct = new ProductModel({
      ...productData,
      id: `product-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  await newProduct.save()
  return newProduct.toObject() as unknown as Product
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await this.ensureConnection()
  return (await ProductModel.findOneAndUpdate({ id }, { ...updates, updatedAt: new Date() }, { new: true }).lean()) as unknown as Product | null
  }

  async deleteProduct(id: string): Promise<boolean> {
    await this.ensureConnection()
    const result = await ProductModel.deleteOne({ id })
    return result.deletedCount > 0
  }

  // Global settings methods
  async getGlobalSettings(): Promise<GlobalSettings | null> {
    await this.ensureConnection()
  let settings = (await GlobalSettingsModel.findOne({}).lean()) as unknown as GlobalSettings | null

    if (!settings) {
      const defaultSettings = new GlobalSettingsModel({
        logo: "/dermayooth-logo.png",
        siteName: "DERMAYOOTH",
        tagline: "Premium aesthetic solutions for your skin",
        homePageContent: {
          heroTitle: "DERMAYOOTH",
          heroSubtitle: "Discover range of advanced skincare products designed to revitalize, rejuvenate, and transform your skin.",
          featuresTitle: "Why Choose DERMAYOOTH",
          featuresSubtitle: "",
          productsTitle: "Featured Products",
          productsSubtitle: "Discover our most popular skincare solutions designed to address a variety of skin concerns.",
          testimonialsTitle: "What Our Customers Say",
        },
        aboutPageContent: {
          title: "About DERMAYOOTH",
          content: "DERMAYOOTH is a premium aesthetic solution provider from India, dedicated to creating innovative and effective skincare products.",
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
          description: "Premium aesthetic solutions for your skin. Dermatologist recommended products for all your skincare needs.",
          copyright: "© 2024 DERMAYOOTH. All rights reserved.",
        },
        updatedAt: new Date(),
      })
  await defaultSettings.save()
  settings = defaultSettings.toObject() as unknown as GlobalSettings
    }

    return settings
  }

  async updateGlobalSettings(updates: Partial<GlobalSettings>): Promise<GlobalSettings | null> {
    await this.ensureConnection()
    const result = (await GlobalSettingsModel.findOneAndUpdate(
      {},
      { ...updates, updatedAt: new Date() },
      { new: true, upsert: true }
    ).lean()) as unknown as GlobalSettings | null
    return result
  }

  // Video methods
  async getVideos(): Promise<Video[]> {
    await this.ensureConnection()
  return (await VideoModel.find({}).lean()) as unknown as Video[]
  }

  async createVideo(videoData: Omit<Video, "_id" | "id" | "createdAt" | "updatedAt">): Promise<Video> {
    await this.ensureConnection()
    const newVideo = new VideoModel({
      ...videoData,
      id: `video-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  await newVideo.save()
  return newVideo.toObject() as unknown as Video
  }

  async deleteVideo(id: string): Promise<boolean> {
    await this.ensureConnection()
    const result = await VideoModel.deleteOne({ id })
    return result.deletedCount > 0
  }

  // Review methods
  async getReviews(): Promise<Review[]> {
    await this.ensureConnection()
  return (await ReviewModel.find({}).lean()) as unknown as Review[]
  }

  async updateReview(id: string, updates: Partial<Review>): Promise<Review | null> {
    await this.ensureConnection()
  return (await ReviewModel.findOneAndUpdate({ id }, { ...updates, updatedAt: new Date() }, { new: true }).lean()) as unknown as Review | null
  }

  async deleteReview(id: string): Promise<boolean> {
    await this.ensureConnection()
    const result = await ReviewModel.deleteOne({ id })
    return result.deletedCount > 0
  }

  // Dashboard stats
  async getDashboardStats() {
    await this.ensureConnection()
    const [totalProducts, totalVideos, totalReviews, pendingReviews] = await Promise.all([
      ProductModel.countDocuments({}),
      VideoModel.countDocuments({ status: "active" }),
      ReviewModel.countDocuments({}),
      ReviewModel.countDocuments({ status: "pending" }),
    ])

    return {
      totalProducts,
      totalVideos,
      totalReviews,
      pendingReviews,
      monthlyViews: Math.floor(Math.random() * 20000) + 10000,
      recentActivity: [
        {
          action: "Updated product settings",
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

  // Initialize database with sample data
  async initializeDatabase() {
    await this.ensureConnection()

    // Check if products exist
    const productCount = await ProductModel.countDocuments({})

    if (productCount === 0) {
      // Insert sample products
      const sampleProducts = [
        {
          id: "melayooth-serum",
          name: "MELAYOOTH Ultra Plus Face Serum",
          shortDescription: "Advanced anti-aging serum with retinol and kojic acid",
          longDescription:
            "MELAYOOTH Ultra Plus Face Serum is a revolutionary skincare solution that combines the power of retinol, kojic acid, and alpha-arbutin to deliver visible results. This advanced formula helps reduce fine lines, dark spots, and uneven skin tone while promoting cellular renewal.",
          price: "₹2,499",
          category: "Serums",
          status: "active" as const,
          benefits: [
            "Reduces fine lines and wrinkles",
            "Lightens dark spots and pigmentation",
            "Improves skin texture and tone",
            "Promotes cellular renewal",
            "Provides deep hydration",
          ],
          ingredients: "Aqua, Glycerine, Polyacrylamide, Kojic Acid Dipalmitate, Retinol, Alpha-arbutin, Vitamin E",
          directions:
            "Apply 2-3 drops to clean skin in the evening. Use sunscreen during the day. Patch test recommended.",
          specifications: {
            size: "30gm",
            skinType: "All Skin Types",
            shelfLife: "24 Months",
            madeIn: "India",
          },
          images: ["/product1.png", "/product1-angle.png", "/product1-box.png", "/product1-detail.png"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "facecool-cream",
          name: "FACECOOL Brightening Cream",
          shortDescription: "Intensive brightening cream for radiant skin",
          longDescription:
            "FACECOOL Brightening Cream is specially formulated to enhance your skin's natural radiance. This luxurious cream combines powerful brightening agents with nourishing ingredients to give you a luminous, even-toned complexion.",
          price: "₹1,899",
          category: "Creams",
          status: "active" as const,
          benefits: [
            "Brightens and evens skin tone",
            "Reduces appearance of dark spots",
            "Provides intense hydration",
            "Improves skin radiance",
            "Suitable for daily use",
          ],
          ingredients: "Premium skincare ingredients - contact for full ingredient list",
          directions: "Apply to clean skin twice daily. Massage gently until absorbed. Use sunscreen during the day.",
          specifications: {
            size: "50gm",
            skinType: "All Skin Types",
            shelfLife: "24 Months",
            madeIn: "India",
          },
          images: ["/product2.png", "/product2-angle.png", "/product2-box.png", "/product2-detail.png"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dermayooth-supplement",
          name: "DERMAYOOTH Skin Supplement",
          shortDescription: "Advanced nutritional support for healthy skin",
          longDescription:
            "DERMAYOOTH Skin Supplement provides essential nutrients that support skin health from within. This carefully formulated supplement contains vitamins, minerals, and antioxidants that promote collagen production and protect against environmental damage.",
          price: "₹1,299",
          category: "Supplements",
          status: "active" as const,
          benefits: [
            "Supports collagen production",
            "Provides antioxidant protection",
            "Promotes skin elasticity",
            "Supports overall skin health",
            "Easy to consume capsules",
          ],
          ingredients: "Premium nutritional ingredients - contact for full ingredient list",
          directions:
            "Take 1-2 capsules daily with water, preferably with meals. Consult healthcare provider before use.",
          specifications: {
            size: "60 Capsules",
            skinType: "All Skin Types",
            shelfLife: "24 Months",
            madeIn: "India",
          },
          images: ["/product3.png", "/product3-box.png", "/product3-detail.png"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      await ProductModel.insertMany(sampleProducts)
    }

    // Initialize sample videos if none exist
    const videoCount = await VideoModel.countDocuments({})
    if (videoCount === 0) {
      const sampleVideos = [
        {
          id: "video-1",
          title: "Homepage Hero Video",
          type: "file" as const,
          url: "/hero-video.mp4",
          location: "homepage" as const,
          status: "active" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      await VideoModel.insertMany(sampleVideos)
    }

    // Initialize sample reviews if none exist
    const reviewCount = await ReviewModel.countDocuments({})
    if (reviewCount === 0) {
      const sampleReviews = [
        {
          id: "review-1",
          productId: "melayooth-serum",
          customerName: "Priya M.",
          rating: 5,
          comment: "This product has completely transformed my skin! Highly recommended.",
          status: "approved" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "review-2",
          productId: "facecool-cream",
          customerName: "Rahul S.",
          rating: 4,
          comment: "Very good product. Noticed improvement in skin texture within weeks.",
          status: "pending" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

  await ReviewModel.insertMany(sampleReviews)
    }
  }
}

export const adminService = new AdminService()
