import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renderiza as seções centrais da landing page', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /chega de cuidar da saúde/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /acompanhamento contínuo com uma médica/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dra. Bianca Rohsner' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /90 dias\. alguém do outro lado/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /rave care cuida de você quando a festa acaba/i })).toBeInTheDocument()
  })

  it('mantém o guia Anvisa fora da UI (flag off)', () => {
    render(<App />)
    expect(screen.queryByRole('heading', { name: /recebi minha receita e agora/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /ver o passo a passo completo/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /guia anvisa/i })).not.toBeInTheDocument()
  })

  it('mantém identificação profissional e acompanhamento médico (sem disclaimer de substituição)', () => {
    render(<App />)
    expect(screen.getAllByText(/CREMEC 21295/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Médica emergencista/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/também raver/i)).toBeInTheDocument()
    expect(screen.queryByText(/não promete milagre/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/resultados variam/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/não substitui consulta ou prescrição/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/não substitui um acompanhamento médico/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/nutrição/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/educador físico/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/contato diário/i).length).toBeGreaterThan(0)
    expect(screen.queryByText(/conforme disponibilidade/i)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /relatos de quem é acompanhada/i })).toBeInTheDocument()
  })

  it('não expõe rotas internas de usuários na landing page', () => {
    render(<App />)

    const waLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.includes('wa.me/5521920405871'))

    const destinations = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    expect(waLinks.length).toBeGreaterThan(0)
    expect(
      waLinks.every((link) => /quero o rave care|quero conversar/i.test(link.textContent ?? '')),
    ).toBe(true)
    expect(screen.getAllByRole('link', { name: /quero o rave care/i }).length).toBeGreaterThan(0)
    expect(destinations).toContain('/login')
    expect(destinations).not.toContain('/api/v1/users')
  })
})
