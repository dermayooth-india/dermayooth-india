import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: string): string => {
  // Remove any non-numeric characters except decimal point
  const numericPrice = price.replace(/[^\d.]/g, "")
  const num = Number.parseFloat(numericPrice)

  if (isNaN(num)) return price

  return `₹${num.toLocaleString("en-IN")}`
}

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export const generateWhatsAppMessage = (data: any): string => {
  const message = Object.entries(data)
    .map(([key, value]) => `*${key}:* ${value}`)
    .join("%0A")

  return message
}

export const isValidImageType = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  return validTypes.includes(file.type)
}

export const isValidVideoType = (file: File): boolean => {
  const validTypes = ["video/mp4", "video/webm", "video/ogg"]
  return validTypes.includes(file.type)
}

export const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() || ""
}
