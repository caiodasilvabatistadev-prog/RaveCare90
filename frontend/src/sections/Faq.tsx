import { useEffect, useRef } from 'react'
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
  const faqListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = faqListRef.current
    if (!list) return

    const items = Array.from(list.querySelectorAll<HTMLElement>('.faq-item'))
    const showAll = () => items.forEach((item) => item.classList.add('is-visible'))

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      showAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section faq" id="conteudo" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="dúvidas que travam o cuidado"
          titleId="faq-title"
          title="O que te impede de cuidar disso hoje?"
          description="Respostas diretas, sem enrolação e sem pressão. Prepare-se pra esclarecer o que talvez você nem soubesse que precisava perguntar."
        />
        <div className="faq-list" ref={faqListRef}>
          {faqs.map((item, index) => {
            return (
              <article className={`faq-item faq-item--${index % 2 === 0 ? 'right' : 'left'}`} key={item.q}>
                <h3 className="faq-trigger">{item.q}</h3>
                <p className="faq-answer">{item.a}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
