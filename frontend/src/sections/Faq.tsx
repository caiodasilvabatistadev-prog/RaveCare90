import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const faqs = [
  {
    q: 'O Rave Care é acompanhamento médico de verdade?',
    a: 'Sim. O Rave Care 90 é o acompanhamento contínuo com a Dra. Bianca: consultas online, presença entre os encontros e equipe na plataforma (nutrição e educador físico).',
  },
  {
    q: 'Cannabis medicinal é pra qualquer pessoa?',
    a: 'Não. Cada corpo é um corpo. A indicação depende de avaliação profissional, história clínica e acompanhamento, sem receita única.',
  },
  {
    q: 'E se eu já tentei cuidar sozinha e não deu certo?',
    a: 'Muita gente chega cansada de informação solta e de julgamento. O ponto do Rave Care 90 é presença contínua: registrar o que importa, entender padrões e chegar ao retorno com mais clareza.',
  },
  {
    q: 'Redução de danos significa incentivar uso?',
    a: 'Não. Significa informação segura, escuta real e estratégias pra diminuir riscos, com responsabilidade, sem romantizar e sem moralismo.',
  },
  {
    q: 'Como é o contato com a Dra. Bianca no dia a dia?',
    a: 'O acompanhamento inclui contato diário com a médica: presença real no ritmo do cuidado.',
  },
  {
    q: 'Como começo?',
    a: 'Toque em Quero o Rave Care na página. Se fizer sentido pra você, a conversa segue com a Dra. Bianca e o fluxo do acompanhamento de 90 dias: antes e depois do rolê.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section faq" id="conteudo" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="dúvidas que travam o cuidado"
          titleId="faq-title"
          title="O que te impede de cuidar disso hoje?"
          description="Respostas diretas, sem enrolação e sem pressão. Prepare-se pra esclarecer o que talvez você nem soubesse que precisava perguntar."
        />
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={20} aria-hidden="true" />
                </button>
                {isOpen && <p className="faq-answer">{item.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
