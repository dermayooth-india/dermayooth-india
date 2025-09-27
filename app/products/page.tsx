"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { CartProvider, useCart } from "@/context/cart-context"
import { ShoppingCart } from "lucide-react"

// Separate component that uses the cart context
function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category")

  const [categories, setCategories] = useState<string[]>(["All"])
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All")
  const { addToCart } = useCart()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      console.log(response)
      console.log(response)
      console.log(response)
      const data = await response.json()
      // Normalize response: API may return an array or an object with { products }
      let productsArray: any[] = []
      if (data && Array.isArray((data as any).products)) {
        productsArray = (data as any).products
      } else if (Array.isArray(data)) {
        productsArray = data
      }

      setProducts(productsArray)
      setCategories([
        "All",
        ...Array.from(new Set(productsArray.map((p: any) => p?.category || ""))).filter(Boolean),
      ])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const productArray = Array.isArray(products) ? products : []
  const filteredProducts = selectedCategory === "All" ? productArray : productArray.filter((p) => p.category === selectedCategory)

  const handleAddToCart = (e: any, product: any) => {
    e.preventDefault()
    e.stopPropagation()

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/placeholder.svg",
        quantity: 1,
      })
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 bookman">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-60 md:h-80 lg:h-60 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-normal mb-4 bell-mt tracking-wide">Our Products</h1>
          <p className="max-w-2xl bookman">
            Discover premium range of skincare products designed with advanced formulations and high-quality
            ingredients.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Navigation */}
        <div className="mb-12 bg-white border border-gray-200 rounded-md p-6 hover-effect">
          <h2 className="text-2xl font-normal mb-6 bell-mt text-center text-gray-900 tracking-wide">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-2 rounded-md hover-effect ${
                  selectedCategory === category ? "bg-gray-900 hover:bg-gray-800" : "border-gray-900 text-gray-900"
                }`}
                onClick={() => {
                  setSelectedCategory(category)
                  router.push(category === "All" ? "/products" : `/products?category=${category}`, { scroll: false })
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-500 bg-white hover-effect block"
            >
              <div className="relative h-80 overflow-hidden cursor-pointer">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-normal mb-2 text-white bell-mt tracking-wide">{product.name}</h3>
                  <p className="text-white/90 mb-3 bookman text-sm">{product.shortDescription}</p>
                  <p className="text-gray-300 font-bold mb-4 bell-mt">{product.price}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-normal mb-2 bell-mt text-gray-900 tracking-wide">{product.name}</h3>
                <p className="text-gray-600 mb-4 bookman">{product.shortDescription}</p>
                <div className="flex space-x-2">
                  <Button asChild className="flex-1 bg-gray-900 hover:bg-gray-800 hover-effect">
                    <span>View Details</span>
                  </Button>
                  <Button asChild variant="outline" className="hover-effect bg-transparent">
                    <span onClick={(e) => handleAddToCart(e, product)} role="button" tabIndex={0}>
                      <ShoppingCart className="h-5 w-5" />
                    </span>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main component that wraps everything with CartProvider
export default function ProductsPage() {
  return (
    <MainLayout>
      <CartProvider>
        <ProductsContent />
      </CartProvider>
    </MainLayout>
  )
}
