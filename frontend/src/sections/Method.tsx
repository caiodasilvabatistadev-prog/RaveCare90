import { useEffect, useRef } from 'react'
import { Apple, Dumbbell, Leaf, Moon, ShieldCheck, Stethoscope, Sun } from 'lucide-react'

const phases = [
  {
    n: '01',
    when: 'Antes',
    title: 'Preparar o corpo e a mente',
    text: 'Consulta com escuta, objetivos claros e plano pra entrar na noite com mais segurança.',
    icon: Sun,
  },
  {
    n: '02',
    when: 'Durante',
    title: 'Redução de danos no rolê',
    text: 'Estratégias práticas pra diminuir risco quando a festa acontece. Zero julgamento.',
    icon: ShieldCheck,
  },
  {
    n: '03',
    when: 'Depois',
    title: 'Aftercare de verdade',
    text: 'Sono, sintomas e rotina no mesmo lugar. O cuidado continua quando as luzes apagam.',
    icon: Moon,
  },
]

const modules = [
  { n: '01', title: 'Consulta individualizada', text: 'História, exames, medicamentos, rotina e objetivos.', icon: Stethoscope },
  { n: '02', title: 'Redução de danos', text: 'Entender padrões de uso, riscos e formas de reduzir danos.', icon: Leaf },
  { n: '03', title: 'Cannabis medicinal', text: 'Avaliação individualizada, baseada em evidência.', icon: ShieldCheck },
  { n: '04', title: 'Sono, humor e rotina', text: 'Acompanhar como você dorme, funciona e se recupera.', icon: Apple },
  { n: '05', title: 'Condicionamento físico', text: 'Treino voltado pra saúde, disposição e resistência.', icon: Dumbbell },
  { n: '06', title: 'Acompanhamento contínuo', text: 'Ajustar o cuidado conforme sua saúde e sua rotina mudam.', icon: Moon },
]

const evenIf = [
  'Você não esteja “doente”, só queira se cuidar melhor',
  'Você ainda não consiga reduzir algum uso como gostaria',
  'Você tenha vergonha de falar sobre substâncias em consulta',
  'Você já faça terapia, treino ou acompanhamento com outros profissionais',
  'Você queira melhorar a saúde sem transformar sua vida numa lista de proibições',
]

export function Method() {
  const modulesPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const targets = modulesPanelRef.current?.querySelectorAll<HTMLElement>(
      '.modules-copy > .modules-badge, .modules-copy > h2, .modules-copy > .modules-lead, .modules-even > p, .modules-even li, .modules-grid > .module-card',
    )
    if (!targets?.length) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.15 },
    )

    targets.forEach((target, index) => {
      target.style.setProperty('--modules-reveal-delay', `${index * 55}ms`)
      observer.observe(target)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section method" id="acompanhamento" aria-labelledby="method-title">
      <div className="container">
        <div className="phase-grid" aria-label="Antes, durante e depois">
          {phases.map((phase) => {
            const Icon = phase.icon
            return (
              <article className="phase-card" key={phase.when}>
                <p className="phase-card__when">
                  <Icon size={16} aria-hidden="true" />
                  {phase.when}
                </p>
                <p className="phase-card__n">Tempo {phase.n}</p>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
              </article>
            )
          })}
        </div>

        <div className="modules-panel" ref={modulesPanelRef}>
          <div className="modules-copy">
            <p className="modules-badge">Não é protocolo genérico.</p>
            <h2 id="method-title">
              É acompanhamento contínuo com uma médica que entende a sua vida de verdade.
            </h2>
            <p className="modules-lead">
              Pra entender padrões, acompanhar mudanças e construir um cuidado que funcione na sua vida real.
            </p>
            <div className="modules-even">
              <p>Funciona mesmo que:</p>
              <ol>
                {evenIf.map((item, i) => (
                  <li key={item}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="modules-grid" aria-label="Pilares do Rave Care 90">
            {modules.map((mod) => {
              const Icon = mod.icon
              return (
                <article className="module-card" key={mod.n}>
                  <p className="module-card__n">
                    <Icon size={15} aria-hidden="true" />
                    Pilar {mod.n}
                  </p>
                  <h3>{mod.title}</h3>
                  <p>{mod.text}</p>
                </article>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
