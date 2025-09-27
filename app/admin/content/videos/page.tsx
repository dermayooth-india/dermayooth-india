"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, VideoIcon, Youtube, Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VideosPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newVideo, setNewVideo] = useState({
    title: "",
    type: "file", // file or youtube
    url: "",
    location: "homepage", // homepage, about, etc.
    status: "active",
  })

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/admin/content/videos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      const data = await response.json()
      setVideos(data)
    } catch (error) {
      console.error("Failed to fetch videos:", error)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("video", file)

    try {
      setLoading(true)
      const response = await fetch("/api/admin/upload/video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setNewVideo((prev) => ({ ...prev, url, type: "file" }))
      }
    } catch (error) {
      console.error("Failed to upload video:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddVideo = async () => {
    try {
      const response = await fetch("/api/admin/content/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(newVideo),
      })

      if (response.ok) {
        fetchVideos()
        setShowAddForm(false)
        setNewVideo({
          title: "",
          type: "file",
          url: "",
          location: "homepage",
          status: "active",
        })
      }
    } catch (error) {
      console.error("Failed to add video:", error)
    }
  }

  const handleDeleteVideo = async (videoId) => {
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      await fetch(`/api/admin/content/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      fetchVideos()
    } catch (error) {
      console.error("Failed to delete video:", error)
    }
  }

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bell-mt">Video Management</h1>
            <p className="text-gray-600 bookman">Manage homepage and page videos</p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </div>

        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Video</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="file" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="file" onClick={() => setNewVideo((prev) => ({ ...prev, type: "file" }))}>
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="youtube" onClick={() => setNewVideo((prev) => ({ ...prev, type: "youtube" }))}>
                    YouTube Embed
                  </TabsTrigger>
                </TabsList>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="videoTitle">Video Title</Label>
                    <Input
                      id="videoTitle"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter video title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="videoLocation">Location</Label>
                    <Select
                      value={newVideo.location}
                      onValueChange={(value) => setNewVideo((prev) => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homepage">Homepage Hero</SelectItem>
                        <SelectItem value="about">About Page</SelectItem>
                        <SelectItem value="products">Products Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <TabsContent value="file" className="space-y-4">
                    <div>
                      <Label htmlFor="videoFile">Upload Video File</Label>
                      <div className="mt-2">
                        <label className="cursor-pointer">
                          <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                            <div className="text-center">
                              <VideoIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <span className="text-sm text-gray-500">
                                {loading ? "Uploading..." : "Click to upload video"}
                              </span>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={loading}
                          />
                        </label>
                      </div>
                      {newVideo.url && newVideo.type === "file" && (
                        <p className="text-sm text-green-600 mt-2">Video uploaded successfully!</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="youtube" className="space-y-4">
                    <div>
                      <Label htmlFor="youtubeUrl">YouTube URL</Label>
                      <Input
                        id="youtubeUrl"
                        value={newVideo.url}
                        onChange={(e) => setNewVideo((prev) => ({ ...prev, url: e.target.value }))}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                  </TabsContent>

                  <div className="flex gap-2">
                    <Button onClick={handleAddVideo} disabled={!newVideo.title || !newVideo.url}>
                      <Save className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Videos List */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id}>
              <div className="aspect-video relative bg-gray-100 rounded-t-lg overflow-hidden">
                {video.type === "youtube" ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Youtube className="h-12 w-12 text-red-600" />
                  </div>
                ) : (
                  <video src={video.url} className="w-full h-full object-cover" muted />
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant={video.status === "active" ? "default" : "secondary"}>{video.status}</Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="bg-white">
                    {video.location}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold bell-mt mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {video.type === "youtube" ? "YouTube Embed" : "Video File"}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteVideo(video.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {videos.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <VideoIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first video</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Video
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
