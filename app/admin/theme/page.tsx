"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Palette, Type, Layout } from "lucide-react"

interface ThemeSettings {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  layout: {
    containerWidth: string
    borderRadius: string
    spacing: string
  }
  customCSS: string
}

export default function ThemePage() {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    colors: {
      primary: "#000000",
      secondary: "#6B7280",
      accent: "#10B981",
      background: "#FFFFFF",
      text: "#111827",
    },
    fonts: {
      heading: "Bell MT",
      body: "Bookman Old Style",
    },
    layout: {
      containerWidth: "1200px",
      borderRadius: "8px",
      spacing: "1rem",
    },
    customCSS: "",
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // In a real implementation, you would save to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Theme settings saved successfully!")
    } catch (error) {
      console.error("Failed to save theme settings:", error)
      alert("Failed to save theme settings")
    } finally {
      setSaving(false)
    }
  }

  const updateColors = (colorKey: keyof ThemeSettings["colors"], value: string) => {
    setThemeSettings({
      ...themeSettings,
      colors: {
        ...themeSettings.colors,
        [colorKey]: value,
      },
    })
  }

  const updateFonts = (fontKey: keyof ThemeSettings["fonts"], value: string) => {
    setThemeSettings({
      ...themeSettings,
      fonts: {
        ...themeSettings.fonts,
        [fontKey]: value,
      },
    })
  }

  const updateLayout = (layoutKey: keyof ThemeSettings["layout"], value: string) => {
    setThemeSettings({
      ...themeSettings,
      layout: {
        ...themeSettings.layout,
        [layoutKey]: value,
      },
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bell-mt">Theme Settings</h1>
            <p className="text-gray-600 bookman">Customize the visual appearance of your website</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Colors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primary"
                      type="color"
                      value={themeSettings.colors.primary}
                      onChange={(e) => updateColors("primary", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={themeSettings.colors.primary}
                      onChange={(e) => updateColors("primary", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondary">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondary"
                      type="color"
                      value={themeSettings.colors.secondary}
                      onChange={(e) => updateColors("secondary", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={themeSettings.colors.secondary}
                      onChange={(e) => updateColors("secondary", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accent">Accent Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="accent"
                      type="color"
                      value={themeSettings.colors.accent}
                      onChange={(e) => updateColors("accent", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={themeSettings.colors.accent}
                      onChange={(e) => updateColors("accent", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="background">Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="background"
                      type="color"
                      value={themeSettings.colors.background}
                      onChange={(e) => updateColors("background", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={themeSettings.colors.background}
                      onChange={(e) => updateColors("background", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Type className="h-5 w-5 mr-2" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="heading-font">Heading Font</Label>
                <select
                  id="heading-font"
                  className="w-full p-2 border rounded-md"
                  value={themeSettings.fonts.heading}
                  onChange={(e) => updateFonts("heading", e.target.value)}
                >
                  <option value="Bell MT">Bell MT</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                </select>
              </div>

              <div>
                <Label htmlFor="body-font">Body Font</Label>
                <select
                  id="body-font"
                  className="w-full p-2 border rounded-md"
                  value={themeSettings.fonts.body}
                  onChange={(e) => updateFonts("body", e.target.value)}
                >
                  <option value="Bookman Old Style">Bookman Old Style</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Layout */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layout className="h-5 w-5 mr-2" />
                Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="container-width">Container Width</Label>
                <Input
                  id="container-width"
                  value={themeSettings.layout.containerWidth}
                  onChange={(e) => updateLayout("containerWidth", e.target.value)}
                  placeholder="1200px"
                />
              </div>

              <div>
                <Label htmlFor="border-radius">Border Radius</Label>
                <Input
                  id="border-radius"
                  value={themeSettings.layout.borderRadius}
                  onChange={(e) => updateLayout("borderRadius", e.target.value)}
                  placeholder="8px"
                />
              </div>

              <div>
                <Label htmlFor="spacing">Base Spacing</Label>
                <Input
                  id="spacing"
                  value={themeSettings.layout.spacing}
                  onChange={(e) => updateLayout("spacing", e.target.value)}
                  placeholder="1rem"
                />
              </div>
            </CardContent>
          </Card>

          {/* Custom CSS */}
          <Card>
            <CardHeader>
              <CardTitle>Custom CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="custom-css">Additional CSS</Label>
                <Textarea
                  id="custom-css"
                  value={themeSettings.customCSS}
                  onChange={(e) => setThemeSettings({ ...themeSettings, customCSS: e.target.value })}
                  placeholder="/* Add your custom CSS here */"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-6 border rounded-lg"
              style={{
                backgroundColor: themeSettings.colors.background,
                color: themeSettings.colors.text,
                borderRadius: themeSettings.layout.borderRadius,
              }}
            >
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: themeSettings.fonts.heading,
                  color: themeSettings.colors.primary,
                }}
              >
                DERMAYOOTH
              </h2>
              <p
                className="mb-4"
                style={{
                  fontFamily: themeSettings.fonts.body,
                  color: themeSettings.colors.text,
                }}
              >
                This is a preview of how your theme settings will look on the website.
              </p>
              <button
                className="px-4 py-2 rounded"
                style={{
                  backgroundColor: themeSettings.colors.accent,
                  color: themeSettings.colors.background,
                  borderRadius: themeSettings.layout.borderRadius,
                }}
              >
                Sample Button
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
