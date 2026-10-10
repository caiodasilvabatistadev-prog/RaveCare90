import { CheckCircle2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { SectionHeading } from '../components/SectionHeading'

const steps = [
  { day: 'dia 01', title: 'A gente começa daqui', text: 'Organize seu histórico e combine os objetivos do tratamento.' },
  { day: 'dia 30', title: 'Hora do check-in', text: 'Conte como estão os sintomas, a rotina e o seu bem-estar.' },
  { day: 'dia 60', title: 'Ligando os pontos', text: 'Veja padrões e entenda melhor como seu corpo está respondendo.' },
  { day: 'dia 90', title: 'Próximo passo', text: 'Chegue ao retorno com mais clareza para decidir os próximos caminhos.' },
]

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      if (preference?.matches || !preference) {
        setProgress(1)
        return
      }
      const bounds = section.getBoundingClientRect()
      const points = section.querySelectorAll('.timeline-point')
      const first = points[0]?.getBoundingClientRect()
      const last = points[points.length - 1]?.getBoundingClientRect()
      const start = first ? first.top : bounds.top
      const distance = first && last ? last.top - first.top : bounds.height
      setProgress(Math.max(0, Math.min(1, (window.innerHeight * 0.75 - start) / Math.max(1, distance))))
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    preference?.addEventListener('change', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      preference?.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <section ref={sectionRef} className="section journey" id="como-funciona" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading eyebrow="um passo de cada vez" title="90 dias. Alguém do outro lado. Sem sumiço." description="Você observa as mudanças, registra o que importa e não precisa esperar a próxima consulta pra olhar pro seu cuidado." />
        <ol className="timeline timeline--scroll">{steps.map((step, index) => <li
          key={step.day}
          className={progress * 3 >= index ? 'timeline-step timeline-step--revealed' : 'timeline-step'}
          style={{ '--segment-progress': Math.max(0, Math.min(1, progress * 3 - index)) } as CSSProperties}
        >
          <span className="timeline-connector" aria-hidden="true"><span /></span>
          <div className="timeline-point">{index + 1}</div>
          <div className="timeline-content"><p className="timeline-day">{step.day}</p><h3>{step.title}</h3><p>{step.text}</p>{index === steps.length - 1 && <CheckCircle2 className="timeline-check" aria-hidden="true" />}</div>
        </li>)}</ol>
      </div>
    </section>
  )
}
