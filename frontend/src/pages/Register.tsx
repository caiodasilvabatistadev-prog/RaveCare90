import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BrandLogo } from '../components/BrandLogo'
import raveCareLoginBg from '../assets/ravecare-login-bg.png'

import '../styles/register.css'

export function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const apiUrl =
    import.meta.env.VITE_API_URL ?? 'http://localhost:8081'

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (name.trim().length < 2) {
      setError('Informe seu nome completo.')
      return
    }

    if (password.length < 8) {
      setError('A senha deve possuir pelo menos 8 caracteres.')
      return
    }

    if (password.length > 72) {
      setError('A senha deve possuir no máximo 72 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`${apiUrl}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      })

      if (!response.ok) {
        let message = 'Não foi possível criar sua conta.'

        if (response.status === 400) {
          message = 'Verifique os dados informados.'
        }

        throw new Error(message)
      }

      navigate('/login', {
        state: {
          accountCreated: true,
        },
      })
    } catch (exception) {
      console.error(exception)

      if (exception instanceof Error) {
        setError(exception.message)
      } else {
        setError('Não foi possível criar sua conta.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="register-page">
      <section className="register-panel">
        <div className="register-content">
          <Link
            to="/"
            className="register-logo"
            aria-label="RaveCareApp, início"
          >
            <BrandLogo />
          </Link>

          <div className="register-heading">
            <span className="register-eyebrow">
              ÁREA DO PACIENTE
            </span>

            <h1>Crie sua conta</h1>

            <p>
              Comece sua jornada de cuidado e acompanhamento
              com a RaveCare.
            </p>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            <div className="register-field">
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={120}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={180}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Mínimo de 8 caracteres"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                maxLength={72}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Digite sua senha novamente"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                minLength={8}
                maxLength={72}
                required
              />
            </div>

            {error && (
              <div className="register-error" role="alert">
                {error}
              </div>
            )}

            <button
              className="register-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar minha conta'}
            </button>
          </form>

          <p className="register-login">
            Já possui uma conta?{' '}
            <Link to="/login">Entrar</Link>
          </p>

          <Link className="register-back" to="/">
            ← Voltar para o início
          </Link>
        </div>
      </section>

      <section
        className="register-visual"
        style={{
          backgroundImage: `url(${raveCareLoginBg})`,
        }}
      >
        <div className="register-visual-overlay" />

        <div className="register-visual-content">
          <span>RAVECARE</span>

          <h2>
            Seu cuidado
            <br />
            começa aqui.
          </h2>

          <p>
            Informação, acompanhamento e cuidado durante toda
            a sua jornada.
          </p>
        </div>
      </section>
    </main>
  )
}
