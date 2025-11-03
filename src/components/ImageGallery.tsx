import React, { useState, useEffect, useRef } from 'react'

interface ImageGalleryProps {
  images: string[]
  open: boolean
  onClose: () => void
  initialIndex?: number
  captions?: string[]
}

export default function ImageGallery({ images, open, onClose, initialIndex = 0, captions = [] }: ImageGalleryProps) {
  const [index, setIndex] = useState(initialIndex)
  const [fade, setFade] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) setIndex(initialIndex)
  }, [open, initialIndex])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, index])

  useEffect(() => {
    if (!open) return
    if (containerRef.current) containerRef.current.focus()
  }, [open])

  const prev = () => {
    setFade(false)
    setTimeout(() => {
      setIndex(i => (i === 0 ? images.length - 1 : i - 1))
      setFade(true)
    }, 120)
  }
  const next = () => {
    setFade(false)
    setTimeout(() => {
      setIndex(i => (i === images.length - 1 ? 0 : i + 1))
      setFade(true)
    }, 120)
  }

  if (!open) return null
  if (!images || images.length === 0) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      ref={containerRef}
      style={{ outline: 'none' }}
    >
      <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-white text-2xl" onClick={onClose} aria-label="Close gallery">×</button>
        <div className="flex items-center justify-center w-full h-[60vh]">
          <button className="text-white text-3xl px-4" onClick={prev} aria-label="Previous image">‹</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[index]}
            alt={captions[index] || 'Project screenshot'}
            className={`max-h-[55vh] max-w-full rounded shadow-lg transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s' }}
          />
          <button className="text-white text-3xl px-4" onClick={next} aria-label="Next image">›</button>
        </div>
        {captions[index] && (
          <div className="mt-2 text-center text-white text-sm bg-black bg-opacity-40 px-3 py-1 rounded shadow">
            {captions[index]}
          </div>
        )}
        <div className="flex gap-2 mt-4">
          {images.map((img, i) => (
            <button
              key={img}
              className={`w-4 h-4 rounded-full border-2 ${i === index ? 'bg-white border-white' : 'bg-gray-400 border-gray-400'}`}
              onClick={() => { setFade(false); setTimeout(() => { setIndex(i); setFade(true) }, 120) }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
