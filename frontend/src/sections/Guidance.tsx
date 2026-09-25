import { ArrowUpRight, BookOpen, Leaf, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const articles = [
  { icon: BookOpen, label: 'cannabis medicinal', title: 'O que é, como funciona e onde entra o acompanhamento médico.' },
  { icon: Leaf, label: 'cada corpo é um corpo', title: 'Não existe receita igual pra todo mundo — e tudo bem.' },
  { icon: ShieldCheck, label: 'redução de danos', title: 'Informação boa ajuda você a fazer escolhas mais seguras.' },
]

export function Guidance() {
  return (
    <section className="section guidance" id="conteudo" aria-labelledby="guidance-title">
      <div className="container">
        <SectionHeading eyebrow="sem tabu, com evidência" title="Bora falar de cannabis de um jeito simples?" description="Conteúdo direto para tirar dúvidas e deixar as conversas com a médica mais produtivas. Informação ajuda, mas não substitui consulta ou prescrição." />
        <div className="article-grid">{articles.map(({ icon: Icon, label, title }) => <article className="article-card" key={label}><div className="article-icon"><Icon aria-hidden="true" /></div><p className="article-label">{label}</p><h3>{title}</h3><a href="#comece" aria-label={`Ler mais sobre ${label}`}>Quero entender <ArrowUpRight size={17} aria-hidden="true" /></a></article>)}</div>
      </div>
    </section>
  )
}
