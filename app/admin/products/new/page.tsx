"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Save, ArrowLeft, ImageIcon } from "lucide-react"

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    category: "",
    status: "draft",
    benefits: [""],
    ingredients: "",
    directions: "",
    specifications: {
      size: "",
      skinType: "",
      shelfLife: "",
      madeIn: "India",
    },
  })
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData((prev) => ({
      ...prev,
      benefits: newBenefits,
    }))
  }

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }))
  }

  const removeBenefit = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      benefits: newBenefits,
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result])
        setImageFiles((prev) => [...prev, file])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First upload images
      const uploadedImages = []
      for (const file of imageFiles) {
        const formData = new FormData()
        formData.append("image", file)

        const uploadResponse = await fetch("/api/admin/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: formData,
        })

        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json()
          uploadedImages.push(url)
        }
      }

      // Then create product
      const productData = {
        ...formData,
        images: uploadedImages,
        benefits: formData.benefits.filter((benefit) => benefit.trim() !== ""),
      }

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        router.push("/admin/products")
      } else {
        throw new Error("Failed to create product")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Failed to create product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bell-mt">Add New Product</h1>
            <p className="text-gray-600 bookman">Create a new product for your catalog</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Textarea
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      placeholder="Brief product description"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="longDescription">Long Description *</Label>
                    <Textarea
                      id="longDescription"
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleInputChange}
                      placeholder="Detailed product description"
                      rows={6}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Product Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add Image</span>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Upload up to 5 images. First image will be used as the main product image.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        placeholder="Enter product benefit"
                        className="flex-1"
                      />
                      {formData.benefits.length > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => removeBenefit(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addBenefit}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Benefit
                  </Button>
                </CardContent>
              </Card>

              {/* Ingredients & Directions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients & Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                      id="ingredients"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      placeholder="List all ingredients"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="directions">Directions for Use</Label>
                    <Textarea
                      id="directions"
                      name="directions"
                      value={formData.directions}
                      onChange={handleInputChange}
                      placeholder="How to use this product"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Product Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="₹1,499"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Face Care">Face Care</SelectItem>
                        <SelectItem value="Hair Care">Hair Care</SelectItem>
                        <SelectItem value="Sun Care">Sun Care</SelectItem>
                        <SelectItem value="Supplements">Supplements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="specifications.size">Size</Label>
                    <Input
                      id="specifications.size"
                      name="specifications.size"
                      value={formData.specifications.size}
                      onChange={handleInputChange}
                      placeholder="30gm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specifications.skinType">Skin Type</Label>
                    <Input
                      id="specifications.skinType"
                      name="specifications.skinType"
                      value={formData.specifications.skinType}
                      onChange={handleInputChange}
                      placeholder="All Skin Types"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specifications.shelfLife">Shelf Life</Label>
                    <Input
                      id="specifications.shelfLife"
                      name="specifications.shelfLife"
                      value={formData.specifications.shelfLife}
                      onChange={handleInputChange}
                      placeholder="24 Months"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specifications.madeIn">Made In</Label>
                    <Input
                      id="specifications.madeIn"
                      name="specifications.madeIn"
                      value={formData.specifications.madeIn}
                      onChange={handleInputChange}
                      placeholder="India"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Creating..." : "Create Product"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
