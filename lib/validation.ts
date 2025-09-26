import Joi from "joi"

export const productValidation = Joi.object({
  name: Joi.string().required().min(3).max(100),
  shortDescription: Joi.string().min(3).max(200).allow("").optional(),
  longDescription: Joi.string().min(10).max(2000).allow("").optional(),
  price: Joi.string().required(),
  category: Joi.string().required(),
  status: Joi.string().valid("active", "inactive", "draft").default("active"),
  // Allow relative paths or full URLs for images
  images: Joi.array().items(Joi.string()).optional().default([]),
  benefits: Joi.array().items(Joi.string()).optional().default([]),
  ingredients: Joi.string().allow("").optional(),
  directions: Joi.string().allow("").optional(),
  specifications: Joi.object({
    size: Joi.string().allow("").optional(),
    skinType: Joi.string().allow("").optional(),
    shelfLife: Joi.string().allow("").optional(),
    madeIn: Joi.string().allow("").optional(),
  }).optional(),
  featured: Joi.boolean().default(false),
  order: Joi.number().default(0),
})
.unknown(true)

export const adminValidation = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  name: Joi.string().required().min(2).max(50),
})

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const reviewValidation = Joi.object({
  productId: Joi.string().required(),
  customerName: Joi.string().required().min(2).max(50),
  customerEmail: Joi.string().email().required(),
  rating: Joi.number().required().min(1).max(5),
  title: Joi.string().required().min(5).max(100),
  comment: Joi.string().required().min(10).max(500),
})

export const siteSettingsValidation = Joi.object({
  siteName: Joi.string().required(),
  logo: Joi.string().uri(),
  tagline: Joi.string(),
  aboutUs: Joi.string(),
  contactInfo: Joi.object({
    email: Joi.string().email(),
    phone: Joi.string(),
    whatsapp: Joi.string(),
    address: Joi.string(),
  }),
  socialMedia: Joi.object({
    instagram: Joi.string().uri().allow(""),
    facebook: Joi.string().uri().allow(""),
    twitter: Joi.string().uri().allow(""),
    linkedin: Joi.string().uri().allow(""),
  }),
  seo: Joi.object({
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    keywords: Joi.array().items(Joi.string()),
  }),
  theme: Joi.object({
    primaryColor: Joi.string(),
    secondaryColor: Joi.string(),
    accentColor: Joi.string(),
  }),
})
