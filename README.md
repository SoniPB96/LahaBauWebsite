# Laha Bau Website v2

## Fertig
- Variante-B-Header
- echte Kontaktdaten
- klickbare Buttons für Telefon, E-Mail und WhatsApp
- Kontaktformular
- Kostenschätzer
- Vercel API Route `/api/contact`
- Demo-Modus ohne API-Key
- echter E-Mail-Versand optional über Resend + Vercel Environment Variables

## Lokal
npm install
npm run dev

## Für echten E-Mail-Versand in Vercel
Environment Variables:
- RESEND_API_KEY
- TO_EMAIL=kontakt@laha-bau.de
- FROM_EMAIL=onboarding@resend.dev oder später eigene Domain-Mail
