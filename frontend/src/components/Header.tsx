import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/UseAuth'
import { BrandLogo } from './BrandLogo'

const links = [
  { href: '#dores', label: 'Se isso é pra você' },
  { href: '#acompanhamento', label: 'Tratamento' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#conteudo', label: 'Dúvidas' },
  { href: '#depoimentos', label: 'Depoimentos' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setIsOpen(false)
  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="container header-inner">

        <a
          href="#inicio"
          aria-label="RaveCareApp — início"
          onClick={closeMenu}
        >
          <BrandLogo />
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={
            isOpen
              ? 'Fechar navegação'
              : 'Abrir navegação'
          }
        >
          {isOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>

        <nav
          id="main-navigation"
          className={
            isOpen
              ? 'navigation navigation--open'
              : 'navigation'
          }
          aria-label="Navegação principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          {isAuthenticated ? (
            <div className="header-session">
              <span className="header-user">
                Olá, {user?.name.split(' ')[0]}
              </span>
              <button className="header-logout" type="button" onClick={handleLogout}>
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Entrar</Link>
              <a href="#comece" className="button button--primary header-cta" onClick={closeMenu}>
                Quero conversar
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
