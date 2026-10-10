import { AtSign, Mail, MessageCircle } from 'lucide-react'
import { BrandLogo } from '../components/BrandLogo'
import { features } from '../config/features'
import { contact } from '../config/contact'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandLogo />
          <p>
            Cannabis medicinal, redução de danos e acompanhamento contínuo com a Dra. Bianca Rohsner,
            antes e depois do rolê.
          </p>
        </div>
        <div>
          <p className="footer-label">navegue</p>
          <a href="#dores">Se isso é pra você</a>
          <a href="#acompanhamento">Acompanhamento</a>
          {features.showAnvisaGuide ? (
            <>
              <a href="#receita-anvisa">Recebi minha receita</a>
              <a href="/recebi-minha-receita">Guia Anvisa</a>
            </>
          ) : null}
          <a href="#como-funciona">Como funciona</a>
          <a href="#conteudo">Dúvidas</a>
          <a href="#depoimentos">Relatos</a>
        </div>
        <div>
          <p className="footer-label">contato</p>
          <a href="#comece">
            <MessageCircle size={16} aria-hidden="true" /> Contato diário
          </a>
          <a href={`mailto:${contact.email}`}>
            <Mail size={16} aria-hidden="true" /> {contact.email}
          </a>
          <a href={contact.instagram} target="_blank" rel="noreferrer">
            <AtSign size={16} aria-hidden="true" /> Instagram
          </a>
          <a href="/login">Entrar na conta</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Rave Care</span>
        <span>
          <a href="#inicio">Privacidade</a>
          <a href="#inicio">Termos</a>
          <a href="/login">Entrar</a>
        </span>
      </div>
    </footer>
  )
}
