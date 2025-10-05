'use client'

import { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  Sparkles,
  Search,
  Timer,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AksaraCanvas, { AksaraCanvasRef } from '@/components/CanvasAksara'

interface Character {
  latin: string
  svgPath: string
}

interface ClassificationResult {
  predicted: string
  confidence: number
  timestamp: number
}

export default function Explore() {
  const canvasRef = useRef<AksaraCanvasRef>(null)
  const [isClassifying, setIsClassifying] = useState(false)
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null)
  const [lastDrawTime, setLastDrawTime] = useState<number>(0)
  const classificationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // Auto-classify after 2 seconds of inactivity
  useEffect(() => {
    if (lastDrawTime > 0) {
      // Clear existing timeout
      if (classificationTimeoutRef.current) {
        clearTimeout(classificationTimeoutRef.current)
      }

      // Set new timeout for 2 seconds
      classificationTimeoutRef.current = setTimeout(() => {
        classifyDrawing()
      }, 2000)
    }

    return () => {
      if (classificationTimeoutRef.current) {
        clearTimeout(classificationTimeoutRef.current)
      }
    }
  }, [lastDrawTime])

  const handleDrawing = () => {
    setLastDrawTime(Date.now())
  }

  const classifyDrawing = async () => {
    if (!canvasRef.current) return

    // Check if canvas is empty
    if (canvasRef.current.isEmpty()) {
      setClassificationResult(null)
      return
    }

    setIsClassifying(true)

    try {
      const imageDataURL = canvasRef.current.getImageData()
      if (!imageDataURL) return

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

      let predictedClass = ''
      let confidence = 0

      if (result.outputs && result.outputs.length > 0) {
        predictedClass = result.outputs[0].model_predictions.top
        confidence = result.outputs[0].model_predictions.confidence
      }

      setClassificationResult({
        predicted: predictedClass,
        confidence: Math.round(confidence * 100),
        timestamp: Date.now(),
      })
    } catch (error) {
      console.error('Error classifying drawing:', error)
      setClassificationResult({
        predicted: 'Error',
        confidence: 0,
        timestamp: Date.now(),
      })
    } finally {
      setIsClassifying(false)
    }
  }

  const getCharacterByLatin = (latin: string) => {
    return characters.find(char => char.latin.toUpperCase() === latin.toUpperCase())
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50'
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 80) return 'Sangat yakin'
    if (confidence >= 60) return 'Cukup yakin'
    return 'Kurang yakin'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 mt-[24px]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
          <Link
            href="/tryon"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm text-sm sm:text-base"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center min-h-[70vh] mt-[40px] sm:mt-0">
          {/* Left Side - Classification Result */}
          <div className="w-full flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-1">
            {/* Title */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-slate-900 leading-tight">
                <span className="text-primary inline-block font-bold">
                  Eksplorasi
                </span>
                <br />
                Aksara Batak
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed px-2 sm:px-0">
                Tulis aksara apa saja di kanvas, dan kami akan menebak aksara apa yang Anda tulis secara otomatis.
              </p>
            </div>

            {/* Classification Result */}
            {classificationResult ? (
              <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
                {classificationResult.predicted !== 'Error' ? (
                  <div>
                    <div className="space-y-4 sm:space-y-6">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700">
                        Hasil Klasifikasi
                      </h2>
                      
                      {/* Single Large Aksara Display */}
                      <div className="flex flex-col items-center space-y-3 sm:space-y-4 lg:space-y-6">
                        <div className="text-4xl sm:text-6xl lg:text-8xl font-bold text-primary">
                          {classificationResult.predicted}
                        </div>
                        
                        {getCharacterByLatin(classificationResult.predicted) && (
                          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-200 flex items-center justify-center">
                            <Image
                              src={getCharacterByLatin(classificationResult.predicted)!.svgPath}
                              alt={classificationResult.predicted}
                              width={120}
                              height={120}
                              className="object-contain w-12 h-12 sm:w-16 sm:h-16 lg:w-[120px] lg:h-[120px]"
                            />
                          </div>
                        )}

                        <div className={`inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-medium ${getConfidenceColor(classificationResult.confidence)}`}>
                          <Sparkles size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
                          <span>{getConfidenceText(classificationResult.confidence)}</span>
                          <span className="font-bold">{classificationResult.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Search size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-500" />
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-2">
                        Gagal Mengenali
                      </h2>
                      <p className="text-sm sm:text-base text-red-500">
                        Coba tulis aksara dengan lebih jelas di kanvas sebelah kanan
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Search size={32} className="sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-gray-400" />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-400">
                    Menunggu Tulisan
                  </h2>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-gray-500 px-2 sm:px-0">
                    Mulai tulis aksara di kanvas sebelah kanan, dan hasil klasifikasi akan muncul secara otomatis setelah 2 detik.
                  </p>

                  {isClassifying && (
                    <div className="bg-primary/10 text-primary px-4 py-2 sm:px-5 sm:py-2 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 sm:gap-3 mx-auto w-fit">
                      <Search size={16} className="sm:w-5 sm:h-5 animate-spin" />
                      Menganalisis tulisan...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Canvas */}
          <div className="w-full flex flex-col justify-center items-center space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Canvas Area */}
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px]">
              <AksaraCanvas
                ref={canvasRef}
                width={400}
                height={400}
                onDrawing={handleDrawing}
                className="border-2 border-gray-200 rounded-xl shadow-lg w-full h-auto aspect-square"
                style={{ width: '100%' }}
              />

              {/* Auto-classify indicator */}
              {lastDrawTime > 0 && !isClassifying && !classificationResult && (
                <div className="absolute bottom-2 left-2 bg-blue-100 text-blue-600 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                  <Timer size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Mengklasifikasi otomatis...</span>
                  <span className="sm:hidden">Auto klasifikasi...</span>
                </div>
              )}
            </div>

            <div className="text-center space-y-1 sm:space-y-2">
              <p className="text-gray-600 font-medium text-sm sm:text-base">Kanvas Menggambar</p>
              <p className="text-xs sm:text-sm text-gray-500">
                Tulis aksara Batak di area putih di atas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
