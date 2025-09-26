"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Video, MessageSquare, Activity, Eye, Edit } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalVideos: 0,
    totalReviews: 0,
    pendingReviews: 0,
    monthlyViews: 0,
    recentActivity: [],
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      if (response.status === 401) {
        // not authorized, redirect to admin login
        window.location.href = "/admin/login"
        return
      }

      if (!response.ok) {
        console.error("Failed to fetch dashboard stats, status:", response.status)
        return
      }

      const data = await response.json()
      // guard that data is an object with expected fields
      setStats((prev) => ({ ...prev, ...data }))
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error)
    }
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Active Videos",
      value: stats.totalVideos,
      icon: Video,
      color: "bg-green-500",
      change: "+5%",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: MessageSquare,
      color: "bg-purple-500",
      change: "+23%",
    },
    {
      title: "Monthly Views",
      value: stats.monthlyViews,
      icon: Eye,
      color: "bg-orange-500",
      change: "+18%",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bell-mt">Dashboard</h1>
          <p className="text-gray-600 bookman">Welcome back! Here's what's happening with your website.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest changes and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.isArray(stats.recentActivity) && stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/admin/products/new"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Package className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-medium">Add Product</h3>
                  <p className="text-sm text-gray-500">Create new product</p>
                </a>
                <a
                  href="/admin/content/videos"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Video className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-medium">Manage Videos</h3>
                  <p className="text-sm text-gray-500">Upload or edit videos</p>
                </a>
                <a
                  href="/admin/content/global"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit className="h-8 w-8 text-purple-600 mb-2" />
                  <h3 className="font-medium">Edit Content</h3>
                  <p className="text-sm text-gray-500">Update site text</p>
                </a>
                <a
                  href="/admin/reviews"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-medium">Reviews</h3>
                  <p className="text-sm text-gray-500">Moderate reviews</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews Alert */}
        {stats.pendingReviews > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="font-medium text-orange-900">{stats.pendingReviews} reviews pending approval</h3>
                  <p className="text-sm text-orange-700">Review and moderate customer feedback to maintain quality.</p>
                </div>
                <a
                  href="/admin/reviews"
                  className="ml-auto px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Review Now
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
