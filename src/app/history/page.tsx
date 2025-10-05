'use client'
import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/sections/Footer'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

interface Section {
  id: number
  subtitle: string
  title: string
  paragraph1: string
  paragraph2: string
  backgroundImage: string
  altText: string
}

const sections: Section[] = [
  {
    id: 1,
    subtitle: "Gema Aksara dari",
    title: "Jantung Tano Batak",
    paragraph1: "Dari puncak-puncak gunung yang memeluk Danau Toba dan lembah-lembah subur yang tersembunyi, lahirlah sebuah warisan agung. Di tanah yang penuh kekuatan spiritual ini, gema para leluhur tidak hanya diucapkan, tetapi juga diguratkan menjadi sebuah tanda peradaban yang disebut Surat Batak.",
    paragraph2: "Ia bukanlah sekadar rangkaian huruf untuk berkomunikasi. Setiap garis tajamnya adalah cerminan ketegasan jiwa, dan setiap lekuknya menyimpan kearifan mendalam. Aksara ini adalah kunci untuk membuka dunia magis, suara para tetua, dan penanda identitas yang luhur.",
    backgroundImage: "/history/toba.webp",
    altText: "Danau Toba dan Penari"
  },
  {
    id: 2,
    subtitle: "Pusaka Para Datu",
    title: "Bisikan Sang Pencipta",
    paragraph1: "Ilmu aksara ini tidak dimiliki sembarang orang. Ia adalah pusaka sakral yang dijaga ketat oleh para Datu/pendeta/dukun Batak yang dihormati. Mereka adalah para penjaga gerbang pengetahuan, yang memegang kunci untuk berkomunikasi dengan alam dan dunia spiritual.",
    paragraph2: "Di tangan para Datu, aksara ini menjelma menjadi mantra (poda), penunjuk takdir dalam kalender kosmik (porhalaan), dan catatan silsilah. Menuliskannya adalah sebuah ritual sakral, jembatan yang menghubungkan dunia manusia dengan kekuatan ilahi.",
    backgroundImage: "/history/sigale.webp",
    altText: "Patung Sigale gale"
  },
  {
    id: 3,
    subtitle: "Jejak Purba di",
    title: "Jalur Peradaban",
    paragraph1: "Para ahli menelusuri jejak aksara ini hingga ke daratan India, yang berakar dari Aksara Brahmi kuno. Melalui jalur perdagangan samudra, benih pengetahuan ini berlayar ke Nusantara, berpadu dengan pengaruh aksara Pallava dan Kawi Kuno yang lebih dulu berkembang.",
    paragraph2: "Namun, bangsa Batak tidak sekadar meniru. Mereka menyerap, mengubah, dan menempa ulang pengetahuan itu dengan filosofi mereka sendiri. Mereka memberinya bentuk yang khas dan otentik, menjadikannya cerminan sejati dari jiwa dan lanskap tanah Batak.",
    backgroundImage: "/history/aksarastone.webp",
    altText: "Batu bersurat Aksara Batak"
  },
  {
    id: 4,
    subtitle: "Terpahat Abadi di",
    title: "Kulit Kayu dan Bilah Bambu",
    paragraph1: "Warisan tak ternilai ini diabadikan bukan pada batu prasasti, melainkan pada media yang akrab dengan kehidupan mereka. Ia terpahat di atas bilah bambu, tanduk kerbau, dan yang paling ikonik, pada pustaha laklak kitab lipat dari kulit kayu alim.",
    paragraph2: "Kini, meskipun penggunaannya tak lagi seperti dulu, semangat Surat Batak menolak padam. Ia bangkit kembali sebagai simbol kebanggaan, tato budaya, dan pengingat abadi bahwa bangsa Batak adalah peradaban yang memiliki kearifan untuk menuliskan takdirnya sendiri.",
    backgroundImage: "/history/painting.webp",
    altText: "Aksara Batak di Era Digital"
  }
]

