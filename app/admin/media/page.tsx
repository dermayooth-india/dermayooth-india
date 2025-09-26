"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Video, File, Trash2, Copy } from "lucide-react"

interface MediaFile {
  id: string
  name: string
  type: "image" | "video" | "document"
  url: string
  size: string
  uploadedAt: string
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "1",
      name: "hero-video.mp4",
      type: "video",
      url: "/hero-video.mp4",
      size: "15.2 MB",
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "product1.png",
      type: "image",
      url: "/product1.png",
      size: "2.1 MB",
      uploadedAt: "2024-01-14",
    },
    {
      id: "3",
      name: "dermayooth-logo.png",
      type: "image",
      url: "/dermayooth-logo.png",
      size: "156 KB",
      uploadedAt: "2024-01-13",
    },
  ])
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        // In a real implementation, you would upload to a cloud storage service
        const newFile: MediaFile = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document",
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadedAt: new Date().toISOString().split("T")[0],
        }
        setMediaFiles((prev) => [newFile, ...prev])
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = (fileId: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      setMediaFiles(mediaFiles.filter((file) => file.id !== fileId))
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    alert("URL copied to clipboard!")
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-8 w-8 text-blue-500" />
      case "video":
        return <Video className="h-8 w-8 text-purple-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bell-mt">Media Library</h1>
            <p className="text-gray-600 bookman">Manage your images, videos, and documents</p>
          </div>
          <div>
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild disabled={uploading}>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Files"}
              </label>
            </Button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {file.type === "image" ? (
                    <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    getFileIcon(file.type)
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm truncate mb-1">{file.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {file.size} • {file.uploadedAt}
                  </p>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(file.url)} className="flex-1">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy URL
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mediaFiles.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Upload className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media files</h3>
              <p className="text-gray-500 mb-4">Upload your first image, video, or document to get started.</p>
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </label>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
