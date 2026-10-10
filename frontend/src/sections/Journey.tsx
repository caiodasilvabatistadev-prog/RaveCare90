import { Apple, CheckCircle2, Dumbbell, MessageCircle, Moon, Sun } from 'lucide-react'

const steps = [
  {
    day: 'antes',
    title: 'Preparar com intenção',
    text: 'Histórico, objetivos e plano clínico pra entrar no rolê com mais segurança.',
    icon: Sun,
  },
  {
    day: 'durante',
    title: 'Redução de danos ativa',
    text: 'Estratégias pra diminuir risco quando a noite acontece, sem julgamento.',
    icon: Moon,
  },
  {
    day: 'depois',
    title: 'Aftercare e rotina',
    text: 'Sono, sintomas e recuperação com presença. O cuidado não some no dia seguinte.',
    icon: MessageCircle,
  },
  {
    day: 'equipe',
    title: 'Nutri + educador físico',
    text: 'Além da médica: acompanhamento nutricional e educador físico na plataforma.',
    icon: Apple,
  },
]

export function Journey() {
  return (
    <section className="section journey" id="como-funciona" aria-labelledby="journey-title">
      <div className="container journey-layout">
        <div className="section-heading">
          <p className="eyebrow">antes · durante · depois</p>
          <h2 id="journey-title">90 dias. Alguém do outro lado. Sem sumiço.</h2>
          <p className="section-description">
            Você observa as mudanças, registra o que importa e conversa com a Dra. Bianca
            no chat ou WhatsApp conforme a disponibilidade dela. Nutrição e educador físico
            entram no mesmo acompanhamento.
          </p>
        </div>
        <ol className="timeline">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={step.day}>
                <div className="timeline-point">{index + 1}</div>
                <p className="timeline-day">
                  <Icon size={14} aria-hidden="true" />
                  {step.day}
                </p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {index === steps.length - 1 && (
                  <span className="timeline-extra" aria-hidden="true">
                    <Dumbbell size={16} />
                  </span>
                )}
                {index === steps.length - 1 && <CheckCircle2 className="timeline-check" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
