import { SectionHeading } from '../components/SectionHeading'

const concerns = [
  'Sair da consulta e não saber o que observar no dia a dia',
  'Perder o fio do sono, dos sintomas e da rotina entre um retorno e outro',
  'Carregar tabu em volta de cannabis medicinal e redução de danos',
  'Buscar informação em qualquer lugar e sair mais confusa do que entrou',
  'Sentir que o cuidado some quando a noite (e a vida) acontece de verdade',
]

export function Resources() {
  return <section className="section resources" id="para-voce">
    <div className="container reading-container">
      <SectionHeading eyebrow="se você não aguenta mais" title="Cuidar de você não pode depender de sorte depois do rolê." description="O corpo fala. A rotina muda. E entre uma consulta e outra muita gente fica sozinha com dúvidas, sintomas e decisões." />
      <ul className="reference-list">{concerns.map(concern => <li key={concern}>{concern}</li>)}</ul>
    </div>
  </section>
}
