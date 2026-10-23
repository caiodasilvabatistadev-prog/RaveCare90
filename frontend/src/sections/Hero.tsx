import { ArrowDownRight, ArrowRight, Dumbbell, HeartHandshake, ShieldCheck } from 'lucide-react'
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
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-beam" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-brand hero-reveal">Rave Care</p>
          <h1 id="hero-title" className="hero-reveal hero-reveal--title">
            Você não precisa esconder do médico a vida que você realmente leva.
          </h1>
          <p className="hero-description hero-reveal hero-reveal--body">
            Acompanhamento médico pra quem vive festivais, usa substâncias ou simplesmente quer
            cuidar melhor da saúde com uma médica que entende esse contexto — sem julgamento e
            sem romantização.
          </p>
          <ul className="hero-signals hero-reveal hero-reveal--signals" aria-label="Sinais do Rave Care">
            <li>
              <ShieldCheck size={16} aria-hidden="true" />
              redução de danos
            </li>
            <li>
              <Dumbbell size={16} aria-hidden="true" />
              condicionamento físico
            </li>
            <li>
              <HeartHandshake size={16} aria-hidden="true" />
              cuidado sem julgamento
            </li>
          </ul>
          <div className="hero-actions hero-reveal hero-reveal--cta">
            <Button href={whatsappHref()} variant="light" className="hero-cta" target="_blank" rel="noreferrer">
              Quero o Rave Care <ArrowRight size={18} aria-hidden="true" />
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
