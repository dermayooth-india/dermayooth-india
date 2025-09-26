import mongoose from "mongoose"

const GlobalSettingsSchema = new mongoose.Schema({
  logo: { type: String, default: "/dermayooth-logo.png" },
  siteName: { type: String, default: "DERMAYOOTH" },
  tagline: { type: String, default: "Premium aesthetic solutions for your skin" },
  homePageContent: {
    heroTitle: String,
    heroSubtitle: String,
    featuresTitle: String,
    featuresSubtitle: String,
    productsTitle: String,
    productsSubtitle: String,
    testimonialsTitle: String,
  },
  aboutPageContent: {
    title: String,
    content: String,
    story: String,
    philosophy: String,
    products: String,
    quality: String,
  },
  contactInfo: {
    phone: String,
    email: String,
    address: String,
    instagram: String,
  },
  footer: {
    description: String,
    copyright: String,
  },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.GlobalSettings || mongoose.model("GlobalSettings", GlobalSettingsSchema)
