import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Testimonials } from './Testimonials'

describe('Testimonials', () => {
  it('inicia com o primeiro relato em destaque e rotula como paciente', () => {
    render(<Testimonials />)
    expect(screen.getByRole('heading', { name: /relatos de quem é acompanhada/i })).toBeInTheDocument()
    expect(screen.getByText('relatos de pacientes')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Relato de paciente 1, em destaque' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('tab', { name: 'Ver relato de paciente 1' })).toHaveAttribute('aria-selected', 'true')
  })

  it('avança, volta e permite escolher um relato', async () => {
    const user = userEvent.setup()
    render(<Testimonials />)
    await user.click(screen.getByRole('button', { name: 'Ver próximo relato' }))
    expect(screen.getByRole('button', { name: 'Relato de paciente 2, em destaque' })).toHaveAttribute('aria-current', 'true')
    await user.click(screen.getByRole('button', { name: 'Ver relato anterior' }))
    expect(screen.getByRole('button', { name: 'Relato de paciente 1, em destaque' })).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'Ver relato de paciente 5' }))
    expect(screen.getByRole('button', { name: 'Relato de paciente 5, em destaque' })).toHaveAttribute('aria-current', 'true')
  })
})
