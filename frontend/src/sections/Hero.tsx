import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { biancaRavePrimary } from '../assets/bianca'
import { Button } from '../components/Button'

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
            Você não precisa escolher entre viver a noite e ser ouvida de verdade.
            Acompanhamento com a Dra. Bianca Rohsner: cannabis medicinal, redução de danos
            e presença entre uma consulta e outra, sem tabu.
          </p>
          <div className="hero-actions">
            <Button href="#comece" variant="light">
              Quero começar <ArrowRight size={18} aria-hidden="true" />
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
