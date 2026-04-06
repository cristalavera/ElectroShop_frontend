import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/tests/**/*.test.jsx'],   // 👈 SOLO mira aquí
    exclude: [
      'node_modules',
      'tests/**',          // 👈 ignora carpeta raíz
      'playwright/**'
    ],
  },
});