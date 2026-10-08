import { Activity, CalendarDays, ClipboardList, FileText, LineChart, MessageCircleHeart } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const resources = [
  { icon: ClipboardList, title: 'Seu ponto de partida', text: 'Seu histórico e seus objetivos ajudam a criar um cuidado que faça sentido pra você.' },
  { icon: LineChart, title: 'Como você está', text: 'Perceba mudanças, respostas e sinais do corpo com mais clareza.' },
  { icon: MessageCircleHeart, title: 'Check-ins sem pressão', text: 'Conte como estão o sono, a rotina, os sintomas e a qualidade de vida.' },
  { icon: FileText, title: 'Tudo organizado', text: 'Prescrições e exames sempre à mão, sem caça ao arquivo perdido.' },
  { icon: CalendarDays, title: 'Próximos encontros', text: 'Acompanhe retornos e saiba qual é o próximo passo do tratamento.' },
  { icon: Activity, title: 'Informação segura', text: 'Conteúdo confiável para cuidar da saúde dentro e fora do rolê.' },
]

export function Resources() {
  return (
    <section className="section resources" id="acompanhamento" aria-labelledby="resources-title">
      <div className="container">
        <SectionHeading eyebrow="seu tratamento em um só lugar" title="Pra acompanhar cada fase sem se perder no caminho." description="Registre como você está, entenda sua evolução e chegue às consultas com assunto — e informação." inverse />
        <div className="resource-grid">{resources.map(({ icon: Icon, title, text }) => <article className="resource-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>
  )
}
