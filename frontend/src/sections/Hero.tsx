import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'
import { biancaHeroCutout } from '../assets/bianca'
import { Button } from '../components/Button'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb--one" /><div className="hero-orb hero-orb--two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--light"><Sparkles size={15} aria-hidden="true" /> cannabis medicinal, sem tabu e com acompanhamento</p>
          <h1 id="hero-title">Seu cuidado continua <em>depois</em> da consulta.</h1>
          <p className="hero-description">Informação clara, escuta de verdade e acompanhamento para você cuidar da saúde sem abrir mão de quem é.</p>
          <div className="hero-actions">
            <Button href="#comece" variant="light">Quero começar <ArrowRight size={18} aria-hidden="true" /></Button>
            <a className="text-link text-link--light" href="#como-funciona">Ver como funciona <ArrowDownRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-sun" />
          <div className="hero-person hero-person--cutout">
            <img src={biancaHeroCutout} alt="Dra. Bianca Rohsner, médica emergencista" />
          </div>
          <div className="hero-doctor-info">
            <strong>Dra. Bianca Rohsner</strong>
            <span>médica emergencista · raver</span>
            <span>CREMEC 21295 · RQE 13733</span>
            <span>cannabis medicinal e redução de danos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
