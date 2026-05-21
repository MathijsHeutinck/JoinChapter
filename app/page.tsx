'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DateOption {
  id: string
  day: string
  date: string
  price: string
  originalPrice: string | null
  tag: string | null
}

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

const featuredDates: DateOption[] = [
  {
    id: 'juni-2025',
    day: 'Maandag',
    date: '16 juni 2025',
    price: '€495',
    originalPrice: '€895',
    tag: 'Vroegboekersprijs',
  },
  {
    id: 'september-2025',
    day: 'Woensdag',
    date: '17 september 2025',
    price: '€895',
    originalPrice: null,
    tag: null,
  },
]

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
      'Financiële scenarios doorrekenen en presenteren met AI',
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

function DateSelector({
  dates,
  selected,
  onChange,
}: {
  dates: DateOption[]
  selected: string
  onChange: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      {dates.map((d) => {
        const active = selected === d.id
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => onChange(d.id)}
            className={`w-full text-left border p-4 transition-all ${
              active ? 'border-navy bg-navy text-white' : 'border-cream-darker bg-white hover:border-navy/40 text-navy'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-sans text-sm font-medium ${active ? 'text-white' : 'text-navy'}`}>
                    {d.day} {d.date}
                  </span>
                  {d.tag && (
                    <span className={`text-xs px-2 py-0.5 font-sans ${active ? 'bg-gold text-white' : 'bg-gold/15 text-gold'}`}>
                      {d.tag}
                    </span>
                  )}
                </div>
                {d.originalPrice && (
                  <span className={`text-xs font-sans ${active ? 'text-white/50' : 'text-navy/40'} line-through`}>
                    {d.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`font-serif text-2xl font-bold ${active ? 'text-white' : 'text-navy'}`}>
                  {d.price}
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function EmailCapture({ courseId, selectedDate }: { courseId: string; selectedDate: string }) {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const params = new URLSearchParams({ email, cursus: courseId, datum: selectedDate })
    router.push(`/aanmelden?${params}`)
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
        Geen spam. Je wordt doorgestuurd naar een kort aanmeldformulier.
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
    const params = new URLSearchParams({ email, cursus: courseId })
    onClose()
    router.push(`/aanmelden?${params}`)
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

function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
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

        <div className="bg-navy px-8 py-10 md:px-12 md:py-12">
          <span className="text-gold text-xs tracking-widest uppercase block mb-3">{course.targetRole}</span>
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold leading-tight mb-3">{course.title}</h2>
          <p className="text-white/60 font-sans">{course.subtitle}</p>
        </div>

        <div className="px-8 py-10 md:px-12 md:py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 bg-cream-dark mb-8">
            {(
              [
                ['Duur', course.duration],
                ['Format', course.format],
                ['Niveau', course.level],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label} className="col-span-1 last:col-span-2">
                <p className="text-navy/40 text-xs tracking-widest uppercase mb-1">{label}</p>
                <p className="font-sans font-medium text-navy text-sm">{value}</p>
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

          <div className="border-t border-cream-darker pt-8 mb-8">
            <p className="text-navy/40 text-xs tracking-widest uppercase mb-2">Interesse aanmelden</p>
            <p className="text-navy/60 font-sans text-sm mb-6 leading-relaxed">
              Laat je e-mailadres achter en we sturen je alle details — inclusief data, locaties en prijs.
            </p>
            <ModalEmailCapture courseId={course.id} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedDate, setSelectedDate] = useState(featuredDates[0].id)

  const activeDate = featuredDates.find((d) => d.id === selectedDate) ?? featuredDates[0]

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-serif text-white text-2xl tracking-widest font-bold select-none">
            CHAPTER
          </a>
          <a href="#uitgelicht" className="bg-gold hover:bg-gold-light text-white text-sm tracking-wide px-5 py-2.5 transition-colors font-sans">
            Aanmelden
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="min-h-screen bg-navy relative overflow-hidden flex items-center justify-center">
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
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(44,66,112,0.4) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 text-center px-6 pt-20 pb-24 max-w-5xl mx-auto">
            <span className="inline-block text-gold text-xs tracking-widest uppercase mb-8 font-sans">
              Superpraktische AI cursus · Voor professionals
            </span>
            <h1
              className="font-serif text-white font-bold leading-[1.1] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
            >
              Eindelijk een AI cursus<br />die wél aansluit op jou.
            </h1>
            <p
              className="text-white/60 font-sans leading-relaxed mx-auto mb-6 max-w-2xl"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
            >
              Geen generieke theorie. Geen ellenlange e-learnings. Geen cursussen die niet aansluiten op jouw werkelijkheid.
            </p>
            <p
              className="text-white/80 font-sans leading-relaxed mx-auto mb-14 max-w-2xl font-medium"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
            >
              Leer samen met vakgenoten hoe AI jouw werk concreet verbetert — in één dag.
            </p>
            <a href="#uitgelicht" className="inline-flex flex-col items-center gap-2 text-white/35 hover:text-white/55 transition-colors">
              <span className="text-sm tracking-wide font-sans">Bekijk de cursus</span>
              <IconChevronDown />
            </a>
          </div>
        </section>

        {/* Problems → Solutions */}
        <section className="bg-cream-dark py-16 md:py-20 px-6 border-b border-cream-darker">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                problem: '"Het aanbod sluit niet aan op mijn werk."',
                solution: 'Iedere oefening is gebaseerd op jouw situatie. Geen generieke voorbeelden — wel directe toepassingen voor jouw vakgebied.',
                icon: '01',
              },
              {
                problem: '"Ik wil niet alleen leren."',
                solution: 'Kleine groepen vakgenoten die jouw uitdagingen begrijpen. Leer van elkaar en bouw een netwerk dat je bij blijft.',
                icon: '02',
              },
              {
                problem: '"Ik heb geen tijd."',
                solution: 'Eén dag investering. Op maandag naar de cursus, dinsdag al anders werken. Plus: stel nadien on-demand vragen aan je peers.',
                icon: '03',
              },
            ].map(({ problem, solution, icon }) => (
              <div key={icon} className="bg-cream p-8">
                <span className="font-serif text-gold text-4xl font-bold mb-6 block opacity-40">{icon}</span>
                <p className="font-serif text-navy text-lg italic mb-4 leading-snug">{problem}</p>
                <div className="h-px w-8 bg-gold/40 mb-4" />
                <p className="text-navy/65 font-sans text-sm leading-relaxed">{solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Course */}
        <section id="uitgelicht" className="bg-cream py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <span className="h-px w-12 bg-cream-darker block" />
              <span className="text-gold text-xs tracking-widest uppercase font-sans">Uitgelichte Cursus</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
              {/* Left */}
              <div>
                <span className="inline-block text-gold text-xs tracking-widest uppercase bg-gold/10 px-3 py-1.5 font-sans mb-4">
                  {featuredCourse.targetRole}
                </span>
                <h2
                  className="font-serif text-navy font-bold leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  {featuredCourse.title}
                </h2>
                <p className="text-navy/50 font-sans text-lg mb-8">{featuredCourse.subtitle}</p>
                <p className="text-navy/75 font-sans leading-relaxed mb-10">{featuredCourse.description}</p>

                {/* Concrete result callout */}
                <div className="bg-navy text-white px-6 py-5 mb-12 flex items-start gap-4">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="font-sans text-sm leading-relaxed">
                    <strong className="font-medium">Ga naar huis met een concreet en tastbaar resultaat:</strong>{' '}
                    je eigen AI agent, gebouwd en klaar voor gebruik in jouw organisatie.
                  </p>
                </div>

                {/* Topics */}
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

                {/* Date selection */}
                <div className="mb-10">
                  <h3 className="font-serif text-navy text-lg font-bold mb-5">Kies je datum</h3>
                  <DateSelector dates={featuredDates} selected={selectedDate} onChange={setSelectedDate} />
                </div>

                {/* Email capture */}
                <h3 className="font-serif text-navy text-xl font-bold mb-5">Meld je aan</h3>
                <EmailCapture courseId={featuredCourse.id} selectedDate={selectedDate} />
              </div>

              {/* Right: sticky card */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-navy text-white p-8 md:p-10">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-8 font-sans">Cursusdetails</p>
                  <div className="space-y-7 mb-10">
                    {(
                      [
                        ['Niveau', featuredCourse.level],
                        ['Format', featuredCourse.format],
                        ['Duur', featuredCourse.duration],
                        ['Datum', `${activeDate.day} ${activeDate.date}`],
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
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-5xl font-bold">{activeDate.price}</span>
                      {activeDate.originalPrice && (
                        <span className="text-white/30 text-lg font-sans line-through">{activeDate.originalPrice}</span>
                      )}
                    </div>
                    {activeDate.tag && (
                      <span className="inline-block mt-2 bg-gold text-white text-xs px-3 py-1 font-sans">{activeDate.tag}</span>
                    )}
                    <p className="text-white/30 text-xs font-sans mt-3">excl. BTW · Betalingsplan beschikbaar</p>
                  </div>
                </div>

                <div className="mt-8 p-6 border-l-2 border-gold">
                  <p className="font-serif text-navy/70 text-lg italic leading-relaxed mb-4">
                    &ldquo;Met de superpraktische AI cursus van Chapter ben je als professional klaar voor het volgende hoofdstuk.&rdquo;
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

        {/* Locations */}
        <section className="bg-navy py-16 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-12 bg-white/15 block" />
              <span className="text-white/40 text-xs tracking-widest uppercase font-sans">Locaties</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {locations.map((city) => (
                <span key={city} className="font-serif text-white text-xl font-medium">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-white/35 font-sans text-sm mt-6">
              Cursussen worden gegeven op meerdere locaties door het land. Geef bij aanmelding je voorkeur op.
            </p>
          </div>
        </section>

        {/* Certificates */}
        <section className="bg-cream py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-cream-darker block" />
              <span className="text-gold text-xs tracking-widest uppercase font-sans">Certificering</span>
            </div>
            <h2
              className="font-serif text-navy font-bold mb-16 max-w-2xl"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Verdien een toonaangevend certificaat dat jouw expertise bewijst.
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <div key={cert.title} className="text-center">
                  {/* Badge / Seal */}
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-gold/30" />
                    <div className="absolute inset-2 rounded-full border-2 border-gold/20" />
                    <div className="absolute inset-0 rounded-full bg-navy flex items-center justify-center">
                      <span className="font-serif text-gold text-3xl font-bold">{cert.roman}</span>
                    </div>
                    {/* Outer ring decoration */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <div
                        key={deg}
                        className="absolute w-1.5 h-1.5 bg-gold/40 rounded-full"
                        style={{
                          top: `${50 - 46 * Math.cos((deg * Math.PI) / 180)}%`,
                          left: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    ))}
                  </div>
                  <h3 className="font-serif text-navy text-xl font-bold mb-3">{cert.title}</h3>
                  <p className="text-navy/55 font-sans text-sm leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Chapter */}
        <section id="over" className="bg-navy py-28 md:py-36 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold text-xs tracking-widest uppercase block mb-10 font-sans">Over Chapter</span>
            <h2
              className="font-serif text-white font-bold leading-tight mb-10"
              style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
            >
              Het volgende hoofdstuk van je carrière verdient de beste voorbereiding.
            </h2>
            <div className="h-px w-16 bg-gold/40 mx-auto mb-10" />
            <p className="text-white/55 font-sans leading-relaxed text-lg max-w-2xl mx-auto">
              Chapter is opgericht voor professionals die voelen dat ze klaar zijn voor meer. We geloven dat AI niet voor iedereen hetzelfde is — en dat een cursus pas echt waarde heeft als die aansluit op jouw werk, jouw vak en jouw manier van leren. Dat doen we samen, met vakgenoten die je begrijpen.
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
              <span>© 2025 Chapter. Alle rechten voorbehouden.</span>
            </div>
          </div>
        </footer>
      </main>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  )
}
