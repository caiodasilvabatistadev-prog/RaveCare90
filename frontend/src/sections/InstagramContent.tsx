import { useRef, useState } from 'react'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import reelCannabis from '../assets/videos/reel-DZD-Wd6M3fK.mp4'
import reelBiancaContent from '../assets/videos/reel-DXIA_y7OZ6h.mp4'
import reelSaudeRave from '../assets/videos/reel-DVqZX2QBhnD.mp4'
import posterCannabis from '../assets/videos/reel-DZD-Wd6M3fK-poster.jpg'
import posterBianca from '../assets/videos/reel-DXIA_y7OZ6h-poster.jpg'
import posterSaude from '../assets/videos/reel-DVqZX2QBhnD-poster.jpg'
import biancaCannabisCutout from '../assets/generated/bianca-video-cannabis-cutout.png'
import biancaPapoRetoCutout from '../assets/generated/bianca-video-paporeto-cutout.png'
import biancaSaudeCutout from '../assets/generated/bianca-video-cutout.png'

const topics = [
  {
    title: 'Cannabis sem tabu',
    category: 'Cannabis medicinal com evidência',
    url: 'https://www.instagram.com/reel/DZD-Wd6M3fK/',
    video: reelCannabis,
    poster: posterCannabis,
    doctorCutout: biancaCannabisCutout,
  },
  {
    title: 'Papo reto com a Dra. Bianca',
    category: 'Perguntas reais, sem julgamento',
    url: 'https://www.instagram.com/reel/DXIA_y7OZ6h/',
    video: reelBiancaContent,
    poster: posterBianca,
    doctorCutout: biancaPapoRetoCutout,
  },
  {
    title: 'Saúde também vai pro rolê',
    category: 'Redução de danos e aftercare',
    url: 'https://www.instagram.com/reel/DVqZX2QBhnD/',
    video: reelSaudeRave,
    poster: posterSaude,
    doctorCutout: biancaSaudeCutout,
  },
]

function NativeReelCard({
  topic,
  index,
  onVideoPlay,
  onVideoEnded,
}: {
  topic: (typeof topics)[number]
  index: number
  onVideoPlay: (video: HTMLVideoElement) => void
  onVideoEnded: (video: HTMLVideoElement) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const playVideo = () => {
    setStarted(true)
    void videoRef.current?.play()
  }

  return (
    <article className="reel-card reel-card--native">
      <div className="native-video-frame">
        <video
          ref={videoRef}
          controls={started}
          playsInline
          preload="metadata"
          poster={topic.poster}
          aria-label={`Vídeo da Dra. Bianca sobre ${topic.title}`}
          onPlay={(event) => {
            setStarted(true)
            onVideoPlay(event.currentTarget)
          }}
          onEnded={(event) => {
            setStarted(false)
            onVideoEnded(event.currentTarget)
          }}
        >
          <source src={topic.video} type="video/mp4" />
          Seu navegador não oferece suporte à reprodução de vídeo.
        </video>
        {!started && (
          <button
            className="native-video-thumbnail"
            type="button"
            onClick={playVideo}
            aria-label={`Assistir: ${topic.title}`}
          >
            <img src={topic.poster} alt="" aria-hidden="true" />
            <span className="native-video-thumbnail__shade" aria-hidden="true" />
            <img className="native-video-thumbnail__doctor" src={topic.doctorCutout} alt="" aria-hidden="true" />
            <span className="native-video-thumbnail__brand">Rave Care <span>•</span> Dra. Bianca</span>
            <span className="native-video-thumbnail__copy">
              <span>{topic.category}</span>
              <strong>{topic.title}</strong>
            </span>
            <span className="native-video-thumbnail__play" aria-hidden="true">
              <PlayCircle size={54} strokeWidth={1.7} />
            </span>
            <span className="native-video-thumbnail__hint">Assistir vídeo</span>
          </button>
        )}
      </div>
      <div className="native-video-caption">
        <span>vídeo {String(index + 1).padStart(2, '0')}</span>
        <strong>{topic.title}</strong>
      </div>
    </article>
  )
}

export function InstagramContent() {
  const activeVideoRef = useRef<HTMLVideoElement | null>(null)

  const handleVideoPlay = (video: HTMLVideoElement) => {
    if (activeVideoRef.current && activeVideoRef.current !== video) {
      activeVideoRef.current.pause()
    }
    activeVideoRef.current = video
  }

  const handleVideoEnded = (video: HTMLVideoElement) => {
    if (activeVideoRef.current === video) {
      activeVideoRef.current = null
    }
  }

  return (
    <section className="section instagram-content" aria-labelledby="instagram-title">
      <div className="container instagram-grid">
        <div>
          <SectionHeading
            eyebrow="dá o play nesse papo"
            title="Saúde, cannabis e rave sem discurso engessado."
            description="Vídeos da Dra. Bianca sobre cannabis medicinal, redução de danos, aftercare e cuidado no rolê, com leveza, evidência e responsabilidade."
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
            <NativeReelCard
              key={topic.title}
              topic={topic}
              index={index}
              onVideoPlay={handleVideoPlay}
              onVideoEnded={handleVideoEnded}
            />
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
