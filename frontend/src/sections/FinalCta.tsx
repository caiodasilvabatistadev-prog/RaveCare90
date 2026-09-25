import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../components/Button'

export function FinalCta() {
  return (
    <section className="final-cta" id="comece" aria-labelledby="cta-title">
      <div className="container final-cta-inner">
        <Sparkles className="cta-sparkle" aria-hidden="true" />
        <p className="eyebrow eyebrow--light">quando fizer sentido pra você</p>
        <h2 id="cta-title">Bora cuidar da sua saúde sem julgamento?</h2>
        <p>Chega junto para conhecer um acompanhamento com informação, presença e conversa aberta.</p>
        <Button href="mailto:contato@ravecareapp.com" variant="light">Quero conversar <ArrowRight size={18} aria-hidden="true" /></Button>
      </div>
    </section>
  )
}
