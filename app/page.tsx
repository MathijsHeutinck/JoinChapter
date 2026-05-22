'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Course {
  id: string
  title: string
  targetRole: string
  subtitle: string
  description: string
  duration: string
  format: string
  level: string
  topics: string[]
  tag: string
}

const featuredCourse: Course = {
  id: 'ai-agents-cfos',
  title: 'Bouw je eigen AI agent',
  targetRole: 'Voor CFOs & financieel directeuren',
  subtitle: 'Vertrek met een werkende AI agent die jij zelf hebt gebouwd',
  description:
    'Als CFO of financieel directeur weet je dat AI de financiële wereld ingrijpend verandert. Maar generieke AI-cursussen sluiten niet aan op jouw realiteit. In deze ééndaagse cursus bouw jij — samen met een kleine groep vakgenoten — je eigen AI agent die financiële data analyseert, rapportages samenstelt en beslissingen ondersteunt. Geen code, geen droge theorie: alleen concrete tools die je morgen al kunt inzetten.',
  duration: '1 dag',
  format: 'Fysiek op locatie, incl. lunch',
  level: 'Beginner — geen voorkennis vereist',
  topics: [
    'Hoe AI agents werken en wat ze voor jou kunnen doen',
    'Jouw eigen AI agent bouwen zonder één regel code',
    'Financiële data analyseren en samenvatten met AI',
    'Rapportages en bestuursnotities opstellen in een fractie van de tijd',
    'Je agent veilig inzetten binnen jouw organisatie',
    'Doorgroeien: wat is je volgende stap na deze dag?',
  ],
  tag: 'Uitgelicht',
}

const otherCourses: Course[] = [
  {
    id: 'claude-financials',
    title: 'Claude voor Financials',
    targetRole: 'Voor financiële professionals',
    subtitle: 'Werk twee keer zo snel met AI als persoonlijke assistent',
    description:
      'Een tweedaagse hands-on cursus speciaal voor financiële professionals die meer willen halen uit hun werkdagen. Leer hoe je Claude inzet voor financiële analyses, bestuursrapportages en complexe spreadsheets. In een kleine groep met collega\'s die dezelfde uitdagingen kennen, ontdek je hoe je met AI twee keer zo snel werkt — zonder kwaliteit in te leveren.',
    duration: '2 dagen',
    format: 'Fysiek op locatie, incl. lunch',
    level: 'Beginner — geen voorkennis vereist',
    topics: [
      'Claude instellen als jouw persoonlijke financiële assistent',
      'Bestuursrapportages in een fractie van de tijd opstellen',
      'Complexe spreadsheets analyseren en samenvatten',
      'Financiële scenario\'s doorrekenen en presenteren met AI',
      'Veilig en verantwoord gebruik van AI in financiën',
    ],
    tag: 'Financials',
  },
  {
    id: 'claude-legal',
    title: 'Claude voor Legal Professionals',
    targetRole: 'Voor juristen & legal professionals',
    subtitle: 'Bespaar uren per week op taken die AI in minuten afhandelt',
    description:
      'Juristen en legal professionals besteden uren aan taken die AI in minuten afhandelt. In deze tweedaagse cursus leer je Claude inzetten voor contractreviews, legal research, documentdraftwerk en cliëntcommunicatie. Je leert samen met een kleine groep vakgenoten — mensen die begrijpen wat jij dagelijks doet — en vertrekt met concrete workflows die je diezelfde week nog kunt toepassen.',
    duration: '2 dagen',
    format: 'Fysiek op locatie, incl. lunch',
    level: 'Beginner — geen voorkennis vereist',
    topics: [
      'Contracten reviewen en samenvatten in minuten',
      'Legal research versnellen met gerichte AI-zoekopdrachten',
      'Documenten en correspondentie opstellen met AI-assistentie',
      'Cliëntcommunicatie efficiënter maken zonder kwaliteitsverlies',
      'Juridische risico\'s en grenzen van AI-gebruik begrijpen',
    ],
    tag: 'Legal',
  },
]

