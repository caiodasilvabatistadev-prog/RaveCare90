import { ArrowRight, ClipboardList, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { anvisaSteps } from '../data/anvisaJourney'

const previewSteps = anvisaSteps.slice(0, 4)

export function ReceitaAnvisa() {
  return (
    <section className="section receita-anvisa" id="receita-anvisa" aria-labelledby="receita-anvisa-title">
      <div className="container">
        <SectionHeading
          eyebrow="depois da consulta"
          title="Recebi minha receita e agora?"
          description="Um mapa claro do caminho típico de importação/Anvisa depois da prescrição, sem juridiquês, sem promessa milagrosa, com o tom da Médica Raver."
        />

        <ol className="receita-preview-grid">
          {previewSteps.map((step) => (
            <li key={step.id} className="receita-preview-card">
              <span className="receita-preview-number" aria-hidden="true">
                {step.number}
              </span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </li>
          ))}
        </ol>

        <div className="receita-preview-footer">
          <p className="receita-disclaimer">
            <ShieldAlert size={18} aria-hidden="true" />
            Isto é orientação educativa sobre o fluxo mais comum. Não é aconselhamento jurídico nem substitui a
            orientação da sua médica nem as regras oficiais da Anvisa (RDC 660/2022 e atualizações).
          </p>
          <div className="receita-preview-actions">
            <Button href="/recebi-minha-receita" variant="primary">
              Ver o passo a passo completo <ClipboardList size={18} aria-hidden="true" />
            </Button>
            <Link className="text-link" to="/recebi-minha-receita">
              Abrir guia Anvisa <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
