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
  { n: '01', title: 'Consulta com escuta', text: 'História clínica, objetivos e o que importa de verdade pro seu corpo.', icon: Stethoscope },
  { n: '02', title: 'Cannabis com evidência', text: 'Indicação responsável, sem terrorismo, sem romantização, sem receita única.', icon: Leaf },
  { n: '03', title: 'Redução de danos', text: 'Estratégias pra diminuir risco quando a noite acontece. Zero julgamento.', icon: ShieldCheck },
  { n: '04', title: 'Nutrição no app', text: 'Acompanhamento nutricional na plataforma, alinhado ao seu ritmo e ao tratamento.', icon: Apple },
  { n: '05', title: 'Educador físico', text: 'Movimento e recuperação com educador físico no time, não só no consultório.', icon: Dumbbell },
  { n: '06', title: 'Retorno dos 90 dias', text: 'Padrões claros e próximos passos com mais segurança.', icon: Moon },
]

const evenIf = [
  'Você já tentou se cuidar sozinha e cansou da informação solta',
  'Tem vergonha de falar de rolê, substâncias ou cannabis na consulta',
  'Acha que médica “séria” não entende a sua vida',
  'Só lembra da saúde quando o corpo grita',
]

export function Method() {
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

        <div className="modules-panel">
          <div className="modules-copy">
            <p className="modules-badge">Não é protocolo genérico.</p>
            <h2 id="method-title">
              É acompanhamento contínuo com uma médica que entende a sua vida, antes e depois do rolê.
            </h2>
            <p className="modules-lead">
              Antes, durante e depois: consulta, cannabis medicinal, redução de danos,
              nutrição e educador físico no mesmo cuidado, com presença entre um retorno e outro.
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

          <div className="modules-grid" aria-label="Pilares do RaveCare 90">
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
