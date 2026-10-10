import type { User } from './auth-context'

/** Fixed local demo account — works without the backend API. */
export const DEMO_ACCOUNT = {
  email: 'demo@ravecare.app',
  password: 'RaveCare90!demo',
  user: {
    id: 'demo-user-001',
    name: 'Vinicius Demo',
    email: 'demo@ravecare.app',
    role: 'PATIENT',
    active: true,
  } satisfies User,
  /** Opaque local token stored in localStorage (not a real JWT). */
  accessToken: 'demo-local-token-ravecare90',
} as const

export function matchesDemoAccount(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_ACCOUNT.email &&
    password === DEMO_ACCOUNT.password
  )
}
