import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
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
 * Sends the message to Majid. The sender deliberately gets no email back:
 * the form's "Message Sent!" state is the only acknowledgement, and Majid
 * replies by hand.
 */
export async function sendContactEmail(formData) {
  if (!isEmailConfigured) {
    return { ok: false, reason: 'unconfigured' }
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      MESSAGE_TEMPLATE_ID,
      templateParams(formData),
      PUBLIC_KEY
    )
  } catch (error) {
    return { ok: false, reason: 'send-failed', error }
  }

  return { ok: true }
}
