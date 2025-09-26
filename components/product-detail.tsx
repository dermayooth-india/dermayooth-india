"use client"

import { useState } from "react"
import { CheckCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductSlider from "./product-slider"

const ProductDetail = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Slider */}
      <div className="product-slider-container">
        <ProductSlider images={product.images} />
      </div>

      {/* Product Information */}
      <div>
        <h1 className="text-2xl font-bold mb-2 bell-mt text-gray-800">{product.name}</h1>
        <p className="text-green-600 font-bold text-xl mb-4 bell-mt">{product.price}</p>

        <div className="mb-6">
          <p className="text-gray-700 mb-4 bookman">{product.longDescription}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 bell-mt">Benefits:</h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start bookman">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleAddToCart} disabled={addedToCart}>
            {addedToCart ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button className="flex-1">Order Now</Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-2 bell-mt">Shipping Information</h3>
          <p className="text-gray-600 mb-2 bookman">Free shipping on orders above ₹999</p>
          <p className="text-gray-600 bookman">Delivery within 3-5 business days</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
