import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('mantém navegação e contatos corretos', () => {
    render(<Footer />)
    const navigation = screen.getByRole('navigation', { name: 'Navegação do rodapé' })
    expect(within(navigation).getByRole('link', { name: 'Dúvidas' })).toHaveAttribute('href', '#duvidas')
    expect(screen.getByRole('link', { name: 'contato@ravecareapp.com' })).toHaveAttribute('href', 'mailto:contato@ravecareapp.com')
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
