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
        className={`${isHomePage ? "absolute top-0 left-0 right-0 z-40" : "sticky top-0 z-40"} transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : isHomePage ? "bg-transparent" : "bg-white"
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
                className={`block py-2 px-3 rounded-md bookman ${pathname === item.href ? "bg-gray-100 text-black" : "text-black hover:bg-gray-50"
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
      <footer className="bg-gray-100 text-black pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl mb-6 bell-mt tracking-wide">DERMAYOOTH INDIA </h3>
              <p className="text-black mb-6 bookman">
                Premium aesthetic solutions for your skin. Dermatologist recommended products for all your skincare
                needs.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/dermayooth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-red hover-effect"
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
                    <Link href={item.href} className="text-black hover:text-blue-950 transition-colors">
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
                  <span className="text-black">Dermayooth Mumbai India</span>
                </p>
                <p className="flex items-start">
                  <a href="tel:+918655072352" className="text-black hover:text-blue-950">
                     +91 8655072352
                  </a>
                </p>
                <p className="flex items-start">
                  <a href="mailto:info@dermayooth.com" className="text-black hover:text-blue-950">
                     customercare.indiaderrmayooth@gmail.com
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800 flex justify-between items-center">
            <p className="text-black bookman">© {new Date().getFullYear()} DERMAYOOTH. All rights reserved.</p>

            {/* Admin Access Button */}
            {/* <Link
              href="/admin/login"
              className="flex items-center text-black hover:text-blue-950 transition-colors text-sm"
              title="Admin Access"
            >
              <Settings className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Admin</span>
            </Link> */}
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918655072352"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-button hover-effect  flex items-center justify-center rounded-full p-2 "
      >
        {/* <MessageCircle className="h-6 w-6" /> */}
          <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="h-8 w-8 fill-white"
  >
    <path d="M16.003 3C9.375 3 4 8.373 4 15c0 2.653.847 5.11 2.279 7.127L4 29l7.042-2.252A11.92 11.92 0 0016.003 27C22.63 27 28 21.627 28 15S22.63 3 16.003 3zm5.993 17.084c-.26.732-1.522 1.39-2.096 1.48-.557.084-1.265.12-2.044-.127-.472-.15-1.082-.352-1.862-.688-3.284-1.423-5.418-4.73-5.588-4.953-.167-.223-1.332-1.772-1.332-3.387 0-1.615.84-2.413 1.137-2.74.296-.328.648-.41.864-.41.221 0 .432.002.622.011.2.01.466-.075.73.557.26.63.88 2.181.958 2.339.074.16.123.348.023.56-.098.211-.148.347-.296.53-.148.184-.311.41-.442.551-.148.16-.302.335-.13.657.167.328.744 1.226 1.595 1.986 1.098.98 1.986 1.288 2.318 1.436.331.148.524.13.717-.078.186-.205.865-.99 1.094-1.33.229-.347.46-.275.764-.165.296.11 1.872.883 2.192 1.043.328.168.544.25.624.389.082.138.082.798-.178 1.53z"/>
  </svg>
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
