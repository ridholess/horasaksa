'use client'

import { Check, Sparkles, BrainCircuit, CheckCircle2 } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export default function HandsOn() {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const [isNameValid, setIsNameValid] = useState(false)
  const router = useRouter()

  const stepperInfo = [
    {
      label: t('handsOn.features.interactive'),
      isComplete: true,
    },
    {
      label: t('handsOn.features.realtime'),
      isComplete: false,
    },
    {
      label: t('handsOn.features.authentic'),
      isComplete: false,
    },
  ]

  const inputRules = [
    {
      label: t('common.validation.lettersOnly'),
      rule: (input: string): boolean => {
        if (!input) return false // empty input is invalid for validation display
        const regex = /^[A-Za-z]+$/
        return regex.test(input)
      },
    },
    {
      label: t('common.validation.noSpaces'),
      rule: (input: string): boolean => {
        if (!input) return false // empty input is invalid for validation display
        return !input.includes(' ')
      },
    },
    {
      label: t('common.validation.noSpecialChars'),
      rule: (input: string): boolean => {
        if (!input) return false // empty input is invalid for validation display
        const regex = /^[A-Za-z]+$/
        return regex.test(input)
      },
    },
    {
      label: 'Tidak lebih dari 5 suku kata',
      rule: (input: string): boolean => {
        if (!input) return false // empty input is invalid for validation display

        // A syllable in Indonesian/Batak typically contains at least one vowel
        // Count syllables by counting vowel groups (consecutive vowels count as one syllable)
        const vowelGroups = input.toLowerCase().match(/[aiueo]+/g)
        const syllableCount = vowelGroups ? vowelGroups.length : 0

        // If there are no vowels at all, it's not a valid word (like "sssssssssss")
        if (syllableCount === 0) return false

        return syllableCount <= 5
      },
    },
    {
      label: 'Terdapat pada Aksara Batak',
      rule: (input: string): boolean => {
        if (!input) return false // empty input is invalid for validation display

        const batakChars = [
          'h',
          'n',
          'r',
          't',
          'b',
          'w',
          'm',
          'l',
          'p',
          's',
          'd',
          'g',
          'j',
          'y',
          'a',
          'i',
          'u',
          'e',
          'o',
        ]

        const lowerInput = input.toLowerCase()
        let processedInput = lowerInput
        processedInput = processedInput.replace(/ng/g, 'ŋ')
        processedInput = processedInput.replace(/ny/g, 'ñ')

        for (let char of processedInput) {
          if (char === 'ŋ' || char === 'ñ') continue
          if (!batakChars.includes(char)) {
            return false
          }
        }
        return true
      },
    },
  ]

  const handleSubmit = () => {
    if (isNameValid && inputValue.trim()) {
      // Navigate to the custom name page with the input value as a query parameter
      router.push(`/tryon/custom-name?name=${encodeURIComponent(inputValue)}`)
    }
  }

  const nameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputValue(inputValue)

    // Only consider valid if input is not empty AND all rules pass
    if (!inputValue.trim()) {
      setIsNameValid(false)
      return
    }

    const isValid = inputRules.every((rule) => rule.rule(inputValue))
    setIsNameValid(isValid)
  }

  return (
    <section className="w-full flex flex-col lg:flex-row items-center px-4 sm:px-6 md:px-8 lg:px-30 py-8 sm:py-12 md:py-16 lg:py-20 relative h-screen lg:max-h-[1080px] max-w-screen overflow-hidden">
      <div className="w-full lg:w-1/2 p-2 sm:p-3 lg:p-4 mb-8 lg:mb-0">
        <div className="relative flex flex-col justify-center p-4 sm:p-6 lg:p-8 gap-y-4 sm:gap-y-6 lg:gap-y-8 bg-gray-950 rounded-lg shadow-lg min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white max-w-md">
            {t('handsOn.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-md">
            {t('handsOn.subtitle')}
          </p>

          {/* Stepper */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 mt-2">
            {stepperInfo.map((step, index) => (
              <div key={index} className="flex items-center gap-x-3 sm:gap-x-4">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center ${
                    step.isComplete
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {step.isComplete ? (
                    <Check size={14} className="sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <span className="text-xs sm:text-sm">{index + 1}</span>
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

          {/* Information text */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 flex items-center gap-x-3 sm:gap-x-4">
            <BrainCircuit
              size={20}
              className="sm:w-6 sm:h-6 text-primary text-shadow text-shadow-lg text-shadow-primary/50"
            />
            <span className="text-sm sm:text-base text-white/60">{t('common.aiPowered')}</span>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0">
        {/* Input Section */}
        <div className="w-full flex flex-col items-center py-4 sm:py-6 lg:py-8 gap-y-4 sm:gap-y-6 lg:gap-y-8">
          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-600 text-center px-4">
            {t('common.enterYourName')}
          </p>
          <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <input
              type="text"
              placeholder={t('common.namePlaceholder')}
              value={inputValue}
              onChange={nameHandler}
              className="bg-gray-100 rounded-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 w-full pr-12 sm:pr-14 lg:pr-16 border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-gray-300 transition-all duration-300 ease-out text-sm sm:text-base"
            />
            <button
              onClick={handleSubmit}
              disabled={!isNameValid}
              className={`absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 ${
                isNameValid
                  ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 cursor-pointer'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              } rounded-full w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all ease-out duration-300`}
            >
              <Sparkles size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-white" />
            </button>
          </div>
          {/* Validation Rules */}
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-3 sm:gap-y-4 w-full max-w-xs sm:max-w-lg lg:max-w-2xl justify-center items-center px-4">
            {inputRules.map((rule, index) => {
              const isValid = rule.rule(inputValue)
              return (
                <div key={index} className="flex items-center gap-x-2 sm:gap-x-3 text-xs sm:text-sm">
                  <CheckCircle2
                    size={16}
                    className={`sm:w-5 sm:h-5 text-gray-500 ${
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
    </section>
  )
}