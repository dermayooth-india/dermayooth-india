"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartProvider } from "@/context/cart-context" // Import CartProvider
import {
  ShoppingCart,
  MessageCircle,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Star,
  Info,
  FileText,
  ShieldCheck,
} from "lucide-react"

// Create a separate component that uses the cart context
function ProductDetailContent() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id
  const [product, setProduct] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    quantity: 1,
  })
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: 1,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)

  // Update to fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        } else {
          router.push("/products")
        }
      } catch (error) {
        console.error("Failed to fetch product:", error)
        router.push("/products")
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId, router])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-normal mb-4 bell-mt tracking-wide">Loading product...</h1>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleQuoteInputChange = (e) => {
    const { name, value } = e.target
    setQuoteFormData({
      ...quoteFormData,
      [name]: value,
    })
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()

    // Format the WhatsApp message - using proper line breaks for WhatsApp
    const message =
      `*New Order Request*%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Price:* ${product.price}%0A` +
      `*Quantity:* ${formData.quantity}%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Address: ${formData.address}%0A%0A` +
      `*Message:*%0A${formData.message}`

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/918655072352?text=${message}`, "_blank")

    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
    }, 3000)
  }

  const handleQuoteSubmit = (e) => {
    e.preventDefault()

    // Format the WhatsApp message for quote - using proper line breaks for WhatsApp
    const message =
      `*New Quote Request*%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Quantity:* ${quoteFormData.quantity}%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${quoteFormData.name}%0A` +
      `Email: ${quoteFormData.email}%0A` +
      `Phone: ${quoteFormData.phone}%0A%0A` +
      `*Message:*%0A${quoteFormData.message}`

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/918655072352?text=${message}`, "_blank")

    setQuoteSubmitted(true)
    setTimeout(() => {
      setQuoteSubmitted(false)
    }, 3000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1))
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              Home
            </a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <a href="/products" className="hover:text-gray-900">
              Products
            </a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Product Images Section */}
            <div className="p-6 md:p-10 bg-gray-50">
              <div className="product-slider-container">
                <div className="relative h-96 overflow-hidden rounded-md">
                  <img
                    src={product.images[currentImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain object-center"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-sm hover-effect"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-sm hover-effect"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex mt-4 space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 hover-effect ${
                        currentImageIndex === index ? "border-gray-900" : "border-gray-200"
                      }`}
                      onClick={() => goToImage(index)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="p-6 md:p-10">
              <h1 className="text-3xl font-normal mb-2 bell-mt text-gray-900 tracking-wide">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current text-gray-300" />
                </div>
                <span className="text-sm text-gray-500 ml-2">(4.0 - 24 Reviews)</span>
              </div>

              <p className="text-gray-900 font-bold text-2xl mb-6 bell-mt">{product.price}</p>

              <p className="text-gray-700 mb-6 bookman">{product.shortDescription}</p>

              <div className="mb-8">
                <h3 className="text-lg font-normal mb-3 bell-mt tracking-wide">Key Benefits:</h3>
                <ul className="space-y-2">
                  {product.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start bookman">
                      <CheckCircle className="h-5 w-5 text-gray-900 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cart Actions Component */}
              <CartActions product={product} setActiveTab={setActiveTab} />

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-gray-900 mr-2" />
                  <span className="text-sm text-gray-600 bookman">Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 text-gray-900 mr-2" />
                  <span className="text-sm text-gray-600 bookman">Free shipping over ₹999</span>
                </div>
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-gray-900 mr-2" />
                  <span className="text-sm text-gray-600 bookman">Dermatologist Tested</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-900 mr-2" />
                  <span className="text-sm text-gray-600 bookman">Detailed Instructions</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <Button
                  variant="outline"
                  className="w-full hover-effect bg-transparent"
                  onClick={() => setActiveTab("quote")}
                >
                  Request Best Quote
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Product Information Tabs */}
          <div className="border-t border-gray-200">
            <Tabs defaultValue="details" className="p-6 md:p-10">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-16 bg-gray-100">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white hover-effect"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white hover-effect"
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="usage"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white hover-effect bg-gray-100"
                >
                  How to Use
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white hover-effect bg-gray-100"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <h3 className="text-xl font-normal mb-4 bell-mt tracking-wide">Product Description</h3>
                <p className="text-gray-700 mb-4 bookman">{product.longDescription}</p>

                <div className="mt-6">
                  <h4 className="text-lg font-normal mb-3 bell-mt tracking-wide">All Benefits:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start bookman">
                        <CheckCircle className="h-5 w-5 text-gray-900 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-normal mb-3 bell-mt tracking-wide">Product Specifications:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2 bell-mt">Size</h5>
                      <p className="text-gray-700 bookman">{product.specifications.size}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2 bell-mt">Skin Type</h5>
                      <p className="text-gray-700 bookman">{product.specifications.skinType}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2 bell-mt">Shelf Life</h5>
                      <p className="text-gray-700 bookman">{product.specifications.shelfLife}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2 bell-mt">Made In</h5>
                      <p className="text-gray-700 bookman">India</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="space-y-4">
                <h3 className="text-xl font-normal mb-4 bell-mt tracking-wide">Ingredients</h3>
                <div className=" p-6 rounded-md">
                  <h4 className="text-lg font-normal mb-3 bell-mt tracking-wide">INGREDIENTS:</h4>
                  <p className="mb-6 bookman">{product.ingredients}</p>
                </div>

              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                <h3 className="text-xl font-normal mb-4 bell-mt tracking-wide">How to Use</h3>

                <div className=" p-6 rounded-md mb-6">
                  <h4 className="text-lg font-normal mb-3 bell-mt tracking-wide">DIRECTION FOR USE:</h4>
                  <ol className="space-y-2 list-decimal pl-5">
                    {product.directions.split(', ').map((directions, index) => (
                    <li className=" bookman"key={index}>{directions.trim()}</li>
                     ))}
                    
                  </ol>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-normal mb-3 bell-mt tracking-wide">Recommended Usage:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start bookman">
                        <CheckCircle className="h-5 w-5 text-gray-900 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Use at night</span>
                      </li>
                      <li className="flex items-start bookman">
                        <CheckCircle className="h-5 w-5 text-gray-900 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Suitable for all skin types</span>
                      </li>
                      <li className="flex items-start bookman">
                        <CheckCircle className="h-5 w-5 text-gray-900 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Can be used under makeup</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-normal mb-3 bell-mt tracking-wide">Precautions:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start bookman">
                        <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Avoid contact with eyes</span>
                      </li>
                      <li className="flex items-start bookman">
                        <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Discontinue use if irritation occurs</span>
                      </li>
                      <li className="flex items-start bookman">
                        <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Store in a cool, dry place away from direct sunlight</span>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <h3 className="text-xl font-normal mb-4 bell-mt tracking-wide">Customer Reviews</h3>

                <div className="flex items-center mb-6">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="text-4xl font-bold mr-2">4.0</div>
                      <div>
                        <div className="flex text-yellow-400">
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current" />
                          <Star className="h-5 w-5 fill-current text-gray-300" />
                        </div>
                        <div className="text-sm text-gray-500">Based on 24 reviews</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm w-8">5★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">70%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-8">4★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">20%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-8">3★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">5%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-8">2★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "3%" }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">3%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-8">1★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "2%" }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">2%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: "Priya M.",
                      rating: 5,
                      date: "2 months ago",
                      comment:
                        "This product has completely transformed my skin! I've been using it for about 2 months now and the difference is remarkable. My skin feels more hydrated, looks brighter, and some of my dark spots have faded significantly.",
                    },
                    {
                      name: "Rahul S.",
                      rating: 4,
                      date: "3 months ago",
                      comment:
                        "Very good product. I've noticed a significant improvement in my skin's texture and brightness. The only reason I'm giving 4 stars instead of 5 is because I wish the bottle was a bit larger for the price.",
                    },
                    {
                      name: "Anita K.",
                      rating: 5,
                      date: "1 month ago",
                      comment:
                        "Absolutely love this! It absorbs quickly, doesn't feel greasy, and has made my skin look so much better. Will definitely repurchase.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium bell-mt">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-current" : "fill-current text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 bookman">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order and Quote Forms */}
          <div className="border-t border-gray-200">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6 md:p-10">
              <TabsList className="grid grid-cols-2 mb-6 bg-gray-100">
                <TabsTrigger
                  value="quote"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white hover-effect"
                >
                  Request Best Quote
                </TabsTrigger>
                <TabsTrigger
                  value="order"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white hover-effect"
                >
                  Order Now
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quote">
                {quoteSubmitted ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-gray-900 mx-auto mb-4" />
                    <h3 className="text-xl font-normal mb-2 bell-mt text-gray-900 tracking-wide">
                      Quote Request Sent!
                    </h3>
                    <p className="text-gray-600 mb-4 bookman">
                      Your quote request has been sent via WhatsApp. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <h3 className="text-xl font-normal mb-4 bell-mt tracking-wide">Request Best Quote</h3>
                    <p className="text-gray-600 mb-4 bookman">
                      Fill out this form to get our best price for {product.name}
                    </p>

                    <div>
                      <label htmlFor="quote-name" className="block mb-2 bookman text-sm text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="quote-name"
                        name="name"
                        value={quoteFormData.name}
                        onChange={handleQuoteInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="quote-email" className="block mb-2 bookman text-sm text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="quote-email"
                          name="email"
                          value={quoteFormData.email}
                          onChange={handleQuoteInputChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Your email"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="quote-phone" className="block mb-2 bookman text-sm text-gray-700">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="quote-phone"
                          name="phone"
                          value={quoteFormData.phone}
                          onChange={handleQuoteInputChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="quote-quantity" className="block mb-2 bookman text-sm text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quote-quantity"
                        name="quantity"
                        value={quoteFormData.quantity}
                        onChange={handleQuoteInputChange}
                        min="1"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-message" className="block mb-2 bookman text-sm text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="quote-message"
                        name="message"
                        value={quoteFormData.message}
                        onChange={handleQuoteInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 h-32"
                        placeholder="Any specific requirements or questions?"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center hover-effect"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Request Quote via WhatsApp
                    </Button>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="order">
                {formSubmitted ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-gray-900 mx-auto mb-4" />
                    <h3 className="text-xl font-normal mb-2 bell-mt text-gray-900 tracking-wide">Order Placed!</h3>
                    <p className="text-gray-600 mb-4 bookman">
                      Your order has been sent via WhatsApp. We'll process it as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <h3 className="text-xl font-normal mb-4 bell-mt tracking-wide">Place Your Order</h3>
                    <p className="text-gray-600 mb-4 bookman">Fill out this form to order {product.name}</p>

                    <div>
                      <label htmlFor="name" className="block mb-2 bookman text-sm text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block mb-2 bookman text-sm text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Your email"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block mb-2 bookman text-sm text-gray-700">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block mb-2 bookman text-sm text-gray-700">
                        Delivery Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 h-20"
                        placeholder="Your full address"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="quantity" className="block mb-2 bookman text-sm text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block mb-2 bookman text-sm text-gray-700">
                        Additional Notes
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 h-20"
                        placeholder="Any specific requirements or questions?"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center hover-effect"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Place Order via WhatsApp
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

// Create a separate component for cart actions that uses the cart context
import { useCart } from "@/context/cart-context"

function CartActions({ product, setActiveTab }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
      <Button className="flex-1 bg-gray-900 hover:bg-gray-800 hover-effect" onClick={handleAddToCart}>
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </Button>
      <Button className="flex-1 hover-effect" onClick={() => setActiveTab("order")}>
        Order Now
      </Button>
    </div>
  )
}

// Main component that wraps everything with CartProvider
export default function ProductDetailPage() {
  return (
    <MainLayout>
      <CartProvider>
        <ProductDetailContent />
      </CartProvider>
    </MainLayout>
  )
}
