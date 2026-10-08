import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InstagramContent } from './InstagramContent'

describe('InstagramContent', () => {
  it('renderiza os três vídeos locais com controles nativos', () => {
    const { container } = render(<InstagramContent />)
    const videos = container.querySelectorAll('video')
    expect(videos).toHaveLength(3)
    videos.forEach((video) => {
      expect(video).toHaveAttribute('controls')
      expect(video).toHaveAttribute('playsinline')
      expect(video.querySelector('source')).toHaveAttribute('type', 'video/mp4')
    })
  })

  it('mantém o acesso ao Instagram da médica', () => {
    render(<InstagramContent />)
    expect(screen.getByRole('link', { name: /cola no instagram/i })).toHaveAttribute('href', 'https://www.instagram.com/biancarohsner/')
  })
})
