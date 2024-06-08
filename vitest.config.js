import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true, // so you don't need to import describe/test/expect
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
  plugins: [react()],
});
