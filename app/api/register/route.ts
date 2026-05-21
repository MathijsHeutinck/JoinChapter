import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface Registration {
  courseId: string
  email: string
  name: string
  registeredAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, email, name } = body as {
      courseId?: string
      email?: string
      name?: string
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }

    const registration: Registration = {
      courseId: String(courseId ?? '').slice(0, 100),
      email: String(email).trim().toLowerCase().slice(0, 254),
      name: String(name ?? '').trim().slice(0, 200),
      registeredAt: new Date().toISOString(),
    }

    // Persist to a local JSON file.
    // For Vercel serverless: switch to a database (e.g. Vercel Postgres, PlanetScale)
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
