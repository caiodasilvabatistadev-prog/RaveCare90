import { ArrowRight, MessageCircle } from 'lucide-react'
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
            Antes, durante e depois, com nutrição e educador físico no time.
          </p>
          <p className="finale-disclaimer">
            Resultados variam. Conversa no chat e no WhatsApp 24h conforme a disponibilidade
            da Dra. Bianca: presença real, sem falsa promessa de resposta imediata.
          </p>
          <div className="finale-actions">
            <Button href={whatsappHref()} variant="light">
              <MessageCircle size={18} aria-hidden="true" />
              Falar no WhatsApp <ArrowRight size={18} aria-hidden="true" />
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
