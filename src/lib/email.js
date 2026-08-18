import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_CONTACT_CONFIRMATION_TEMPLATEID
const MESSAGE_TEMPLATE_ID = import.meta.env.VITE_MESSAGE_SENDER_TEMPLATEID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Surfaced in the UI so a missing/misconfigured deploy fails visibly
// instead of silently pretending the message went through.
export const isEmailConfigured = Boolean(
  SERVICE_ID && MESSAGE_TEMPLATE_ID && PUBLIC_KEY
)

function templateParams(formData) {
  return {
    to_name: 'Majid',
    Username: formData.get('name'),
    subject: formData.get('subject'),
    email: formData.get('email'),
    message: formData.get('message'),
  }
}

/**
 * Sends the message to Majid, then best-effort sends a confirmation back to
 * the sender. The confirmation failing must not report the whole send as
 * failed, since the message itself already arrived.
 */
export async function sendContactEmails(formData) {
  if (!isEmailConfigured) {
    return { ok: false, reason: 'unconfigured' }
  }

  const params = templateParams(formData)

  try {
    await emailjs.send(SERVICE_ID, MESSAGE_TEMPLATE_ID, params, PUBLIC_KEY)
  } catch (error) {
    return { ok: false, reason: 'send-failed', error }
  }

  if (CONFIRMATION_TEMPLATE_ID) {
    try {
      await emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, params, PUBLIC_KEY)
    } catch {
      // Swallowed on purpose: the message reached Majid, which is what matters.
    }
  }

  return { ok: true }
}
