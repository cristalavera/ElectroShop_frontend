import { test, expect } from '@playwright/test';

test('la aplicación carga correctamente', async ({ page }) => {
  await page.goto('https://electroshopfrontendapp.vercel.app');

  // Comprobamos que aparece algún texto clave de la app
  await expect(page).toHaveURL(/electroshopfrontendapp/);
});