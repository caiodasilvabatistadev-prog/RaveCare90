import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { BrandLogo } from './BrandLogo'
import { Button } from './Button'

const links = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#acompanhamento', label: 'Tratamento' },
  { href: '#conteudo', label: 'Cannabis medicinal' },
  { href: '#depoimentos', label: 'Depoimentos' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" aria-label="RaveCareApp — início" onClick={closeMenu}><BrandLogo /></a>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="main-navigation" aria-label={isOpen ? 'Fechar navegação' : 'Abrir navegação'}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="main-navigation" className={isOpen ? 'navigation navigation--open' : 'navigation'} aria-label="Navegação principal">
          {links.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
          <a href="#inicio" onClick={closeMenu}>Entrar</a>
          <Button href="#comece" className="header-cta" onClick={closeMenu}>Quero conversar</Button>
        </nav>
      </div>
    </header>
  )
}
