'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const courseLabels: Record<string, string> = {
  'ai-agents-cfos': 'Bouw je eigen AI agent',
  'claude-financials': 'Claude voor Financials',
  'claude-legal': 'Claude voor Legal Professionals',
}

const dateLabels: Record<string, string> = {
  'juni-2025': 'Maandag 16 juni 2025',
  'september-2025': 'Woensdag 17 september 2025',
}

const locations = [
  'Amsterdam',
  'Den Haag',
  'Rotterdam',
  'Utrecht',
  'Arnhem',
  'Eindhoven',
  'Nijmegen',
  'Groningen',
]

function IconCheck() {
  return (
    <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function SuccessView({ cursusLabel }: { cursusLabel: string }) {
  return (
    <div className="text-center py-16 px-6 max-w-lg mx-auto">
      <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mx-auto mb-8">
        <IconCheck />
      </div>
      <h2 className="font-serif text-navy text-3xl font-bold mb-4">Aanmelding ontvangen</h2>
      <p className="text-navy/60 font-sans leading-relaxed mb-10">
        Bedankt voor je interesse in <strong className="text-navy font-medium">{cursusLabel}</strong>.
        We nemen binnenkort persoonlijk contact met je op om je aanmelding te bespreken.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gold font-sans text-sm hover:text-gold-light transition-colors"
      >
        ← Terug naar de website
      </Link>
    </div>
  )
}

function AanmeldenFormInner() {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') ?? ''
  const cursusParam = searchParams.get('cursus') ?? ''
  const datumParam = searchParams.get('datum') ?? ''

  const cursusLabel = courseLabels[cursusParam] ?? cursusParam
  const datumLabel = dateLabels[datumParam] ?? datumParam

  const [form, setForm] = useState({
    naam: '',
    bedrijf: '',
    functietitel: '',
    telefoonnummer: '',
    locatie: '',
    vragen: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.naam || !form.bedrijf || !form.functietitel) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailParam,
          cursus: cursusParam,
          datum: datumParam,
          ...form,
        }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError('Er ging iets mis. Probeer het opnieuw.')
      }
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full bg-white border border-cream-darker text-navy placeholder-navy/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors'
  const labelClass = 'text-navy/50 text-xs tracking-widest uppercase block mb-2 font-sans'

  if (success) {
    return <SuccessView cursusLabel={cursusLabel} />
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-navy/40 hover:text-navy font-sans text-sm mb-12 transition-colors">
        ← Terug
      </Link>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-12">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-cream-darker flex items-center justify-center text-xs font-sans text-navy/40 font-medium">1</span>
          <span className="text-navy/30 text-xs font-sans">E-mailadres</span>
        </div>
        <div className="h-px flex-1 bg-cream-darker" />
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-xs font-sans text-white font-medium">2</span>
          <span className="text-navy text-xs font-sans font-medium">Jouw gegevens</span>
        </div>
      </div>

      {/* Course summary */}
      <div className="bg-navy text-white p-6 mb-10">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-4 font-sans">Jouw selectie</p>
        <div className="space-y-3">
          <div>
            <p className="text-white/40 text-xs font-sans uppercase tracking-widest mb-1">Cursus</p>
            <p className="font-serif text-white text-xl font-bold">{cursusLabel || 'Onbekende cursus'}</p>
          </div>
          {datumLabel && (
            <div>
              <p className="text-white/40 text-xs font-sans uppercase tracking-widest mb-1">Datum</p>
              <p className="font-sans text-white/80 text-sm">{datumLabel}</p>
            </div>
          )}
          {emailParam && (
            <div>
              <p className="text-white/40 text-xs font-sans uppercase tracking-widest mb-1">E-mailadres</p>
              <p className="font-sans text-white/80 text-sm">{emailParam}</p>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <h1 className="font-serif text-navy text-3xl font-bold mb-3">Jouw gegevens</h1>
      <p className="text-navy/55 font-sans text-sm leading-relaxed mb-10">
        Vul je gegevens in en we nemen persoonlijk contact op om je aanmelding te bevestigen.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Naam <span className="text-gold">*</span></label>
            <input type="text" placeholder="Jan de Vries" value={form.naam} onChange={set('naam')} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Functietitel <span className="text-gold">*</span></label>
            <input type="text" placeholder="CFO" value={form.functietitel} onChange={set('functietitel')} required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Bedrijf <span className="text-gold">*</span></label>
          <input type="text" placeholder="Naam van je organisatie" value={form.bedrijf} onChange={set('bedrijf')} required className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Telefoonnummer (optioneel)</label>
          <input type="tel" placeholder="+31 6 12 34 56 78" value={form.telefoonnummer} onChange={set('telefoonnummer')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Gewenste locatie</label>
          <select value={form.locatie} onChange={set('locatie')} className={inputClass}>
            <option value="">Selecteer een stad...</option>
            {locations.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Vragen of opmerkingen (optioneel)</label>
          <textarea
            placeholder="Heb je specifieke vragen of verwachtingen? Laat het weten."
            value={form.vragen}
            onChange={set('vragen')}
            rows={4}
            className={inputClass + ' resize-none'}
          />
        </div>

        {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-white font-sans text-sm tracking-wide py-4 transition-colors flex items-center justify-center gap-2"
        >
          {submitting ? 'Bezig met versturen...' : 'Aanmelding versturen →'}
        </button>

        <p className="text-navy/30 text-xs font-sans text-center">
          We nemen binnen twee werkdagen persoonlijk contact op.
        </p>
      </form>
    </div>
  )
}

export default function AanmeldenPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="font-serif text-white text-2xl tracking-widest font-bold select-none">
            CHAPTER
          </Link>
        </div>
      </nav>

      <Suspense fallback={<div className="p-20 text-center text-navy/40 font-sans text-sm">Laden...</div>}>
        <AanmeldenFormInner />
      </Suspense>
    </div>
  )
}
