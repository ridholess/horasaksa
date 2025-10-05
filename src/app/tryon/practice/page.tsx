'use client'

import { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  CheckCircle,
  LineSquiggle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AksaraCanvas, { AksaraCanvasRef } from '@/components/CanvasAksara'

interface Character {
  latin: string
  svgPath: string
}

interface PredictionResult {
  isCorrect: boolean
  predicted: string
  expected: string
  confidence?: number
}

export default function TryOn() {
  const canvasRef = useRef<AksaraCanvasRef>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  // Grid scroll state
  const [isGridDragging, setIsGridDragging] = useState(false)
  const [gridDragStart, setGridDragStart] = useState<{ x: number; y: number } | null>(null)
  const [gridScrollStart, setGridScrollStart] = useState(0)

  const characters: Character[] = [
    { latin: 'A', svgPath: '/toba/a.svg' },
    { latin: 'BA', svgPath: '/toba/ba.svg' },
    { latin: 'DA', svgPath: '/toba/da.svg' },
    { latin: 'GA', svgPath: '/toba/ga.svg' },
    { latin: 'HA', svgPath: '/toba/ha.svg' },
    { latin: 'I', svgPath: '/toba/i.svg' },
    { latin: 'JA', svgPath: '/toba/ja.svg' },
    { latin: 'LA', svgPath: '/toba/la.svg' },
    { latin: 'MA', svgPath: '/toba/ma.svg' },
    { latin: 'NA', svgPath: '/toba/na.svg' },
    { latin: 'NGA', svgPath: '/toba/nga.svg' },
    { latin: 'NYA', svgPath: '/toba/nya.svg' },
    { latin: 'PA', svgPath: '/toba/pa.svg' },
    { latin: 'RA', svgPath: '/toba/ra.svg' },
    { latin: 'SA', svgPath: '/toba/sa.svg' },
    { latin: 'TA', svgPath: '/toba/ta.svg' },
    { latin: 'U', svgPath: '/toba/u.svg' },
    { latin: 'WA', svgPath: '/toba/wa.svg' },
    { latin: 'YA', svgPath: '/toba/ya.svg' },
  ]

  const currentCharacter = characters[currentIndex]

  useEffect(() => {
    // Update placeholder when character changes
    // if (canvasRef.current) {
    //   canvasRef.current.drawPlaceholder(currentCharacter.svgPath, 0.3)
    // }
    // Scroll to current character
    scrollToCurrentCharacter()
  }, [currentIndex])

  const scrollToCurrentCharacter = () => {
    if (cardContainerRef.current) {
      const cardHeight = 200 // Approximate card height + gap
      const scrollTop = currentIndex * cardHeight - 200 // Center the current card
      cardContainerRef.current.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth',
      })
    }
  }

  const nextCharacter = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length)
    canvasRef.current?.clear()
  }

  const prevCharacter = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + characters.length) % characters.length
    )
    canvasRef.current?.clear()
  }

  const selectCharacter = (index: number) => {
    setCurrentIndex(index)
    canvasRef.current?.clear()
  }

  // Touch handling for swipe gestures
  const minSwipeDistance = 50

  // Calculate centered position for the current character
  const getCenteredTransform = () => {
    // Mobile: w-20 h-20 (80px) + gap-4 (16px) = 96px per card
    // Tablet: w-24 h-24 (96px) + gap-4 (16px) = 112px per card
    // Use CSS custom properties for responsive centering
    const mobileCardSpacing = 96 // 80px + 16px
    const tabletCardSpacing = 112 // 96px + 16px
    
    return `translateX(calc(50% - ${currentIndex * mobileCardSpacing}px - 40px))`
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
    // Prevent default to avoid scrolling while swiping
    if (Math.abs((touchStart || 0) - e.targetTouches[0].clientX) > 10) {
      e.preventDefault()
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      nextCharacter()
    } else if (isRightSwipe) {
      prevCharacter()
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevCharacter()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextCharacter()
    }
  }

  // Grid scroll functions
  const handleGridMouseDown = (e: React.MouseEvent) => {
    if (!cardContainerRef.current) return
    
    setIsGridDragging(true)
    setGridDragStart({ x: e.clientX, y: e.clientY })
    setGridScrollStart(cardContainerRef.current.scrollTop)
    e.preventDefault()
  }

  const handleGridMouseMove = (e: React.MouseEvent) => {
    if (!isGridDragging || !gridDragStart || !cardContainerRef.current) return
    
    const deltaY = e.clientY - gridDragStart.y
    const newScrollTop = gridScrollStart - deltaY // Invert for natural scroll direction
    cardContainerRef.current.scrollTop = Math.max(0, newScrollTop)
    e.preventDefault()
  }

  const handleGridMouseUp = () => {
    setIsGridDragging(false)
    setGridDragStart(null)
    setGridScrollStart(0)
  }

  const handleGridTouchStart = (e: React.TouchEvent) => {
    if (!cardContainerRef.current) return
    
    const touch = e.touches[0]
    setGridDragStart({ x: touch.clientX, y: touch.clientY })
    setGridScrollStart(cardContainerRef.current.scrollTop)
  }

  const handleGridTouchMove = (e: React.TouchEvent) => {
    if (!gridDragStart || !cardContainerRef.current) return
    
    const touch = e.touches[0]
    const deltaY = touch.clientY - gridDragStart.y
    const newScrollTop = gridScrollStart - deltaY // Invert for natural scroll direction
    cardContainerRef.current.scrollTop = Math.max(0, newScrollTop)
    e.preventDefault()
  }

  const handleGridTouchEnd = () => {
    setGridDragStart(null)
    setGridScrollStart(0)
  }

  // Global mouse events for grid drag
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isGridDragging || !gridDragStart || !cardContainerRef.current) return
      
      const deltaY = e.clientY - gridDragStart.y
      const newScrollTop = gridScrollStart - deltaY
      cardContainerRef.current.scrollTop = Math.max(0, newScrollTop)
    }

    const handleGlobalMouseUp = () => {
      setIsGridDragging(false)
      setGridDragStart(null)
      setGridScrollStart(0)
    }

    if (isGridDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isGridDragging, gridDragStart, gridScrollStart])

  const checkDrawing = async () => {
    if (!canvasRef.current) return

    setIsChecking(true)

    try {
      // Get image as data URL
      const imageDataURL = canvasRef.current.getImageData()
      if (!imageDataURL) return

      // Make API request
      const response = await fetch(
        'https://serverless.roboflow.com/infer/workflows/aliepratama/custom-workflow-2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: 'lgaChOHB1kL6t2y2FJLq',
            inputs: {
              image: { type: 'base64', value: imageDataURL },
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      // Extract prediction from result
      let predictedClass = ''
      let confidence = 0

      if (result.outputs && result.outputs.length > 0) {
        predictedClass = result.outputs[0].model_predictions.top
        confidence = result.outputs[0].model_predictions.confidence
      }

      // Compare with current character
      const isCorrect =
        predictedClass.toUpperCase() === currentCharacter.latin.toUpperCase()

      setPredictionResult({
        isCorrect,
        predicted: predictedClass,
        expected: currentCharacter.latin,
        confidence: Math.round(confidence * 100),
      })

      setShowResult(true)
    } catch (error) {
      console.error('Error checking drawing:', error)
      setPredictionResult({
        isCorrect: false,
        predicted: 'Error',
        expected: currentCharacter.latin,
      })
      setShowResult(true)
    } finally {
      setIsChecking(false)
    }
  }

  const closeResult = () => {
    setShowResult(false)
    setPredictionResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Result Modal */}
        {showResult && predictionResult && (
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeResult}
          >
            <div
              className="bg-white rounded-3xl px-4 sm:px-8 py-4 w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row items-center relative z-10">
                {/* Character Illustration */}
                <div className="flex justify-center">
                  <Image
                    src={
                      predictionResult.isCorrect
                        ? '/tryon/correct.webp'
                        : '/tryon/wrong.webp'
                    }
                    alt={predictionResult.isCorrect ? 'Correct' : 'Wrong'}
                    width={400}
                    height={400}
                    className="w-48 h-48 md:w-64 md:h-64 -mb-4 object-cover object-center"
                    unoptimized
                    />
                </div>

                <div className="flex flex-col gap-y-4 md:gap-y-8">
                  {/* Main Message */}
                  <h3 className="text-2xl md:text-4xl text-gray-800 text-center md:text-left">
                    {predictionResult.isCorrect ? 'Kamu hebat!' : 'Coba lagi!'}
                  </h3>

                  {/* Score/Details */}
                  <div className="max-w-lg">
                    <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
                      {predictionResult.isCorrect
                        ? `Kamu sudah bisa menulis ${predictionResult.expected} dengan baik.`
                        : `Tulisan kamu masih belum mirip dengan ${predictionResult.predicted}. Coba tulis ${predictionResult.expected} lagi.`}
                    </p>

                    <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
                      Tulisan aksaramu aku beri nilai{' '}
                      <span className="font-bold">
                        {predictionResult.confidence}/100
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={closeResult}
                      className="group relative overflow-hidden flex items-center justify-center gap-x-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-600 transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      <ArrowLeft
                        size={16}
                        className="absolute -left-6 group-hover:left-4 text-white transition-all duration-300 ease-out"
                      />
                      <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-gray-600 font-medium transition-all duration-300">
                        Kembali
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        closeResult()
                        if (predictionResult.isCorrect) {
                          nextCharacter()
                        } else {
                          canvasRef.current?.clear()
                        }
                      }}
                      className="group relative overflow-hidden flex items-center justify-center gap-x-2 bg-primary/10 border border-primary/15 px-4 py-6 rounded-full hover:bg-primary transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      <LineSquiggle
                        size={16}
                        className="absolute -left-6 group-hover:left-4 text-white transition-all duration-300 ease-out"
                      />
                      <span className="group-hover:text-white group-hover:font-bold group-hover:ml-5 text-primary font-medium transition-all duration-300">
                        {predictionResult.isCorrect
                          ? 'Karakter selanjutnya'
                          : 'Coba lagi'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Section - Always at top */}
        <div className="flex items-center justify-between mb-6 lg:mb-0  mt-[24px]">
          <Link
            href="/tryon"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm text-sm sm:text-base"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center lg:min-h-screen">
          {/* Left Side - Character Selection */}
          <div className="w-full flex flex-col justify-center space-y-4 lg:space-y-8 order-3 lg:order-1">
            {/* Title - Desktop Only */}
            <div className="hidden lg:block space-y-4 lg:space-y-6 px-2 sm:px-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-tight">
                <span className="text-primary inline-block font-bold">
                  Latihan menulis
                </span>
                <br />
                Aksara Batak
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-full">
                Pilih aksara yang ingin Anda pelajari dari daftar di bawah ini.
                Lalu tuliskan di kanvas samping.
              </p>
            </div>

            {/* Character Selection - Mobile/Tablet Horizontal Slider */}
            <div className="block lg:hidden px-4 sm:px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Pilih Aksara</h2>
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-slate-600 shadow-sm">
                  {currentIndex + 1} / {characters.length}
                </div>
              </div>
              
              {/* Swipe hint */}
              <div className="text-center mb-2">
                <p className="text-xs text-slate-500">Geser untuk navigasi atau gunakan tombol</p>
              </div>
              
              <div className="relative py-2">
                {/* Navigation Buttons */}
                <button
                  onClick={prevCharacter}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors -ml-2"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                
                <button
                  onClick={nextCharacter}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors -mr-2"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>

                {/* Character Cards - Horizontal Scroll */}
                <section 
                  className="overflow-hidden px-8 py-4 touch-pan-y select-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg relative"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  aria-label="Character selection slider - swipe left or right, or use arrow keys to navigate"
                >
                  <div 
                    ref={sliderRef}
                    className="flex transition-transform duration-300 ease-in-out gap-4 relative z-0"
                    style={{ 
                      transform: getCenteredTransform()
                    }}
                  >
                    {characters.map((char, index) => (
                      <div
                        key={index}
                        onClick={() => selectCharacter(index)}
                        className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 transform cursor-pointer relative ${
                          index === currentIndex
                            ? 'border-primary shadow-2xl shadow-primary/20 scale-110 z-20'
                            : 'border-slate-200 hover:shadow-xl hover:scale-105 z-10'
                        }`}
                      >
                        <div className="h-full p-2 sm:p-3 flex flex-col items-center justify-center text-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1">
                            <Image
                              src={char.svgPath}
                              alt={char.latin}
                              width={24}
                              height={24}
                              className="object-contain sm:w-[28px] sm:h-[28px]"
                            />
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                            {char.latin}
                          </h3>

                          {index === currentIndex && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
                </section>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {Array.from({ length: Math.ceil(characters.length / 3) }).map((_, pageIndex) => (
                    <div
                      key={pageIndex}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        Math.floor(currentIndex / 3) === pageIndex
                          ? 'bg-primary'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>            {/* Character Grid - Desktop Only */}
            <div className="hidden lg:block relative h-96">
              <div className="relative w-full h-full overflow-hidden">
                {/* Gradient overlays - match background gradient */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>

                {/* Character cards container */}
                <div
                  ref={cardContainerRef}
                  className="h-full w-full overflow-y-auto scrollbar-hide py-8 cursor-grab active:cursor-grabbing select-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onMouseDown={handleGridMouseDown}
                  onMouseMove={handleGridMouseMove}
                  onMouseUp={handleGridMouseUp}
                  onTouchStart={handleGridTouchStart}
                  onTouchMove={handleGridTouchMove}
                  onTouchEnd={handleGridTouchEnd}
                >
                  <div className="grid grid-cols-4 gap-4 px-6">
                    {characters.map((char, index) => (
                      <div
                        key={index}
                        onClick={() => selectCharacter(index)}
                        className={`aspect-square bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 transform cursor-pointer relative ${
                          index === currentIndex
                            ? 'border-primary shadow-2xl shadow-primary/20 scale-105'
                            : 'border-slate-200 hover:shadow-xl hover:scale-105'
                        }`}
                      >
                        <div className="h-full p-4 flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 flex items-center justify-center mb-2">
                            <Image
                              src={char.svgPath}
                              alt={char.latin}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                          <h3 className="text-base font-bold text-slate-900">
                            {char.latin}
                          </h3>

                          {index === currentIndex && (
                            <div className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Character counter */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-slate-600 shadow-sm">
                  {currentIndex + 1} / {characters.length}
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Section - Mobile/Tablet: between header and character selection */}
          <div className="w-full flex flex-col justify-center items-center space-y-4 lg:space-y-6 order-2 lg:order-2">
            {/* Title for Mobile/Tablet */}
            <div className="block lg:hidden space-y-4 px-2 sm:px-4 text-center">
              <h1 className="text-3xl sm:text-4xl text-slate-900 leading-tight">
                <span className="text-primary inline-block font-bold">
                  Latihan menulis
                </span>
                <br />
                Aksara Batak
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Tuliskan aksara <span className="font-semibold text-primary">{currentCharacter.latin}</span> di kanvas di bawah ini.
              </p>
            </div>

            {/* Canvas Area */}
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg flex justify-center">
              <AksaraCanvas
                ref={canvasRef}
                width={320}
                height={320}
                showPlaceholder={false}
                className="border-2 border-gray-200 rounded-xl shadow-lg max-w-[320px]"
                style={{ width: '320px', height: '320px' }}
              />
            </div>

            {/* Check Button */}
            <div className="flex justify-center">
              <button
                onClick={checkDrawing}
                disabled={isChecking}
                className="group relative overflow-hidden flex items-center justify-center gap-x-2 bg-primary/10 border border-primary/15 px-4 py-2 rounded-full hover:bg-primary transition-colors cursor-pointer"
              >
                <CheckCircle
                  size={18}
                  className="absolute -left-6 group-hover:left-4 text-white transition-all duration-300 ease-out"
                />
                <span className="group-hover:text-white group-hover:font-bold group-hover:ml-6 text-primary font-medium text-base transition-all duration-300">
                  {isChecking ? 'Memeriksa...' : 'Periksa Tulisan'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
