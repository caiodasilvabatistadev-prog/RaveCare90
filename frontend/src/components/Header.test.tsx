import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthContext'
import { Header } from './Header'

function renderHeader() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('Header', () => {
  it('abre e fecha a navegação móvel', async () => {
    const user = userEvent.setup()
    renderHeader()
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
    renderHeader()
    expect(screen.getByRole('link', { name: 'Se isso é pra você' })).toHaveAttribute('href', '#dores')
    expect(screen.getByRole('link', { name: 'Tratamento' })).toHaveAttribute('href', '#acompanhamento')
    expect(screen.getByRole('link', { name: 'Recebi minha receita' })).toHaveAttribute('href', '#receita-anvisa')
    expect(screen.getByRole('link', { name: 'Dúvidas' })).toHaveAttribute('href', '#conteudo')
    expect(screen.getByRole('link', { name: 'Depoimentos' })).toHaveAttribute('href', '#depoimentos')
    expect(screen.getByRole('link', { name: 'Quero conversar' })).toHaveAttribute('href', '#comece')
  })

  it('mostra a sessão e permite sair na home', async () => {
    localStorage.setItem('ravecare_token', 'token-de-teste')
    localStorage.setItem('ravecare_user', JSON.stringify({
      id: '1',
      name: 'Ana Silva',
      email: 'ana@example.com',
      role: 'PATIENT',
      active: true,
    }))

    const user = userEvent.setup()
    renderHeader()

    expect(screen.getByText('Olá, Ana')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Sair' }))
    expect(screen.getByRole('link', { name: 'Entrar' })).toBeInTheDocument()
    expect(localStorage.getItem('ravecare_token')).toBeNull()
  })
})
