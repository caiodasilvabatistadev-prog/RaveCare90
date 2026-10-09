import { SectionHeading } from '../components/SectionHeading'

const questions = [
  { title: 'Isso substitui consulta ou prescrição?', answer: 'Não. O RaveCare organiza o acompanhamento entre consultas. Informação ajuda, mas não substitui consulta ou prescrição.' },
  { title: 'Cannabis medicinal é pra qualquer pessoa?', answer: 'Não existe indicação igual para todo mundo. A avaliação médica considera seu histórico, riscos e objetivos antes de definir o tratamento.' },
  { title: 'E se eu já tentei cuidar sozinha e não deu certo?', answer: 'Você pode conversar sobre o que tentou, suas dificuldades e o que precisa mudar. O acompanhamento começa pela escuta, sem julgamento.' },
  { title: 'Redução de danos significa incentivar uso?', answer: 'Não. Significa conversar sobre riscos e maneiras de reduzir danos, com informação responsável e sem romantizar o uso.' },
  { title: 'Como começo?', answer: 'Use o botão Quero conversar para entrar em contato e conhecer o acompanhamento com a Dra. Bianca.' },
]

export function Guidance() {
  return <section className="section guidance" id="duvidas">
    <div className="container reading-container">
      <SectionHeading eyebrow="dúvidas que travam o cuidado" title="O que te impede de cuidar disso hoje?" description="Respostas diretas — sem enrolação e sem pressão. Prepare-se pra esclarecer o que talvez você nem soubesse que precisava perguntar." />
      <div className="faq-list">{questions.map((question, index) => <details key={question.title} open={index === 0}>
        <summary>{question.title}<span aria-hidden="true">+</span></summary>
        <p>{question.answer}</p>
      </details>)}</div>
    </div>
  </section>
}
