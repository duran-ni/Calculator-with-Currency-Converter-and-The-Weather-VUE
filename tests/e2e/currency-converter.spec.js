import { test, expect } from '@playwright/test'

test('convierte una cantidad en el conversor de divisas', async ({ page }) => {
  await page.goto('/')

  await page.locator('.currency-converter__input').fill('10')

  const selects = page.locator('.currency-converter__select')
  await selects.nth(0).selectOption('EUR')
  await selects.nth(1).selectOption('USD')

  await page.getByRole('button', { name: 'Convertir' }).click()

  await expect(page.locator('.currency-converter__result')).toBeVisible()
  await expect(page.locator('.currency-converter__rate')).toContainText('Fuente: CurrencyFreaks')
})