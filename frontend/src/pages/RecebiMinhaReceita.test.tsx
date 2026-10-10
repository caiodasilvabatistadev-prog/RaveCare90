import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { RecebiMinhaReceita } from './RecebiMinhaReceita'

describe('RecebiMinhaReceita', () => {
  it('mostra o guia completo com disclaimer e passos Anvisa', () => {
    render(
      <MemoryRouter initialEntries={['/recebi-minha-receita']}>
        <Routes>
          <Route path="/recebi-minha-receita" element={<RecebiMinhaReceita />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /recebi minha receita e agora/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/não é aconselhamento jurídico/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /confira se a receita está completa/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /cadastre-se no portal de serviços/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /comece o tratamento com acompanhamento/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /solicitar autorização de importação excepcional/i }),
    ).toHaveAttribute('href', expect.stringContaining('gov.br'))
  })
})
