'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useLanguage, languages } from '@/contexts/LanguageContext'
import { gsap } from 'gsap'

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact'
  className?: string
}

export default function LanguageSwitcher({ 
  variant = 'default', 
  className = '' 
}: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage, isLoading } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        gsap.fromTo(dropdownRef.current, 
          { opacity: 0, y: -10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
        )
      }
    }
  }, [isOpen])

  const handleLanguageChange = async (langCode: string) => {
    if (langCode !== currentLanguage) {
      await changeLanguage(langCode)
    }
    setIsOpen(false)
  }

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm 
                     hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
        >
          <Image
            src={currentLang.flag}
            alt={currentLang.name}
            width={20}
            height={15}
            className="rounded-sm"
          />
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg 
                       border overflow-hidden z-50 min-w-[160px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 
                           transition-colors duration-150 text-left ${
                  currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  width={24}
                  height={18}
                  className="rounded-sm"
                />
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm 
                   hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
      >
        <Globe className="w-5 h-5" />
        <span className="font-medium">{currentLang.code.toUpperCase()}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg 
                     border overflow-hidden z-50 min-w-[200px]"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 
                         transition-colors duration-150 text-left ${
                currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <Image
                src={lang.flag}
                alt={lang.name}
                width={24}
                height={18}
                className="rounded-sm"
              />
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
