import { CheckCircle2 } from 'lucide-react'

const steps = [
  { day: 'dia 01', title: 'A gente começa daqui', text: 'Organize seu histórico e combine os objetivos do tratamento.' },
  { day: 'dia 30', title: 'Hora do check-in', text: 'Conte como estão os sintomas, a rotina e o seu bem-estar.' },
  { day: 'dia 60', title: 'Ligando os pontos', text: 'Veja padrões e entenda melhor como seu corpo está respondendo.' },
  { day: 'dia 90', title: 'Próximo passo', text: 'Chegue ao retorno com mais clareza para decidir os próximos caminhos.' },
]

export function Journey() {
  return (
    <section className="section journey" id="como-funciona" aria-labelledby="journey-title">
      <div className="container journey-layout">
        <div className="section-heading">
          <p className="eyebrow">um passo de cada vez</p>
          <h2 id="journey-title">90 dias. Alguém do outro lado. Sem sumiço.</h2>
          <p className="section-description">
            Você observa as mudanças, registra o que importa e não precisa esperar a próxima
            consulta pra olhar pro seu cuidado.
          </p>
        </div>
        <ol className="timeline">
          {steps.map((step, index) => (
            <li key={step.day}>
              <div className="timeline-point">{index + 1}</div>
              <p className="timeline-day">{step.day}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {index === steps.length - 1 && <CheckCircle2 className="timeline-check" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
