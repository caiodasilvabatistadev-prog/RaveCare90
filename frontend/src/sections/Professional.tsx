import { ArrowRight, HeartHandshake, Stethoscope, Video } from 'lucide-react'
import { biancaLabcoatSecondary } from '../assets/bianca'
import { Button } from '../components/Button'

export function Professional() {
  return (
    <section className="section professional" id="bianca" aria-labelledby="professional-title">
      <div className="container professional-grid">
        <div className="professional-portrait professional-portrait--photo">
          <img
            className="professional-profile-image"
            src={biancaLabcoatSecondary}
            alt="Dra. Bianca Rohsner de jaleco RaveCareApp"
          />
          <div className="professional-photo-badge">
            <img src={biancaLabcoatSecondary} alt="" aria-hidden="true" />
            <div>
              <strong>Dra. Bianca Rohsner</strong>
              <span>Médica emergencista</span>
            </div>
          </div>
        </div>

        <div className="professional-copy">
          <p className="eyebrow eyebrow--pill">Quem vai te ajudar?</p>
          <h2 id="professional-title">Dra. Bianca Rohsner</h2>

          <p className="professional-role professional-role--primary">
            <Stethoscope size={20} aria-hidden="true" />
            Médica emergencista
          </p>
          <p className="professional-role professional-role--secondary">
            também raver · cuidado sem tabu
          </p>

          <p className="professional-registration">
            CREMEC 21295 <span aria-hidden="true">|</span> RQE 13733
          </p>

          <div className="professional-story">
            <p>
              Eu não sou só o jaleco do consultório, e também não sou só a vibe da pista.
              Sou médica primeiro: escuta clínica, responsabilidade e acompanhamento de verdade.
            </p>
            <p>
              Conheço a noite por dentro. Por isso falo de drogas, cannabis medicinal e redução
              de danos sem moralismo, e sem romantizar risco.
            </p>
            <p>
              As consultas são online. O cuidado continua com o RAVECARE 90, porque saúde
              também acontece entre um encontro e outro.
            </p>
          </div>

          <div className="professional-services">
            <span><Video size={17} aria-hidden="true" /> consultas online</span>
            <span><HeartHandshake size={17} aria-hidden="true" /> RAVECARE 90</span>
          </div>

          <Button href="#comece" variant="secondary">
            Quero conhecer <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
