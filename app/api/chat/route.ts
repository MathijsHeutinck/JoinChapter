import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const OWNER_EMAIL = 'mathijsheutinck@hotmail.com'

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

    const message = {
      naam: str(naam, 200),
      email: str(email, 254).toLowerCase(),
      bericht: str(bericht, 2000),
      receivedAt: new Date().toISOString(),
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[chat] RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'E-mailservice niet geconfigureerd.' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const naamLabel = message.naam || message.email

    await resend.emails.send({
      from: 'Chapter <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `Nieuwe vraag via Chapter — ${naamLabel}`,
      html: `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td>
      <table width="600" cellpadding="0" cellspacing="0" align="center" style="background:#ffffff;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1B2A4A;padding:32px 40px;">
            <p style="margin:0;color:#B8892B;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:sans-serif;">Chapter</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:bold;font-family:Georgia,serif;">Nieuwe vraag</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8e2d9;">
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:150px;">Naam</td>
                <td style="padding:8px 0;color:#1B2A4A;font-size:15px;">${message.naam || '—'}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">E-mail</td>
                <td style="padding:8px 0;color:#1B2A4A;font-size:15px;">${message.email}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Vraag</td>
                <td style="padding:8px 0;color:#1B2A4A;font-size:15px;line-height:1.6;"><em>${message.bericht}</em></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#FAF8F3;padding:20px 40px;border-top:1px solid #e8e2d9;">
            <p style="margin:0;color:#aaa;font-size:12px;font-family:sans-serif;">
              Ontvangen op ${new Date(message.receivedAt).toLocaleString('nl-NL', { dateStyle: 'long', timeStyle: 'short' })} · joinchapter.nl
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Er ging iets mis.' }, { status: 500 })
  }
}
