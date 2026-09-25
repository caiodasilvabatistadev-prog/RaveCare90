import { Ambulance, ArrowRight, Headphones, HeartHandshake, Quote, Sparkles, Video } from 'lucide-react'
import { biancaProfilePhoto } from '../assets/bianca'
import { Button } from '../components/Button'

export function Professional() {
  return (
    <section className="section professional" aria-labelledby="professional-title">
      <div className="container professional-grid">
        <div className="professional-portrait professional-portrait--photo">
          <img className="professional-profile-image" src={biancaProfilePhoto} alt="Dra. Bianca Rohsner" />
          <p><Sparkles size={14} /> escuta real, zero julgamento</p>
        </div>
        <div className="professional-copy">
          <p className="eyebrow">medicina que entende a vida real</p>
          <h2 id="professional-title">Dra. Bianca Rohsner</h2>
          <p className="professional-role"><Ambulance size={19} aria-hidden="true" /> médica emergencista <span aria-hidden="true">•</span> <Headphones size={19} aria-hidden="true" /> raver</p>
          <p className="professional-registration">CREMEC 21295 <span aria-hidden="true">|</span> RQE 13733</p>
          <blockquote><Quote size={24} aria-hidden="true" />Saúde se conversa sem tabu. Cada pessoa tem uma história, um corpo e um ritmo — o cuidado precisa acompanhar isso.</blockquote>
          <p>Sou médica emergencista e raver, com atuação em drogas, cannabis medicinal e redução de danos. As consultas são online e o acompanhamento continua com o RAVECARE 90.</p>
          <div className="professional-services">
            <span><Video size={17} aria-hidden="true" /> consultas online</span>
            <span><HeartHandshake size={17} aria-hidden="true" /> RAVECARE 90</span>
          </div>
          <Button href="#comece" variant="secondary">Quero conhecer <ArrowRight size={18} aria-hidden="true" /></Button>
        </div>
      </div>
    </section>
  )
}
