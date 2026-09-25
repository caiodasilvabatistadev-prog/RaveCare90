import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renderiza as seções centrais da landing page', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /seu cuidado continua/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /pra acompanhar cada fase/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dra. Bianca Rohsner' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /90 dias com alguém do outro lado/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /bora cuidar da sua saúde/i })).toBeInTheDocument()
  })

  it('mantém identificação profissional e avisos responsáveis', () => {
    render(<App />)
    expect(screen.getAllByText(/CREMEC 21295/).length).toBeGreaterThan(0)
    expect(screen.getByText(/não promessa de resultado/i)).toBeInTheDocument()
    expect(screen.getByText(/não substitui consulta ou prescrição/i)).toBeInTheDocument()
  })
})
