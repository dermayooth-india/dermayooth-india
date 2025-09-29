"use client"

import { useState } from "react"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { CartProvider, useCart } from "@/context/cart-context"
import { Trash2, Plus, Minus, MessageCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

// Separate component that uses the cart context
function CartContent() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  })
  const [checkoutStep, setCheckoutStep] = useState("cart") // cart, checkout, success
  const [formSubmitted, setFormSubmitted] = useState(false)

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Extract the numeric value from the price string (e.g., "₹1,499" -> 1499)
      const priceValue = Number.parseInt(item.price.replace(/[^\d]/g, ""))
      return total + priceValue * item.quantity
    }, 0)
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()

    // Format the cart items for WhatsApp - using proper line breaks for WhatsApp
    let itemsList = ""
    cartItems.forEach((item, index) => {
      itemsList += `${index + 1}. ${item.name} - ${item.price} x ${item.quantity}%0A`
    })

    // Format the WhatsApp message
    const message =
      `*New Order from Cart*%0A%0A` +
      `*Items:*%0A${itemsList}%0A` +
      `*Total:* ₹${calculateTotal().toLocaleString()}%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Address: ${formData.address}%0A%0A` +
      `*Message:*%0A${formData.message}`

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/918169290667?text=${message}`, "_blank")

    setFormSubmitted(true)
    clearCart()
    setCheckoutStep("success")
  }

  if (checkoutStep === "success") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 bell-mt text-gray-800">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8 bookman">
            Your order has been sent via WhatsApp. We'll process it as soon as possible and contact you for
            confirmation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 hover-glow">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="hover-glow">
              <Link href="/home">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0 && checkoutStep === "cart") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 bell-mt text-gray-800">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 bookman">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild className="bg-green-600 hover:bg-green-700 hover-glow">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 bell-mt text-center text-gray-800">
        {checkoutStep === "checkout" ? "Checkout" : "Your Cart"}
      </h1>

      {checkoutStep === "cart" ? (
        <>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    // Extract the numeric value from the price string (e.g., "₹1,499" -> 1499)
                    const priceValue = Number.parseInt(item.price.replace(/[^\d]/g, ""))
                    const itemTotal = priceValue * item.quantity

                    return (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 bell-mt">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 bookman">{item.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 hover-glow"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-gray-900 bookman w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 hover-glow"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium bookman">₹{itemTotal.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 hover-glow"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <Button variant="outline" className="mb-4 md:mb-0 hover-glow" onClick={() => clearCart()}>
              Clear Cart
            </Button>
            <div className="text-right">
              <div className="text-lg text-gray-700 bookman mb-2">
                Subtotal: <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700 hover-glow"
                onClick={() => setCheckoutStep("checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 bell-mt">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => {
                const priceValue = Number.parseInt(item.price.replace(/[^\d]/g, ""))
                const itemTotal = priceValue * item.quantity

                return (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden mr-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <span className="text-sm bookman">
                        {item.name} <span className="text-gray-500">x {item.quantity}</span>
                      </span>
                    </div>
                    <span className="text-sm font-medium bookman">₹{itemTotal.toLocaleString()}</span>
                  </div>
                )
              })}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="bell-mt">Total:</span>
                <span className="text-green-600 bell-mt">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleCheckoutSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4 bell-mt">Shipping Information</h2>

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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-20"
                placeholder="Your full address"
                required
              ></textarea>
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-20"
                placeholder="Any specific requirements or questions?"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Button type="button" variant="outline" className="hover-glow" onClick={() => setCheckoutStep("cart")}>
                Back to Cart
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 flex items-center justify-center hover-glow pulse-animation"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Place Order via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// Main component that wraps everything with CartProvider
export default function CartPage() {
  return (
    <MainLayout>
      <CartProvider>
        <CartContent />
      </CartProvider>
    </MainLayout>
  )
}
