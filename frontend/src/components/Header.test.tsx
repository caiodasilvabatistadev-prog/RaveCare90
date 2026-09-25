import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('abre e fecha a navegação móvel', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const toggle = screen.getByRole('button', { name: 'Abrir navegação' })
    const navigation = screen.getByRole('navigation', { name: 'Navegação principal' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(navigation).not.toHaveClass('navigation--open')
    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Fechar navegação' })).toHaveAttribute('aria-expanded', 'true')
    expect(navigation).toHaveClass('navigation--open')
    await user.click(screen.getByRole('link', { name: 'Como funciona' }))
    expect(navigation).not.toHaveClass('navigation--open')
  })

  it('exibe os principais caminhos da página', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Tratamento' })).toHaveAttribute('href', '#acompanhamento')
    expect(screen.getByRole('link', { name: 'Cannabis medicinal' })).toHaveAttribute('href', '#conteudo')
    expect(screen.getByRole('link', { name: 'Depoimentos' })).toHaveAttribute('href', '#depoimentos')
    expect(screen.getByRole('link', { name: 'Quero conversar' })).toHaveAttribute('href', '#comece')
  })
})
