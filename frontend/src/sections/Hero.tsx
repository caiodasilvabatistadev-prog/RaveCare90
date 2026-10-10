import { ArrowDownRight, ArrowRight, Leaf, MessageCircle } from 'lucide-react'
import { biancaRavePrimary } from '../assets/bianca'
import { Button } from '../components/Button'
import { whatsappHref } from '../config/contact'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <img
          className="hero-photo"
          src={biancaRavePrimary}
          alt=""
        />
        <div className="hero-scrim" />
      </div>
      <div className="hero-beam" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-brand">RaveCare</p>
          <h1 id="hero-title">
            Chega de cuidar da saúde só <em>depois</em> que o corpo grita.
          </h1>
          <p className="hero-description">
            Acompanhamento médico contínuo com a Dra. Bianca Rohsner: cannabis medicinal,
            redução de danos e aftercare pra quem vive o rolê sem abrir mão da saúde.
            Antes, durante e depois, com presença real entre uma consulta e outra.
          </p>
          <ul className="hero-signals" aria-label="Sinais do RaveCare">
            <li>
              <Leaf size={16} aria-hidden="true" />
              cannabis medicinal
            </li>
            <li>
              <MessageCircle size={16} aria-hidden="true" />
              chat e WhatsApp conforme disponibilidade
            </li>
          </ul>
          <div className="hero-actions">
            <Button href={whatsappHref()} variant="light">
              Quero conversar <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <a className="text-link text-link--light" href="#dores">
              Se isso é pra você <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
