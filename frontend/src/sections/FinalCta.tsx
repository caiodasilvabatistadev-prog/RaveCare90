import { ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'
import { BrandLogo } from '../components/BrandLogo'

export function FinalCta() {
  return <section className="final-cta" id="comece" aria-labelledby="cta-title">
    <div className="container final-cta-inner">
      <BrandLogo />
      <p className="eyebrow eyebrow--light">depois da noite · entre as consultas</p>
      <h2 id="cta-title">RaveCare cuida de você quando a festa acaba.</h2>
      <p>Redução de danos, cannabis medicinal e acompanhamento contínuo com a Dra. Bianca — pra saúde não sumir no dia seguinte, nem no intervalo entre um retorno e outro.</p>
      <div className="hero-actions"><Button href="mailto:contato@ravecareapp.com" variant="light">Quero o RaveCare <ArrowRight size={18} aria-hidden="true" /></Button><a className="text-link text-link--light" href="#profissional">Conhecer a Dra. Bianca</a></div>
    </div>
  </section>
}
