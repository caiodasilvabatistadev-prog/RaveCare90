import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { InstagramContent } from './InstagramContent'

describe('InstagramContent', () => {
  it('renderiza uma capa de marca para cada vídeo local', () => {
    const { container } = render(<InstagramContent />)
    const videos = container.querySelectorAll('video')
    expect(videos).toHaveLength(3)
    videos.forEach((video) => {
      expect(video).not.toHaveAttribute('controls')
      expect(video).toHaveAttribute('playsinline')
      expect(video.querySelector('source')).toHaveAttribute('type', 'video/mp4')
    })
    expect(screen.getByRole('button', { name: /assistir: cannabis sem tabu/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /assistir: papo reto com a dra\. bianca/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /assistir: saúde também vai pro rolê/i })).toBeInTheDocument()
  })

  it('mantém o acesso ao Instagram da médica', () => {
    render(<InstagramContent />)
    expect(screen.getByRole('link', { name: /cola no instagram/i })).toHaveAttribute('href', 'https://www.instagram.com/biancarohsner/')
  })

  it('pausa o vídeo que estava tocando quando outro reel começa', () => {
    const { container } = render(<InstagramContent />)
    const videos = Array.from(container.querySelectorAll('video'))
    const pauseFirst = vi.spyOn(videos[0], 'pause').mockImplementation(() => {})
    const pauseSecond = vi.spyOn(videos[1], 'pause').mockImplementation(() => {})

    fireEvent.play(videos[0])
    fireEvent.play(videos[1])
    expect(pauseFirst).toHaveBeenCalledOnce()

    fireEvent.play(videos[2])
    expect(pauseSecond).toHaveBeenCalledOnce()
  })
})
