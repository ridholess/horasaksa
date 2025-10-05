'use client'

import { useState, useRef, useEffect, ChangeEvent, Suspense } from 'react'
import {
  ArrowLeft,
  Check,
  Sparkles,
  BrainCircuit,
  CheckCircle2,
  Share2,
  RotateCcw,
  Trophy
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import AksaraCanvas, { AksaraCanvasRef } from '@/components/CanvasAksara'

interface Character {
  latin: string
  svgPath: string
}

interface SyllableCanvas {
  syllable: string
  aksara: string
  canvasRef: React.RefObject<AksaraCanvasRef | null>
  isCompleted: boolean
  score?: number
  canvasImage?: string
}

interface ValidationRule {
  label: string
  rule: (input: string) => boolean
}

interface FinalResult {
  name: string
  syllables: string[]
  scores: number[]
  averageScore: number
  canvasImages: string[]
}

function CustomNameContent() {
  const [currentStep, setCurrentStep] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [isNameValid, setIsNameValid] = useState(false)
  const [syllables, setSyllables] = useState<string[]>([])
  const [syllableCanvases, setSyllableCanvases] = useState<SyllableCanvas[]>([])
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  
  const searchParams = useSearchParams()

  // Check for name parameter on component mount
  useEffect(() => {
    const nameParam = searchParams.get('name')
    if (nameParam) {
      const decodedName = decodeURIComponent(nameParam)
      setInputValue(decodedName)
      
      // Validate the name parameter
      const isValid = inputRules.every((rule) => rule.rule(decodedName))
      setIsNameValid(isValid)
      
      // If valid, automatically proceed to step 2
      if (isValid) {
        const nameSyllables = convertToSyllables(decodedName)
        setSyllables(nameSyllables)

        const canvases = nameSyllables.map((syllable, index) => ({
          syllable,
          aksara: convertSyllableToAksara(syllable),
          canvasRef: React.createRef<AksaraCanvasRef>(),
          isCompleted: false,
        }))

        setSyllableCanvases(canvases)
        setCurrentStep(2)
        setCurrentCanvasIndex(0)
      }
    }
  }, [searchParams])

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
    { latin: '~', svgPath: '/toba/~.svg' },
    { latin: '~E', svgPath: '/toba/~e.svg' },
    { latin: '~I', svgPath: '/toba/~i.svg' },
    { latin: '~NG', svgPath: '/toba/~ng.svg' },
    { latin: '~O', svgPath: '/toba/~o.svg' },
    { latin: '~U', svgPath: '/toba/~u.svg' },
  ]

  // Convert name to syllables and aksara based on available Batak characters
  const convertToSyllables = (name: string): string[] => {
    const lowerName = name.toLowerCase()
    const syllables: string[] = []
    let i = 0

    while (i < lowerName.length) {
      let matched = false
      
      // Try to match longer sequences first (like 'nga', 'nya')
      for (let len = 3; len >= 1; len--) {
        if (i + len <= lowerName.length) {
          const substr = lowerName.substring(i, i + len)
          
          // Check if this substring can be converted to a valid aksara
          if (canConvertToAksara(substr)) {
            syllables.push(substr)
            i += len
            matched = true
            break
          }
        }
      }
      
      // If no match found, try to group consonant + vowel
      if (!matched) {
        // Look for consonant + vowel pattern
        if (i < lowerName.length - 1) {
          const consonant = lowerName[i]
          const vowel = lowerName[i + 1]
          
          if (isConsonant(consonant) && isVowel(vowel)) {
            const syllable = consonant + vowel
            if (canConvertToAksara(syllable)) {
              syllables.push(syllable)
              i += 2
              matched = true
            }
          }
        }
        
        // If still no match, handle single vowel
        if (!matched && isVowel(lowerName[i])) {
          syllables.push(lowerName[i])
          i++
          matched = true
        }
        
        // If still no match, skip this character (shouldn't happen with validation)
        if (!matched) {
          i++
        }
      }
    }

    return syllables
  }

  const isVowel = (char: string): boolean => {
    return ['a', 'i', 'u', 'e', 'o'].includes(char)
  }

  const isConsonant = (char: string): boolean => {
    return ['b', 'd', 'g', 'h', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'w', 'y'].includes(char)
  }

  const canConvertToAksara = (syllable: string): boolean => {
    const aksara = convertSyllableToAksara(syllable)
    return characters.some(char => char.latin.toUpperCase() === aksara.toUpperCase())
  }

  const convertSyllableToAksara = (syllable: string): string => {
    const lowerSyllable = syllable.toLowerCase()
    
    // Direct mapping for available aksara
    const mapping: { [key: string]: string } = {
      // Single vowels
      'a': 'A',
      'i': 'I', 
      'u': 'U',
      
      // Consonant + 'a' (default vowel)
      'ba': 'BA',
      'da': 'DA',
      'ga': 'GA',
      'ha': 'HA',
      'ja': 'JA',
      'la': 'LA',
      'ma': 'MA',
      'na': 'NA',
      'pa': 'PA',
      'ra': 'RA',
      'sa': 'SA',
      'ta': 'TA',
      'wa': 'WA',
      'ya': 'YA',
      
      // Special combinations
      'nga': 'NGA',
      'nya': 'NYA',
      
      // Consonant + other vowels (using diacritic notation)
      'be': 'BA', // Would use ~E diacritic in real implementation
      'bi': 'BA', // Would use ~I diacritic
      'bu': 'BA', // Would use ~U diacritic
      'bo': 'BA', // Would use ~O diacritic
      
      'de': 'DA',
      'di': 'DA',
      'du': 'DA',
      'do': 'DA',
      
      'ge': 'GA',
      'gi': 'GA',
      'gu': 'GA',
      'go': 'GA',
      
      'he': 'HA',
      'hi': 'HA',
      'hu': 'HA',
      'ho': 'HA',
      
      'je': 'JA',
      'ji': 'JA',
      'ju': 'JA',
      'jo': 'JA',
      
      'le': 'LA',
      'li': 'LA',
      'lu': 'LA',
      'lo': 'LA',
      
      'me': 'MA',
      'mi': 'MA',
      'mu': 'MA',
      'mo': 'MA',
      
      'ne': 'NA',
      'ni': 'NA',
      'nu': 'NA',
      'no': 'NA',
      
      'pe': 'PA',
      'pi': 'PA',
      'pu': 'PA',
      'po': 'PA',
      
      're': 'RA',
      'ri': 'RA',
      'ru': 'RA',
      'ro': 'RA',
      
      'se': 'SA',
      'si': 'SA',
      'su': 'SA',
      'so': 'SA',
      
      'te': 'TA',
      'ti': 'TA',
      'tu': 'TA',
      'to': 'TA',
      
      'we': 'WA',
      'wi': 'WA',
      'wu': 'WA',
      'wo': 'WA',
      
      'ye': 'YA',
      'yi': 'YA',
      'yu': 'YA',
      'yo': 'YA',
      
      // Handle 'e' and 'o' vowels
      'e': 'A', // Base character with ~E diacritic
      'o': 'A', // Base character with ~O diacritic
    }
    
    return mapping[lowerSyllable] || lowerSyllable.toUpperCase()
  }

  // Updated validation rule for Batak characters
  const inputRules: ValidationRule[] = [
    {
      label: 'Hanya huruf',
      rule: (input: string): boolean => {
        if (!input) return false
        const regex = /^[A-Za-z]+$/
        return regex.test(input)
      },
    },
    {
      label: 'Tidak ada spasi',
      rule: (input: string): boolean => {
        if (!input) return false
        return !input.includes(' ')
      },
    },
    {
      label: 'Tidak ada karakter khusus',
      rule: (input: string): boolean => {
        if (!input) return false
        const regex = /^[A-Za-z]+$/
        return regex.test(input)
      },
    },
    {
      label: 'Tidak lebih dari 5 suku kata',
      rule: (input: string): boolean => {
        if (!input) return false
        const syllables = convertToSyllables(input)
        return syllables.length > 0 && syllables.length <= 5
      },
    },
    {
      label: 'Terdapat pada Aksara Batak',
      rule: (input: string): boolean => {
        if (!input) return false
        
        // Available consonants and vowels in Batak script
        const batakConsonants = ['b', 'd', 'g', 'h', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'w', 'y']
        const batakVowels = ['a', 'i', 'u', 'e', 'o']
        
        const lowerInput = input.toLowerCase()
        
        // Handle special combinations first
        let processedInput = lowerInput
        processedInput = processedInput.replace(/nga/g, 'ŋ') // Replace 'nga' with special marker
        processedInput = processedInput.replace(/nya/g, 'ñ') // Replace 'nya' with special marker
        
        // Check each character
        for (let char of processedInput) {
          if (char === 'ŋ' || char === 'ñ') continue // Skip special markers
          if (!batakConsonants.includes(char) && !batakVowels.includes(char)) {
            return false
          }
        }
        
        // Additional check: try to convert to syllables and see if all can be mapped
        const syllables = convertToSyllables(input)
        return syllables.every(syllable => canConvertToAksara(syllable))
      },
    },
  ]

  const stepperInfo = [
    { label: 'Masukkan nama', isComplete: currentStep > 1 },
    { label: 'Tuliskan', isComplete: currentStep > 2 },
    { label: 'Bagikan', isComplete: currentStep > 3 },
  ]

  const nameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputValue(inputValue)

    if (!inputValue.trim()) {
      setIsNameValid(false)
      return
    }

    const isValid = inputRules.every((rule) => rule.rule(inputValue))
    setIsNameValid(isValid)
  }

  const proceedToStep2 = () => {
    if (!isNameValid) return

    const nameSyllables = convertToSyllables(inputValue)
    setSyllables(nameSyllables)

    const canvases = nameSyllables.map((syllable, index) => ({
      syllable,
      aksara: convertSyllableToAksara(syllable),
      canvasRef: React.createRef<AksaraCanvasRef>(),
      isCompleted: false,
    }))

    setSyllableCanvases(canvases)
    setCurrentStep(2)
    setCurrentCanvasIndex(0)

    // Clear the first canvas when starting
    setTimeout(() => {
      const firstCanvasRef = canvases[0].canvasRef.current
      if (firstCanvasRef) {
        firstCanvasRef.clear()
      }
    }, 100)
  }

  const checkCanvas = async (index: number) => {
    const canvasRef = syllableCanvases[index].canvasRef.current
    if (!canvasRef) return

    setIsChecking(true)

    try {
      const imageDataURL = canvasRef.getImageData()
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

      const expectedAksara = syllableCanvases[index].aksara
      const isCorrect = predictedClass.toUpperCase() === expectedAksara.toUpperCase()
      const score = isCorrect ? confidence * 100 : 0

      // Update canvas status and store canvas image
      const updatedCanvases = [...syllableCanvases]
      updatedCanvases[index].isCompleted = true
      updatedCanvases[index].score = Math.round(score)
      updatedCanvases[index].canvasImage = imageDataURL // Store the canvas image data
      setSyllableCanvases(updatedCanvases)

      // Check if this is the last canvas
      if (index === syllableCanvases.length - 1) {
        // All canvases completed, calculate final result
        calculateFinalResult(updatedCanvases)
      }
      // Note: Don't automatically move to next canvas, let user click the button
    } catch (error) {
      console.error('Error checking canvas:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const calculateFinalResult = (canvases: SyllableCanvas[]) => {
    const scores = canvases.map(c => c.score || 0)
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length
    const canvasImages = canvases.map(c => c.canvasImage || '')

    const result: FinalResult = {
      name: inputValue,
      syllables: canvases.map(c => c.syllable),
      scores,
      averageScore: Math.round(averageScore),
      canvasImages,
    }

    setFinalResult(result)
    setCurrentStep(3)
    setShowResult(true)
  }

  const generateScoreImage = async () => {
    if (!finalResult) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 700 // Increased height to accommodate drawings

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 700)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 700)

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 32px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Namaku dalam Aksara Batak', 400, 60)

    // Name
    ctx.font = 'bold 48px Arial'
    ctx.fillText(finalResult.name, 400, 120)

    // Score
    ctx.font = 'bold 64px Arial'
    ctx.fillText(`${finalResult.averageScore}%`, 400, 200)

    // Individual scores
    ctx.font = '20px Arial'
    ctx.fillText(`Skor per suku kata: ${finalResult.scores.join('%, ')}%`, 400, 240)

    // Draw user's canvas images
    const imageSize = 80
    const startX = (800 - (finalResult.canvasImages.length * (imageSize + 20) - 20)) / 2
    const imageY = 280

    for (let i = 0; i < finalResult.canvasImages.length; i++) {
      if (finalResult.canvasImages[i]) {
        try {
          const img = document.createElement('img')
          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
            img.src = finalResult.canvasImages[i]
          })
          
          const x = startX + i * (imageSize + 20)
          
          // Draw white background for the image
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(x - 5, imageY - 5, imageSize + 10, imageSize + 10)
          
          // Draw the user's drawing
          ctx.drawImage(img, x, imageY, imageSize, imageSize)
          
          // Draw syllable label below
          ctx.fillStyle = '#ffffff'
          ctx.font = '16px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(finalResult.syllables[i], x + imageSize/2, imageY + imageSize + 20)
          
          // Draw score below syllable
          ctx.font = '14px Arial'
          ctx.fillText(`${finalResult.scores[i]}%`, x + imageSize/2, imageY + imageSize + 40)
        } catch (error) {
          console.error('Error loading canvas image:', error)
        }
      }
    }

    // Website credit
    ctx.fillStyle = '#ffffff'
    ctx.font = '18px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('learn-aksara-batak.vercel.app', 400, 650)

    return canvas.toDataURL('image/jpeg', 0.9)
  }

  const shareResult = async () => {
    const imageDataUrl = await generateScoreImage()
    if (!imageDataUrl) return

    const response = await fetch(imageDataUrl)
    const blob = await response.blob()

    if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'aksara-name.jpg', { type: 'image/jpeg' })] })) {
      try {
        await navigator.share({
          title: 'Namaku dalam Aksara Batak',
          text: `Namaku "${finalResult?.name}" dalam Aksara Batak dengan skor ${finalResult?.averageScore}%!`,
          files: [new File([blob], 'aksara-name.jpg', { type: 'image/jpeg' })]
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      const link = document.createElement('a')
      link.download = 'aksara-batak-name.jpg'
      link.href = imageDataUrl
      link.click()
    }
  }

  const resetGame = () => {
    // Clear all canvases before resetting
    syllableCanvases.forEach(canvas => {
      const canvasRef = canvas.canvasRef.current
      if (canvasRef) {
        canvasRef.clear()
      }
    })

    setCurrentStep(1)
    setInputValue('')
    setIsNameValid(false)
    setSyllables([])
    setSyllableCanvases([])
    setCurrentCanvasIndex(0)
    setFinalResult(null)
    setShowResult(false)
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Luar biasa! Tulisan sempurna!'
    if (score >= 70) return 'Bagus sekali! Terus berlatih!'
    if (score >= 50) return 'Tidak buruk! Masih bisa ditingkatkan!'
    return 'Jangan menyerah! Terus berlatih ya!'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Result Modal */}
      {showResult && finalResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 max-w-2xl w-full text-center max-h-[90vh] overflow-y-auto">
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Trophy size={32} className="text-primary sm:hidden" />
                <Trophy size={40} className="text-primary hidden sm:block" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Hasil Tulisan</h2>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{getScoreMessage(finalResult.averageScore)}</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                  {finalResult.name}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  {finalResult.averageScore}%
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Skor rata-rata dari {finalResult.syllables.length} suku kata
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
                  {finalResult.syllables.map((syllable, index) => (
                    <div key={index} className="bg-white rounded-lg p-2 sm:p-3">
                      <div className="font-bold text-primary text-sm sm:text-base mb-2">{syllable}</div>
                      {finalResult.canvasImages[index] && (
                        <div className="w-full aspect-square bg-gray-50 rounded border mb-2 flex items-center justify-center">
                          <img 
                            src={finalResult.canvasImages[index]} 
                            alt={`Tulisan ${syllable}`}
                            className="max-w-full max-h-full object-contain rounded"
                          />
                        </div>
                      )}
                      <div className="text-xs sm:text-sm text-gray-600">{finalResult.scores[index]}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={shareResult}
                className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <Share2 size={16} className="sm:hidden" />
                <Share2 size={20} className="hidden sm:block" />
                Bagikan Hasil
              </button>
              
              <button
                onClick={resetGame}
                className="w-full bg-gray-100 text-gray-700 py-2.5 sm:py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <RotateCcw size={16} className="sm:hidden" />
                <RotateCcw size={20} className="hidden sm:block" />
                Coba Lagi
              </button>
              
              <Link
                href="/tryon"
                className="block w-full bg-white border border-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-full font-bold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 mt-[24px]">
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

        {/* Step 1: Name Input */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[60vh] sm:min-h-[70vh]">
            {/* Left Side - Info */}
            <div className="w-full flex flex-col justify-center p-4 sm:p-6 md:p-8 gap-y-4 sm:gap-y-6 md:gap-y-8 bg-gray-950 rounded-lg shadow-lg min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] order-1 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-white max-w-md">
                <span className="text-primary font-bold">Tulis Namamu</span> dalam
                Aksara Batak!
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-md">
                Penasaran namamu terlihat dalam aksara batak? Coba langsung pada
                panel samping
              </p>

              {/* Stepper */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-4 sm:gap-x-4 md:gap-x-8 mt-2">
                {stepperInfo.map((step, index) => (
                  <div key={index} className="flex items-center gap-x-3 sm:gap-x-4">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center text-xs sm:text-sm ${
                        step.isComplete
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {step.isComplete ? (
                        <Check size={12} className="text-white sm:hidden" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                      {step.isComplete && (
                        <Check size={16} className="text-white hidden sm:block" />
                      )}
                    </div>
                    <span
                      className={`text-sm sm:text-base ${step.isComplete ? 'text-white' : 'text-white/60'}`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-x-3 sm:gap-x-4 mt-4 sm:mt-6 md:mt-8">
                <BrainCircuit size={20} className="text-primary sm:hidden" />
                <BrainCircuit size={24} className="text-primary hidden sm:block" />
                <span className="text-white/60 text-sm sm:text-base">Fitur ini menggunakan AI</span>
              </div>
            </div>

            {/* Right Side - Input */}
            <div className="w-full flex flex-col items-center justify-center order-2 lg:order-2">
              <div className="w-full flex flex-col items-center py-4 sm:py-6 md:py-8 gap-y-4 sm:gap-y-6 md:gap-y-8">
                <p className="text-xl sm:text-2xl font-medium text-gray-600 text-center px-4">
                  Siapa nama panggilanmu?
                </p>
                <div className="relative w-full max-w-md px-4 sm:px-0">
                  <input
                    type="text"
                    placeholder="Masukkan nama panggilan"
                    value={inputValue}
                    onChange={nameHandler}
                    className="bg-gray-100 rounded-full px-4 sm:px-6 py-3 sm:py-4 w-full pr-12 sm:pr-16 border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-gray-300 transition-all duration-300 ease-out text-sm sm:text-base"
                  />
                  <button
                    onClick={proceedToStep2}
                    disabled={!isNameValid}
                    className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 ${
                      isNameValid
                        ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 cursor-pointer'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    } rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all ease-out duration-300`}
                  >
                    <Sparkles size={16} className="text-white sm:hidden" />
                    <Sparkles size={20} className="text-white hidden sm:block" />
                  </button>
                </div>
                
                {/* Validation Rules */}
                <div className="flex flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 w-full max-w-2xl justify-center items-center px-4 sm:px-0">
                  {inputRules.map((rule, index) => {
                    const isValid = rule.rule(inputValue)
                    return (
                      <div key={index} className="flex items-center gap-x-2 sm:gap-x-3 text-xs sm:text-sm">
                        <CheckCircle2
                          size={16}
                          className={`text-gray-500 sm:hidden ${
                            isValid && inputValue ? 'text-green-700' : 'text-gray-400'
                          }`}
                        />
                        <CheckCircle2
                          size={20}
                          className={`text-gray-500 hidden sm:block ${
                            isValid && inputValue ? 'text-green-700' : 'text-gray-400'
                          }`}
                        />
                        <span className="text-gray-600">{rule.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Writing Canvases */}
        {currentStep === 2 && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-2 sm:space-y-4 px-4 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Tulis Nama: <span className="text-primary">{inputValue}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Tulis setiap suku kata satu per satu dari kiri ke kanan
              </p>
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                {syllableCanvases.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      index < currentCanvasIndex ? 'bg-green-500' :
                      index === currentCanvasIndex ? 'bg-primary' :
                      'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Current Progress */}
              <p className="text-sm sm:text-base text-gray-500">
                {currentCanvasIndex + 1} dari {syllableCanvases.length} suku kata
              </p>
            </div>

            {/* Single Canvas Display */}
            {syllableCanvases.length > 0 && (
              <div className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-md mx-auto px-4 sm:px-0">
                {(() => {
                  const syllableCanvas = syllableCanvases[currentCanvasIndex]
                  const character = characters.find(c => c.latin === syllableCanvas.aksara)
                  
                  return (
                    <>
                      {/* Aksara Guide */}
                      <div className="text-center space-y-2 sm:space-y-3">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                          {syllableCanvas.syllable}
                        </div>
                        {character && (
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center mx-auto">
                            <Image
                              src={character.svgPath}
                              alt={syllableCanvas.aksara}
                              width={64}
                              height={64}
                              className="object-contain sm:w-20 sm:h-20"
                            />
                          </div>
                        )}
                        <div className="text-base sm:text-lg text-gray-600">
                          Aksara: <span className="font-semibold">{syllableCanvas.aksara}</span>
                        </div>
                      </div>

                      {/* Canvas */}
                      <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                        <AksaraCanvas
                          ref={syllableCanvas.canvasRef}
                          className={`border-2 rounded-xl bg-white w-full aspect-square ${
                            syllableCanvas.isCompleted ? 'border-green-400 ring-2 ring-green-200' : 'border-primary cursor-crosshair'
                          }`}
                          style={{ touchAction: 'none' }}
                          showTrashButton={!syllableCanvas.isCompleted}
                          disabled={syllableCanvas.isCompleted}
                        />

                        {syllableCanvas.isCompleted && (
                          <div className="absolute inset-0 bg-green-100/80 rounded-xl flex items-center justify-center">
                            <div className="bg-white rounded-full p-3 sm:p-4 shadow-lg">
                              <Check size={24} className="text-green-600 sm:hidden" />
                              <Check size={32} className="text-green-600 hidden sm:block" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {!syllableCanvas.isCompleted && (
                        <button
                          onClick={() => checkCanvas(currentCanvasIndex)}
                          disabled={isChecking}
                          className="bg-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 w-full max-w-[200px]"
                        >
                          {isChecking ? 'Memeriksa...' : 'Periksa'}
                        </button>
                      )}

                      {syllableCanvas.isCompleted && (
                        <div className="text-center space-y-3">
                          <div className="text-2xl sm:text-3xl font-bold text-green-600">
                            {syllableCanvas.score}%
                          </div>
                          {currentCanvasIndex < syllableCanvases.length - 1 && (
                            <button
                              onClick={() => {
                                const nextIndex = currentCanvasIndex + 1
                                setCurrentCanvasIndex(nextIndex)
                                // Clear the next canvas when moving to it
                                setTimeout(() => {
                                  const nextCanvasRef = syllableCanvases[nextIndex].canvasRef.current
                                  if (nextCanvasRef) {
                                    nextCanvasRef.clear()
                                  }
                                }, 100)
                              }}
                              className="bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-green-700 transition-colors w-full max-w-[200px]"
                            >
                              Lanjut ke Suku Kata Berikutnya
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CustomName() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Memuat halaman...</p>
        </div>
      </div>
    }>
      <CustomNameContent />
    </Suspense>
  )
}
