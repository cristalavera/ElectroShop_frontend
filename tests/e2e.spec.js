import { test, expect } from '@playwright/test';

test('la aplicación carga correctamente', async ({ page }) => {

  await page.goto('https://electroshopfrontendapp.vercel.app');

  // Verificar URL
  await expect(page).toHaveURL(/electroshopfrontendapp/);

  // Verificar carga de la interfaz
  await expect(
    page.locator('[data-testid="titulo-login"]')
  ).toBeVisible();

});

test('inicio de sesión correcto', async ({ page }) => {

  await page.goto('https://electroshopfrontendapp.vercel.app');

  // Esperar formulario
  await page.waitForSelector('[data-testid="email-input"]');

  // Completar login
  await page.fill(
    '[data-testid="email-input"]',
    'test@test.com'
  );

  await page.fill(
    '[data-testid="password-input"]',
    '1234'
  );

  // Aceptar términos
  await page.check(
    '[data-testid="terms-checkbox"]'
  );

  // Iniciar sesión
  await page.click(
    '[data-testid="login-button"]'
  );

  // Verificación
  await expect(
    page.locator('[data-testid="inventory-title"]')
  ).toBeVisible();

});

test('los productos se muestran correctamente', async ({ page }) => {

  await page.goto('https://electroshopfrontendapp.vercel.app');

  // Login
  await page.fill(
    '[data-testid="email-input"]',
    'test@test.com'
  );

  await page.fill(
    '[data-testid="password-input"]',
    '1234'
  );

  await page.check(
    '[data-testid="terms-checkbox"]'
  );

  await page.click(
    '[data-testid="login-button"]'
  );

  // Esperar a que cargue el inventario
  await page.waitForSelector(
    '[data-testid="inventory-title"]'
  );

  // Verificamos que existen productos visibles
  await expect(
    page.locator('[data-testid="delete-button"]').first()
  ).toBeVisible();
});

test('crear producto correctamente', async ({ page }) => {

  await page.goto('https://electroshopfrontendapp.vercel.app');

  // Inicio de sesión
  await page.fill(
    '[data-testid="email-input"]',
    'test@test.com'
  );

  await page.fill(
    '[data-testid="password-input"]',
    '1234'
  );

  await page.check(
    '[data-testid="terms-checkbox"]'
  );

  await page.click(
    '[data-testid="login-button"]'
  );

  // Esperar dashboard
  await page.waitForSelector(
    '[data-testid="inventory-title"]'
  );

  // Abrir formulario
  await page.click('button:has-text("Añadir producto")');

  // Crear producto
  await page.fill(
    '[data-testid="product-name-input"]',
    'Producto E2E'
  );

  await page.fill(
    '[data-testid="product-price-input"]',
    '99'
  );

  await page.fill(
    '[data-testid="product-stock-input"]',
    '10'
  );

  await page.click(
    '[data-testid="create-product-button"]'
  );

  // Verificación
  await expect(
    page.locator('[data-testid="product-name"]').filter({
      hasText: 'Producto E2E'
    })
  ).toBeVisible();

});