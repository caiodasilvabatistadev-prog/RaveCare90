import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type { User } from './auth-context'

type AuthProviderProps = {
  children: ReactNode
}

type StoredSession = {
  token: string | null
  user: User | null
}

function readStoredSession(): StoredSession {
  const token = localStorage.getItem('ravecare_token')
  const storedUser = localStorage.getItem('ravecare_user')

  if (!token || !storedUser) return { token: null, user: null }

  try {
    return { token, user: JSON.parse(storedUser) as User }
  } catch {
    localStorage.removeItem('ravecare_token')
    localStorage.removeItem('ravecare_user')
    return { token: null, user: null }
  }
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [session, setSession] = useState<StoredSession>(readStoredSession)

  function login(
    accessToken: string,
    authenticatedUser: User
  ) {
    localStorage.setItem(
      'ravecare_token',
      accessToken
    )

    localStorage.setItem(
      'ravecare_user',
      JSON.stringify(authenticatedUser)
    )

    setSession({ token: accessToken, user: authenticatedUser })
  }

  function logout() {
    localStorage.removeItem(
      'ravecare_token'
    )

    localStorage.removeItem(
      'ravecare_user'
    )

    setSession({ token: null, user: null })
  }

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        token: session.token,
        isAuthenticated: Boolean(session.token && session.user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
