import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export function ConfirmEmail() {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('Confirmando seu e-mail...')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setMessage('Link de confirmação inválido.')
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

        setSuccess(true)
        setMessage('E-mail confirmado com sucesso. Agora você pode entrar.')
      } catch {
        setMessage('Este link é inválido, expirou ou já foi utilizado.')
      }
    }

    confirmEmail()
  }, [searchParams])

  return (
    <main>
      <h1>Confirmação de e-mail</h1>
      <p>{message}</p>

      {success && <Link to="/login">Ir para o login</Link>}
    </main>
  )
}