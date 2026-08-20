const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

// Deliberately not VITE_ prefixed: that prefix is what tells Vite to inline a
// value into the client bundle, where anyone can read it. These stay on the
// server and never reach the browser.
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY

const FIELD_LIMITS = { name: 100, email: 200, subject: 150, message: 5000 }

// Best effort only: serverless instances are per-region and recycled, so this
// throttles a single burst rather than a determined attacker. The real control
// is that the credentials are no longer public.
const RATE_WINDOW_MS = 60_000
const RATE_MAX_PER_WINDOW = 3
const recentSends = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const hits = (recentSends.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)

  if (hits.length >= RATE_MAX_PER_WINDOW) {
    recentSends.set(ip, hits)
    return true
  }

  hits.push(now)
  recentSends.set(ip, hits)

  // Keep the map from growing without bound on a long lived instance.
  if (recentSends.size > 500) {
    for (const [key, times] of recentSends) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) recentSends.delete(key)
    }
  }

  return false
}

function validate(body) {
  const fields = {}

  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    const raw = body?.[field]
    if (typeof raw !== 'string' || !raw.trim()) return { error: `missing ${field}` }

    const value = raw.trim()
    if (value.length > max) return { error: `${field} exceeds ${max} characters` }
    fields[field] = value
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { error: 'invalid email' }
  }

  return { fields }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, reason: 'method-not-allowed' })
  }

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
    console.error('Contact form is missing one or more EMAILJS_* env vars')
    return res.status(503).json({ ok: false, reason: 'unconfigured' })
  }

  const { fields, error } = validate(req.body)
  if (error) {
    return res.status(400).json({ ok: false, reason: 'invalid', detail: error })
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, reason: 'rate-limited' })
  }

  let response
  try {
    response = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        accessToken: PRIVATE_KEY,
        template_params: {
          to_name: 'Majid',
          Username: fields.name,
          subject: fields.subject,
          email: fields.email,
          message: fields.message,
        },
      }),
    })
  } catch (cause) {
    console.error('Could not reach EmailJS', cause)
    return res.status(502).json({ ok: false, reason: 'send-failed' })
  }

  if (!response.ok) {
    // Logged server side only; the client gets a generic failure so that a
    // misconfiguration never leaks provider detail into the page.
    const detail = await response.text().catch(() => '')
    console.error('EmailJS rejected the send', response.status, detail)
    return res.status(502).json({ ok: false, reason: 'send-failed' })
  }

  return res.status(200).json({ ok: true })
}
