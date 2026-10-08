import { AtSign, Mail } from 'lucide-react'
import { BrandLogo } from '../components/BrandLogo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><BrandLogo /><p>Cannabis medicinal, cuidado de verdade e conversa sem tabu.</p></div>
        <div><p className="footer-label">navegue</p><a href="#como-funciona">Como funciona</a><a href="#acompanhamento">Tratamento</a><a href="#conteudo">Cannabis medicinal</a></div>
        <div><p className="footer-label">contato</p><a href="mailto:contato@ravecareapp.com"><Mail size={16} aria-hidden="true" /> contato@ravecareapp.com</a><a href="#inicio"><AtSign size={16} aria-hidden="true" /> Instagram</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} RaveCareApp</span><span><a href="#inicio">Privacidade</a><a href="#inicio">Termos</a></span></div>
    </footer>
  )
}
