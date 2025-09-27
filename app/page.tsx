"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GetStartedPage() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    setLoaded(true)
    // Add a timeout to bypass video loading after 5 seconds
    const timeout = setTimeout(() => {
      setVideoLoaded(true)
      setVideoError(true) // Optionally mark as error to show fallback
    }, 5555000)
    return () => clearTimeout(timeout)
  }, [])

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
        } catch (error: any) {
          console.log("Video autoplay was prevented:", error?.message)
          setVideoLoaded(true)
        }
      }

      const handleCanPlay = () => {
        setVideoLoaded(true)
        setVideoError(false)
        playVideo()
      }

      const handleLoadedData = () => {
        setVideoLoaded(true)
        setVideoError(false)
      }

      const handleError = (e: Event) => {
        console.log("Video loading error:", e)
        setVideoError(true)
        setVideoLoaded(true)
      }

      videoElement.addEventListener("canplay", handleCanPlay)
      videoElement.addEventListener("loadeddata", handleLoadedData)
      videoElement.addEventListener("error", handleError)

      return () => {
        if (videoElement) {
          videoElement.removeEventListener("canplay", handleCanPlay)
          videoElement.removeEventListener("loadeddata", handleLoadedData)
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Full Screen Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onError={(e) => {
            console.log("Video loading error:", e)
            setVideoError(true)
            setVideoLoaded(true)
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
            videoLoaded && !videoError ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "brightness(1) contrast(1.1)", // brighter video
          }}
        >
          <source src="/cover.mp4" type="video/mp4" />
          <source src="/cover.mp4" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback gradient background */}
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-br from-black/40 via-black/30 to-black/40 transition-opacity duration-1000 ${
            videoError || !videoLoaded ? "opacity-100" : "opacity-30"
          }`}
        />

        {/* Lighter overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
      </div>

      {/* Content Overlay */}
      <div className={`relative z-10 text-center max-w-6xl px-6 ${loaded ? "fade-in" : "opacity-0"}`}>
        {/* Main DERMAYOOTH Title */}
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-8 bell-mt text-white font-light leading-none tracking-[0.2em]">
            DERMAYOOTH
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-16">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto bookman leading-relaxed font-light">
            Premium aesthetic solutions for your skin. Experience the future of skincare with scientifically proven
            formulations.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="mb-20">
          <Button
            onClick={() => router.push("/home")}
            size="lg"
            className="px-8 sm:px-12 py-4 sm:py-6 bg-white hover:bg-gray-100 text-black rounded-lg text-lg sm:text-xl font-medium transition-all duration-300 hover-effect shadow-2xl hover:shadow-3xl transform hover:scale-105 bell-mt tracking-wide"
          >
            Get Started <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-white/60 bookman z-10">
        <p className="text-sm px-4">© {new Date().getFullYear()} DERMAYOOTH. All rights reserved.</p>
      </div>

      {/* Loading indicator */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white bookman">Loading experience...</p>
          </div>
        </div>
      )}
    </div>
  )
}
