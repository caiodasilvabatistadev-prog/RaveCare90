import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'light'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return <a className={`button button--${variant} ${className}`} {...props}>{children}</a>
}
