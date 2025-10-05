'use client'

import Image from 'next/image'
import { LineSquiggle, Library } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Cta() {
  const { t } = useTranslation()
  
  return (
    <section className="relative h-screen lg:max-h-[1080px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 bg-gray-950 flex items-center overflow-hidden">
      <div className="flex flex-col gap-y-4 sm:gap-y-5 md:gap-y-6 w-full lg:w-auto">
        <div className="flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4 z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">{t('cta.title.main')}</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">{t('cta.title.highlight')}</h2>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-full sm:max-w-sm md:max-w-md z-10">
          {t('cta.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-x-4 z-10">
            <Link href="/tryon" className="group relative overflow-hidden flex items-center gap-x-2 bg-white/10 border border-white/15 px-3 sm:px-4 py-2 rounded-full hover:bg-white/20 transition-all cursor-pointer w-full sm:w-auto justify-center sm:justify-start">
              <LineSquiggle
                size={16}
                className="absolute -left-6 group-hover:left-3 sm:group-hover:left-4 text-white transition-all duration-300 ease-out"
              />
              <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-white/80 font-medium transition-all duration-300 text-sm sm:text-base">
                {t('cta.startNow')}
              </span>
            </Link>
            <Link href="/history" className="group relative overflow-hidden flex items-center gap-x-2 bg-white/10 border border-white/15 px-3 sm:px-4 py-2 rounded-full hover:bg-white/20 transition-all cursor-pointer w-full sm:w-auto justify-center sm:justify-start">
              <Library
                size={16}
                className="absolute -left-6 group-hover:left-3 sm:group-hover:left-4 text-white transition-all duration-300 ease-out"
              />
              <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-white/80 font-medium transition-all duration-300 text-sm sm:text-base">
                {t('cta.learnMore')}
              </span>
            </Link>
        </div>

        <Image
          src="/section_cta.webp"
          alt="Rumah Tradisional Batak"
          width={1280}
          height={0}
          className="h-full md:h-screen lg:!max-h-[1080px] !w-auto object-cover absolute top-0 right-0 opacity-30 sm:opacity-50 md:opacity-70 lg:opacity-100"
          priority={false}
        />
      </div>
    </section>
  )
}
