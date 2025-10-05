'use client'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const HistoryCard = React.memo(({ item, index }: { item: any, index: number }) => (
  <div key={`${item.title}-${index}`} className="flex flex-col gap-y-3 w-80 p-4 bg-white/5 border border-white/10 rounded-lg flex-shrink-0 transition-all duration-300 hover:bg-white/10 text-start">
    <h3 className="text-xl text-white font-bold">{item.title}</h3>
    <p className="text-white/60 overflow-hidden line-clamp-4 text-sm">
      {item.description}
    </p>
  </div>
))

HistoryCard.displayName = 'HistoryCard'

export default function OverviewHistory() {
  const { t } = useTranslation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const historyData = [
    {
      title: t('history.timeline.ancient.period'),
      description: t('history.timeline.ancient.description'),
    },
    {
      title: t('history.timeline.colonial.period'),
      description: t('history.timeline.colonial.description'),
    },
    {
      title: t('history.timeline.modern.period'),
      description: t('history.timeline.modern.description'),
    },
  ]

  // Duplicate the data for seamless loop
  const duplicatedData = [...historyData, ...historyData]

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Create infinite horizontal scroll animation from right to left
      animationRef.current = gsap.to(scrollContainerRef.current, {
        x: '-50%',
        duration: 30,
        ease: 'none',
        repeat: -1,
      })

      // Add hover event listeners
      const container = scrollContainerRef.current
      
      const handleMouseEnter = () => {
        if (animationRef.current) {
            gsap.to(animationRef.current, { timeScale: 0, duration: 0.5, ease: "power2.out" })
        }
      }

      const handleMouseLeave = () => {
        if (animationRef.current) {
          gsap.to(animationRef.current, { timeScale: 1, duration: 0.5, ease: "power2.out" })
        }
      }

      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)

      // Cleanup
      return () => {
        if (animationRef.current) {
          animationRef.current.kill()
        }
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section className="relative h-[80vh] max-h-[420px] sm:h-[90vh] sm:max-h-[520px] md:h-screen md:max-h-[640px] bg-gray-950 flex overflow-hidden">
      <div className="w-full relative flex flex-col py-12 md:py-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 gap-y-4 sm:gap-y-5 md:gap-y-6 text-center md:text-start items-center md:items-start">
        <div className="flex flex-col gap-y-1 sm:gap-y-2 z-30">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">{t('history.title.main')}</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">{t('history.title.highlight')}</h2>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-sm md:max-w-md z-30">
          {t('history.subtitle')}
        </p>

        <Link href="/history" className="group relative w-fit overflow-hidden flex items-center gap-x-1 sm:gap-x-2 bg-white/10 border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-white/20 transition-all duration-500 cursor-pointer">
          <span className="group-hover:text-white group-hover:mr-3 sm:group-hover:mr-5 text-white/80 group-hover:font-bold transition-all duration-500 ease-out text-sm sm:text-base">
            {t('cta.learnMore')}
          </span>
          <ArrowRight
            size={14}
            className="absolute -right-6 group-hover:right-3 sm:group-hover:right-4 text-white transition-all duration-500 ease-out sm:w-4 sm:h-4"
          />
        </Link>

        {/* Container with overflow hidden and relative positioning */}
        <div className='relative block w-full'>
          <div className="absolute h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden -translate-x-4 sm:-translate-x-8 md:-translate-x-12 lg:-translate-x-20">
          {/* Backdrop blur gradients for left and right edges */}
          <div className="absolute hidden md:block top-0 left-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent backdrop-blur-sm z-10 pointer-events-none"></div>
          
          {/* Moving container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 py-2 sm:py-3 md:py-4 cursor-pointer"
          >
            {duplicatedData.map((item, index) => (
              <HistoryCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
        </div>
        
        {/* Desktop Background Image */}
        <div className="absolute hidden md:block top-0 -right-20 h-full overflow-hidden">
          <Image
            src="/section_history.webp"
            alt="Kain Tradisional Batak"
            width={600}
            height={0}
            className="relative top-0 right-0 h-screen max-h-[640px] !w-auto object-cover z-20"
            priority={false}
          />
          <div className="absolute hidden md:block top-0 right-32 bottom-0 w-60 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent backdrop-blur-sm z-10 pointer-events-none"></div>
        </div>

        {/* Tablet Background Image */}
        <div className="hidden sm:block md:hidden absolute top-0 -left-[calc(50%_-_300px)] h-full overflow-hidden">
          <Image
            src="/sh_tab_left.webp"
            alt="Kain Tradisional Batak"
            width={300}
            height={0}
            className="relative top-0 left-0 !min-h-screen !w-auto object-cover z-20"
            priority={false}
          />
        </div>
        <div className="absolute hidden sm:block md:hidden left-0 w-24 h-full bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent backdrop-blur-sm z-10 pointer-events-none"></div>
        <div className="absolute hidden sm:block md:hidden right-0 w-24 h-full bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent backdrop-blur-sm z-10 pointer-events-none"></div>
        <div className="hidden sm:block md:hidden absolute top-0 -right-[calc(50%_-_300px)] h-full overflow-hidden">
          <Image
            src="/sh_tab_right.webp"
            alt="Kain Tradisional Batak"
            width={300}
            height={0}
            className="relative top-0 right-0 !min-h-screen !w-auto object-cover z-20"
            priority={false}
          />
        </div>
        {/* Mobile Background Image */}
        <div className="block sm:hidden absolute top-0 left-0 h-1/2 w-1/2 overflow-hidden">
          <Image
            src="/sh_mobile_lt.webp"
            alt="Kain Tradisional Batak"
            width={200}
            height={0}
            className="relative top-0 left-0 !h-full !w-auto object-cover z-20"
            priority={false}
          />
        </div>
        <div className="block sm:hidden absolute bottom-8 left-0 h-1/8 overflow-hidden">
          <Image
            src="/sh_mobile_lb.webp"
            alt="Kain Tradisional Batak"
            width={200}
            height={0}
            className="relative bottom-0 left-0 !h-full !w-auto object-cover z-20"
            priority={false}
          />
        </div>
        <div className="block sm:hidden absolute top-8 -right-1/4 h-1/8 overflow-hidden">
          <Image
            src="/sh_mobile_rt.webp"
            alt="Kain Tradisional Batak"
            width={200}
            height={0}
            className="relative top-0 right-0 !h-full !w-auto object-cover z-20"
            priority={false}
          />
        </div>
        <div className="block sm:hidden absolute bottom-0 right-0 h-1/2 w-1/2 overflow-hidden">
          <Image
            src="/sh_mobile_rb.webp"
            alt="Kain Tradisional Batak"
            width={200}
            height={0}
            className="relative bottom-0 right-0 !h-full !w-auto object-cover z-20"
            priority={false}
          />
        </div>
        <div className="absolute block sm:hidden left-0 w-16 h-full bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent backdrop-blur-sm z-10 pointer-events-none"></div>
        <div className="absolute block sm:hidden right-0 w-16 h-full bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent backdrop-blur-sm z-10 pointer-events-none"></div>
      </div>
    </section>
  )
}
