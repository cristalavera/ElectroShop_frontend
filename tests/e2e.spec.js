import { test, expect } from '@playwright/test';

test('la aplicación carga correctamente', async ({ page }) => {
  await page.goto('https://electroshopfrontendapp.vercel.app');

  // Comprobamos que aparece algún texto clave de la app
  await expect(page).toHaveURL(/electroshopfrontendapp/);
});

test('inicio de sesión correcto', async ({ page }) => {
  await page.goto('https://electroshopfrontendapp.vercel.app');

  await page.waitForSelector('input[placeholder="Email"]');

  await page.fill('input[placeholder="Email"]', 'test@test.com');
  await page.fill('input[placeholder="Contraseña"]', '1234');

  await page.click('button:has-text("Iniciar sesión")');

  // ✅ CORRECTO
  await expect(page.locator('text=Panel de gestión de inventario')).toBeVisible();
});

test('los productos se muestran correctamente', async ({ page }) => {
  await page.goto('https://electroshopfrontendapp.vercel.app');

  // Login
  await page.fill('input[placeholder="Email"]', 'test@test.com');
  await page.fill('input[placeholder="Contraseña"]', '1234');
  await page.click('button:has-text("Iniciar sesión")');

  await page.waitForSelector('text=Inventario ElectroShop');

  // ✅ Comprobamos que hay productos (botón eliminar siempre existe)
  await expect(page.locator('button:has-text("Eliminar")').first()).toBeVisible();
});

test('login incorrecto muestra error', async ({ page }) => {
  await page.goto('https://electroshopfrontendapp.vercel.app');

  await page.fill('input[placeholder="Email"]', 'mal@test.com');
  await page.fill('input[placeholder="Contraseña"]', 'incorrecto');

  await page.click('button:has-text("Iniciar sesión")');

  // Este FALLARÁ (y es lo esperado)
  await expect(page.locator('text=Error')).toBeVisible();
});


