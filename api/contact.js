
import { Resend } from 'resend';

function toText(payload) {
  const lines = [
    `Typ: ${payload.type || 'unbekannt'}`,
    `Name: ${payload.name || '—'}`,
    `E-Mail: ${payload.email || '—'}`,
    `Telefon: ${payload.phone || '—'}`,
    `PLZ / Ort: ${payload.city || '—'}`,
    '',
    `Nachricht: ${payload.message || '—'}`,
  ];
  if (payload.estimator) {
    const e = payload.estimator;
    lines.push(
      '',
      '--- Kostenschätzer ---',
      `Objekt: ${e.objectType || '—'}`,
      `Fläche: ${e.sqm || '—'} m²`,
      `Projektart: ${e.projectType || '—'}`,
      `Steckdosen: ${e.steckdosen ?? '—'}`,
      `Schalter: ${e.schalter ?? '—'}`,
      `Netzwerkdosen: ${e.netzwerkdosen ?? '—'}`,
      `Lampenauslässe: ${e.lampenauslaesse ?? '—'}`,
      `Rollladenschalter: ${e.rollladenschalter ?? '—'}`,
      `Taster: ${e.taster ?? '—'}`,
      `Programm: ${e.brand || '—'}`,
      `Qualität: ${e.quality || '—'}`,
      `Optionen: ${Object.entries(e.options || {}).filter(([, v]) => v).map(([k]) => k).join(', ') || 'keine'}`,
      `Datei: ${e.fileName || 'keine ausgewählt'}`,
      `Preisspanne: ${e.low || '—'} bis ${e.high || '—'} EUR`
    );
  }
  return lines.join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur POST erlaubt.' });

  const payload = req.body || {};
  if (!payload.name || !payload.email) return res.status(400).json({ error: 'Name und E-Mail sind erforderlich.' });

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL || 'kontakt@laha-bau.de';
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  if (!resendKey) {
    console.log('Kontaktanfrage (Demo-Modus):\n' + toText(payload));
    return res.status(200).json({
      ok: true,
      message: 'Anfrage technisch erfasst. Für echten E-Mail-Versand fehlt noch RESEND_API_KEY in Vercel. Bis dahin steht alles im Function-Log oder alternativ per E-Mail-App.',
      demoMode: true,
    });
  }

  try {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: payload.type === 'estimator' ? 'Neue Anfrage aus dem Kostenschätzer' : 'Neue Kontaktanfrage',
      text: toText(payload),
      replyTo: payload.email,
    });
    return res.status(200).json({ ok: true, message: 'Anfrage erfolgreich gesendet.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'E-Mail-Versand fehlgeschlagen. Prüfe RESEND_API_KEY, FROM_EMAIL und TO_EMAIL.' });
  }
}
