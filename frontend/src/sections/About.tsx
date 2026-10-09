import { SectionHeading } from '../components/SectionHeading'

const benefits = [
  'Organizar histórico, objetivos e o que realmente importa pro tratamento',
  'Registrar sono, sintomas e qualidade de vida sem pressão de performance',
  'Chegar nas consultas com assunto — e com informação que faz sentido',
  'Ter prescrições, exames e evolução no mesmo lugar',
  'Entender cannabis medicinal com evidência, sem terrorismo nem romantização',
  'Praticar redução de danos com escuta real e zero julgamento',
  'Manter o fio do cuidado mesmo quando a vida (e a noite) acontece',
  'Decidir os próximos passos com mais clareza no retorno dos 90 dias',
]

export function About() {
  return <section className="section about" id="acompanhamento">
    <div className="container reading-container">
      <SectionHeading eyebrow="com o RaveCare 90" title="Método pra não se perder entre uma consulta e a próxima." description="Não é dietinha de saúde. É acompanhamento contínuo com a Dra. Bianca: presença, informação segura e um ritmo que cabe na vida real — inclusive depois do rolê." inverse />
      <h3 className="benefits-title">No acompanhamento, você vai conseguir:</h3>
      <ul className="reference-list">{benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
      <p className="method-note">Cada corpo responde de um jeito. O RaveCare organiza o cuidado — não promete milagre.</p>
    </div>
  </section>
}
