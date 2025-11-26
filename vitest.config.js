import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testNamePattern: 'test/*.js',
    globals: true
  },
})