import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface ChatMessage {
  naam: string
  email: string
  bericht: string
  receivedAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { naam, email, bericht } = body as Partial<Record<string, string>>

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }
    if (!bericht || bericht.trim().length < 2) {
      return NextResponse.json({ error: 'Bericht is verplicht' }, { status: 400 })
    }

    const str = (v: string | undefined, max: number) => String(v ?? '').trim().slice(0, max)

    const message: ChatMessage = {
      naam: str(naam, 200),
      email: str(email, 254).toLowerCase(),
      bericht: str(bericht, 2000),
      receivedAt: new Date().toISOString(),
    }

    const dataDir = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDir, 'chat-messages.json')

    await fs.mkdir(dataDir, { recursive: true })

    let messages: ChatMessage[] = []
    try {
      const raw = await fs.readFile(filePath, 'utf-8')
      messages = JSON.parse(raw)
    } catch {
      // File doesn't exist yet
    }

    messages.push(message)
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Er ging iets mis.' }, { status: 500 })
  }
}
