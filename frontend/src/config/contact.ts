/** Public contact channels for Dra. Bianca (landing CTAs). */
export const contact = {
  email: 'contato@ravecareapp.com',
  instagram: 'https://www.instagram.com/biancarohsner/',
  /** Doctoralia-listed mobile; replies based on availability (not always-online). */
  whatsappE164: '5521920405871',
  whatsappMessage:
    'Oi Dra. Bianca! Quero o RaveCare: acompanhamento médico contínuo (antes, durante e depois do rolê).',
} as const

export function whatsappHref(message = contact.whatsappMessage): string {
  const text = encodeURIComponent(message)
  return `https://wa.me/${contact.whatsappE164}?text=${text}`
}
