'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'

interface LanguageContextType {
  currentLanguage: string
  changeLanguage: (language: string) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for i18n to be ready
    const checkI18nReady = () => {
      if (i18n.isInitialized) {
        setIsLoading(false)
      } else {
        setTimeout(checkI18nReady, 100)
      }
    }
    checkI18nReady()
  }, [i18n])

  const changeLanguage = useCallback(async (language: string) => {
    setIsLoading(true)
    try {
      await i18n.changeLanguage(language)
      // Update document lang attribute
      document.documentElement.lang = language
    } catch (error) {
      console.error('Failed to change language:', error)
    } finally {
      setIsLoading(false)
    }
  }, [i18n])

  const value = useMemo(() => ({
    currentLanguage: i18n.language,
    changeLanguage,
    isLoading,
  }), [i18n.language, changeLanguage, isLoading])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Language options
export const languages = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '/id-id.svg' },
  { code: 'en', name: 'English', flag: '/en-us.svg' },
] as const

export type LanguageCode = typeof languages[number]['code']
