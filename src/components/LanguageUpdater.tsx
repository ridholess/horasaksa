'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'

export default function LanguageUpdater() {
  const { currentLanguage } = useLanguage()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage || 'id'
    }
  }, [currentLanguage])

  return null
}
