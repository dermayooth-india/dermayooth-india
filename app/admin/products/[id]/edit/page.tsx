"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cloudinaryUrl } from "@/lib/cloudinary-client"

interface Product {
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
}

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [newImage, setNewImage] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        setError("Failed to fetch product")
      }
    } catch (error) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        setSuccess("Product updated successfully!")
        setTimeout(() => {
          router.push("/admin/products")
        }, 2000)
      } else {
        setError("Failed to update product")
      }
    } catch (error) {
      setError("Network error")
    } finally {
      setSaving(false)
    }
  }

  const addBenefit = () => {
    if (newBenefit.trim() && product) {
      setProduct({
        ...product,
        benefits: [...product.benefits, newBenefit.trim()],
      })
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    if (product) {
      setProduct({
        ...product,
        benefits: product.benefits.filter((_, i) => i !== index),
      })
    }
  }

  const addImage = () => {
    if (newImage.trim() && product) {
      setProduct({
        ...product,
        images: [...product.images, newImage.trim()],
      })
      setNewImage("")
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !product) return

    setUploadingImage(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await res.json()
      setProduct({ ...product, images: [...product.images, url] })
    } catch (err) {
      console.error("Image upload failed:", err)
      setError("Image upload failed")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    if (product) {
      setProduct({
        ...product,
        images: product.images.filter((_, i) => i !== index),
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>Product not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  // cloudinaryUrl is imported from `lib/cloudinary-client`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-gray-600">Update product information</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Product name, description, and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  value={product.shortDescription}
                  onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea
                  id="longDescription"
                  value={product.longDescription}
                  onChange={(e) => setProduct({ ...product, longDescription: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={product.category}
                    onValueChange={(value) => setProduct({ ...product, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Serums">Serums</SelectItem>
                      <SelectItem value="Creams">Creams</SelectItem>
                      <SelectItem value="Supplements">Supplements</SelectItem>
                      <SelectItem value="Treatments">Treatments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={product.status}
                  onValueChange={(value: "active" | "inactive" | "draft") => setProduct({ ...product, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Ingredients, directions, and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  value={product.ingredients}
                  onChange={(e) => setProduct({ ...product, ingredients: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="directions">Directions</Label>
                <Textarea
                  id="directions"
                  value={product.directions}
                  onChange={(e) => setProduct({ ...product, directions: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    value={product.specifications.size}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        specifications: { ...product.specifications, size: e.target.value },
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="skinType">Skin Type</Label>
                  <Input
                    id="skinType"
                    value={product.specifications.skinType}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        specifications: { ...product.specifications, skinType: e.target.value },
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shelfLife">Shelf Life</Label>
                  <Input
                    id="shelfLife"
                    value={product.specifications.shelfLife}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        specifications: { ...product.specifications, shelfLife: e.target.value },
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="madeIn">Made In</Label>
                  <Input
                    id="madeIn"
                    value={product.specifications.madeIn}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        specifications: { ...product.specifications, madeIn: e.target.value },
                      })
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
            <CardDescription>Key benefits of this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a benefit..."
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                />
                <Button type="button" onClick={addBenefit} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {benefit}
                    <button type="button" onClick={() => removeBenefit(index)} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Image URLs for this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add image URL..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                />
                <Button type="button" onClick={addImage} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button type="button" onClick={() => fileInputRef.current?.click()} size="sm">
                      {uploadingImage ? "Uploading..." : "Upload from device"}
                    </Button>
                    <span className="text-sm text-gray-500">or paste an image URL below</span>
                  </div>

                  {product.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <img
                        src={cloudinaryUrl(image)}
                        alt={`Product ${index + 1}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="flex-1 text-sm truncate">{image}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="min-w-32">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
