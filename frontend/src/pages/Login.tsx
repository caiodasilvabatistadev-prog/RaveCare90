import {
  useCallback,
  useState,
} from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { matchesDemoAccount, DEMO_ACCOUNT } from '../auth/demoAccount'
import { useAuth } from '../auth/UseAuth'
import { BrandLogo } from '../components/BrandLogo'
import raveCareLoginBg from '../assets/ravecare-login-bg.png'
import '../styles/login.css'

type LoginResponse = {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: {
    id: string
    name: string
    email: string
    role: string
    active: boolean
  }
}

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const apiUrl =
    import.meta.env.VITE_API_URL ??
    'http://localhost:8081'

  const saveSession = useCallback((data: LoginResponse) => {
    login(data.accessToken, data.user)
    navigate('/')
  }, [login, navigate])

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      const trimmedEmail = email.trim()

      // Local demo account — no backend required (preview / Vinicius QA).
      if (matchesDemoAccount(trimmedEmail, password)) {
        saveSession({
          accessToken: DEMO_ACCOUNT.accessToken,
          tokenType: 'Bearer',
          expiresIn: 60 * 60 * 24 * 30,
          user: { ...DEMO_ACCOUNT.user },
        })
        return
      }

      const response = await fetch(
        `${apiUrl}/api/v1/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email: trimmedEmail,
            password,
          }),
        }
      )

      if (!response.ok) {
        if (
          response.status === 400 ||
          response.status === 401
        ) {
          throw new Error(
            'E-mail ou senha inválidos.'
          )
        }

        throw new Error(
          'Não foi possível realizar o login.'
        )
      }

      const data: LoginResponse =
        await response.json()

      saveSession(data)
    } catch (exception) {
      console.error(exception)

      if (exception instanceof Error) {
        setError(exception.message)
      } else {
        setError(
          'Não foi possível realizar o login.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-content">

          <Link
            to="/"
            className="login-logo"
            aria-label="Rave Care, início"
          >
            <BrandLogo />
          </Link>

          <div className="login-heading">
            <span className="login-eyebrow">
              ÁREA DO PACIENTE
            </span>

            <h1>
              Bem-vindo de volta
            </h1>

            <p>
              Entre na sua conta para
              continuar seu acompanhamento.
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >
            <div className="login-field">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={loading}
                required
              />
            </div>

            <div className="login-field">
              <div className="login-password-header">

                <label htmlFor="password">
                  Senha
                </label>

                <Link to="/recuperar-senha">
                  Esqueci minha senha
                </Link>

              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div
                className="login-error"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Entrando...'
                : 'Entrar'}
            </button>
          </form>

          <p className="login-register">
            Ainda não possui uma conta?{' '}

            <Link to="/cadastro">
              Criar conta
            </Link>
          </p>

          <Link
            className="login-back"
            to="/"
          >
            ← Voltar para o início
          </Link>

        </div>
      </section>

      <section
        className="login-visual"
        style={{
          backgroundImage:
            `url(${raveCareLoginBg})`,
        }}
      >
        <div className="login-visual-overlay" />

        <div className="login-visual-content">
          <span>
            Rave Care
          </span>

          <h2>
            Cuidado e
            <br />
            acompanhamento
            <br />
            em um só lugar.
          </h2>

          <p>
            Sua jornada continua aqui.
          </p>
        </div>
      </section>
    </main>
  )
}
