'use client'

import { useState } from 'react'

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  duration: string
  format: string
  level: string
  startDate: string
  price: string
  topics: string[]
  tag: string
}

const featuredCourse: Course = {
  id: 'ai-fundament',
  title: 'AI Fundament voor Professionals',
  subtitle: 'Van beginner tot zelfverzekerde AI-gebruiker',
  description:
    'Een uitgebreide cursus die je de kennis en vaardigheden geeft om AI effectief in te zetten in je werk. Van de basisconcepten tot praktische tools die je direct kunt toepassen — zonder technische achtergrond vereist.',
  duration: '6 weken',
  format: 'Online + wekelijkse live sessies',
  level: 'Geen voorkennis vereist',
  startDate: 'September 2026',
  price: '€995',
  topics: [
    'Wat is AI en hoe werkt het écht?',
    'Prompt engineering voor maximale productiviteit',
    'AI-tools integreren in je dagelijkse werkflow',
    'Verantwoord en veilig gebruik van AI',
    'Automatisering van routinetaken',
    'De toekomst van AI in jouw vakgebied',
  ],
  tag: 'Meest Populair',
}

const otherCourses: Course[] = [
  {
    id: 'generatieve-ai',
    title: 'Generatieve AI in de Praktijk',
    subtitle: 'Beheers de krachtigste AI-tools',
    description:
      'Leer ChatGPT, Claude, en andere generatieve AI-tools zo effectief inzetten dat je productiviteit verdubbelt. Praktisch, direct toepasbaar en zonder jargon.',
    duration: '4 weken',
    format: 'Online, volledig zelfgestuurd',
    level: 'Basiskennis AI gewenst',
    startDate: 'Oktober 2026',
    price: '€695',
    topics: [
      'Geavanceerde prompting technieken',
      'AI inzetten voor schrijven en communicatie',
      'AI-beeldgeneratie en contentcreatie',
      'AI-assistenten instellen en optimaliseren',
      'Privacy en beveiliging bij AI-gebruik',
    ],
    tag: 'Nieuw',
  },
  {
    id: 'ai-strategie',
    title: 'AI Strategie voor Leidinggevenden',
    subtitle: 'Leid je organisatie door de AI-transitie',
    description:
      'Een intensieve cursus voor managers en directeuren die hun organisatie willen voorbereiden op de AI-toekomst. Van strategie tot implementatie, met directe bruikbare inzichten.',
    duration: '2 dagen intensief',
    format: 'In-person, Amsterdam',
    level: 'Voor managers en directeuren',
    startDate: 'November 2026',
    price: '€1.495',
    topics: [
      'AI-strategie ontwikkelen voor je organisatie',
      'ROI van AI-investeringen berekenen',
      'Changemanagement bij AI-implementatie',
      'Juridische en ethische kaders',
      'AI-talent aantrekken en behouden',
    ],
    tag: 'Executive',
  },
]

function IconCheck() {
  return (
    <svg
      className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
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
    <svg
      className="w-5 h-5 animate-bounce"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function SuccessMessage({ courseName }: { courseName?: string }) {
  return (
    <div className="text-center py-10">
      <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-serif text-navy text-2xl font-bold mb-3">Bedankt voor je interesse!</h3>
      <p className="text-navy/60 font-sans text-sm leading-relaxed max-w-xs mx-auto">
        We nemen binnenkort persoonlijk contact met je op
        {courseName ? (
          <>
            {' '}
            over <em>{courseName}</em>
          </>
        ) : (
          ''
        )}
        .
      </p>
    </div>
  )
}

function RegistrationForm({
  courseId,
  onSuccess,
  dark = false,
}: {
  courseId: string
  onSuccess: () => void
  dark?: boolean
}) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, email, name }),
      })
      if (res.ok) {
        onSuccess()
      } else {
        setError('Er ging iets mis. Probeer het opnieuw.')
      }
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = dark
    ? 'w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors'
    : 'w-full bg-white border border-cream-darker text-navy placeholder-navy/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors'

  const labelBase = dark ? 'text-white/50 text-xs tracking-widest uppercase' : 'text-navy/50 text-xs tracking-widest uppercase'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelBase + ' block mb-2'}>Naam (optioneel)</label>
        <input
          type="text"
          placeholder="Jan de Vries"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBase}
        />
      </div>
      <div>
        <label className={labelBase + ' block mb-2'}>E-mailadres</label>
        <input
          type="email"
          placeholder="jouw@email.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputBase}
        />
      </div>
      {error && <p className="text-red-500 text-xs font-sans">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-white font-sans text-sm tracking-wide py-4 transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? (
          'Bezig...'
        ) : (
          <>
            <span>Meld je interesse aan</span>
            <IconArrow />
          </>
        )}
      </button>
      <p className={`text-xs font-sans ${dark ? 'text-white/30' : 'text-navy/30'}`}>
        Geen spam. We nemen persoonlijk contact op.
      </p>
    </form>
  )
}

