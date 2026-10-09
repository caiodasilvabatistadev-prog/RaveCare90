const modules = [
  { n: '01', title: 'Consulta com escuta', text: 'História clínica, objetivos e o que importa de verdade pro seu corpo.' },
  { n: '02', title: 'Cannabis com evidência', text: 'Indicação responsável — sem terrorismo, sem romantização, sem receita única.' },
  { n: '03', title: 'Redução de danos', text: 'Estratégias pra diminuir risco quando a noite acontece. Zero julgamento.' },
  { n: '04', title: 'Entre as consultas', text: 'Sono, sintomas e rotina no mesmo lugar — pra você não se perder no meio do caminho.' },
  { n: '05', title: 'Retorno dos 90 dias', text: 'Padrões claros e próximos passos com mais segurança.' },
]

const evenIf = [
  'Você já tentou se cuidar sozinha e cansou da informação solta',
  'Tem vergonha de falar de rolê, substâncias ou cannabis na consulta',
  'Acha que médico “sério” não entende a sua vida',
  'Só lembra da saúde quando o corpo grita',
]

export function Method() {
  return (
    <section className="section method" id="acompanhamento" aria-labelledby="method-title">
      <div className="container">
        <div className="modules-panel">
          <div className="modules-copy">
            <p className="modules-badge">Não é protocolo genérico.</p>
            <h2 id="method-title">
              É acompanhamento contínuo com uma médica que entende a sua vida — inclusive depois do rolê.
            </h2>
            <p className="modules-lead">
              São pilares práticos pra organizar o cuidado: consulta, cannabis medicinal,
              redução de danos e presença entre um retorno e outro.
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
            {modules.map((mod) => (
              <article className="module-card" key={mod.n}>
                <p className="module-card__n">Pilar {mod.n}</p>
                <h3>{mod.title}</h3>
                <p>{mod.text}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="method-disclaimer">
          Cada corpo responde de um jeito. O RaveCare organiza o cuidado — não promete milagre.
        </p>
      </div>
    </section>
  )
}
