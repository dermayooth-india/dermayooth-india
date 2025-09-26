"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, Instagram, MessageCircle, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartProvider, useCart } from "@/context/cart-context"

// Create a separate component for the cart button that uses the cart context
function CartButton() {
  const { cartItems } = useCart()
  const cartItemCount = cartItems.length

  return (
    <Button asChild variant="ghost" size="sm" className="hover-effect text-black">
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart{" "}
        {cartItemCount > 0 && (
          <span className="ml-1 bg-black text-white rounded-full px-2 py-0.5 text-xs">{cartItemCount}</span>
        )}
      </Link>
    </Button>
  )
}

// Main layout content without direct cart context usage
function MainLayoutContent({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/products" },
    { name: "About us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ]

  const isHomePage = pathname === "/home"

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header
        className={`${isHomePage ? "absolute top-0 left-0 right-0 z-40" : "sticky top-0 z-40"} transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : isHomePage ? "bg-transparent" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Left side - Brand name */}
            <Link href="/home" className="text-xl bell-mt tracking-widest text-black">
              DERMAYOOTH
            </Link>

            {/* Right-aligned Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-black hover:text-gray-600 nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="ghost" size="icon" className="hover-effect text-black">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart button is now a separate component */}
              <CartButton />
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-black">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-4 py-3 space-y-1 bg-white">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 px-3 rounded-md bookman ${
                  pathname === item.href ? "bg-gray-100 text-black" : "text-black hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Button asChild variant="outline" className="w-full justify-start mb-2 text-black bg-transparent">
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl mb-6 bell-mt tracking-wide">DERMAYOOTH</h3>
              <p className="text-gray-400 mb-6 bookman">
                Premium aesthetic solutions for your skin. Dermatologist recommended products for all your skincare
                needs.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/dermayooth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white hover-effect"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg mb-6 bell-mt">Quick Links</h3>
              <ul className="space-y-3 bookman">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg mb-6 bell-mt">Contact Us</h3>
              <address className="not-italic space-y-4 bookman">
                <p className="flex items-start">
                  <span className="text-gray-400">Mumbai, Maharashtra, India</span>
                </p>
                <p className="flex items-start">
                  <a href="tel:+917977150012" className="text-gray-400 hover:text-white">
                    +91 79 7715 0012
                  </a>
                </p>
                <p className="flex items-start">
                  <a href="mailto:info@dermayooth.com" className="text-gray-400 hover:text-white">
                    info@dermayooth.com
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800 flex justify-between items-center">
            <p className="text-gray-400 bookman">© {new Date().getFullYear()} DERMAYOOTH. All rights reserved.</p>

            {/* Admin Access Button */}
            <Link
              href="/admin/login"
              className="flex items-center text-gray-500 hover:text-gray-300 transition-colors text-sm"
              title="Admin Access"
            >
              <Settings className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917977150012"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button hover-effect bg-black"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}

// Main layout component that provides the CartProvider
const MainLayout = ({ children }) => {
  return (
    <CartProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </CartProvider>
  )
}

export default MainLayout
