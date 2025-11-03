import React from 'react'
import { trackEvent } from '../lib/analytics'

export default function ContactForm() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'sent' | 'error'>('idle')

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (!message.trim()) {
      setStatus('error')
      return
    }

    const to = 'pedrobfh@gmail.com'
    const subject = encodeURIComponent(`Portfolio message from ${name || email || 'visitor'}`)
    const body = encodeURIComponent(
      (message || '') + '\n\n' + (name ? `Name: ${name}\n` : '') + (email ? `Reply: ${email}\n` : '')
    )

    trackEvent('contact_form_submit', { method: 'mailto', name: name ? 'provided' : 'anonymous' })
    globalThis.location.href = `mailto:${to}?subject=${subject}&body=${body}`
              setStatusMessage("Email client opened. Thank you for reaching out!");
  }

  return (
    <form onSubmit={submit} className="space-y-3 max-w-xl">
      <div className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="flex-1 px-3 py-2 rounded bg-white/3 focus:outline-none focus:ring-2 focus:ring-accent-300"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email (optional)"
          className="flex-1 px-3 py-2 rounded bg-white/3 focus:outline-none focus:ring-2 focus:ring-accent-300"
        />
      </div>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Pedro, write a short message about your project, idea, or job opportunity..."
          rows={5}
          className="w-full px-3 py-2 rounded bg-white/3 focus:outline-none focus:ring-2 focus:ring-accent-300"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-accent-500 hover:bg-accent-400 text-space-950 rounded font-semibold"
        >
          Send
        </button>
        {status === 'sent' && <span className="text-sm text-accent-300">Email client opened. Thank you!</span>}
        {status === 'error' && <span className="text-sm text-red-400">Please add a short message before sending.</span>}
      </div>
    </form>
  )
}
