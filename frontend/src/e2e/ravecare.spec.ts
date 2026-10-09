import { expect, test } from '@playwright/test'
import type { APIRequestContext } from '@playwright/test'

const mailpitUrl = 'http://localhost:8026'

async function waitForConfirmationLink(
  request: APIRequestContext,
  email: string,
) {
  let confirmationLink = ''

  await expect.poll(async () => {
    const inbox = await request.get(`${mailpitUrl}/api/v1/messages`)

    if (!inbox.ok()) {
      return ''
    }

    const inboxBody = await inbox.json() as {
      messages?: Array<{
        ID: string
        Subject?: string
        To?: Array<{ Address?: string }>
      }>
    }

    const message = inboxBody.messages?.find((candidate) =>
      candidate.Subject === 'Confirme seu e-mail - RaveCare'
      && candidate.To?.some((recipient) => recipient.Address === email),
    )

    if (!message) {
      return ''
    }

    const detail = await request.get(
      `${mailpitUrl}/api/v1/message/${message.ID}`,
    )

    if (!detail.ok()) {
      return ''
    }

    const content = JSON.stringify(await detail.json())
    const match = content.match(
      /http:\/\/localhost:8088\/confirmar-email\?token=[A-Za-z0-9_-]+/,
    )

    confirmationLink = match?.[0] ?? ''
    return confirmationLink
  }, {
    timeout: 15_000,
    intervals: [250, 500, 1_000],
  }).not.toBe('')

  return confirmationLink
}

test('carrega a landing page e seus conteúdos principais', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /Chega de cuidar/i }),
  ).toBeVisible()
  await expect(page.locator('video')).toHaveCount(3)
  await expect(page.getByRole('link', { name: /quero começar/i }).first()).toBeVisible()
})

test('cadastro exige confirmação de e-mail antes do login', async ({ page, request }) => {
  const email = `e2e-${Date.now()}@example.com`
  const password = 'senha-e2e-segura'

  await page.goto('/cadastro')
  await page.getByLabel('Nome completo').fill('Paciente E2E')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha', { exact: true }).fill(password)
  await page.getByLabel('Confirmar senha').fill(password)
  await page.getByRole('button', { name: 'Criar minha conta' }).click()

  await expect(page).toHaveURL(/\/login$/)

  const loginBeforeConfirmation = await request.post('/api/v1/auth/login', {
    data: { email, password },
  })

  expect(loginBeforeConfirmation.status()).toBe(400)

  const confirmationLink = await waitForConfirmationLink(request, email)
  await page.goto(confirmationLink)

  await expect(page.getByText(
    'E-mail confirmado com sucesso. Agora você pode entrar.',
  )).toBeVisible()

  await page.getByRole('link', { name: 'Ir para o login' }).click()
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(password)
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page).toHaveURL(/\/$/)
})
