import { CheckCircle2, Headphones, Leaf, Moon, X } from 'lucide-react'

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
  'Entender cannabis medicinal com evidência, sem terrorismo nem romantização',
  'Praticar redução de danos com escuta real e zero julgamento',
  'Manter o fio do cuidado antes e depois do rolê, com equipe no app',
]

export function PainPoints() {
  return (
    <section className="section pain-points" id="dores" aria-labelledby="pain-title">
      <div className="container pain-layout">
        <div className="myth-block">
          <h2 id="pain-title" className="myth-title">
            Você não vai ser tratada como protocolo.
            <br />
            Você não vai ficar sozinha entre uma consulta e outra.
            <br />
            E não vai mais se sabotar achando que “depois da festa eu resolvo”.
          </h2>
          <aside className="myth-callout" aria-label="Promessa RaveCare">
            Cuidado com presença real: cannabis medicinal, redução de danos e aftercare
            com médica que entende a sua vida, antes e depois do rolê.
          </aside>
        </div>

        <ul className="audience-chips" aria-label="Pra quem é o RaveCare">
          <li><Leaf size={15} aria-hidden="true" /> cannabis medicinal com evidência</li>
          <li><Headphones size={15} aria-hidden="true" /> energia de festival, escuta de consultório</li>
          <li><Moon size={15} aria-hidden="true" /> aftercare quando a festa acaba</li>
        </ul>

        <div className="pain-solution">
          <article className="contrast-card contrast-card--pain">
            <div className="qa-box">
              <p className="qa-box__label">Pergunta</p>
              <p className="qa-box__question">
                Bianca, depois do rolê eu fico dias mal e não sei por onde começar.
              </p>
              <p className="qa-box__label qa-box__label--answer">Resposta</p>
              <p className="qa-box__answer">
                Você não precisa resolver sozinha. A gente organiza o cuidado antes e depois do rolê.
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
            <div className="qa-box qa-box--win">
              <p className="qa-box__label">Pergunta</p>
              <p className="qa-box__question">
                Dá pra ter acompanhamento que entende minha rotina e minha saúde?
              </p>
              <p className="qa-box__label qa-box__label--answer">Resposta</p>
              <p className="qa-box__answer">
                Sim. Contato diário com a médica, escuta de verdade e cuidado que encaixa na sua vida.
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
