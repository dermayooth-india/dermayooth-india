import mongoose from "mongoose"

const SiteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: "DERMAYOOTH",
  },
  logo: {
    type: String,
    default: "/logo.png",
  },
  tagline: {
    type: String,
    default: "Premium aesthetic solutions for your skin",
  },
  aboutUs: {
    type: String,
    default: "DERMAYOOTH is a leading provider of premium skincare solutions...",
  },
  contactInfo: {
    email: {
      type: String,
      default: "info@dermayooth.com",
    },
    phone: {
      type: String,
      default: "+91 79 7715 0012",
    },
    whatsapp: {
      type: String,
      default: "+917977150012",
    },
    address: {
      type: String,
      default: "India",
    },
  },
  socialMedia: {
    instagram: {
      type: String,
      default: "https://instagram.com/dermayooth",
    },
    facebook: String,
    twitter: String,
    linkedin: String,
  },
  seo: {
    metaTitle: {
      type: String,
      default: "DERMAYOOTH - Premium Skincare Solutions",
    },
    metaDescription: {
      type: String,
      default:
        "Discover premium range of skincare products designed with advanced formulations and high-quality ingredients.",
    },
    keywords: [
      {
        type: String,
      },
    ],
  },
  theme: {
    primaryColor: {
      type: String,
      default: "#000000",
    },
    secondaryColor: {
      type: String,
      default: "#ffffff",
    },
    accentColor: {
      type: String,
      default: "#f5f5f5",
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

SiteSettingsSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema)
