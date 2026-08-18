const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

// Surfaced in the UI so a missing/misconfigured deploy fails visibly
// instead of silently pretending the message went through.
export const isEmailConfigured = Boolean(ACCESS_KEY)

/**
 * Sends the contact form through Web3Forms, which relays to the address the
 * access key is registered against. No OAuth grant to expire, and nothing
 * sends from a personal mail account.
 */
export async function sendContactMessage(formData) {
  if (!isEmailConfigured) {
    return { ok: false, reason: 'unconfigured' }
  }

  const payload = {
    access_key: ACCESS_KEY,
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    from_name: 'Portfolio contact form',
    // Web3Forms drops the submission when this hidden field is filled,
    // which only a bot auto-completing every input would do.
    botcheck: formData.get('botcheck') ?? '',
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => null)

    if (res.ok && data && data.success) {
      return { ok: true }
    }
    return { ok: false, reason: 'send-failed', error: data }
  } catch (error) {
    return { ok: false, reason: 'network', error }
  }
}
