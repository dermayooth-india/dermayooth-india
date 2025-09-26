import connectDB from "../lib/mongodb"
import Admin from "../lib/models/Admin"
import Product from "../lib/models/product"
import SiteSettings from "../lib/models/SiteSettings"
import { hashPassword } from "../lib/auth"

async function initializeDatabase() {
  try {
    await connectDB()
    console.log("Connected to MongoDB")

    // Create default admin user
    const existingAdmin = await Admin.findOne({ email: "admin@dermayooth.com" })
    // const existingAdmin = await Admin.findOne({ email: "dermayooth@gmail.com" })
    if (!existingAdmin) {
      const hashedPassword = await hashPassword("DermaYooth2024!")
      const admin = new Admin({
        username: "admin",
        email: "admin@dermayooth.com",
        passwordHash: hashedPassword,
        name: "Admin User",
        role: "admin",
      })
      await admin.save()
      console.log("Default admin user created")
    }

    // Create default site settings
    const existingSettings = await SiteSettings.findOne()
    if (!existingSettings) {
      const settings = new SiteSettings({
        siteName: "DERMAYOOTH",
        logo: "/logo.png",
        tagline: "Premium aesthetic solutions for your skin",
        aboutUs:
          "DERMAYOOTH is a leading provider of premium skincare solutions designed with advanced formulations and high-quality ingredients.",
        contactInfo: {
          email: "info@dermayooth.com",
          phone: "+91 79 7715 0012",
          whatsapp: "+917977150012",
          address: "India",
        },
        socialMedia: {
          instagram: "https://instagram.com/dermayooth",
        },
        seo: {
          metaTitle: "DERMAYOOTH - Premium Skincare Solutions",
          metaDescription:
            "Discover premium range of skincare products designed with advanced formulations and high-quality ingredients.",
          keywords: ["skincare", "beauty", "cosmetics", "dermatology", "premium skincare"],
        },
      })
      await settings.save()
      console.log("Default site settings created")
    }

    // Create sample products
    const existingProducts = await Product.countDocuments()
    if (existingProducts === 0) {
      const sampleProducts = [
        {
          name: "Advanced Radiant Day Cream",
          shortDescription: "Brightening day cream with SPF protection for radiant, youthful skin.",
          longDescription:
            "Our Advanced Radiant Day Cream is formulated with cutting-edge ingredients to brighten, protect, and nourish your skin throughout the day. Enriched with vitamin C, hyaluronic acid, and broad-spectrum SPF, this luxurious cream helps reduce dark spots, fine lines, and environmental damage while providing long-lasting hydration.",
          price: "₹1,499",
          category: "Face Care",
          status: "active",
          images: ["/placeholder.svg?height=400&width=400&text=Day+Cream"],
          benefits: [
            "Brightens and evens skin tone",
            "Provides SPF 30 protection",
            "Reduces appearance of fine lines",
            "Long-lasting hydration",
            "Suitable for all skin types",
          ],
          ingredients: "Aqua, Glycerine, Vitamin C, Hyaluronic Acid, Titanium Dioxide, Zinc Oxide, Natural Extracts",
          directions:
            "Apply evenly to clean face and neck every morning. Massage gently until absorbed. Use daily for best results.",
          specifications: {
            size: "50ml",
            skinType: "All Skin Types",
            shelfLife: "24 Months",
            madeIn: "India",
          },
          featured: true,
          order: 1,
        },
        {
          name: "Intensive Night Repair Serum",
          shortDescription: "Powerful anti-aging serum for overnight skin renewal and repair.",
          longDescription:
            "Transform your skin overnight with our Intensive Night Repair Serum. This potent formula combines retinol, peptides, and botanical extracts to accelerate cell turnover, reduce signs of aging, and restore skin's natural radiance while you sleep.",
          price: "₹2,299",
          category: "Serums",
          status: "active",
          images: ["/placeholder.svg?height=400&width=400&text=Night+Serum"],
          benefits: [
            "Accelerates skin renewal",
            "Reduces fine lines and wrinkles",
            "Improves skin texture",
            "Boosts collagen production",
            "Restores radiance",
          ],
          ingredients: "Aqua, Retinol, Peptide Complex, Botanical Extracts, Hyaluronic Acid, Vitamin E",
          directions: "Apply 2-3 drops to clean face before bedtime. Avoid eye area. Use sunscreen during the day.",
          specifications: {
            size: "30ml",
            skinType: "All Skin Types",
            shelfLife: "18 Months",
            madeIn: "India",
          },
          featured: true,
          order: 2,
        },
        {
          name: "Hydrating Vitamin C Cleanser",
          shortDescription: "Gentle yet effective cleanser with vitamin C for bright, clean skin.",
          longDescription:
            "Start your skincare routine with our Hydrating Vitamin C Cleanser. This gentle formula removes impurities while delivering brightening vitamin C and hydrating ingredients to leave your skin clean, soft, and radiant.",
          price: "₹899",
          category: "Cleansers",
          status: "active",
          images: ["/placeholder.svg?height=400&width=400&text=Vitamin+C+Cleanser"],
          benefits: [
            "Gently removes impurities",
            "Brightens skin tone",
            "Maintains skin hydration",
            "Prepares skin for treatments",
            "Suitable for daily use",
          ],
          ingredients: "Aqua, Vitamin C, Gentle Surfactants, Glycerine, Natural Extracts, Aloe Vera",
          directions: "Apply to damp skin, massage gently, and rinse with lukewarm water. Use morning and evening.",
          specifications: {
            size: "150ml",
            skinType: "All Skin Types",
            shelfLife: "24 Months",
            madeIn: "India",
          },
          featured: false,
          order: 3,
        },
      ]

      for (const productData of sampleProducts) {
        const product = new Product(productData)
        await product.save()
      }
      console.log("Sample products created")
    }

    console.log("Database initialization completed successfully!")
  } catch (error) {
    console.error("Database initialization error:", error)
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase().then(() => process.exit(0))
}

export default initializeDatabase
