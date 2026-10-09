import { CheckCircle2, X } from 'lucide-react'

const pains = [
  'Sair da consulta e não saber o que observar no dia a dia',
  'Perder o fio do sono, dos sintomas e da rotina entre um retorno e outro',
  'Carregar tabu em volta de cannabis medicinal e redução de danos',
  'Buscar informação em qualquer lugar e sair mais confusa do que entrou',
  'Sentir que o cuidado some quando a noite (e a vida) acontece de verdade',
]

const wins = [
  'Organizar histórico, objetivos e o que realmente importa pro tratamento',
  'Registrar sono, sintomas e qualidade de vida sem pressão de performance',
  'Entender cannabis medicinal com evidência — sem terrorismo nem romantização',
  'Praticar redução de danos com escuta real e zero julgamento',
  'Manter o fio do cuidado mesmo quando a vida (e a noite) acontece',
]

export function PainPoints() {
  return (
    <section className="section pain-points" id="dores" aria-labelledby="pain-title">
      <div className="container pain-layout">
        <p className="pain-disclaimer">
          Resultados variam. O RaveCare organiza o acompanhamento — não é promessa de milagre,
          nem substitui consulta ou prescrição.
        </p>

        <div className="myth-block">
          <h2 id="pain-title" className="myth-title">
            Você não vai ser tratada como protocolo.
            <br />
            Você não vai ficar sozinha entre uma consulta e outra.
            <br />
            E não vai mais se sabotar achando que “depois da festa eu resolvo”.
          </h2>
          <aside className="myth-callout" aria-label="Promessa RaveCare">
            Cuidado com presença real — cannabis medicinal e redução de danos
            com médica do outro lado. O básico que funciona.
          </aside>
        </div>

        <div className="pain-solution">
          <article className="contrast-card contrast-card--pain">
            <div className="question-box" aria-hidden="true">
              <p className="question-box__label">Caixinha de pergunta</p>
              <p className="question-box__text">
                Bianca, depois do rolê eu fico dias mal e não sei por onde começar 😩
              </p>
            </div>
            <h3>Se você não aguenta mais…</h3>
            <ul>
              {pains.map((pain) => (
                <li key={pain}>
                  <X size={16} aria-hidden="true" />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="contrast-card contrast-card--win">
            <div className="question-box question-box--win" aria-hidden="true">
              <p className="question-box__label">Caixinha de pergunta</p>
              <p className="question-box__text">
                Pela primeira vez senti que alguém entende minha rotina e minha saúde 💜
              </p>
            </div>
            <h3>Com o RaveCare 90, você vai conseguir:</h3>
            <ul>
              {wins.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
