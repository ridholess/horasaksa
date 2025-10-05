import type { Metadata } from 'next'
import gilroy from '@fonts/handler'
import { Amiri } from 'next/font/google'
import '@/app/globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LanguageUpdater from '@/components/LanguageUpdater'

const amiri = Amiri({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

export const metadata: Metadata = {
  title: 'Learn Aksara Batak',
  description: 'Belajar aksara Batak dengan mudah dan menyenangkan',
  keywords:
    'Aksara Batak, Batak script, Indonesian culture, traditional writing, language learning',
  authors: [{ name: 'Alie Pratama' }],
  openGraph: {
    title: 'Learn Aksara Batak',
    description: 'Discover the beauty of traditional Batak script',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${gilroy.className} ${amiri.variable} antialiased`}>
        <LanguageProvider>
          <LanguageUpdater />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
