'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, ChevronDown, Pencil, Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/LanguageContext'

interface NavigationProps {
  darkMode?: boolean
  forceScrolled?: boolean
  disableScrollAnimation?: boolean
}

export default function Navigation({ 
  darkMode = false, 
  forceScrolled = false,
  disableScrollAnimation = false 
}: NavigationProps) {
  const { t } = useTranslation()
  const { currentLanguage, changeLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(forceScrolled)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRefNotScrolled = useRef<HTMLImageElement>(null)
  const logoRefScrolled = useRef<HTMLImageElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const navigationRoutes = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.history'), href: '/history' },
    { name: t('navigation.about'), href: '/about' },
  ]

  useEffect(() => {
    // Skip scroll listener if animation is disabled or forced
    if (disableScrollAnimation || forceScrolled) {
      return
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 0
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)

        gsap.to(navRef.current, {
          width: scrolled ? '90%' : '100%',
          marginTop: scrolled ? 16 : 0,
          paddingLeft: scrolled ? 24 : 16,
          borderRadius: scrolled ? 200 : 0,
          duration: 0.6,
          ease: 'power2.out',
        })

        if (scrolled) {
          gsap.to(logoRefNotScrolled.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.inOut',
          })

          gsap.to(logoRefScrolled.current, {
            opacity: 1,
            duration: 0.3,
            delay: 0.1,
            ease: 'power2.inOut',
          })
        } else {
          gsap.to(logoRefScrolled.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.inOut',
          })

          gsap.to(logoRefNotScrolled.current, {
            opacity: 1,
            duration: 0.3,
            delay: 0.1,
            ease: 'power2.inOut',
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled, disableScrollAnimation, forceScrolled])

  // Handle forced scrolled state changes
  useEffect(() => {
    if (forceScrolled !== undefined) {
      setIsScrolled(forceScrolled)
      
      gsap.to(navRef.current, {
        width: forceScrolled ? '90%' : '100%',
        marginTop: forceScrolled ? 16 : 0,
        paddingLeft: forceScrolled ? 24 : 16,
        borderRadius: forceScrolled ? 200 : 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      if (forceScrolled) {
        gsap.to(logoRefNotScrolled.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.inOut',
        })

        gsap.to(logoRefScrolled.current, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.inOut',
        })
      } else {
        gsap.to(logoRefScrolled.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.inOut',
        })

        gsap.to(logoRefNotScrolled.current, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.inOut',
        })
      }
    }
  }, [forceScrolled])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)

    if (!isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        display: 'block',
      })
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = 'none'
          }
        },
      })
    }
  }

  // Add useEffect to close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        if (mobileMenuRef.current) {
          gsap.set(mobileMenuRef.current, {
            opacity: 0,
            display: 'none',
          })
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-90 border ${
          darkMode
            ? isScrolled
              ? 'bg-gray-900/20 border-gray-700/20 text-white backdrop-blur-md'
              : 'bg-transparent border-transparent text-white'
            : 'bg-white/80 border-gray-200/50 backdrop-blur-md'
        }`}
        style={{
          width: '100%',
          maxWidth: 'none',
          marginTop: '0px',
          paddingLeft: '16px',
        }}
      >
        <div className="px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative">
            <Image
              ref={logoRefNotScrolled}
              src={darkMode ? '/logo_horas_dark.webp' : '/logo_horas.webp'}
              alt="Logo"
              width={140}
              height={0}
              className="!h-auto aspect-auto sm:w-[140px] w-[100px]"
              priority={false}
            />
            <Image
              ref={logoRefScrolled}
              src="/favicon.webp"
              alt="Logo"
              width={40}
              height={0}
              className="!h-auto aspect-auto absolute top-0 left-0 opacity-0 sm:w-[40px] w-[30px]"
              priority={false}
            />
          </Link>

          {/* Desktop Navigation - Only show on large screens */}
          <ul className="hidden xl:flex gap-12 font-medium">
            {navigationRoutes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`hover:tracking-wide transition-all cursor-pointer ${
                    darkMode ? 'text-gray-100 hover:text-white' : 'hover:text-primary'
                  }`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right Side - Only show on large screens */}
          <div className="hidden xl:flex items-center gap-8">
            <div className="relative group">
              <div
                className={`flex items-center gap-2 text-sm font-medium cursor-pointer ${
                  darkMode ? 'text-gray-100' : ''
                }`}
              >
                <Globe size={16} />
                <span>{currentLanguage.toUpperCase()}</span>
                <ChevronDown
                  size={14}
                  className="transition-transform group-hover:rotate-180"
                />
              </div>
              <div
                className={`absolute top-full mt-2 right-0 backdrop-blur-md border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-800/95 border-gray-700/50'
                    : 'bg-white/95 border-gray-200/50'
                }`}
              >
                <div
                  className={`px-4 py-2 cursor-pointer flex justify-center items-center gap-2 text-sm font-medium rounded-t-lg ${
                    darkMode
                      ? 'hover:bg-gray-700 text-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => changeLanguage('id')}
                >
                  <Image
                    src="/id-id.svg"
                    alt="ID Flag"
                    width={16}
                    height={16}
                  />
                  ID
                </div>
                <div
                  className={`px-4 py-2 cursor-pointer flex justify-center items-center gap-2 text-sm font-medium rounded-b-lg ${
                    darkMode
                      ? 'hover:bg-gray-700 text-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => changeLanguage('en')}
                >
                  <Image
                    src="/en-us.svg"
                    alt="EN Flag"
                    width={16}
                    height={16}
                  />
                  EN
                </div>
              </div>
            </div>
            <Link
              href="/tryon"
              className={`group relative overflow-hidden flex items-center gap-x-2 px-4 py-2 rounded-full transition-colors cursor-pointer ${
                darkMode
                  ? 'bg-white/10 border border-white/20 hover:bg-white hover:text-gray-900'
                  : 'bg-primary/10 border border-primary/15 hover:bg-primary'
              }`}
            >
              <Pencil
                size={16}
                className={`absolute -left-6 group-hover:left-4 transition-all duration-300 ease-out ${
                  darkMode ? 'text-gray-900' : 'text-white'
                }`}
              />
              <span
                className={`group-hover:font-bold group-hover:ml-5 text-sm font-medium transition-all duration-300 ${
                  darkMode
                    ? 'text-white group-hover:text-gray-900'
                    : 'text-primary group-hover:text-white'
                }`}
              >
                {t('navigation.tryOn')}
              </span>
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button - Show on tablet and mobile */}
          <button
            className={`xl:hidden p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Menu - Add !xl:block to force hide on desktop */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md backdrop-blur-md border rounded-lg shadow-lg z-40 xl:!hidden ${
          darkMode
            ? 'bg-gray-900/95 border-gray-700/50 text-white'
            : 'bg-white/95 border-gray-200/50'
        }`}
        style={{ display: 'none', opacity: 0 }}
      >
        <div className="p-6 space-y-6">
          {/* Navigation Links */}
          <ul className="space-y-4">
            {navigationRoutes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`block hover:text-primary transition-colors cursor-pointer py-2 border-b text-lg font-medium ${
                    darkMode ? 'border-gray-700 text-gray-100' : 'border-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Selector */}
          <div className="space-y-3">
            <p
              className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t('navigation.language')}
            </p>
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
                  currentLanguage === 'id'
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : darkMode
                    ? 'hover:bg-gray-800 border border-gray-700 text-gray-100'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => changeLanguage('id')}
              >
                <Image src="/id-id.svg" alt="ID Flag" width={18} height={18} />
                Indonesia
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
                  currentLanguage === 'en'
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : darkMode
                    ? 'hover:bg-gray-800 border border-gray-700 text-gray-100'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => changeLanguage('en')}
              >
                <Image src="/en-us.svg" alt="EN Flag" width={18} height={18} />
                English
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href="/tryon"
              className="w-full flex items-center justify-center gap-3 bg-primary px-6 py-4 rounded-full hover:bg-primary/90 transition-colors font-medium text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Pencil size={18} />
              <span>{t('navigation.tryOn')}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
