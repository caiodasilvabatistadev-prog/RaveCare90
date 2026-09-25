import { expect, test } from '@playwright/test'

test('carrega a landing page e seus conteúdos principais', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /o seu tratamento não termina na consulta/i }),
  ).toBeVisible()
  await expect(page.locator('video')).toHaveCount(3)
  await expect(page.getByRole('link', { name: /começar agora/i }).first()).toBeVisible()
})

test('frontend alcança o backend e persiste um usuário no banco', async ({ request }) => {
  const email = `e2e-${Date.now()}@example.com`
  const response = await request.post('/api/v1/users', {
    data: {
      name: 'Paciente E2E',
      email,
      password: 'senha-e2e-segura',
    },
  })

  expect(response.status()).toBe(201)
  const body = await response.json()
  expect(body).toMatchObject({
    name: 'Paciente E2E',
    email,
    role: 'PATIENT',
    active: true,
  })
  expect(body).not.toHaveProperty('password')
})

