'use client'

import { LineSquiggle, Library } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { CicakModel } from '@/components/CicakModel'
import { TopengModel } from '@/components/TopengModel'
import { Suspense, useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  const aksara1Ref = useRef<SVGSVGElement>(null)
  const aksara2Ref = useRef<SVGSVGElement>(null)
  const aksara3Ref = useRef<SVGSVGElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const groupButtonRef = useRef<HTMLDivElement>(null)
  const cicakCanvasRef = useRef<HTMLDivElement>(null)
  const topengCanvasRef = useRef<HTMLDivElement>(null)
  const [hoveredAksara, setHoveredAksara] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [modelsLoaded, setModelsLoaded] = useState({ cicak: false, topeng: false })
  const [modelsVisible, setModelsVisible] = useState(true)
  const [modelsPaused, setModelsPaused] = useState(false)

  const aksaraPopup = [
    {
      ref: aksara1Ref,
      aksaraLabel: 'Ho',
      aksaraPath: '/heroaksara/hero-aksara-1.svg',
      type: 'Toba',
      consonantBase: 'Ha',
      consonantPath: '/toba/ha.svg',
      vowelBase: 'o',
      vowelPath: '/toba/~o.svg',
    },
    {
      ref: aksara2Ref,
      aksaraLabel: 'Ra',
      aksaraPath: '/heroaksara/hero-aksara-2.svg',
      type: 'Toba',
      consonantBase: 'Ra',
      consonantPath: '/toba/ra.svg',
      vowelBase: 'a',
      vowelPath: '/toba/ra.svg',
    },
    {
      ref: aksara3Ref,
      aksaraLabel: 'S',
      aksaraPath: '/heroaksara/hero-aksara-3.svg',
      type: 'Toba',
      consonantBase: 'Sa',
      consonantPath: '/toba/sa.svg',
      vowelBase: '~',
      vowelPath: '/toba/~.svg',
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Initial animation setup
  useEffect(() => {
    // Set initial states for all elements
    const elements = [
      indicatorRef.current,
      headingRef.current,
      subheadingRef.current,
      groupButtonRef.current,
      aksara1Ref.current,
      aksara2Ref.current,
      aksara3Ref.current,
      cicakCanvasRef.current,
      topengCanvasRef.current,
    ]

    elements.forEach((element) => {
      if (element) {
        gsap.set(element, {
          opacity: 0,
          y: 30,
          scale: 0.9,
        })
      }
    })

    // Animate elements in sequence
    const timeline = gsap.timeline()

    timeline
      .to(indicatorRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        subheadingRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        groupButtonRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        [aksara1Ref.current, aksara2Ref.current, aksara3Ref.current],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.4'
      )
  }, [])

  // 3D Models animation on load with timeout fallback
  useEffect(() => {
    // Set cicak model as loaded after a delay (fallback)
    const cicakTimer = setTimeout(() => {
      setModelsLoaded(prev => ({ ...prev, cicak: true }))
    }, 2000) // 2 second delay

    return () => clearTimeout(cicakTimer)
  }, [])

  useEffect(() => {
    // Set topeng model as loaded after a delay (fallback)
    const topengTimer = setTimeout(() => {
      setModelsLoaded(prev => ({ ...prev, topeng: true }))
    }, 2500) // 2.5 second delay

    return () => clearTimeout(topengTimer)
  }, [])

  useEffect(() => {
    if (modelsLoaded.cicak && cicakCanvasRef.current) {
      gsap.fromTo(
        cicakCanvasRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
        }
      )
    }
  }, [modelsLoaded.cicak])

  useEffect(() => {
    if (modelsLoaded.topeng && topengCanvasRef.current) {
      gsap.fromTo(
        topengCanvasRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
        }
      )
    }
  }, [modelsLoaded.topeng])

  useEffect(() => {
    const aksaraRefs = [aksara1Ref, aksara2Ref, aksara3Ref]

    aksaraRefs.forEach((ref, index) => {
      if (ref.current) {
        const element = ref.current

        const handleMouseEnter = () => {
          setHoveredAksara(index)
          gsap.to(element, {
            duration: 0.3,
            ease: 'power2.out',
          })

          gsap.to(element.querySelectorAll('path'), {
            duration: 0.3,
            ease: 'power2.out',
            fill: 'rgba(255, 255, 255, 0.5)',
            stroke: 'var(--color-primary)',
            strokeWidth: 1,
          })
        }

        const handleMouseLeave = () => {
          setHoveredAksara(null)
          gsap.to(element, {
            duration: 0.3,
            ease: 'power2.out',
          })

          gsap.to(element.querySelectorAll('path'), {
            duration: 0.3,
            ease: 'power2.out',
            fill: 'currentColor',
            stroke: 'none',
            strokeWidth: 0,
          })
        }

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          element.removeEventListener('mouseenter', handleMouseEnter)
          element.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    })
  }, [])

  // Add intersection observer for the hero section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setModelsVisible(entry.isIntersecting)
        // Pause animations when not in view to save resources
        setModelsPaused(!entry.isIntersecting)
      },
      {
        threshold: 0.3,
        rootMargin: '100px'
      }
    )

    const heroSection = document.querySelector('section') // Adjust selector as needed
    if (heroSection) {
      observer.observe(heroSection)
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <section className='relative max-h-[90vh] md:min-h-[900px] md:h-[50vh] lg:h-screen lg:max-h-[1080px] max-w-screen overflow-hidden'>
      <div className="flex relative justify-center lg:top-30 md:top-28 top-32 2xl:top-42">
        <div className="absolute -top-4 flex flex-col items-center gap-y-4 lg:gap-y-8 px-4 lg:px-0 pt-4 lg:pt-0">
          <div
            ref={indicatorRef}
            className="flex items-center gap-x-2 lg:gap-x-4 px-3 lg:px-4 py-2 bg-gray-50 border border-black/10 rounded-full"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
            <span className="text-black/80 text-sm lg:text-base">{t('hero.indicator')}</span>
          </div>
          <div className="flex flex-col items-center gap-y-3 lg:gap-y-6">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-black text-center leading-tight"
            >
              {t('hero.title.main')}{' '}
              <span className="text-primary font-bold">{t('hero.title.highlight')}</span>
            </h1>
            <p
              ref={subheadingRef}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 text-center max-w-2xl mx-auto"
            >
              {t('hero.subtitle')}
            </p>
          </div>
          <div
            ref={groupButtonRef}
            className="flex flex-col sm:flex-row items-center gap-3 lg:gap-x-4"
          >
            <Link href="/tryon" className="group relative overflow-hidden flex items-center gap-x-2 bg-primary/10 border border-primary/15 px-3 lg:px-4 py-2 rounded-full hover:bg-primary transition-colors cursor-pointer w-full sm:w-auto justify-center">
              <LineSquiggle
                size={16}
                className="absolute -left-6 group-hover:left-3 lg:group-hover:left-4 text-white transition-all duration-300 ease-out"
              />
              <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-primary font-medium transition-all duration-300 text-sm lg:text-base">
                {t('hero.startLearning')}
              </span>
            </Link>
            <Link href="/history" className="group relative overflow-hidden flex items-center gap-x-2 bg-gray-100 border border-gray-200 px-3 lg:px-4 py-2 rounded-full hover:bg-gray-600 transition-colors cursor-pointer w-full sm:w-auto justify-center">
              <Library
                size={16}
                className="absolute -left-6 group-hover:left-3 lg:group-hover:left-4 text-white transition-all duration-300 ease-out"
              />
              <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-gray-600 font-medium transition-all duration-300 text-sm lg:text-base">
                {t('hero.tryNow')}
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-12 mt-6 sm:mt-8 lg:mt-16 overflow-x-auto overflow-hidden px-4 lg:px-0">
            <svg
              ref={aksara1Ref}
              width="80"
              height="80"
              viewBox="0 0 238 94"
              className="cursor-pointer text-black flex-shrink-0 sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[200px] lg:h-[200px]"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M88.369 21.5737C78.9194 17.1086 67.6664 15.5199 55.5538 16.5503C42.2815 17.7095 28.0642 22.2173 13.6322 29.7306C9.20811 31.8344 3.92496 29.9024 1.82029 25.4802C-0.241422 21.0152 1.64848 15.7343 6.11553 13.6306C27.1193 4.91509 47.4357 1.4375 65.1321 3.45537C77.6312 4.87218 88.8413 8.77925 97.9473 15.391C120.154 2.21043 138.537 -1.05262 151.466 1.86686C164.652 4.78633 173.157 13.4161 175.82 25.094C179.6 41.7522 170.751 65.9237 142.918 86.2312C140.814 87.7768 137.808 87.3905 136.219 85.2868C134.629 83.183 135.059 80.1774 137.163 78.5889C155.59 64.2062 164.395 48.493 165.082 35.57C165.641 24.7937 159.67 16.4215 148.889 14.4036C139.483 12.6433 127.112 15.3482 112.337 23.5485C92.4068 34.6253 68.7824 55.7484 43.011 90.4815C40.0043 94.3455 34.4209 95.0754 30.5552 92.113C26.6465 89.1077 25.9168 83.5267 28.9235 79.6198C50.3138 52.7864 70.4149 34.0244 88.369 21.5737ZM203.009 62.1456L191.928 52.0993C188.706 48.45 189.007 42.8255 192.701 39.5625C196.394 36.2996 201.978 36.6433 205.242 40.3356L212.888 51.0689L223.068 39.6915C226.676 36.3427 232.303 36.6002 235.61 40.2067C238.96 43.8131 238.703 49.4376 235.095 52.7864L221.349 63.047L227.019 71.0331C228.738 73.008 228.566 76.0131 226.591 77.7734C224.658 79.4907 221.608 79.3191 219.89 77.3442L211.9 70.1311L201.85 77.6875C199.874 79.4907 196.867 79.3621 195.106 77.4301C193.302 75.4981 193.431 72.4496 195.364 70.6893L203.009 62.1456Z"
                fill="currentColor"
              />
            </svg>

            <svg
              ref={aksara2Ref}
              width="80"
              height="80"
              viewBox="0 0 184 93"
              className="cursor-pointer text-black flex-shrink-0 sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[200px] lg:h-[200px]"
              fill="none"
            >
              <path
                d="M1.99764 65.0717C4.31706 69.365 9.68526 71.0393 14.0235 68.7209C41.1264 53.6942 67.5853 46.3528 93.6574 45.8806C118.097 45.4512 142.108 50.9898 165.775 61.5944L131.413 83.5333C129.179 84.9072 128.493 87.8262 129.867 90.0587C131.241 92.3342 134.161 93.0216 136.395 91.6478L180.421 65.7158C182.182 64.6425 183.214 62.7532 183.171 60.6924C183.085 58.6316 181.925 56.7854 180.121 55.8409C152.073 40.3849 123.295 31.8842 93.6574 31.3261C65.1799 30.7679 35.8865 37.68 5.69093 53.0501C1.35274 55.3256 -0.278842 60.7354 1.99764 65.0717Z"
                fill="currentColor"
              />
              <path
                d="M1.22374 19.4334C2.38345 24.199 7.19412 27.1616 11.9618 26.0024C39.4514 18.6178 66.6833 14.7539 93.7004 14.2816C121.448 13.7664 148.98 16.7289 176.298 22.9543C178.832 23.5983 181.452 22.0524 182.097 19.5194C182.741 16.9434 181.195 14.3675 178.617 13.7235C150.741 5.90958 122.479 1.48722 93.7864 0.628554C65.5237 -0.273048 36.8743 2.38885 7.75258 8.70006C2.98486 9.85926 0.0640251 14.6678 1.22374 19.4334Z"
                fill="currentColor"
              />
            </svg>

            <svg
              ref={aksara3Ref}
              width="80"
              height="80"
              viewBox="0 0 183 99"
              className="cursor-pointer text-black flex-shrink-0 sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[200px] lg:h-[200px]"
              fill="none"
            >
              <path
                d="M51.773 17.2581C62.3393 18.9325 72.1327 22.0236 81.0238 26.7892C58.8174 39.8409 42.1087 56.6279 30.2538 76.7208C28.6216 79.3827 29.3523 82.8172 31.8435 84.6204C38.2864 89.0425 45.8462 92.5202 54.5655 94.9245C64.7882 97.7152 76.6853 99.0462 90.3441 98.7457C93.0072 98.7457 95.1123 96.642 95.1123 93.9801C95.1123 91.3612 92.9642 89.2146 90.3441 89.2575C80.0785 89.0429 70.9301 87.9265 62.8551 85.9086C55.5102 84.1054 49.1103 81.5292 43.5265 78.2233C55.639 61.2217 71.9181 47.3543 93.0077 37.0074C111.95 27.7337 134.758 21.3365 161.775 18.0306C166.671 17.3436 170.021 12.8358 169.334 7.9843C168.647 3.13282 164.137 -0.25896 159.283 0.427975C132.824 4.76425 110.317 11.7198 91.375 21.1652C80.6369 13.0078 68.3102 7.38344 54.4795 3.90584C40.52 0.385293 25.0569 -0.645361 8.09073 0.427975C3.19416 0.943177 -0.328306 5.36545 0.230075 10.2169C0.788456 15.1113 5.16981 18.6317 10.0664 18.0736C25.0997 15.7122 39.0161 15.3261 51.773 17.2581Z"
                fill="currentColor"
              />
              <path
                d="M133.512 44.821C130.032 48.2557 130.032 53.9231 133.512 57.3578L174.703 92.6919C176.55 94.538 179.556 94.538 181.446 92.6919C183.293 90.8458 183.293 87.8406 181.446 85.9516L146.096 44.821C142.617 41.3434 136.991 41.3434 133.512 44.821Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <Image
          src="/ring.webp"
          alt="Background Ring"
          width={1280}
          height={0}
          className="h-[100vh] md:min-h-[900px] max-h-[1080px] object-cover object-center w-auto"
          priority={true}
        />
      </div>

      {/* Aksara Popup */}
      {hoveredAksara !== null && (
        <div
          className="fixed pointer-events-none z-50 bg-white/50 backdrop-blur-2xl border border-gray-200 rounded-lg shadow-lg p-3 lg:p-4 min-w-[200px] lg:min-w-[240px] max-w-[280px] lg:max-w-none"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div className="flex flex-col items-start gap-y-2 lg:pr-4">
              <div className="flex items-center gap-2 lg:gap-4 mb-2 lg:mb-3">
                <div className="text-xl lg:text-2xl font-bold text-primary">
                  {aksaraPopup[hoveredAksara].aksaraLabel}
                </div>
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs lg:text-sm rounded-full">
                  {aksaraPopup[hoveredAksara].type}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs lg:text-sm text-gray-600">{t('hero.aksaraInfo.consonantBase')}:</span>
                  <span className="font-medium text-sm lg:text-base">
                    {aksaraPopup[hoveredAksara].consonantBase}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs lg:text-sm text-gray-600">{t('hero.aksaraInfo.vowelBase')}:</span>
                  <span className="font-medium text-sm lg:text-base">
                    {aksaraPopup[hoveredAksara].vowelBase === '-'
                      ? 'Tidak ada'
                      : aksaraPopup[hoveredAksara].vowelBase}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col border-t lg:border-t-0 lg:border-l border-gray-200 mt-3 lg:mt-0 pt-3 lg:pt-0">
              <div className="flex flex-col items-center px-3 lg:px-6 py-2">
                <Image
                  src={aksaraPopup[hoveredAksara].consonantPath}
                  alt="Aksara"
                  width={32}
                  height={32}
                  className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                />
                <div className="text-xs lg:text-sm text-gray-600">
                  {aksaraPopup[hoveredAksara].consonantBase}
                </div>
              </div>
              <div className="flex flex-col items-center px-3 lg:px-6 py-2 border-l lg:border-l-0 lg:border-t border-gray-200">
                <Image
                  src={aksaraPopup[hoveredAksara].vowelPath}
                  alt="Aksara"
                  width={32}
                  height={32}
                  className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                />
                <div className="text-xs lg:text-sm text-gray-600">
                  {aksaraPopup[hoveredAksara].vowelBase === '-'
                    ? 'Tidak ada'
                    : aksaraPopup[hoveredAksara].vowelBase}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Models - Hidden on mobile and tablet, positioned relative to center */}
      <div
        ref={cicakCanvasRef}
        className="hidden xl:block"
        style={{
          position: 'absolute',
          top: 60,
          left: '50%',
          transform: 'translateX(calc(50% + 80px))',
        }}
      >
        <Canvas
          style={{
            background: 'transparent',
            width: 540,
            height: 540,
          }}
          camera={{
            position: [0, 10, 0],
            rotation: [-Math.PI / 2, 0, 0],
            fov: 60,
            zoom: 10,
          }}
        >
          <Suspense fallback={null}>
            <CicakModel 
              rotation={[0, -Math.PI / 4, 0]} 
              isVisible={modelsVisible && modelsLoaded.cicak}
              isPaused={modelsPaused}
            />
          </Suspense>

          <ambientLight intensity={1.5} />
          <directionalLight position={[0, 10, 0]} intensity={10} />
          <directionalLight position={[5, 10, 5]} intensity={5} />
          <directionalLight position={[-5, 10, -5]} intensity={0.8} />
        </Canvas>
      </div>

      <div
        ref={topengCanvasRef}
        className="hidden xl:block"
        style={{
          position: 'absolute',
          top: 280,
          left: '50%',
          transform: 'translateX(calc(-50% - 560px))',
        }}
      >
        <Canvas
          style={{
            background: 'transparent',
            width: 460,
            height: 460,
          }}
          camera={{
            position: [0, 10, 0],
            rotation: [-Math.PI / 2, 0, 0],
            fov: 60,
            zoom: 10,
          }}
        >
          <Suspense fallback={null}>
            <TopengModel 
              rotation={[-Math.PI / 2, Math.PI / 4, Math.PI / 8]} 
              isVisible={modelsVisible && modelsLoaded.topeng}
              isPaused={modelsPaused}
            />
          </Suspense>

          <ambientLight intensity={1.5} />
          <directionalLight position={[0, 10, 0]} intensity={10} />
          <directionalLight position={[5, 10, 5]} intensity={5} />
          <directionalLight position={[-5, 10, -5]} intensity={0.8} />
        </Canvas>
      </div>
    </section>
  )
}
