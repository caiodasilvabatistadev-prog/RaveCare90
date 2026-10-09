import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfirmEmail } from './pages/ConfirmEmail'
import { Header } from './components/Header'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { InstagramContent } from './sections/InstagramContent'
import { Journey } from './sections/Journey'
import { Method } from './sections/Method'
import { PainPoints } from './sections/PainPoints'
import { Professional } from './sections/Professional'
import { Testimonials } from './sections/Testimonials'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import './styles/social-proof.css'

function LandingPage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <PainPoints />
        <Method />
        <Journey />
        <Professional />
        <Testimonials />
        <Faq />
        <InstagramContent />
        <FinalCta />
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
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/confirmar-email" element={<ConfirmEmail />} />
      </Routes>
    </BrowserRouter>
  )
}