const locations = ['Amsterdam', 'Den Haag', 'Rotterdam', 'Utrecht', 'Arnhem', 'Eindhoven', 'Nijmegen', 'Groningen']

const certificates = [
  {
    title: 'Chapter AI Practitioner',
    description: 'Erkend certificaat dat jouw praktische AI-vaardigheid bewijst in jouw vakgebied',
    roman: 'I',
  },
  {
    title: 'Peer Learning Network',
    description: 'Toegang tot een exclusief netwerk van vakgenoten en alumni van Chapter',
    roman: 'II',
  },
  {
    title: 'Praktijk Competentie',
    description: 'Aantoonbaar bekwaam in de directe toepassing van AI in professionele context',
    roman: 'III',
  },
]

const problemsSolutions = [
  {
    problem: 'De meeste AI-cursussen sluiten niet aan op mijn eigen werk.',
    solution: 'Elke oefening is direct gebaseerd op jouw vakgebied. Geen generieke voorbeelden — concrete toepassingen die je diezelfde dag nog gebruikt.',
  },
  {
    problem: 'Ik wil leren met anderen, niet alleen achter mijn scherm.',
    solution: 'Je leert in een kleine groep vakgenoten die jouw uitdagingen begrijpen. Na de cursus blijf je verbonden via ons peer-network voor on-demand vragen.',
  },
  {
    problem: 'In mijn drukke agenda past gewoon geen meerdaagse cursus.',
    solution: 'Eén dag, van ochtend tot middag. Je investeert één keer en werkt de dag erna al anders. Geen lange modules, geen verspreid programma.',
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function LogoIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="text-gold" aria-hidden>
      <rect x="0.75" y="4.75" width="10.5" height="14.5" rx="0.5" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
      <rect x="3.75" y="0.75" width="10.5" height="14.5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <line x1="7" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="10.5" x2="10" y2="10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

// ─── Problem illustrations ────────────────────────────────────────────────────

function IllustrationMismatch() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="text-navy/25">
      <rect x="12" y="10" width="34" height="44" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="31" x2="38" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="38" x2="32" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="54" cy="46" r="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="48" y1="40" x2="60" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="40" x2="48" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IllustrationAlone() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="text-navy/25">
      <circle cx="36" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 48C22 38 50 38 50 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="20" y="48" width="32" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="32" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="8" cy="50" r="2" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <circle cx="60" cy="30" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="64" cy="50" r="2" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  )
}

function IllustrationCalendar() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="text-navy/25">
      <rect x="8" y="16" width="56" height="48" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="28" x2="64" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="33" width="10" height="7" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="27" y="33" width="10" height="7" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="41" y="33" width="10" height="7" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="55" y="33" width="5" height="7" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="13" y="44" width="10" height="7" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="27" y="44" width="10" height="7" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="41" y="44" width="10" height="7" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="55" y="44" width="5" height="7" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="13" y="55" width="10" height="5" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="27" y="55" width="10" height="5" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// ─── Utility hook ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView] as const
}

// ─── Problem / Solution row ───────────────────────────────────────────────────

const illustrations = [<IllustrationMismatch key={0} />, <IllustrationAlone key={1} />, <IllustrationCalendar key={2} />]

