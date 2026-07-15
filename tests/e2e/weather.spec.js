import { test, expect } from '@playwright/test'

test('cambia el tiempo de nacional a Asturias', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('.weather__city')).toHaveText('Madrid')

  await page.getByRole('button', { name: 'Asturias' }).click()

  await expect(page.locator('.weather__city')).toHaveText('Oviedo')
})