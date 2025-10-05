'use client'

import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'
import { Trash2 } from 'lucide-react'

interface AksaraCanvasProps {
  width?: number
  height?: number
  strokeWidth?: number
  strokeColor?: string
  backgroundColor?: string
  onDrawStart?: () => void
  onDrawing?: () => void
  onDrawEnd?: () => void
  showTrashButton?: boolean
  showPlaceholder?: boolean
  placeholderImage?: string
  placeholderOpacity?: number
  className?: string
  disabled?: boolean
  style?: React.CSSProperties
}

export interface AksaraCanvasRef {
  clear: () => void
  getImageData: () => string | null
  drawPlaceholder: (imageSrc: string, opacity?: number) => void
  clearPlaceholder: () => void
  isEmpty: () => boolean
}

const AksaraCanvas = forwardRef<AksaraCanvasRef, AksaraCanvasProps>(({
  width = 400,
  height = 400,
  strokeWidth = 10,
  strokeColor = '#1f2937',
  backgroundColor = '#ffffff',
  onDrawStart,
  onDrawing,
  onDrawEnd,
  showTrashButton = true,
  showPlaceholder = false,
  placeholderImage,
  placeholderOpacity = 0.3,
  className = '',
  disabled = false,
  style,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const placeholderCanvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const placeholderCanvas = placeholderCanvasRef.current
    
    if (canvas) {
      canvas.width = width
      canvas.height = height
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        
        // Clear with background color
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, width, height)
      }
    }

    if (placeholderCanvas) {
      placeholderCanvas.width = width
      placeholderCanvas.height = height
    }
  }, [width, height, strokeWidth, strokeColor, backgroundColor])

  const drawPlaceholder = useCallback((imageSrc: string, opacity: number = 0.3) => {
    const placeholderCanvas = placeholderCanvasRef.current
    if (!placeholderCanvas) return

    const ctx = placeholderCanvas.getContext('2d')
    if (!ctx) return

    // Clear placeholder canvas
    ctx.clearRect(0, 0, width, height)

    // Load and draw image
    const img = new Image()
    img.onload = () => {
      ctx.globalAlpha = opacity
      const size = Math.min(width, height) * 0.5
      const x = (width - size) / 2
      const y = (height - size) / 2
      ctx.drawImage(img, x, y, size, size)
      ctx.globalAlpha = 1.0
    }
    img.src = imageSrc
  }, [width, height])

  // Update placeholder when placeholderImage changes
  useEffect(() => {
    if (showPlaceholder && placeholderImage) {
      drawPlaceholder(placeholderImage, placeholderOpacity)
    }
  }, [placeholderImage, showPlaceholder, placeholderOpacity, drawPlaceholder])

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
  }

  const getImageData = (): string | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    return canvas.toDataURL('image/png')
  }

  const clearPlaceholder = () => {
    const placeholderCanvas = placeholderCanvasRef.current
    if (!placeholderCanvas) return

    const ctx = placeholderCanvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)
  }

  const isEmpty = (): boolean => {
    const canvas = canvasRef.current
    if (!canvas) return true

    const ctx = canvas.getContext('2d')
    if (!ctx) return true

    const imageData = ctx.getImageData(0, 0, width, height)
    return imageData.data.every((value, index) => {
      // Check if pixel is the background color (white by default)
      return index % 4 === 3 ? true : value === 255
    })
  }

  useImperativeHandle(ref, () => ({
    clear,
    getImageData,
    drawPlaceholder,
    clearPlaceholder,
    isEmpty,
  }))

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    let clientX, clientY

    if ('touches' in e) {
      // Handle only the first touch for drawing
      if (e.touches.length === 0) return { x: 0, y: 0 }
      clientX = e.touches[0].clientX - rect.left
      clientY = e.touches[0].clientY - rect.top
    } else {
      clientX = e.clientX - rect.left
      clientY = e.clientY - rect.top
    }

    // Scale coordinates to match canvas internal resolution
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return { 
      x: clientX * scaleX, 
      y: clientY * scaleY 
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return

    // For touch events, only handle single touch
    if ('touches' in e && e.touches.length !== 1) return

    e.preventDefault()
    e.stopPropagation()
    isDrawingRef.current = true
    
    const canvas = canvasRef.current
    if (!canvas) return

    const { x, y } = getCoordinates(e)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)

    onDrawStart?.()
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || disabled) return

    // For touch events, only handle single touch
    if ('touches' in e && e.touches.length !== 1) return

    e.preventDefault()
    e.stopPropagation()
    
    const canvas = canvasRef.current
    if (!canvas) return

    const { x, y } = getCoordinates(e)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()

    onDrawing?.()
  }

  const stopDrawing = () => {
    if (!isDrawingRef.current) return
    
    isDrawingRef.current = false
    onDrawEnd?.()
  }

  return (
    <div className="relative" style={style}>
      {/* Placeholder canvas (behind) */}
      {showPlaceholder && (
        <canvas
          ref={placeholderCanvasRef}
          className="absolute top-0 left-0 pointer-events-none"
          style={{ 
            width: '100%', 
            height: '100%',
            aspectRatio: `${width}/${height}`
          }}
        />
      )}

      {/* Drawing canvas (front) */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        className={`bg-white ${disabled ? 'cursor-not-allowed' : 'cursor-crosshair'} ${className}`}
        style={{ 
          touchAction: 'none',
          width: '100%',
          height: '100%',
          aspectRatio: `${width}/${height}`,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      />

      {/* Trash button */}
      {showTrashButton && !disabled && (
        <button
          onClick={clear}
          className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-20 shadow-md cursor-pointer"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  )
})

AksaraCanvas.displayName = 'AksaraCanvas'

export default AksaraCanvas