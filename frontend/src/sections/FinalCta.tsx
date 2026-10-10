import { ArrowRight } from 'lucide-react'
import { biancaRavePrimary } from '../assets/bianca'
import { Button } from '../components/Button'
import { whatsappHref } from '../config/contact'
import wordmark from '../assets/ravecareapp-wordmark-transparent.png'

export function FinalCta() {
  return (
    <section className="finale" id="comece" aria-labelledby="cta-title">
      <div className="finale-media" aria-hidden="true">
        <img
          className="finale-photo"
          src={biancaRavePrimary}
          alt=""
        />
        <div className="finale-scrim" />
      </div>
      <div className="container finale-inner">
        <div className="finale-copy">
          <img
            className="finale-wordmark"
            src={wordmark}
            alt="RaveCare"
          />
          <p className="eyebrow eyebrow--light">depois da noite · entre as consultas</p>
          <h2 id="cta-title">RaveCare cuida de você quando a festa acaba.</h2>
          <p className="finale-promise">
            Redução de danos, cannabis medicinal e acompanhamento contínuo com a Dra. Bianca,
            pra saúde não sumir no dia seguinte, nem no intervalo entre um retorno e outro.
            Antes e depois do rolê, com nutrição, educador físico e contato diário no time.
          </p>
          <div className="finale-actions">
            <Button href={whatsappHref()} variant="light" target="_blank" rel="noreferrer">
              Quero o RaveCare <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <a className="text-link text-link--light" href="#bianca">
              Conhecer a Dra. Bianca
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
