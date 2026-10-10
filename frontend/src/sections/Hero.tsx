import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { biancaHeroCutout } from '../assets/bianca'
import { Button } from '../components/Button'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-brand">RaveCare</p>
          <h1 id="hero-title"><span>Chega de cuidar</span>{' '}<span>da saúde só</span>{' '}<span><em>depois</em> que o</span>{' '}<span>corpo grita.</span></h1>
          <p className="hero-description">Acompanhamento com a Dra. Bianca Rohsner: cannabis medicinal, redução de danos e presença entre uma consulta e outra — sem tabu.</p>
          <div className="hero-actions">
            <Button href="#comece" variant="light">Quero começar <ArrowRight size={18} aria-hidden="true" /></Button>
            <a className="text-link text-link--light" href="#para-voce">Se isso é pra você <ArrowDownRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-person hero-person--cutout">
            <img src={biancaHeroCutout} alt="Dra. Bianca Rohsner, médica emergencista" />
          </div>
        </div>
      </div>
    </section>
  )
}
