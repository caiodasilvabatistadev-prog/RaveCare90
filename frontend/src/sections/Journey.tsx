import { useEffect, useRef } from 'react'
import { CalendarDays, HeartPlus, RefreshCw, Target } from 'lucide-react'

const steps = [
  {
    day: 'antes',
    title: 'Preparar com intenção',
    text: 'Organizar rotina, sono, condicionamento e alimentação pra chegar melhor no festival.',
    icon: CalendarDays,
  },
  {
    day: 'durante',
    title: 'Reduzir riscos no mundo real',
    text: 'Estratégias de redução de danos, hidratação, alimentação e decisões mais conscientes durante o rolê.',
    icon: Target,
  },
  {
    day: 'depois',
    title: 'Recuperar de verdade',
    text: 'Entender como seu corpo respondeu, cuidar da recuperação e ajustar o que for necessário pro próximo ciclo.',
    icon: HeartPlus,
  },
  {
    day: 'equipe',
    title: 'Nutri + educador físico',
    text: 'Além da médica: acompanhamento nutricional e educador físico na plataforma.',
    icon: RefreshCw,
  },
]

export function Journey() {
  const timelineRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const items = Array.from(timeline.children) as HTMLElement[]
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )

    items.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="section journey" id="como-funciona" aria-labelledby="journey-title">
      <div className="container journey-layout">
        <div className="section-heading">
          <p className="eyebrow">antes · durante · depois</p>
          <h2 id="journey-title">90 dias. Alguém do outro lado. Sem sumiço.</h2>
          <p className="section-description">
            Você observa as mudanças, registra o que importa e mantém contato diário com a
            Dra. Bianca no acompanhamento. Nutrição e educador físico entram no mesmo cuidado.
          </p>
        </div>
        <ol className="timeline timeline--scroll-reveal" ref={timelineRef}>
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
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
