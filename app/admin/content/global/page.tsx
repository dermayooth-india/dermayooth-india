"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save } from "lucide-react"

export default function GlobalContentPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    logo: "",
    siteName: "DERMAYOOTH",
    tagline: "Premium aesthetic solutions for your skin",
    homePageContent: {
      heroTitle: "DERMAYOOTH",
      heroSubtitle:
        "Discover range of advanced skincare products designed to revitalize, rejuvenate, and transform your skin.",
      featuresTitle: "Why Choose DERMAYOOTH",
      featuresSubtitle: "",
      productsTitle: "Featured Products",
      productsSubtitle: "Discover our most popular skincare solutions designed to address a variety of skin concerns.",
      testimonialsTitle: "What Our Customers Say",
    },
    aboutPageContent: {
      title: "About DERMAYOOTH",
      content: "",
      story: "",
      philosophy: "",
      products: "",
      quality: "",
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
  })

  useEffect(() => {
    fetchGlobalSettings()
  }, [])

  const fetchGlobalSettings = async () => {
    try {
      const response = await fetch("/api/admin/content/global", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error("Failed to fetch global settings:", error)
    }
  }

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: typeof prev[section] === "object" ? { ...prev[section], [field]: value } : value,
    }))
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setSettings((prev) => ({ ...prev, logo: url }))
      }
    } catch (error) {
      console.error("Failed to upload logo:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/content/global", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert("Settings saved successfully!")
      } else {
        throw new Error("Failed to save settings")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Failed to save settings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bell-mt">Global Settings</h1>
            <p className="text-gray-600 bookman">Manage site-wide content and settings</p>
          </div>
          <Button onClick={handleSave} disabled={loading} className="bg-black hover:bg-gray-800">
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="logo">Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    {settings.logo && (
                      <img src={settings.logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
                    )}
                    <label className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </div>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                    placeholder="DERMAYOOTH"
                  />
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={settings.tagline}
                    onChange={(e) => setSettings((prev) => ({ ...prev, tagline: e.target.value }))}
                    placeholder="Premium aesthetic solutions for your skin"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homepage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={settings.homePageContent.heroTitle}
                    onChange={(e) => handleInputChange("homePageContent", "heroTitle", e.target.value)}
                    placeholder="DERMAYOOTH"
                  />
                </div>

                <div>
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={settings.homePageContent.heroSubtitle}
                    onChange={(e) => handleInputChange("homePageContent", "heroSubtitle", e.target.value)}
                    placeholder="Discover range of advanced skincare products..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="featuresTitle">Features Title</Label>
                  <Input
                    id="featuresTitle"
                    value={settings.homePageContent.featuresTitle}
                    onChange={(e) => handleInputChange("homePageContent", "featuresTitle", e.target.value)}
                    placeholder="Why Choose DERMAYOOTH"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Products Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productsTitle">Products Title</Label>
                  <Input
                    id="productsTitle"
                    value={settings.homePageContent.productsTitle}
                    onChange={(e) => handleInputChange("homePageContent", "productsTitle", e.target.value)}
                    placeholder="Featured Products"
                  />
                </div>

                <div>
                  <Label htmlFor="productsSubtitle">Products Subtitle</Label>
                  <Textarea
                    id="productsSubtitle"
                    value={settings.homePageContent.productsSubtitle}
                    onChange={(e) => handleInputChange("homePageContent", "productsSubtitle", e.target.value)}
                    placeholder="Discover our most popular skincare solutions..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aboutTitle">Page Title</Label>
                  <Input
                    id="aboutTitle"
                    value={settings.aboutPageContent.title}
                    onChange={(e) => handleInputChange("aboutPageContent", "title", e.target.value)}
                    placeholder="About DERMAYOOTH"
                  />
                </div>

                <div>
                  <Label htmlFor="aboutContent">Main Content</Label>
                  <Textarea
                    id="aboutContent"
                    value={settings.aboutPageContent.content}
                    onChange={(e) => handleInputChange("aboutPageContent", "content", e.target.value)}
                    placeholder="Main about page content..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="aboutStory">Our Story</Label>
                  <Textarea
                    id="aboutStory"
                    value={settings.aboutPageContent.story}
                    onChange={(e) => handleInputChange("aboutPageContent", "story", e.target.value)}
                    placeholder="Our story section..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="aboutPhilosophy">Our Philosophy</Label>
                  <Textarea
                    id="aboutPhilosophy"
                    value={settings.aboutPageContent.philosophy}
                    onChange={(e) => handleInputChange("aboutPageContent", "philosophy", e.target.value)}
                    placeholder="Our philosophy section..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.contactInfo.phone}
                    onChange={(e) => handleInputChange("contactInfo", "phone", e.target.value)}
                    placeholder="+91 79 7715 0012"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={settings.contactInfo.email}
                    onChange={(e) => handleInputChange("contactInfo", "email", e.target.value)}
                    placeholder="info@dermayooth.com"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={settings.contactInfo.address}
                    onChange={(e) => handleInputChange("contactInfo", "address", e.target.value)}
                    placeholder="Mumbai, Maharashtra, India"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    value={settings.contactInfo.instagram}
                    onChange={(e) => handleInputChange("contactInfo", "instagram", e.target.value)}
                    placeholder="https://instagram.com/dermayooth"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Footer Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="footerDescription">Footer Description</Label>
                  <Textarea
                    id="footerDescription"
                    value={settings.footer.description}
                    onChange={(e) => handleInputChange("footer", "description", e.target.value)}
                    placeholder="Premium aesthetic solutions for your skin..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="copyright">Copyright Text</Label>
                  <Input
                    id="copyright"
                    value={settings.footer.copyright}
                    onChange={(e) => handleInputChange("footer", "copyright", e.target.value)}
                    placeholder="© 2024 DERMAYOOTH. All rights reserved."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
