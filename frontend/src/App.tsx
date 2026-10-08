import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfirmEmail } from './pages/ConfirmEmail'
import { Header } from './components/Header'
import { About } from './sections/About'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Professional } from './sections/Professional'
import { Resources } from './sections/Resources'
import { Guidance } from './sections/Guidance'
import { InstagramContent } from './sections/InstagramContent'
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
        <Resources />
        <Professional />
        <Journey />
        <About />
        <Testimonials />
        <Guidance />
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