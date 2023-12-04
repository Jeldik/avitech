import { test as base } from '@playwright/test'
import { PageManager } from './tests/pageObjects/pageManager.desktop'

export interface TestOptions {
  pageManager: PageManager
  goTo: string
}

export const test = base.extend<TestOptions>({
  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page)
    await use(pm)
  },

  goTo: [async ({ page }, use) => {
    await page.goto('')
    await use('')
  }, { auto: true }]
})
