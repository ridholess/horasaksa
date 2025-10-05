'use client'

import { Play, LineSquiggle, Library } from 'lucide-react'
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function HeroTryon() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Memoize static data to prevent unnecessary re-renders
  const tryOnCards = useMemo(
    () => [
      {
        id: 1,
        animation: '/tryon/224552600.webm',
        title: 'Mode latihan',
        description:
          'Latih kemampuan menulis aksara Batak dengan latihan interaktif yang menyenangkan',
        difficulty: 'Mudah',
        linkTo: '/tryon/practice',
      },
      {
        id: 2,
        animation: '/tryon/418148137.webm',
        title: 'Mode eksplorasi',
        description:
          'Eksplorasi aksara Batak dengan berbagai jenis aksara dan penyebutan',
        difficulty: 'Mudah',
        linkTo: '/tryon/explore',
      },
      {
        id: 3,
        animation: '/tryon/552750445.webm',
        title: 'Mode tantangan',
        description:
          'Uji kemampuan menulis aksara Batak dengan tantangan yang menarik',
        difficulty: 'Sedang',
        linkTo: '/tryon/challenge',
      },
      {
        id: 4,
        animation: '/tryon/562914903.webm',
        title: 'Tulis nama anda',
        description:
          'Tulis nama anda dalam aksara Batak dengan cara yang mudah dan interaktif',
        difficulty: 'Sulit',
        linkTo: '/tryon/custom-name',
      },
    ],
    []
  )

  const duplicatedCards = useMemo(
    () => [...tryOnCards, ...tryOnCards],
    [tryOnCards]
  )

  // Throttle the checkCurrentCard function to improve performance
  const checkCurrentCard = useCallback(() => {
    // This function is kept for potential future use but doesn't update state
    if (!scrollContainerRef.current) return
    // Card tracking logic can be implemented here if needed
  }, [isMobile])

  const handleCardMouseEnter = useCallback((index: number) => {
    const video = videoRefs.current[index]
    if (video && video.readyState >= 2) {
      // Only play if video is loaded
      video.play().catch(() => {
        // Handle play error silently
      })
    }
  }, [])

  const handleCardMouseLeave = useCallback((index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      video.pause()
    }
  }, [])

  const handleContainerMouseEnter = useCallback(() => {
    if (animationRef.current) {
      gsap.to(animationRef.current, {
        timeScale: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [])

  const handleContainerMouseLeave = useCallback(() => {
    if (animationRef.current) {
      gsap.to(animationRef.current, {
        timeScale: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [])

  useEffect(() => {
    // Check if we're on mobile/tablet
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    if (scrollContainerRef.current) {
      // Use will-change CSS property for better performance
      scrollContainerRef.current.style.willChange = 'transform'

      // Create animation based on screen size
      if (window.innerWidth < 1024) {
        // Horizontal scroll for mobile/tablet - faster animation
        animationRef.current = gsap.to(scrollContainerRef.current, {
          x: '-50%',
          duration: 15, // Reduced from 30 to 15 for faster animation
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            if (Math.random() < 0.1) {
              checkCurrentCard()
            }
          },
        })
      } else {
        // Vertical scroll for desktop
        animationRef.current = gsap.to(scrollContainerRef.current, {
          y: '-50%',
          duration: 25,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            if (Math.random() < 0.1) {
              checkCurrentCard()
            }
          },
        })
      }

      const container = scrollContainerRef.current
      container.addEventListener('mouseenter', handleContainerMouseEnter, {
        passive: true,
      })
      container.addEventListener('mouseleave', handleContainerMouseLeave, {
        passive: true,
      })

      checkCurrentCard()

      return () => {
        if (animationRef.current) {
          animationRef.current.kill()
        }
        if (scrollContainerRef.current) {
          scrollContainerRef.current.style.willChange = 'auto'
        }
        container.removeEventListener('mouseenter', handleContainerMouseEnter)
        container.removeEventListener('mouseleave', handleContainerMouseLeave)
        window.removeEventListener('resize', checkIsMobile)
      }
    }

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [checkCurrentCard, handleContainerMouseEnter, handleContainerMouseLeave])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-30 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
          {/* Left Side - Content */}
          <div className="w-full flex flex-col justify-center space-y-6 lg:space-y-8 order-1 lg:order-1 mt-20 lg:mt-0">
            <div className="space-y-4 lg:space-y-6">
              <div className="w-fit flex items-center gap-x-4 px-4 py-2 bg-gray-50 border border-black/10 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
                <span className="text-black/80 text-sm lg:text-base">AI untuk aksara siap</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-tight">
                Rasakan{' '}
                <span className="text-primary block font-bold">Pengalaman</span>{' '}
                Aksara Batak
              </h1>

              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg">
                Pilih tipe pembelajaran aksara pada opsi di samping ini.
                Pelajari hingga mahir menulis aksara batak dengan cara yang
                menyenangkan dan interaktif dengan AI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/tryon/challenge" className="group relative overflow-hidden flex items-center gap-x-2 bg-primary/10 border border-primary/15 px-4 py-2 rounded-full hover:bg-primary transition-colors cursor-pointer">
                <LineSquiggle
                  size={16}
                  className="absolute -left-6 group-hover:left-4 text-white transition-all duration-300 ease-out"
                />
                <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-primary font-medium transition-all duration-300">
                  Ikuti tantangan
                </span>
              </Link>
              <Link href="/tryon/practice" className="group relative overflow-hidden flex items-center gap-x-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-600 transition-colors cursor-pointer">
                <Library
                  size={16}
                  className="absolute -left-6 group-hover:left-4 text-white transition-all duration-300 ease-out"
                />
                <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-gray-600 font-medium transition-all duration-300">
                  Mulai latihan
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side - Animated Cards */}
          <div className="relative h-96 md:h-[500px] lg:h-screen flex justify-center items-center order-2 lg:order-2">
            <div className="relative w-full h-full overflow-hidden">
              {/* Gradient overlays - responsive */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-100 to-transparent z-20 pointer-events-none lg:block hidden"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-100 to-transparent z-20 pointer-events-none lg:block hidden"></div>
              
              {/* Mobile/Tablet horizontal gradient overlays */}
              <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-slate-100 to-transparent z-20 pointer-events-none lg:hidden"></div>
              <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-slate-100 to-transparent z-20 pointer-events-none lg:hidden"></div>

              {/* Moving container */}
              <div
                ref={scrollContainerRef}
                className="flex flex-row lg:flex-col gap-4 lg:gap-y-6 py-4 lg:py-4 px-4 lg:px-0 items-center cursor-pointer"
                style={{ willChange: 'transform' }}
              >
                {duplicatedCards.map((card, index) => (
                  <div
                    key={`${card.id}-${index}`}
                    ref={(el) => { cardRefs.current[index] = el }}
                    className="w-80 md:w-96 lg:w-3/4 h-80 md:h-96 lg:h-[440px] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
                    style={{
                      willChange: 'transform, box-shadow',
                    }}
                    onMouseEnter={() => handleCardMouseEnter(index)}
                    onMouseLeave={() => handleCardMouseLeave(index)}
                  >
                    {/* Image Section with Video Animation */}
                    <div className="relative h-48 md:h-60 lg:h-68 flex items-center justify-center">
                      <video
                        ref={(el) => { videoRefs.current[index] = el }}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata" // Only load metadata initially
                        style={{ willChange: 'opacity' }}
                      >
                        <source src={card.animation} type="video/webm" />
                      </video>
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium border border-rose-200">
                          {card.difficulty}
                        </div>
                      </div>
                      <Link
                        href={card.linkTo}
                        className="absolute group flex items-center justify-center -bottom-4 right-8 left-auto gap-2 bg-primary hover:bg-rose-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 w-12 h-12 cursor-pointer hover:shadow-lg hover:shadow-primary/30"
                        style={{ willChange: 'transform, background-color' }}
                      >
                        <Play
                          size={16}
                          className="transition-transform fill-current"
                        />
                      </Link>
                    </div>

                    {/* Content Section */}
                    <div
                      className="p-4 md:p-6 lg:p-8 space-y-2 lg:space-y-4 flex flex-col justify-between"
                      style={{ height: '120px' }}
                    >
                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed line-clamp-2">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
