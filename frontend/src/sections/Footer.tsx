import { AtSign, Mail } from 'lucide-react'
import { BrandLogo } from '../components/BrandLogo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandLogo />
          <p>Cannabis medicinal, cuidado de verdade e conversa sem tabu, com a Dra. Bianca Rohsner.</p>
        </div>
        <div>
          <p className="footer-label">navegue</p>
          <a href="#dores">Se isso é pra você</a>
          <a href="#acompanhamento">Acompanhamento</a>
          <a href="#receita-anvisa">Recebi minha receita</a>
          <a href="/recebi-minha-receita">Guia Anvisa</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#conteudo">Dúvidas</a>
        </div>
        <div>
          <p className="footer-label">contato</p>
          <a href="mailto:contato@ravecareapp.com">
            <Mail size={16} aria-hidden="true" /> contato@ravecareapp.com
          </a>
          <a href="https://www.instagram.com/biancarohsner/" target="_blank" rel="noreferrer">
            <AtSign size={16} aria-hidden="true" /> Instagram
          </a>
          <a href="/login">Entrar na conta</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} RaveCareApp</span>
        <span>
          <a href="#inicio">Privacidade</a>
          <a href="#inicio">Termos</a>
          <a href="/login">Entrar</a>
        </span>
      </div>
    </footer>
  )
}
