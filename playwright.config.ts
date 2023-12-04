import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  retries: 1,
  timeout: 60000,
  fullyParallel: true,
  use: {
    baseURL: 'https://mail.google.com/mail/',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'setup',
      testMatch: 'tests/auth.setup.ts',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
      dependencies: ['setup']
    }
  ]
})
