import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { Resend } from 'resend'

const OWNER_EMAIL = 'mathijsheutinck@hotmail.com'

const courseLabels: Record<string, string> = {
  'ai-agents-cfos': 'Bouw je eigen AI agent',
  'claude-financials': 'Claude voor Financials',
  'claude-legal': 'Claude voor Legal Professionals',
}

const dateLabels: Record<string, string> = {
  'juni-2025': '16 juni 2025 (vroegboeker — €495)',
  'september-2025': '17 september 2025 (regulier — €895)',
}

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

function buildEmailHtml(reg: Registration): string {
  const cursusLabel = courseLabels[reg.cursus] ?? reg.cursus
  const datumLabel = (dateLabels[reg.datum] ?? reg.datum) || '—'

  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:150px;vertical-align:top;">${label}</td>
          <td style="padding:8px 0;color:#1B2A4A;font-size:15px;">${value}</td>
        </tr>`
      : ''

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td>
      <table width="600" cellpadding="0" cellspacing="0" align="center" style="background:#ffffff;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1B2A4A;padding:32px 40px;">
            <p style="margin:0;color:#B8892B;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:sans-serif;">Chapter</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:bold;font-family:Georgia,serif;">Nieuwe aanmelding</h1>
          </td>
        </tr>

        <!-- Cursus highlight -->
        <tr>
          <td style="background:#B8892B;padding:16px 40px;">
            <p style="margin:0;color:#ffffff;font-size:16px;font-family:Georgia,serif;font-weight:bold;">${cursusLabel}</p>
            ${datumLabel ? `<p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:13px;font-family:sans-serif;">${datumLabel}</p>` : ''}
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8e2d9;">
              ${row('Naam', reg.naam)}
              ${row('E-mail', reg.email)}
              ${row('Bedrijf', reg.bedrijf)}
              ${row('Functietitel', reg.functietitel)}
              ${row('Telefoon', reg.telefoonnummer)}
              ${row('Locatie', reg.locatie)}
              ${reg.vragen ? row('Vragen', `<em style="color:#555;">${reg.vragen}</em>`) : ''}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#FAF8F3;padding:20px 40px;border-top:1px solid #e8e2d9;">
            <p style="margin:0;color:#aaa;font-size:12px;font-family:sans-serif;">
              Ontvangen op ${new Date(reg.registeredAt).toLocaleString('nl-NL', { dateStyle: 'long', timeStyle: 'short' })} · joinchapter.nl
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, cursus, datum, naam, bedrijf, functietitel, telefoonnummer, locatie, vragen } =
      body as Partial<Record<string, string>>

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

    // Persist to JSON file
    const dataDir = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDir, 'registrations.json')
    await fs.mkdir(dataDir, { recursive: true })
    let registrations: Registration[] = []
    try {
      registrations = JSON.parse(await fs.readFile(filePath, 'utf-8'))
    } catch { /* first entry */ }
    registrations.push(registration)
    await fs.writeFile(filePath, JSON.stringify(registrations, null, 2), 'utf-8')

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const cursusLabel = courseLabels[registration.cursus] ?? registration.cursus
      const naamLabel = registration.naam || registration.email

      await resend.emails.send({
        from: 'Chapter <onboarding@resend.dev>',
        to: OWNER_EMAIL,
        subject: `Nieuwe aanmelding: ${cursusLabel} — ${naamLabel}`,
        html: buildEmailHtml(registration),
      })
    } else {
      console.warn('[register] RESEND_API_KEY not set — email not sent')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het opnieuw.' }, { status: 500 })
  }
}
