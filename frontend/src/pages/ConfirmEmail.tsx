import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export function ConfirmEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      return
    }

    async function confirmEmail() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL ?? ''

        const response = await fetch(
          `${apiUrl}/api/v1/auth/verify-email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          },
        )

        if (!response.ok) {
          throw new Error()
        }

        setStatus('success')
      } catch {
        setStatus('error')
      }
    }

    confirmEmail()
  }, [token])

  const message = !token
    ? 'Link de confirmação inválido.'
    : status === 'success'
      ? 'E-mail confirmado com sucesso. Agora você pode entrar.'
      : status === 'error'
        ? 'Este link é inválido, expirou ou já foi utilizado.'
        : 'Confirmando seu e-mail...'

  return (
    <main>
      <h1>Confirmação de e-mail</h1>
      <p>{message}</p>

      {status === 'success' && <Link to="/login">Ir para o login</Link>}
    </main>
  )
}
