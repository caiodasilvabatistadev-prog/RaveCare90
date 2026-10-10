import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../auth/AuthContext'
import { DEMO_ACCOUNT } from '../auth/demoAccount'
import { Login } from './Login'

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('Login', () => {
  it('aceita a conta demo local sem chamar o backend', async () => {
    localStorage.clear()
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByLabelText('E-mail'), DEMO_ACCOUNT.email)
    await user.type(screen.getByLabelText('Senha'), DEMO_ACCOUNT.password)
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(localStorage.getItem('ravecare_token')).toBe(DEMO_ACCOUNT.accessToken)
    const stored = JSON.parse(localStorage.getItem('ravecare_user') ?? '{}')
    expect(stored.email).toBe(DEMO_ACCOUNT.email)
    expect(stored.name).toBe(DEMO_ACCOUNT.user.name)
  })
})
