import { test, expect } from '@playwright/test'

test('realiza una operación completa en la calculadora', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: '1', exact: true }).click()
  await page.getByRole('button', { name: '2', exact: true }).click()
  await page.getByRole('button', { name: '+', exact: true }).click()
  await page.getByRole('button', { name: '3', exact: true }).click()
  await page.getByRole('button', { name: '=', exact: true }).click()

  await expect(page.locator('.calculator-display__main')).toHaveText('15')
})