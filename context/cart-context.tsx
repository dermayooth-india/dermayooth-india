"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Types for cart items and context
type CartItem = {
  id: string | number
  name?: string
  price?: number | string
  image?: string
  quantity: number
  [key: string]: any
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Partial<CartItem> & { id: string | number; quantity?: number }) => void
  updateQuantity: (productId: string | number, newQuantity: number) => void
  removeFromCart: (productId: string | number) => void
  clearCart: () => void
  isInitialized: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("dermayoothCart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
      setCartItems([])
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("dermayoothCart", JSON.stringify(cartItems))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    }
  }, [cartItems, isInitialized])

  const addToCart = (product: Partial<CartItem> & { id: string | number; quantity?: number }) => {
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex !== -1) {
        // If it exists, increase the quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (product.quantity || 1),
        }
        return updatedItems
      } else {
        // If it doesn't exist, add it to the cart
        return [...prevItems, { ...(product as CartItem), quantity: product.quantity || 1 }]
      }
    })
  }

  const updateQuantity = (productId: string | number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeFromCart = (productId: string | number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
