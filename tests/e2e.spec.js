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

test('crear y eliminar producto correctamente', async ({ page }) => {

  const nombreProducto = `Producto-E2E-${Date.now()}`;

  await page.goto('https://electroshopfrontendapp.vercel.app');

  await page.waitForLoadState('networkidle');

  // LOGIN
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
    nombreProducto
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

  // Verificar creación
  const productoCreado = page
    .getByTestId('product-name')
    .filter({ hasText: nombreProducto })
    .first();

  await expect(productoCreado).toBeVisible();

  // Eliminar producto
  await page.getByTestId('delete-button').last().click();

  // Confirmar modal
  await page.click(
    '[data-testid="confirm-delete-button"]'
  );

  // Verificar eliminación
  await expect(productoCreado).not.toBeVisible();

});

test('muestra error si no se aceptan los términos', async ({ page }) => {

  // Abrir aplicación
  await page.goto('https://electroshopfrontendapp.vercel.app');

  await page.waitForLoadState('networkidle');

  // Rellenar login
  await page.fill(
    '[data-testid="email-input"]',
    'test@test.com'
  );

  await page.fill(
    '[data-testid="password-input"]',
    '1234'
  );

  // NO marcar checkbox

  // Intentar iniciar sesión
  await page.click(
    '[data-testid="login-button"]'
  );

  // Verificar mensaje de error
  await expect(
    page.getByText('Debes aceptar los términos')
  ).toBeVisible();

});
