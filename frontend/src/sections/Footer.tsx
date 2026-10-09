import { AtSign, Mail } from 'lucide-react'
import { BrandLogo } from '../components/BrandLogo'

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand"><BrandLogo /><p>Cannabis medicinal, cuidado de verdade e conversa sem tabu — com a Dra. Bianca Rohsner.</p></div>
      <nav aria-label="Navegação do rodapé"><p className="footer-label">navegue</p><a href="#para-voce">Se isso é pra você</a><a href="#acompanhamento">Acompanhamento</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a></nav>
      <address><p className="footer-label">contato</p><a href="mailto:contato@ravecareapp.com"><Mail size={16} aria-hidden="true" /><span>contato@ravecareapp.com</span></a><a href="https://www.instagram.com/biancarohsner/" target="_blank" rel="noopener noreferrer"><AtSign size={16} aria-hidden="true" />Instagram</a></address>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} RaveCareApp</span><span><a href="#inicio">Privacidade</a><a href="#inicio">Termos</a></span></div>
  </footer>
}
