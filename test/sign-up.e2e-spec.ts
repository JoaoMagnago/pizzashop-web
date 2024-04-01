import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu telefone').fill('12345678910')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()

  // await page.waitForTimeout(2000) is a workaround for a current bug that shows a blank page at the end of the test
})

test('sign in with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Invalid Name')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu telefone').fill('12345678910')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()
})

// test('navigate to new restaurant page', async ({ page }) => {
//   await page.goto('/sign-in', { waitUntil: 'networkidle' })

//   await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

//   expect(page.url()).toContain('/sign-up')

//   // await page.waitForTimeout(2000)  read comment in line 15
// })

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')

  // await page.waitForTimeout(2000)  read comment in line 15
})
