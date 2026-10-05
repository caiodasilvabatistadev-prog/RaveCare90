import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/UseAuth'
import { BrandLogo } from '../components/BrandLogo'
import raveCareLoginBg from '../assets/ravecare-login-bg.png'
import '../styles/login.css'

type GoogleCredentialResponse = {
  credential: string
}

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

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (
              response: GoogleCredentialResponse
            ) => void
          }) => void

          renderButton: (
            element: HTMLElement,
            options: {
              theme?: string
              size?: string
              text?: string
              shape?: string
              width?: number
            }
          ) => void
        }
      }
    }
  }
}

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const googleButtonRef =
    useRef<HTMLDivElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID

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

      const response = await fetch(
        `${apiUrl}/api/v1/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email: email.trim(),
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

  useEffect(() => {
    const initializeGoogle = () => {
      if (
        !window.google ||
        !googleButtonRef.current
      ) {
        return false
      }

      if (!googleClientId) {
        setError(
          'Google Client ID não configurado.'
        )

        return true
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,

        callback: async (response) => {
          try {
            setLoading(true)
            setError('')

            const result = await fetch(
              `${apiUrl}/api/v1/auth/google`,
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json',
                },

                body: JSON.stringify({
                  idToken:
                    response.credential,
                }),
              }
            )

            if (!result.ok) {
              throw new Error(
                'Não foi possível entrar com o Google.'
              )
            }

            const data: LoginResponse =
              await result.json()

            saveSession(data)
          } catch (exception) {
            console.error(exception)

            setError(
              'Não foi possível entrar com o Google.'
            )
          } finally {
            setLoading(false)
          }
        },
      })

      googleButtonRef.current.innerHTML = ''

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          width: 360,
        }
      )

      return true
    }

    if (initializeGoogle()) {
      return
    }

    const interval =
      window.setInterval(() => {
        if (initializeGoogle()) {
          window.clearInterval(interval)
        }
      }, 250)

    return () => {
      window.clearInterval(interval)
    }
  }, [apiUrl, googleClientId, saveSession])

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-content">

          <Link
            to="/"
            className="login-logo"
            aria-label="RaveCareApp — início"
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

          <div className="login-divider">
            <span>
              ou continue com
            </span>
          </div>

          <div
            className="google-login"
            ref={googleButtonRef}
          />

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
            RAVECARE
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
