import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import reelCannabis from '../assets/videos/reel-DZD-Wd6M3fK.mp4'
import reelBiancaContent from '../assets/videos/reel-DXIA_y7OZ6h.mp4'
import reelSaudeRave from '../assets/videos/reel-DVqZX2QBhnD.mp4'

const topics = [
  { title: 'Cannabis sem tabu', url: 'https://www.instagram.com/reel/DZD-Wd6M3fK/', video: reelCannabis },
  { title: 'Papo reto com a Dra. Bianca', url: 'https://www.instagram.com/reel/DXIA_y7OZ6h/', video: reelBiancaContent },
  { title: 'Saúde também vai pro rolê', url: 'https://www.instagram.com/reel/DVqZX2QBhnD/', video: reelSaudeRave },
]

export function InstagramContent() {
  return (
    <section className="section instagram-content" aria-labelledby="instagram-title">
      <div className="container instagram-grid">
        <div>
          <SectionHeading
            eyebrow="dá o play nesse papo"
            title="Saúde, cannabis e rave sem discurso engessado."
            description="Vídeos da Dra. Bianca sobre drogas, cuidado, cannabis medicinal e redução de danos — com leveza, evidência e responsabilidade."
          />
          <a className="instagram-button" href="https://www.instagram.com/biancarohsner/" target="_blank" rel="noreferrer">
            <svg className="instagram-flat-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.25" />
              <circle className="instagram-flat-icon__dot" cx="17.4" cy="6.7" r="1.1" />
            </svg>
            Cola no Instagram <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="instagram-reels" aria-label="Temas disponíveis no Instagram da Dra. Bianca">
          {topics.map((topic, index) => topic.video ? (
            <article key={topic.title} className="reel-card reel-card--native">
              <video controls playsInline preload="metadata" aria-label={`Vídeo da Dra. Bianca sobre ${topic.title}`}>
                <source src={topic.video} type="video/mp4" />
                Seu navegador não oferece suporte à reprodução de vídeo.
              </video>
              <div className="native-video-caption">
                <span>vídeo {String(index + 1).padStart(2, '0')}</span>
                <strong>{topic.title}</strong>
              </div>
            </article>
          ) : (
            <a key={topic.title} className="reel-card reel-card--video-link" href={topic.url} target="_blank" rel="noreferrer">
              <span>vídeo {String(index + 1).padStart(2, '0')}</span>
              <PlayCircle size={40} aria-hidden="true" />
              <strong>{topic.title}</strong>
              <small>Assistir no Instagram <ArrowUpRight size={14} aria-hidden="true" /></small>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
