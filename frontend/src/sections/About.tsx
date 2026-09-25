import { Check, Flower2 } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const benefits = ['Seu histórico e seus objetivos organizados', 'Check-ins de sintomas, sono e qualidade de vida', 'Prescrição, exames e evolução no mesmo lugar', 'Informação segura para cuidar de você com mais autonomia']

export function About() {
  return (
    <section className="section about" id="como-funciona" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading eyebrow="cannabis medicinal sem complicação" title="Cuidado que acompanha a vida real." />
        <div className="about-grid">
          <div className="about-art" aria-hidden="true"><Flower2 /><span>informação também é cuidado</span></div>
          <div className="about-content">
            <p className="eyebrow">ciência, presença e troca</p>
            <h3>Você no centro. De verdade.</h3>
            <p>O RaveCareApp aproxima você da médica e reúne o que importa para acompanhar o uso prescrito de cannabis medicinal entre uma consulta e outra.</p>
            <ul className="check-list">{benefits.map((benefit) => <li key={benefit}><Check size={18} aria-hidden="true" />{benefit}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}
