import { CheckCircle2, Headphones, Leaf, Moon, X } from 'lucide-react'

const pains = [
  'Sair da consulta sentindo que não conseguiu contar tudo que realmente precisava',
  'Ter dúvida sobre interação entre medicamentos e substâncias e acabar procurando resposta solta na internet',
  'Perceber que seu uso de maconha, álcool ou outras substâncias aumentou e não saber como reduzir',
  'Passar dias com sono, humor e rotina bagunçados depois dos rolês',
  'Sentir que sua saúde e seu condicionamento não acompanham a vida que você quer viver',
  'Só procurar ajuda quando alguma coisa já deu errado',
]

const wins = [
  'Entender melhor seu padrão de uso e seus riscos',
  'Organizar sono, humor e rotina',
  'Tirar dúvidas sobre medicamentos e substâncias com acompanhamento médico',
  'Melhorar condicionamento e recuperação',
  'Deixar de esperar alguma coisa dar errado para começar a agir',
]

export function PainPoints() {
  return (
    <section className="section pain-points" id="dores" aria-labelledby="pain-title">
      <div className="container pain-layout">
        <div className="myth-block">
          <h2 id="pain-title" className="myth-title">
            Você não precisa esperar alguma coisa dar errado pra começar a se cuidar.
          </h2>
          <aside className="myth-callout" aria-label="Promessa Rave Care">
            Entender como você vive, seu padrão de uso de substâncias, seu sono, seu humor e o que
            você quer melhorar na sua saúde.
          </aside>
        </div>

        <ul className="audience-chips" aria-label="Pra quem é o Rave Care">
          <li><Leaf size={15} aria-hidden="true" /> redução de danos baseada em evidência</li>
          <li><Headphones size={15} aria-hidden="true" /> sono, humor e rotina</li>
          <li><Moon size={15} aria-hidden="true" /> condicionamento físico e recuperação</li>
        </ul>

        <div className="pain-solution">
          <article className="contrast-card contrast-card--pain">
            <div className="qa-box">
              <p className="qa-box__label">Pergunta</p>
              <p className="qa-box__question">
                Bianca, eu uso substâncias e tenho várias dúvidas, mas nunca sei com quem conversar sem ser julgada.
              </p>
              <p className="qa-box__label qa-box__label--answer">Resposta</p>
              <p className="qa-box__answer">
                No RAVECARE, você pode falar sobre uso de substâncias, medicamentos, sono, humor, rotina e saúde com acompanhamento médico e sem precisar esconder parte da sua vida.
              </p>
            </div>
            <h3>Se você cansou de…</h3>
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
                Cannabis medicinal também pode ser avaliada no RaveCare?
              </p>
              <p className="qa-box__label qa-box__label--answer">Resposta</p>
              <p className="qa-box__answer">
                Pode. A indicação é avaliada individualmente, considerando seu histórico, sintomas, objetivos e evidências disponíveis.
              </p>
            </div>
            <h3>O que muda quando você para de cuidar da saúde no improviso?</h3>
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
