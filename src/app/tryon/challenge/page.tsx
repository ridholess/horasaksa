'use client'

import { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Play,
  Share2,
  Trophy,
  Target,
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

interface QuizStats {
  correct: number
  total: number
  timeElapsed: number
}

export default function Challenge() {
  const canvasRef = useRef<AksaraCanvasRef>(null)
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [showHint, setShowHint] = useState(false)
  
  // Quiz states
  const [gameStarted, setGameStarted] = useState(false)
  const [showStartModal, setShowStartModal] = useState(true)
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds timer
  const [stats, setStats] = useState<QuizStats>({ correct: 0, total: 0, timeElapsed: 0 })
  const [gameEnded, setGameEnded] = useState(false)

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

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameEnded(true)
            setStats(prevStats => ({ ...prevStats, timeElapsed: 60 }))
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, timeLeft, gameEnded])

  // Update placeholder when character changes and manage hint timing
  useEffect(() => {
    if (currentCharacter) {
      setShowHint(false)
      canvasRef.current?.clearPlaceholder()
      
      // Show hint after 5 seconds
      const hintTimer = setTimeout(() => {
        setShowHint(true)
        canvasRef.current?.drawPlaceholder(currentCharacter.svgPath, 0.3)
      }, 5000)

      return () => clearTimeout(hintTimer)
    }
  }, [currentCharacter])

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
  }

  const startGame = () => {
    setShowStartModal(false)
    setGameStarted(true)
    setCurrentCharacter(getRandomCharacter())
    setTimeLeft(60)
    setStats({ correct: 0, total: 0, timeElapsed: 0 })
    setGameEnded(false)
    canvasRef.current?.clear()
  }

  const nextQuestion = () => {
    setCurrentCharacter(getRandomCharacter())
    canvasRef.current?.clear()
    setShowResult(false)
    setPredictionResult(null)
    setShowHint(false)
  }

  const checkDrawing = async () => {
    if (!currentCharacter || !canvasRef.current) return

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

      const isCorrect = predictedClass.toUpperCase() === currentCharacter.latin.toUpperCase()

      // Update stats
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
      }))

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

  const generateScoreImage = async () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Skor Aksara Batak Challenge', 400, 100)

    // Score
    ctx.font = 'bold 72px Arial'
    ctx.fillText(`${stats.correct}/${stats.total}`, 400, 200)

    // Percentage
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    ctx.font = 'bold 36px Arial'
    ctx.fillText(`${percentage}% Benar`, 400, 280)

    // Time
    ctx.font = '24px Arial'
    ctx.fillText(`Waktu: ${60 - timeLeft} detik`, 400, 350)

    // Website credit
    ctx.font = '20px Arial'
    ctx.fillText('learn-aksara-batak.vercel.app', 400, 550)

    return canvas.toDataURL('image/jpeg', 0.9)
  }

  const shareScore = async () => {
    const imageDataUrl = await generateScoreImage()
    if (!imageDataUrl) return

    // Convert data URL to blob
    const response = await fetch(imageDataUrl)
    const blob = await response.blob()

    if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'aksara-score.jpg', { type: 'image/jpeg' })] })) {
      try {
        await navigator.share({
          title: 'Skor Aksara Batak Challenge',
          text: `Aku berhasil menjawab ${stats.correct} dari ${stats.total} soal dengan benar!`,
          files: [new File([blob], 'aksara-score.jpg', { type: 'image/jpeg' })]
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback: download the image
      const link = document.createElement('a')
      link.download = 'aksara-batak-score.jpg'
      link.href = imageDataUrl
      link.click()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreMessage = () => {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    if (percentage >= 90) return 'Luar biasa! Kamu ahli Aksara Batak!'
    if (percentage >= 70) return 'Bagus sekali! Terus berlatih!'
    if (percentage >= 50) return 'Tidak buruk! Masih bisa ditingkatkan!'
    return 'Jangan menyerah! Terus berlatih ya!'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Start Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full text-center">
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Trophy size={32} className="sm:hidden text-primary" />
                <Trophy size={40} className="hidden sm:block text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Challenge Mode</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Tulis sebanyak mungkin aksara yang benar dalam waktu 60 detik!
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-gray-600">
                <Clock size={18} className="sm:hidden" />
                <Clock size={20} className="hidden sm:block" />
                <span className="text-sm sm:text-base">60 detik</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-gray-600">
                <Target size={18} className="sm:hidden" />
                <Target size={20} className="hidden sm:block" />
                <span className="text-sm sm:text-base">Aksara acak</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-primary text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 sm:gap-3"
            >
              <Play size={20} className="sm:hidden" />
              <Play size={24} className="hidden sm:block" />
              Mulai Challenge
            </button>
          </div>
        </div>
      )}

      {/* Game End Modal */}
      {gameEnded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full text-center">
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Trophy size={32} className="sm:hidden text-primary" />
                <Trophy size={40} className="hidden sm:block text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Waktu Habis!</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{getScoreMessage()}</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stats.correct}/{stats.total}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}% Benar
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={shareScore}
                className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 sm:gap-3"
              >
                <Share2 size={18} className="sm:hidden" />
                <Share2 size={20} className="hidden sm:block" />
                Bagikan Skor
              </button>
              
              <button
                onClick={() => {
                  setGameEnded(false)
                  setShowStartModal(true)
                }}
                className="w-full bg-gray-100 text-gray-700 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-gray-200 transition-colors"
              >
                Main Lagi
              </button>
              
              <Link
                href="/tryon"
                className="block w-full bg-white border border-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-gray-50 transition-colors"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResult && predictionResult && !gameEnded && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 w-fit max-w-full">
            <div className="flex flex-col sm:flex-row items-center relative z-10 gap-4 sm:gap-0">
              <div className="flex justify-center order-1 sm:order-none">
                <Image
                  src={predictionResult.isCorrect ? '/tryon/correct.webp' : '/tryon/wrong.webp'}
                  alt={predictionResult.isCorrect ? 'Correct' : 'Wrong'}
                  width={400}
                  height={400}
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 -mb-2 sm:-mb-4 object-cover object-center"
                  unoptimized
                />
              </div>

              <div className="flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-8 text-center sm:text-left order-2 sm:order-none">
                <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-800">
                  {predictionResult.isCorrect ? 'Benar!' : 'Salah!'}
                </h3>

                <div className="max-w-lg">
                  <p className="text-sm sm:text-base text-gray-600 max-w-xs">
                    {predictionResult.isCorrect
                      ? `Jawaban benar: ${predictionResult.expected}`
                      : `Jawaban yang benar: ${predictionResult.expected}`}
                  </p>
                </div>

                <button
                  onClick={nextQuestion}
                  className="group relative overflow-hidden flex items-center gap-x-2 bg-primary/10 border border-primary/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-primary transition-colors cursor-pointer mx-auto sm:mx-0"
                >
                  <CheckCircle
                    size={14}
                    className="absolute -left-6 group-hover:left-3 sm:group-hover:left-4 text-white transition-all duration-300 ease-out sm:hidden"
                  />
                  <CheckCircle
                    size={16}
                    className="absolute -left-6 group-hover:left-4 text-white transition-all duration-300 ease-out hidden sm:block"
                  />
                  <span className="group-hover:text-white group-hover:font-bold group-hover:ml-4 sm:group-hover:ml-5 text-primary font-medium text-sm sm:text-base transition-all duration-300">
                    Lanjut
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 mt-[24px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <Link
            href="/tryon"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm text-sm sm:text-base"
          >
            <ArrowLeft size={14} className="sm:hidden" />
            <ArrowLeft size={16} className="hidden sm:block" />
            Kembali
          </Link>

          {gameStarted && !gameEnded && (
            <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div className="bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock size={16} className="sm:hidden text-primary" />
                  <Clock size={20} className="hidden sm:block text-primary" />
                  <span className="font-bold text-base sm:text-lg text-gray-800">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
              
              <div className="bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Trophy size={16} className="sm:hidden text-primary" />
                  <Trophy size={20} className="hidden sm:block text-primary" />
                  <span className="font-bold text-base sm:text-lg text-gray-800">
                    {stats.correct}/{stats.total}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {gameStarted && !gameEnded && currentCharacter && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]">
            {/* Left Side - Current Character */}
            <div className="w-full flex flex-col justify-center items-center space-y-4 sm:space-y-6 md:space-y-8 order-2 xl:order-1">
              <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                  Tulis aksara:
                </h1>
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary">
                  {currentCharacter.latin}
                </div>
              </div>

              {/* Show hint only after 5 seconds */}
              {showHint && (
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
                  <Image
                    src={currentCharacter.svgPath}
                    alt={currentCharacter.latin}
                    width={150}
                    height={150}
                    className="object-contain opacity-50 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36"
                  />
                </div>
              )}
            </div>

            {/* Right Side - Canvas */}
            <div className="w-full flex flex-col justify-center items-center space-y-4 sm:space-y-5 md:space-y-6 order-1 xl:order-2">
              {/* Canvas Area */}
              <div 
                className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]"
                style={{ touchAction: 'none' }}
              >
                <AksaraCanvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  showPlaceholder={showHint}
                  className="border-2 border-gray-200 rounded-xl shadow-lg"
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    maxWidth: '100%',
                    display: 'block'
                  }}
                />
              </div>

              {/* Check Button */}
              <button
                onClick={checkDrawing}
                disabled={isChecking}
                className="group relative overflow-hidden flex items-center gap-x-2 bg-primary/10 border border-primary/15 px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-primary transition-colors cursor-pointer"
              >
                <CheckCircle
                  size={18}
                  className="absolute -left-6 group-hover:left-3 text-white transition-all duration-300 ease-out sm:hidden"
                />
                <CheckCircle
                  size={20}
                  className="absolute -left-6 group-hover:left-4 text-white transition-all duration-300 ease-out hidden sm:block"
                />
                <span className="group-hover:text-white group-hover:font-bold group-hover:ml-6 sm:group-hover:ml-8 text-primary font-medium text-lg sm:text-xl transition-all duration-300">
                  {isChecking ? 'Memeriksa...' : 'Periksa Tulisan'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
