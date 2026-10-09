import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Guidance } from './Guidance'

describe('Guidance', () => {
  it('abre uma dúvida sem esconder o aviso responsável', async () => {
    render(<Guidance />)
    const question = screen.getByText('Como começo?')
    const details = question.closest('details')
    expect(details).not.toHaveAttribute('open')
    await userEvent.click(question)
    expect(details).toHaveAttribute('open')
    expect(screen.getByText(/não substitui consulta ou prescrição/)).toBeInTheDocument()
  })
})
