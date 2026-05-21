import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface Registration {
  email: string
  cursus: string
  datum: string
  naam: string
  bedrijf: string
  functietitel: string
  telefoonnummer: string
  locatie: string
  vragen: string
  registeredAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, cursus, datum, naam, bedrijf, functietitel, telefoonnummer, locatie, vragen } = body as Partial<
      Record<string, string>
    >

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }

    const str = (v: string | undefined, max: number) => String(v ?? '').trim().slice(0, max)

    const registration: Registration = {
      email: str(email, 254).toLowerCase(),
      cursus: str(cursus, 100),
      datum: str(datum, 100),
      naam: str(naam, 200),
      bedrijf: str(bedrijf, 200),
      functietitel: str(functietitel, 200),
      telefoonnummer: str(telefoonnummer, 50),
      locatie: str(locatie, 100),
      vragen: str(vragen, 2000),
      registeredAt: new Date().toISOString(),
    }

    // Persist to a local JSON file.
    // For Vercel serverless: switch to a database (e.g. Vercel Postgres)
    // or an email service API (Resend, Mailchimp, ConvertKit).
    const dataDir = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDir, 'registrations.json')

    await fs.mkdir(dataDir, { recursive: true })

    let registrations: Registration[] = []
    try {
      const raw = await fs.readFile(filePath, 'utf-8')
      registrations = JSON.parse(raw)
    } catch {
      // File doesn't exist yet — start fresh
    }

    registrations.push(registration)
    await fs.writeFile(filePath, JSON.stringify(registrations, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het opnieuw.' }, { status: 500 })
  }
}
