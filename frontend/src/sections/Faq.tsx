import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const faqs = [
  {
    q: 'O RaveCare é acompanhamento médico de verdade?',
    a: 'Sim. O RaveCare 90 é o acompanhamento contínuo com a Dra. Bianca: consultas online, presença entre os encontros e equipe na plataforma (nutrição e educador físico). Resultados variam; cada corpo responde de um jeito.',
  },
  {
    q: 'Cannabis medicinal é pra qualquer pessoa?',
    a: 'Não. Cada corpo é um corpo. A indicação depende de avaliação profissional, história clínica e acompanhamento, sem receita única e sem promessa de resultado.',
  },
  {
    q: 'E se eu já tentei cuidar sozinha e não deu certo?',
    a: 'Muita gente chega cansada de informação solta e de julgamento. O ponto do RAVECARE 90 é presença contínua: registrar o que importa, entender padrões e chegar ao retorno com mais clareza.',
  },
  {
    q: 'Redução de danos significa incentivar uso?',
    a: 'Não. Significa informação segura, escuta real e estratégias pra diminuir riscos, com responsabilidade, sem romantizar e sem moralismo.',
  },
  {
    q: 'Consigo falar com a Dra. Bianca no chat ou WhatsApp?',
    a: 'Sim. Você pode chamar no chat e no WhatsApp. O retorno é 24h conforme a disponibilidade dela: presença real, sem falsa promessa de resposta imediata a qualquer hora.',
  },
  {
    q: 'Como começo?',
    a: 'Chama no WhatsApp ou no chat pelo contato da página. Se fizer sentido pra você, a conversa segue com a Dra. Bianca e o fluxo do acompanhamento de 90 dias: antes, durante e depois do rolê.',
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
