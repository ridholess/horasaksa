'use client'

import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className="bg-gray-900 py-4">
      <div className="container mx-auto text-center">
        <p className="text-white sm:text-sm md:text-base lg:text-lg">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
