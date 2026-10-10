import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Testimonials } from './Testimonials'

describe('Testimonials', () => {
  it('troca após cinco segundos e permite pausar', () => {
    vi.useFakeTimers()
    try {
      render(<Testimonials />)
      act(() => vi.advanceTimersByTime(4999))
      expect(screen.getByRole('button', { name: 'Depoimento 1, em destaque' })).toBeInTheDocument()
      act(() => vi.advanceTimersByTime(1))
      expect(screen.getByRole('button', { name: 'Depoimento 2, em destaque' })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Pausar troca automática' }))
      act(() => vi.advanceTimersByTime(10000))
      expect(screen.getByRole('button', { name: 'Depoimento 2, em destaque' })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Retomar troca automática' }))
      act(() => vi.advanceTimersByTime(5000))
      expect(screen.getByRole('button', { name: 'Depoimento 3, em destaque' })).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

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
