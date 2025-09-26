"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Save } from "lucide-react"

interface LayoutBlock {
  id: string
  title: string
  content: string
  type: "hero" | "features" | "testimonials" | "cta"
  position: number
  isActive: boolean
}

export default function LayoutBlocksPage() {
  const [blocks, setBlocks] = useState<LayoutBlock[]>([])
  const [editingBlock, setEditingBlock] = useState<LayoutBlock | null>(null)
  const [newBlock, setNewBlock] = useState({
    title: "",
    content: "",
    type: "hero" as const,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize with default blocks
    const defaultBlocks: LayoutBlock[] = [
      {
        id: "hero-1",
        title: "Hero Section",
        content: "Main hero content for homepage",
        type: "hero",
        position: 1,
        isActive: true,
      },
      {
        id: "features-1",
        title: "Features Section",
        content: "Why choose DERMAYOOTH features",
        type: "features",
        position: 2,
        isActive: true,
      },
    ]

    setBlocks(defaultBlocks)
    setLoading(false)
  }, [])

  const handleSaveBlock = () => {
    if (editingBlock) {
      setBlocks(blocks.map((block) => (block.id === editingBlock.id ? editingBlock : block)))
      setEditingBlock(null)
    }
  }

  const handleAddBlock = () => {
    if (newBlock.title && newBlock.content) {
      const block: LayoutBlock = {
        id: `block-${Date.now()}`,
        ...newBlock,
        position: blocks.length + 1,
        isActive: true,
      }
      setBlocks([...blocks, block])
      setNewBlock({ title: "", content: "", type: "hero" })
    }
  }

  const handleDeleteBlock = (blockId: string) => {
    if (confirm("Are you sure you want to delete this block?")) {
      setBlocks(blocks.filter((block) => block.id !== blockId))
    }
  }

  const toggleBlockStatus = (blockId: string) => {
    setBlocks(blocks.map((block) => (block.id === blockId ? { ...block, isActive: !block.isActive } : block)))
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bell-mt">Layout Blocks</h1>
          <p className="text-gray-600 bookman">Manage content blocks and page layouts</p>
        </div>

        {/* Add New Block */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Block</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Block Title</Label>
                <Input
                  id="title"
                  value={newBlock.title}
                  onChange={(e) => setNewBlock({ ...newBlock, title: e.target.value })}
                  placeholder="Enter block title"
                />
              </div>
              <div>
                <Label htmlFor="type">Block Type</Label>
                <select
                  id="type"
                  className="w-full p-2 border rounded-md"
                  value={newBlock.type}
                  onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value as any })}
                >
                  <option value="hero">Hero</option>
                  <option value="features">Features</option>
                  <option value="testimonials">Testimonials</option>
                  <option value="cta">Call to Action</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newBlock.content}
                onChange={(e) => setNewBlock({ ...newBlock, content: e.target.value })}
                placeholder="Enter block content"
                rows={3}
              />
            </div>
            <Button onClick={handleAddBlock}>
              <Plus className="h-4 w-4 mr-2" />
              Add Block
            </Button>
          </CardContent>
        </Card>

        {/* Existing Blocks */}
        <div className="grid gap-6">
          {blocks.map((block) => (
            <Card key={block.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{block.title}</span>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          block.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {block.isActive ? "Active" : "Inactive"}
                      </span>
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Type: {block.type} | Position: {block.position}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingBlock(block)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleBlockStatus(block.id)}
                      className={block.isActive ? "text-orange-600" : "text-green-600"}
                    >
                      {block.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBlock(block.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{block.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Block Modal */}
        {editingBlock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle>Edit Block</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Block Title</Label>
                  <Input
                    id="edit-title"
                    value={editingBlock.title}
                    onChange={(e) => setEditingBlock({ ...editingBlock, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editingBlock.content}
                    onChange={(e) => setEditingBlock({ ...editingBlock, content: e.target.value })}
                    rows={5}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingBlock(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveBlock}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
