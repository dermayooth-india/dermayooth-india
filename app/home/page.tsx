"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import MainLayout from "@/components/main-layout"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Custom hook for intersection observer
function useInView(options = {}) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.triggerOnce) {
            observer.disconnect()
          }
        } else if (!options.triggerOnce) {
          setInView(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options.threshold, options.triggerOnce, options.rootMargin])

  return [ref, inView]
}

export default function HomePage() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef(null)

  const [heroRef] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      const playVideo = async () => {
        try {
          if (document.contains(videoElement)) {
            videoElement.volume = 0
            videoElement.muted = true
            await videoElement.play()
          }
        } catch (error) {
          console.log("Video autoplay was prevented:", error.message)
          setVideoLoaded(true)
        }
      }

      const handleCanPlay = () => {
        setVideoLoaded(true)
        setVideoError(false)
        playVideo()
      }

      const handleError = (e) => {
        console.log("Video loading error:", e)
        setVideoError(true)
        setVideoLoaded(true)
      }

      videoElement.addEventListener("canplay", handleCanPlay)
      videoElement.addEventListener("error", handleError)

      return () => {
        if (videoElement) {
          videoElement.removeEventListener("canplay", handleCanPlay)
          videoElement.removeEventListener("error", handleError)

          if (!videoElement.paused) {
            try {
              videoElement.pause()
            } catch (error) {
              console.log("Error pausing video:", error)
            }
          }
        }
      }
    }
  }, [])

  return (
    <MainLayout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={(e) => {
              console.log("Video loading error:", e)
              setVideoError(true)
              setVideoLoaded(true)
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded && !videoError ? "opacity-100" : "opacity-0"
            }`}
            style={{
              filter: "brightness(0.8) contrast(1.1) saturate(1.2)", // make video pop more
            }}
          >
            <source src="/home.mp4" type="video/mp4" />
            <source src="/home.mp4" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Fallback background if video fails */}
          <div
            className={`absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 transition-opacity duration-1000 ${
              videoError || !videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl px-6 py-20">
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl bell-mt text-white/80 tracking-[0.15em] font-light leading-none">
              DERMAYOOTH
            </h1>
          </div>
          <div className="mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-4xl mx-auto bookman leading-relaxed font-light">
              Discover range of advanced skincare products designed to revitalize, rejuvenate, and transform your skin.
            </p>
          </div>
          <div>
            <Button
              asChild
              size="lg"
              className="bg-white/90 text-black hover:bg-white px-10 py-6 text-xl hover-effect shadow-xl"
            >
              <Link href="/products">
                Explore Products <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
