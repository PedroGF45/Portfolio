import React from 'react'
import { FaRegMoon, FaSun } from 'react-icons/fa'

export default function MotionToggle() {
  const [disabled, setDisabled] = React.useState<boolean>(() => {
    try {
      return globalThis.localStorage?.getItem('animationsDisabled') === 'true'
    } catch {
      return false
    }
  })

  React.useEffect(() => {
    try {
      globalThis.localStorage?.setItem('animationsDisabled', disabled ? 'true' : 'false')
      if (disabled) {
        document.documentElement.dataset.animations = 'disabled'
      } else {
        delete document.documentElement.dataset.animations
      }
    } catch {
      // ignore
    }
  }, [disabled])

  return (
    <button
      onClick={() => setDisabled(v => !v)}
      className="flex items-center gap-2 px-3 py-2 rounded bg-white/3 text-accent-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent-300"
      title={disabled ? 'Enable animations' : 'Reduce animations'}
      aria-pressed={disabled}
    >
      {disabled ? <FaRegMoon /> : <FaSun />}
      <span className="sr-only">Toggle animations</span>
    </button>
  )
}
