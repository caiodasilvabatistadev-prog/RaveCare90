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
import './styles/social-proof.css'

export default function App() {
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