export default function History() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Handle scroll to control section transitions and animations
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // Hide scroll indicator when user starts scrolling
      if (scrollTop > 50 && !hasScrolled) {
        setHasScrolled(true)
      }
      
      const windowHeight = window.innerHeight
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )

      // Calculate scroll progress (0 to 1) - make it slower by reducing the effective scroll distance
      const maxScroll = documentHeight - windowHeight
      const rawProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1)
      
      // Apply easing to make scroll feel slower and smoother
      const progress = Math.pow(rawProgress, 1.5) // Exponential easing makes it slower at start
      setScrollProgress(progress)

      // Calculate current section based on scroll progress
      const sectionProgress = progress * sections.length
      const newCurrentSection = Math.min(Math.floor(sectionProgress), sections.length - 1)
      const sectionLocalProgress = sectionProgress - newCurrentSection

      if (newCurrentSection !== currentSection) {
        setCurrentSection(newCurrentSection)
      }

      // Control timeline based on scroll progress within section - make this slower too
      if (timelineRef.current) {
        const timelineProgress = Math.min(sectionLocalProgress * 0.8, 1) // Reduced from 1.5 to 0.8
        timelineRef.current.progress(timelineProgress)
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)

    // Increase scroll height to make scrolling feel slower
    document.body.style.height = `${sections.length * 200}vh` // Increased from 100vh to 200vh

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.height = 'auto'
    }
  }, [currentSection, hasScrolled])

  // Setup animations when section changes
  useEffect(() => {
    const currentSectionRef = sectionRefs.current[currentSection]
    if (currentSectionRef) {
      // Hide all sections first
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          if (index === currentSection) {
            ref.classList.remove('hidden')
            ref.classList.add('block')
            
            // Add blur transition effect
            gsap.fromTo(ref, 
              { 
                filter: 'blur(20px)', 
                opacity: 0 
              },
              { 
                filter: 'blur(0px)', 
                opacity: 1, 
                duration: 0.8,
                ease: 'power2.out'
              }
            )

            // Animate title words immediately
            const titleWords = ref.querySelectorAll('.title-word')
            gsap.set(titleWords, {
              opacity: 0,
              filter: 'blur(10px)',
              y: 30,
            })
            gsap.to(titleWords, {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              delay: 0.3,
            })

            // Setup paragraph animation timeline (but don't play it)
            const lineSpans = ref.querySelectorAll('.line-span')
            gsap.set(lineSpans, {
              opacity: 0,
              filter: 'blur(8px)',
              x: -30,
            })

            // Create timeline for paragraph animations
            const timeline = gsap.timeline({ paused: true })
            lineSpans.forEach((span, index) => {
              timeline.to(span, {
                opacity: 1,
                filter: 'blur(0px)',
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
              }, index * 0.15)
            })

            timelineRef.current = timeline
          } else {
            ref.classList.add('hidden')
            ref.classList.remove('block')
          }
        }
      })
    }
  }, [currentSection])

  return (
    <div>
      <Navigation darkMode={true} forceScrolled={false} disableScrollAnimation={true} />

      {/* Custom Scroll Indicator */}
      <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="w-1 h-32 sm:h-48 lg:h-64 bg-white/20 rounded-full">
          <div 
            className="w-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <p className="text-white/60 text-xs mt-2 writing-mode-vertical-rl text-orientation-mixed hidden sm:block">
          Gulir untuk menjelajah
        </p>
      </div>

      {/* Section Progress Indicator */}
      <div className="fixed left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-1 sm:gap-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSection 
                  ? 'bg-white scale-125' 
                  : index < currentSection 
                    ? 'bg-white/60' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Sections */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => { sectionRefs.current[index] = el }}
          className={`fixed inset-0 h-screen ${index === 0 ? 'block' : 'hidden'}`}
        >
          {/* Background Image */}
          <div className="w-full h-full">
            <Image
              src={section.backgroundImage}
              alt={section.altText}
              width={1200}
              height={600}
              className="w-full h-full object-cover object-middle"
            />
          </div>

          {/* Title */}
          <div className="absolute inset-0 top-20 sm:top-24 lg:top-28 flex flex-col items-center z-30 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center mt-2 sm:mt-4 max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/80 leading-relaxed">
              <span className="block">
                {section.subtitle.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="title-word inline-block mr-1 sm:mr-2">
                    {word}
                  </span>
                ))}
              </span>
              <span className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white text-center block mt-3 sm:mt-4 lg:mt-6 font-serif">
                {section.title.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="title-word inline-block mr-2 sm:mr-3">
                    {word}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* Scroll Down Indicator - Only show on first slide and when not scrolled */}
          {index === 0 && !hasScrolled && (
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center text-white/70 transition-opacity duration-500">
              <p className="text-xs sm:text-sm mb-2 font-light tracking-wide">Geser ke bawah</p>
              <div className="animate-bounce">
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          )}
          
          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col lg:flex-row justify-center items-start gap-x-4 gap-y-4 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black/80 to-transparent text-white/80 text-sm sm:text-base lg:text-lg xl:text-xl z-20">
            <p className="max-w-full lg:max-w-lg xl:max-w-xl">
              {section.paragraph1.split(/(?<=[.!?])\s+/).map((sentence, sentenceIndex) => (
                <span key={sentenceIndex} className="line-span">
                  {sentence}{' '}
                </span>
              ))}
            </p>
            <p className="max-w-full lg:max-w-lg xl:max-w-xl">
              {section.paragraph2.split(/(?<=[.!?])\s+/).map((sentence, sentenceIndex) => (
                <span key={sentenceIndex} className="line-span">
                  {sentence}{' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