function ProblemSolutionRow({
  problem,
  solution,
  index,
}: {
  problem: string
  solution: string
  index: number
}) {
  const [solutionRef, solutionVisible] = useInView(0.25)

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center py-14 border-b border-cream-darker last:border-0">
      {/* Problem */}
      <div className="flex items-center gap-8">
        <div className="flex-shrink-0">{illustrations[index]}</div>
        <p className="font-serif italic text-navy text-xl md:text-2xl leading-snug">{problem}</p>
      </div>

      {/* Solution — slides in when in view */}
      <div
        ref={solutionRef}
        className="transition-all duration-700 ease-out"
        style={{
          opacity: solutionVisible ? 1 : 0,
          transform: solutionVisible ? 'translateX(0)' : 'translateX(2.5rem)',
          transitionDelay: `${index * 80}ms`,
        }}
      >
        <div className="border-l-2 border-gold pl-6">
          <span className="text-gold text-xs tracking-widest uppercase block mb-3 font-sans">Bij Chapter</span>
          <p className="text-navy/70 font-sans leading-relaxed">{solution}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Email capture (step 1 → redirect to /aanmelden) ─────────────────────────

function EmailCapture({ courseId }: { courseId: string }) {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    router.push(`/aanmelden?${new URLSearchParams({ email, cursus: courseId })}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-navy/50 text-xs tracking-widest uppercase block mb-2 font-sans">
          E-mailadres
        </label>
        <input
          type="email"
          placeholder="jouw@email.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white border border-cream-darker text-navy placeholder-navy/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gold hover:bg-gold-light text-white font-sans text-sm tracking-wide py-4 transition-colors flex items-center justify-center gap-2"
      >
        <span>Meld je aan</span>
        <IconArrow />
      </button>
      <p className="text-xs font-sans text-navy/30">
        Je wordt doorgestuurd naar een kort aanmeldformulier.
      </p>
    </form>
  )
}

function ModalEmailCapture({ courseId, onClose }: { courseId: string; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    onClose()
    router.push(`/aanmelden?${new URLSearchParams({ email, cursus: courseId })}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        placeholder="jouw@email.nl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-white border border-cream-darker text-navy placeholder-navy/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
      />
      <button
        type="submit"
        className="w-full bg-gold hover:bg-gold-light text-white font-sans text-sm tracking-wide py-4 transition-colors flex items-center justify-center gap-2"
      >
        <span>Meld je aan</span>
        <IconArrow />
      </button>
      <p className="text-xs font-sans text-navy/30">Je wordt doorgestuurd naar een kort aanmeldformulier.</p>
    </form>
  )
}

// ─── Course modal ─────────────────────────────────────────────────────────────

function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-cream w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 bg-white/80 hover:bg-white text-navy/50 hover:text-navy p-2 transition-colors"
          aria-label="Sluiten"
        >
          <IconClose />
        </button>

        <div className="bg-navy px-8 py-10 md:px-12 md:py-12">
          <span className="text-gold text-xs tracking-widest uppercase block mb-3">{course.targetRole}</span>
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold leading-tight mb-3">{course.title}</h2>
          <p className="text-white/60 font-sans">{course.subtitle}</p>
        </div>

        <div className="px-8 py-10 md:px-12 md:py-12">
          <div className="grid grid-cols-3 gap-4 p-6 bg-cream-dark mb-8">
            {([['Duur', course.duration], ['Format', course.format], ['Niveau', course.level]] as [string, string][]).map(([l, v]) => (
              <div key={l} className="col-span-3 sm:col-span-1">
                <p className="text-navy/40 text-xs tracking-widest uppercase mb-1">{l}</p>
                <p className="font-sans font-medium text-navy text-sm">{v}</p>
              </div>
            ))}
          </div>

          <p className="text-navy/80 font-sans leading-relaxed mb-8">{course.description}</p>

          <h3 className="font-serif text-navy text-xl font-bold mb-5">Wat je leert</h3>
          <ul className="space-y-3 mb-10">
            {course.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3">
                <IconCheck />
                <span className="text-navy/80 font-sans text-sm leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-cream-darker pt-8">
            <p className="text-navy/55 font-sans text-sm mb-6 leading-relaxed">
              Laat je e-mailadres achter en we sturen je alle details over data, locaties en prijs.
            </p>
            <ModalEmailCapture courseId={course.id} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Chat widget ──────────────────────────────────────────────────────────────

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ naam: '', email: '', bericht: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSent(true)
      else setError('Er ging iets mis. Probeer het opnieuw.')
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.')
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    'w-full bg-white border border-cream-darker text-navy placeholder-navy/30 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold transition-colors'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div className="w-80 bg-cream shadow-2xl border border-cream-darker overflow-hidden">
          <div className="bg-navy px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-serif text-white text-base font-bold">Stel een vraag</p>
              <p className="text-white/45 text-xs font-sans mt-0.5">We antwoorden zo snel mogelijk</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <IconClose />
            </button>
          </div>

          <div className="p-5">
            {sent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-serif text-navy text-lg font-bold mb-2">Bericht ontvangen</p>
                <p className="text-navy/55 font-sans text-sm">We nemen zo snel mogelijk contact op.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Naam"
                  value={form.naam}
                  onChange={set('naam')}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="E-mailadres"
                  value={form.email}
                  onChange={set('email')}
                  required
                  className={inputClass}
                />
                <textarea
                  placeholder="Jouw vraag..."
                  value={form.bericht}
                  onChange={set('bericht')}
                  required
                  rows={4}
                  className={inputClass + ' resize-none'}
                />
                {error && <p className="text-red-500 text-xs font-sans">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-white text-sm font-sans py-3 transition-colors"
                >
                  {sending ? 'Bezig...' : 'Versturen →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 bg-gold hover:bg-gold-light shadow-lg flex items-center justify-center text-white transition-colors"
        aria-label={open ? 'Chat sluiten' : 'Chat openen'}
      >
        {open ? <IconClose /> : <IconChat />}
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 select-none">
            <LogoIcon />
            <span className="font-serif text-white text-2xl tracking-widest font-bold">CHAPTER</span>
          </a>
          <a
            href="#uitgelicht"
            className="bg-gold hover:bg-gold-light text-white text-sm tracking-wide px-5 py-2.5 transition-colors font-sans"
          >
            Aanmelden
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="min-h-screen bg-navy relative overflow-hidden flex items-center justify-center">
          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
              opacity: 0.045,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[850px] h-[850px] rounded-full border border-white/[0.025]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[1150px] h-[1150px] rounded-full border border-white/[0.015]" />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(44,66,112,0.45) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 text-center px-6 pt-20 pb-24 max-w-5xl mx-auto">
            <div className="hero-line-1">
              <span className="inline-block text-gold text-xs tracking-widest uppercase mb-10 font-sans">
                De meest praktische AI cursus voor de professionals van morgen
              </span>
            </div>
            <div className="hero-line-2">
              <h1
                className="font-serif text-white font-bold leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(3.25rem, 9vw, 6.5rem)' }}
              >
                Jouw volgende<br />hoofdstuk begint hier.
              </h1>
            </div>
            <div className="hero-line-3">
              <p
                className="text-white/55 font-sans leading-relaxed mx-auto mb-12 max-w-lg"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
              >
                Leer samen met vakgenoten hoe AI jouw werk concreet verbetert — in één dag.
              </p>
            </div>
            <div className="hero-line-4">
              <div className="flex items-center justify-center gap-5 mb-12">
                <span className="h-px w-14 bg-gold/35" />
                <LogoIcon />
                <span className="h-px w-14 bg-gold/35" />
              </div>
            </div>
            <div className="hero-line-5">
              <a
                href="#uitgelicht"
                className="inline-flex flex-col items-center gap-2 text-white/35 hover:text-white/55 transition-colors"
              >
                <span className="text-sm tracking-wide font-sans">Bekijk de cursus</span>
                <IconChevronDown />
              </a>
            </div>
          </div>
        </section>

        {/* Problems → Solutions */}
        <section className="bg-cream py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative">
              <span
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-serif font-bold leading-none select-none pointer-events-none text-navy/[0.035] hidden md:block"
                style={{ fontSize: 'clamp(8rem, 18vw, 13rem)' }}
                aria-hidden
              >
                I
              </span>
              <span className="relative inline-flex items-center gap-4 text-gold text-xs tracking-widest uppercase font-sans">
                <span className="h-px w-10 bg-gold/30" />
                Herkenbaar?
                <span className="h-px w-10 bg-gold/30" />
              </span>
            </div>
            <div>
              {problemsSolutions.map(({ problem, solution }, i) => (
                <ProblemSolutionRow key={i} problem={problem} solution={solution} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Course */}
        <section id="uitgelicht" className="bg-cream-dark py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative">
              <span
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-serif font-bold leading-none select-none pointer-events-none text-navy/[0.03] hidden md:block"
                style={{ fontSize: 'clamp(8rem, 18vw, 13rem)' }}
                aria-hidden
              >
                II
              </span>
              <span className="relative inline-flex items-center gap-4 text-gold text-xs tracking-widest uppercase font-sans">
                <span className="h-px w-10 bg-gold/30" />
                Uitgelichte Cursus
                <span className="h-px w-10 bg-gold/30" />
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
              {/* Left */}
              <div>
                <span className="inline-block text-gold text-xs tracking-widest uppercase bg-gold/10 px-3 py-1.5 font-sans mb-6">
                  {featuredCourse.targetRole}
                </span>
                <h2
                  className="font-serif text-navy font-bold leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  {featuredCourse.title}
                </h2>
                <p className="text-navy/50 font-sans text-lg mb-8">{featuredCourse.subtitle}</p>
                <p className="text-navy/75 font-sans leading-relaxed mb-12">{featuredCourse.description}</p>

                <div className="mb-12">
                  <h3 className="font-serif text-navy text-lg font-bold mb-5">Wat je leert</h3>
                  <ul className="space-y-3.5">
                    {featuredCourse.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <IconCheck />
                        <span className="text-navy/75 font-sans text-sm leading-relaxed">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="font-serif text-navy text-xl font-bold mb-5">Meld je aan</h3>
                <EmailCapture courseId={featuredCourse.id} />
              </div>

              {/* Right: sticky details card */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-navy text-white p-8 md:p-10">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-8 font-sans">Cursusdetails</p>
                  <div className="space-y-7 mb-10">
                    {(
                      [
                        ['Niveau', featuredCourse.level],
                        ['Format', featuredCourse.format],
                        ['Duur', featuredCourse.duration],
                      ] as [string, string][]
                    ).map(([label, value]) => (
                      <div key={label} className="border-b border-white/10 pb-7 last:border-0 last:pb-0">
                        <p className="text-white/40 text-xs tracking-widest uppercase mb-1.5 font-sans">{label}</p>
                        <p className="font-sans font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-8">
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-4 font-sans">Investering</p>
                    {/* June — early bird */}
                    <div className="border border-gold/40 p-4 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/50 text-xs font-sans tracking-wide">16 juni 2025</span>
                        <span className="bg-gold text-white text-xs px-2 py-0.5 font-sans tracking-wide">Vroegboeker</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl font-bold">€495</span>
                        <span className="text-white/30 text-base line-through font-sans">€895</span>
                      </div>
                    </div>
                    {/* September */}
                    <div className="border border-white/10 p-4">
                      <span className="text-white/50 text-xs font-sans tracking-wide block mb-2">17 september 2025</span>
                      <span className="font-serif text-2xl font-bold text-white/55">€895</span>
                    </div>
                    <p className="text-white/25 text-xs font-sans mt-3">excl. BTW · Kies je datum bij aanmelding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Courses */}
        <section id="cursussen" className="bg-cream py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative">
              <span
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-serif font-bold leading-none select-none pointer-events-none text-navy/[0.035] hidden md:block"
                style={{ fontSize: 'clamp(8rem, 18vw, 13rem)' }}
                aria-hidden
              >
                III
              </span>
              <span className="relative inline-flex items-center gap-4 text-gold text-xs tracking-widest uppercase font-sans">
                <span className="h-px w-10 bg-gold/30" />
                Meer Cursussen
                <span className="h-px w-10 bg-gold/30" />
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {otherCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="text-left bg-cream-dark p-8 md:p-10 hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-cream-darker relative overflow-hidden"
                >
                  {/* Sliding gold accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-gold text-xs tracking-widest uppercase bg-gold/10 px-3 py-1.5 font-sans">
                      {course.targetRole}
                    </span>
                    <span className="text-navy/25 group-hover:text-gold transition-colors duration-300 mt-0.5">
                      <IconArrow />
                    </span>
                  </div>
                  <h3 className="font-serif text-navy text-2xl md:text-3xl font-bold leading-tight mb-3">
                    {course.title}
                  </h3>
                  <p className="text-navy/50 font-sans text-sm mb-6">{course.subtitle}</p>
                  <p className="text-navy/65 font-sans text-sm leading-relaxed mb-8 line-clamp-3">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy/40 font-sans mb-8">
                    <span>{course.duration}</span>
                    <span className="text-navy/20">·</span>
                    <span>{course.format}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gold text-sm font-sans font-medium group-hover:gap-3 transition-all">
                    <span>Bekijk details</span>
                    <IconArrow />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* About Chapter */}
        <section id="over" className="bg-navy py-24 md:py-32 px-6 relative overflow-hidden">
          {/* Ghost roman numeral */}
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 font-serif font-bold leading-none select-none pointer-events-none text-white/[0.025] hidden lg:block -translate-x-1/4"
            style={{ fontSize: 'clamp(10rem, 18vw, 16rem)' }}
            aria-hidden
          >
            IV
          </span>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 xl:gap-24 items-center relative">
            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-4 text-gold text-xs tracking-widest uppercase font-sans mb-10">
                <span className="h-px w-10 bg-gold/30" />
                Over Chapter
                <span className="h-px w-10 bg-gold/30" />
              </span>
              <h2
                className="font-serif text-white font-bold leading-tight mb-8"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                Het volgende hoofdstuk van je carrière verdient de beste voorbereiding.
              </h2>
              <div className="h-px w-16 bg-gold/40 mb-8" />
              <p className="text-white/55 font-sans leading-relaxed text-lg">
                Chapter is opgericht voor professionals die voelen dat ze klaar zijn voor meer. We geloven dat AI niet voor iedereen hetzelfde is — en dat een cursus pas echt waarde heeft als die aansluit op jouw werk, jouw vak en jouw manier van leren. Dat doen we samen, met vakgenoten die je begrijpen.
              </p>
            </div>

            {/* Photo with gold corner accents */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"
                alt="Interactieve Chapter cursus sessie"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-gold/70 pointer-events-none" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-gold/70 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy-dark">
          {/* Value proposition */}
          <div className="border-b border-white/10 py-24 md:py-32 px-6 text-center relative overflow-hidden">
            {/* Ghost CHAPTER watermark */}
            <span
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-serif font-bold leading-none select-none pointer-events-none text-white/[0.02] hidden md:block"
              style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}
              aria-hidden
            >
              CHAPTER
            </span>
            <div className="relative">
              <div className="flex items-center justify-center gap-5 mb-12">
                <span className="h-px w-16 bg-white/15 block" />
                <LogoIcon />
                <span className="h-px w-16 bg-white/15 block" />
              </div>
              <p
                className="font-serif italic text-white font-bold leading-tight max-w-3xl mx-auto mb-12"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                Met de meest praktische AI cursus ben je als professional klaar voor het volgende hoofdstuk.
              </p>
              <a
                href="#uitgelicht"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-sans text-sm tracking-wide px-8 py-4 transition-colors"
              >
                <span>Begin met het volgende hoofdstuk</span>
                <IconArrow />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="py-8 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <a href="#" className="flex items-center gap-2.5 select-none">
                <LogoIcon />
                <span className="font-serif text-white text-lg tracking-widest font-bold">CHAPTER</span>
              </a>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-white/25 font-sans">
                <a href="https://www.joinchapter.nl" className="hover:text-white/50 transition-colors">
                  www.joinchapter.nl
                </a>
                <span className="hidden md:block text-white/15">·</span>
                <span>© 2025 Chapter. Alle rechten voorbehouden.</span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}

      <ChatWidget />
    </>
  )
}
