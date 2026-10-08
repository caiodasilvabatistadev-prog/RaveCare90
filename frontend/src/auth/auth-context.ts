import { createContext } from 'react'

export type User = {
  id: string
  name: string
  email: string
  role: string
  active: boolean
}

type AuthContextData = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
)
