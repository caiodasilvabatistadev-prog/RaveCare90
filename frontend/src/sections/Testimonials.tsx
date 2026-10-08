import { ChevronLeft, ChevronRight, Heart, MessageCircleHeart } from 'lucide-react'
import { useState } from 'react'
import testimonialOne from '../assets/testimonials/testimonial-01.jfif'
import testimonialThree from '../assets/testimonials/testimonial-03.jfif'
import testimonialFour from '../assets/testimonials/testimonial-04.jfif'
import testimonialFive from '../assets/testimonials/testimonial-05.jpeg'
import testimonialSix from '../assets/testimonials/testimonial-06.jpeg'
import testimonialSeven from '../assets/testimonials/testimonial-07.jpeg'
import testimonialEight from '../assets/testimonials/testimonial-08.jpeg'
import { SectionHeading } from '../components/SectionHeading'

const testimonials = [
  { image: testimonialOne, crop: 'message-only' },
  { image: testimonialThree, crop: 'message-only' },
  { image: testimonialFour, crop: 'message-only' },
  { image: testimonialFive, crop: 'message-only' },
  { image: testimonialSix, crop: 'message-only' },
  { image: testimonialSeven, crop: 'message-only' },
  { image: testimonialEight, crop: 'message-only' },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToPrevious = () => setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  const goToNext = () => setActiveIndex((current) => (current + 1) % testimonials.length)
  const getSlidePosition = (index: number) => {
    if (index === activeIndex) return 'is-active'
    if (index === (activeIndex + 1) % testimonials.length) return 'is-next'
    if (index === (activeIndex - 1 + testimonials.length) % testimonials.length) return 'is-previous'
    return 'is-hidden'
  }

  return (
    <section className="section testimonials" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          eyebrow="quem viveu, conta"
          title="Quando o cuidado encaixa na vida."
          description="Mensagens de pessoas acompanhadas pela Dra. Bianca — sem nomes, sem exposição e com muito afeto."
        />
        <div className="testimonial-carousel" aria-roledescription="carrossel" aria-label="Depoimentos anonimizados de pacientes">
          <div className="testimonial-stage">
            {testimonials.map((testimonial, index) => (
              <button
                className={`testimonial-panel ${getSlidePosition(index)}`}
                type="button"
                key={testimonial.image}
                onClick={() => setActiveIndex(index)}
                aria-label={index === activeIndex ? `Depoimento ${index + 1}, em destaque` : `Ver depoimento ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                <figure className={`testimonial-card testimonial-card--${testimonial.crop}`}>
                  <img
                    src={testimonial.image}
                    alt={index === activeIndex ? `Relato anonimizado de paciente ${index + 1}` : ''}
                  />
                </figure>
              </button>
            ))}
          </div>
          <div className="testimonial-controls">
            <button type="button" onClick={goToPrevious} aria-label="Ver depoimento anterior"><ChevronLeft aria-hidden="true" /></button>
            <p><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> <span>/ {String(testimonials.length).padStart(2, '0')}</span></p>
            <button type="button" onClick={goToNext} aria-label="Ver próximo depoimento"><ChevronRight aria-hidden="true" /></button>
          </div>
          <div className="testimonial-dots" role="tablist" aria-label="Selecionar depoimento">
            {testimonials.map((testimonial, index) => (
              <button
                type="button"
                key={testimonial.image}
                className={index === activeIndex ? 'is-active' : ''}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver depoimento ${index + 1}`}
                aria-selected={index === activeIndex}
                role="tab"
              />
            ))}
          </div>
        </div>
        <div className="testimonial-note">
          <MessageCircleHeart size={20} aria-hidden="true" />
          <p>Cada corpo responde de um jeito. Estes relatos são experiências individuais, não promessa de resultado. Todo tratamento precisa de avaliação e acompanhamento profissional.</p>
          <Heart size={20} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
