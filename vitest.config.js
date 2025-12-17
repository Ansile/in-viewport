import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    // inspectBrk: true,
    // fileParallelism: false,
    browser: {
          enabled: true,
          provider: playwright(),
          // https://vitest.dev/config/browser/playwright
          instances: [
            { browser: 'chromium' }
          ],
          testerHtmlPath: 'test/fixtures/template.html'
      },
    globals: true,
    environment: 'jsdom',
    globalSetup: ['vitest.global-setup.ts']
  },
})
