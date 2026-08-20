/**
 * Posts the message to /api/contact, which holds the EmailJS credentials and
 * performs the actual send.
 *
 * Nothing secret lives in this file on purpose. Anything imported into the
 * client bundle is readable by anyone who opens devtools, so the credentials
 * stay in the serverless function as non-VITE_ env vars.
 */
export async function sendContactEmail(formData) {
  let response

  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      }),
    })
  } catch (error) {
    return { ok: false, reason: 'network', error }
  }

  if (!response.ok) {
    const { reason } = await response.json().catch(() => ({}))
    return { ok: false, reason: reason ?? 'send-failed' }
  }

  return { ok: true }
}
