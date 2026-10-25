import {
  ArrowRight,
  GraduationCap,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Video,
} from 'lucide-react'
import { biancaLabcoatSecondary } from '../assets/bianca'
import { Button } from '../components/Button'
import { whatsappHref } from '../config/contact'

export function Professional() {
  return (
    <section className="section professional" id="bianca" aria-labelledby="professional-title">
      <div className="container professional-grid">
        <figure className="professional-portrait professional-portrait--photo professional-portrait--framed">
          <img
            className="professional-profile-image"
            src={biancaLabcoatSecondary}
            alt="Dra. Bianca Rohsner de jaleco Rave Care"
          />
          <figcaption className="professional-photo-badge">
            <div>
              <strong>Dra. Bianca Rohsner</strong>
              <span>Médica emergencista</span>
            </div>
          </figcaption>
        </figure>

        <div className="professional-copy">
          <p className="eyebrow eyebrow--pill">Quem vai te ajudar?</p>
          <h2 id="professional-title">Dra. Bianca Rohsner</h2>

          <p className="professional-role professional-role--primary">
            Médica emergencista. Raver. E alguém que acredita que cuidado de verdade começa
            quando você pode contar a verdade.
          </p>

          <p className="professional-registration">
            CREMEC 21295 <span aria-hidden="true">|</span> RQE 13733
          </p>

          <div className="professional-story">
            <p>
              Eu passei anos trabalhando em emergência, aprendendo a reconhecer risco, tomar
              decisão rápida e cuidar de gente em situações limite. Com o tempo, comecei a atender
              cada vez mais pessoas que vivem a cena eletrônica, usam substâncias, têm dúvidas que
              nunca tiveram coragem de levar pra outro médico e querem cuidar melhor da saúde sem
              precisar esconder parte da própria vida. Foi daí que nasceu o Rave Care.
            </p>
            <p>
              Aqui a conversa pode incluir uso de substâncias, redução de danos, cannabis medicinal
              quando indicado, sono, humor, rotina, medicamentos, exames, alimentação,
              condicionamento físico e recuperação.
            </p>
            <p>
              Sem moralismo. Sem romantizar risco. Sem fingir que sua vida cabe num protocolo pronto.
            </p>
            <p>
              Eu não quero ser a médica que só aparece quando alguma coisa dá errado. Quero
              acompanhar antes, durante e depois, entendendo como você vive, o que você quer
              melhorar e o que faz sentido pra sua saúde.
            </p>
            <p>
              Quero que sua saúde acompanhe a intensidade da vida que você escolheu viver.
            </p>
          </div>

          <ul className="professional-creds" aria-label="Capacitação">
            <li>
              <GraduationCap size={16} aria-hidden="true" />
              Graduação UECE · residência em Medicina de Emergência (ESP-CE)
            </li>
            <li>
              <Leaf size={16} aria-hidden="true" />
              Atuação em cannabis medicinal e redução de danos
            </li>
            <li>
              <MessageCircle size={16} aria-hidden="true" />
              Contato diário no acompanhamento
            </li>
          </ul>

          <div className="professional-services">
            <span><Video size={17} aria-hidden="true" /> consultas online</span>
            <span><HeartHandshake size={17} aria-hidden="true" /> Rave Care 90</span>
            <span><MessageCircle size={17} aria-hidden="true" /> contato diário</span>
          </div>

          <Button href={whatsappHref()} variant="secondary" target="_blank" rel="noreferrer">
            Quero o Rave Care <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
