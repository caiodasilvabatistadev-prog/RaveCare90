import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfirmEmail } from './pages/ConfirmEmail'
import { Header } from './components/Header'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { InstagramContent } from './sections/InstagramContent'
import { Journey } from './sections/Journey'
import { Method } from './sections/Method'
import { PainPoints } from './sections/PainPoints'
import { Professional } from './sections/Professional'
import { ReceitaAnvisa } from './sections/ReceitaAnvisa'
import { Testimonials } from './sections/Testimonials'
import { features } from './config/features'
import { Login } from './pages/Login'
import { RecebiMinhaReceita } from './pages/RecebiMinhaReceita'
import { Register } from './pages/Register'
import './styles/social-proof.css'
import './styles/receita-anvisa.css'

function LandingPage() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'))
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-scroll-visible'))
      return
    }

    document.body.classList.add('landing-scroll-effects')
    let frame = 0
    const updateParallax = () => {
      const scroll = window.scrollY
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.body.style.setProperty('--parallax-slow', `${Math.min(scroll * 0.035, 150)}px`)
        document.body.style.setProperty('--parallax-fast', `${Math.max(scroll * -0.075, -280)}px`)
        document.body.style.setProperty('--parallax-deep', `${Math.min(scroll * 0.11, 400)}px`)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-scroll-visible')
        })
      },
      { rootMargin: '-18% 0px -18% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateParallax)
      observer.disconnect()
      cancelAnimationFrame(frame)
      document.body.classList.remove('landing-scroll-effects')
      sections.forEach((section) => section.classList.remove('is-scroll-visible'))
      document.body.style.removeProperty('--parallax-slow')
      document.body.style.removeProperty('--parallax-fast')
      document.body.style.removeProperty('--parallax-deep')
    }
  }, [])

  return (
    <>
      <Header />

      <main>
        <Hero />
        <PainPoints />
        <Method />
        <Journey />
        {features.showAnvisaGuide ? <ReceitaAnvisa /> : null}
        <Professional />
        <Testimonials />
        <Faq />
        <InstagramContent />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recebi-minha-receita" element={<RecebiMinhaReceita />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/confirmar-email" element={<ConfirmEmail />} />
      </Routes>
    </BrowserRouter>
  )
}
