import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Testimonials } from './Testimonials'

describe('Testimonials', () => {
  it('inicia com o primeiro depoimento em destaque', () => {
    render(<Testimonials />)
    expect(screen.getByRole('button', { name: 'Depoimento 1, em destaque' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('tab', { name: 'Ver depoimento 1' })).toHaveAttribute('aria-selected', 'true')
  })

  it('avança, volta e permite escolher um depoimento', async () => {
    const user = userEvent.setup()
    render(<Testimonials />)
    await user.click(screen.getByRole('button', { name: 'Ver próximo depoimento' }))
    expect(screen.getByRole('button', { name: 'Depoimento 2, em destaque' })).toHaveAttribute('aria-current', 'true')
    await user.click(screen.getByRole('button', { name: 'Ver depoimento anterior' }))
    expect(screen.getByRole('button', { name: 'Depoimento 1, em destaque' })).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'Ver depoimento 5' }))
    expect(screen.getByRole('button', { name: 'Depoimento 5, em destaque' })).toHaveAttribute('aria-current', 'true')
  })
})