function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const [success, setSuccess] = useState(false)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-cream w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 bg-white/80 hover:bg-white text-navy/50 hover:text-navy p-2 transition-colors"
          aria-label="Sluiten"
        >
          <IconClose />
        </button>

        {/* Header */}
        <div className="bg-navy px-8 py-10 md:px-12 md:py-12">
          <span className="text-gold text-xs tracking-widest uppercase block mb-4">{course.tag}</span>
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
            {course.title}
          </h2>
          <p className="text-white/60 font-sans">{course.subtitle}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-10 md:px-12 md:py-12">
          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 bg-cream-dark mb-8">
            {(
              [
                ['Duur', course.duration],
                ['Format', course.format],
                ['Niveau', course.level],
                ['Start', course.startDate],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label}>
                <p className="text-navy/40 text-xs tracking-widest uppercase mb-1">{label}</p>
                <p className="font-sans font-medium text-navy text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-navy/80 font-sans leading-relaxed mb-8">{course.description}</p>

          {/* Topics */}
          <h3 className="font-serif text-navy text-xl font-bold mb-5">Wat je leert</h3>
          <ul className="space-y-3 mb-10">
            {course.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3">
                <IconCheck />
                <span className="text-navy/80 font-sans text-sm leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="border-t border-cream-darker pt-8 mb-10">
            <p className="text-navy/40 text-xs tracking-widest uppercase mb-2">Investering</p>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-navy text-4xl font-bold">{course.price}</span>
              <span className="text-navy/40 text-sm font-sans">excl. BTW</span>
            </div>
          </div>

          {/* Registration */}
          {success ? (
            <SuccessMessage courseName={course.title} />
          ) : (
            <>
              <h3 className="font-serif text-navy text-xl font-bold mb-6">Interesse aanmelden</h3>
              <RegistrationForm courseId={course.id} onSuccess={() => setSuccess(true)} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [featuredSuccess, setFeaturedSuccess] = useState(false)

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-serif text-white text-2xl tracking-widest font-bold select-none">
            CHAPTER
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
          {/* Decorative circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[800px] rounded-full border border-white/[0.025]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[1100px] h-[1100px] rounded-full border border-white/[0.015]" />
          </div>
          {/* Radial gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(44,66,112,0.4) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 text-center px-6 pt-20 pb-24 max-w-5xl mx-auto">
            <span className="inline-block text-gold text-xs tracking-widest uppercase mb-8 font-sans">
              AI-cursussen · Voor werkende professionals
            </span>
            <h1 className="font-serif text-white font-bold leading-[1.1] mb-8 text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}>
              Jouw volgende<br />hoofdstuk begint hier.
            </h1>
            <p className="text-white/60 font-sans leading-relaxed mx-auto mb-14 max-w-xl" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
              Diepgaande AI-cursussen die je voorbereidt op de wereld van morgen. Geen jargon — wel echte vaardigheden.
            </p>
            <a
              href="#uitgelicht"
              className="inline-flex flex-col items-center gap-2 text-white/35 hover:text-white/55 transition-colors"
            >
              <span className="text-sm tracking-wide font-sans">Ontdek de cursussen</span>
              <IconChevronDown />
            </a>
          </div>
        </section>

        {/* Featured Course */}
        <section id="uitgelicht" className="bg-cream py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-16">
              <span className="h-px w-12 bg-cream-darker block" />
              <span className="text-gold text-xs tracking-widest uppercase font-sans">Uitgelichte Cursus</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
              {/* Left column */}
              <div>
                <span className="inline-block bg-gold text-white text-xs px-3 py-1.5 tracking-wide font-sans mb-8">
                  {featuredCourse.tag}
                </span>
                <h2 className="font-serif text-navy font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                  {featuredCourse.title}
                </h2>
                <p className="text-navy/50 font-sans text-lg mb-8">{featuredCourse.subtitle}</p>
                <p className="text-navy/75 font-sans leading-relaxed mb-12">{featuredCourse.description}</p>

                {/* Topics */}
                <div className="mb-14">
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

                {/* Registration form */}
                {featuredSuccess ? (
                  <SuccessMessage courseName={featuredCourse.title} />
                ) : (
                  <>
                    <h3 className="font-serif text-navy text-xl font-bold mb-6">Interesse aanmelden</h3>
                    <RegistrationForm
                      courseId={featuredCourse.id}
                      onSuccess={() => setFeaturedSuccess(true)}
                    />
                  </>
                )}
              </div>

              {/* Right column: sticky details card */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-navy text-white p-8 md:p-10">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-8 font-sans">Cursusdetails</p>
                  <div className="space-y-7 mb-10">
                    {(
                      [
                        ['Duur', featuredCourse.duration],
                        ['Format', featuredCourse.format],
                        ['Niveau', featuredCourse.level],
                        ['Startdatum', featuredCourse.startDate],
                      ] as [string, string][]
                    ).map(([label, value]) => (
                      <div key={label} className="border-b border-white/10 pb-7 last:border-0 last:pb-0">
                        <p className="text-white/40 text-xs tracking-widest uppercase mb-1.5 font-sans">{label}</p>
                        <p className="font-sans font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-8">
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-3 font-sans">Investering</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-5xl font-bold">{featuredCourse.price}</span>
                    </div>
                    <p className="text-white/35 text-xs font-sans mt-1">excl. BTW · Betalingsplan beschikbaar</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-8 p-6 border-l-2 border-gold">
                  <p className="font-serif text-navy/70 text-lg italic leading-relaxed mb-4">
                    &ldquo;AI is niet het einde van ons werk. Het is het begin van ons volgende hoofdstuk.&rdquo;
                  </p>
                  <p className="text-navy/40 text-xs tracking-wide uppercase font-sans">— Chapter</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Courses */}
        <section id="cursussen" className="bg-cream-dark py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <span className="h-px w-12 bg-cream-darker block" />
              <span className="text-gold text-xs tracking-widest uppercase font-sans">Meer Cursussen</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {otherCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="text-left bg-cream p-8 md:p-10 hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-cream-darker"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-gold text-xs tracking-widest uppercase bg-gold/10 px-3 py-1.5 font-sans">
                      {course.tag}
                    </span>
                    <span className="text-navy/25 group-hover:text-gold transition-colors duration-300 mt-0.5">
                      <IconArrow />
                    </span>
                  </div>
                  <h3 className="font-serif text-navy text-2xl md:text-3xl font-bold leading-tight mb-3">
                    {course.title}
                  </h3>
                  <p className="text-navy/50 font-sans text-sm mb-6">{course.subtitle}</p>
                  <p className="text-navy/65 font-sans text-sm leading-relaxed mb-8 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy/40 font-sans mb-8">
                    <span>{course.duration}</span>
                    <span className="text-navy/20">·</span>
                    <span>{course.format}</span>
                    <span className="text-navy/20">·</span>
                    <span>Vanaf {course.startDate}</span>
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
        <section id="over" className="bg-navy py-28 md:py-36 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold text-xs tracking-widest uppercase block mb-10 font-sans">Over Chapter</span>
            <h2 className="font-serif text-white font-bold leading-tight mb-10 text-balance" style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}>
              Het volgende hoofdstuk van je carrière verdient de beste voorbereiding.
            </h2>
            <div className="h-px w-16 bg-gold/40 mx-auto mb-10" />
            <p className="text-white/55 font-sans leading-relaxed text-lg max-w-2xl mx-auto">
              Chapter is opgericht voor professionals die voelen dat ze klaar zijn voor meer. Onze cursussen combineren de academische diepgang van een universiteit met de praktische relevantie die je vandaag nodig hebt — zonder de omwegen.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy-dark border-t border-white/10 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-serif text-white text-xl tracking-widest font-bold">CHAPTER</span>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-white/25 font-sans">
              <a href="https://www.joinchapter.nl" className="hover:text-white/50 transition-colors">
                www.joinchapter.nl
              </a>
              <span className="hidden md:block text-white/15">·</span>
              <span>© 2026 Chapter. Alle rechten voorbehouden.</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Course Modal */}
      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  )
}
