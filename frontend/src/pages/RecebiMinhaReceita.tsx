import { ArrowLeft, ExternalLink, HeartPulse, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { anvisaStepPrints } from '../assets/anvisa-mocks'
import { BrandLogo } from '../components/BrandLogo'
import { Button } from '../components/Button'
import { anvisaOfficialLinks, anvisaSteps } from '../data/anvisaJourney'
import { Footer } from '../sections/Footer'

export function RecebiMinhaReceita() {
  return (
    <div className="receita-page">
      <header className="receita-page-header">
        <div className="container receita-page-header-inner">
          <Link to="/" aria-label="Rave Care, início">
            <BrandLogo />
          </Link>
          <div className="receita-page-header-actions">
            <Link className="button button--light" to="/login">
              Entrar
            </Link>
            <Link className="text-link" to="/">
              <ArrowLeft size={18} aria-hidden="true" /> Voltar à landing
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="receita-hero" aria-labelledby="receita-page-title">
          <div className="receita-hero-glow" aria-hidden="true" />
          <div className="container receita-hero-inner">
            <p className="eyebrow eyebrow--light">
              <HeartPulse size={15} aria-hidden="true" /> Dra. Bianca · Médica Raver · Rave Care
            </p>
            <h1 id="receita-page-title">Recebi minha receita e agora?</h1>
            <p className="receita-hero-lead">
              Depois da consulta, muita gente trava no burocrático. Aqui vai o roteiro típico do caminho de
              importação excepcional pela Anvisa, em linguagem humana, com prints ilustrativos ao lado de cada
              passo.
            </p>
            <div className="receita-hero-note" role="note">
              <ShieldAlert size={20} aria-hidden="true" />
              <p>
                <strong>Aviso importante:</strong> este guia é educativo e resume o fluxo comumente explicado para
                pacientes no Brasil. As imagens ao lado dos passos são <em>ilustrações / mockups</em> para
                orientação visual, não são capturas oficiais do portal Anvisa. <em>Não é aconselhamento
                jurídico</em>. Confira sempre o portal gov.br / Anvisa e fale com quem te prescritou.
              </p>
            </div>
          </div>
        </section>

        <section className="section receita-steps" aria-labelledby="receita-steps-title">
          <div className="container">
            <h2 id="receita-steps-title" className="receita-steps-heading">
              O caminho, passo a passo
            </h2>
            <p className="section-description">
              Sete etapas do “receita no bolso” até o acompanhamento contínuo. Use como checklist visual, não como
              atalho ilegal ou manobra de farmácia clandestina.
            </p>

            <ol className="receita-step-list">
              {anvisaSteps.map((step) => {
                const print = step.printKey ? anvisaStepPrints[step.printKey] : undefined
                return (
                  <li key={step.id} id={step.id} className="receita-step">
                    <div className="receita-step-rail" aria-hidden="true">
                      <span className="receita-step-badge">{step.number}</span>
                    </div>
                    <div className="receita-step-main">
                      <div className="receita-step-body">
                        <h3>{step.title}</h3>
                        <p className="receita-step-summary">{step.summary}</p>
                        <ul>
                          {step.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                        {step.tip ? <p className="receita-step-tip">{step.tip}</p> : null}
                      </div>
                      {print ? (
                        <figure className="receita-step-print">
                          <div className="receita-step-print-frame">
                            <img src={print.src} alt={print.alt} loading="lazy" />
                          </div>
                          <figcaption>{print.caption}</figcaption>
                        </figure>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section className="section receita-official" aria-labelledby="receita-official-title">
          <div className="container receita-official-inner">
            <h2 id="receita-official-title">Fontes oficiais para conferir</h2>
            <p className="section-description">
              Em caso de divergência entre este resumo e o site da Anvisa, prevalece o texto oficial.
            </p>
            <ul className="receita-official-links">
              {anvisaOfficialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer noopener">
                    {link.label}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="receita-official-cta">
              <Button href="/#comece" variant="primary">
                Quero acompanhamento Rave Care
              </Button>
              <Button href="/login" variant="secondary">
                Entrar na conta
              </Button>
              <Button href="/" variant="light">
                Voltar para o início
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
