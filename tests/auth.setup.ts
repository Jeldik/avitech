import { test as setup } from '@playwright/test'
import { PageManager } from './pageObjects/pageManager.desktop'

let pm: PageManager
const authFile = '.auth/user.json'

setup('Given I am logged in to my email account', async ({ page }) => {
  if ((process.env.EMAIL?.length ?? 0) > 0 && (process.env.PASSWORD?.length ?? 0) > 0) {
    pm = new PageManager(page)

    await page.goto('')
    await pm.signPage.LocatorEmailInput.fill(process.env.EMAIL as string)
    await pm.signPage.LocatorNextBtn.click()
    await pm.signPage.LocatorPasswordInput.fill(process.env.PASSWORD as string)
    await pm.signPage.LocatorPasswordNextBtn.click()

    await page.waitForTimeout(6000)

    await page.context().storageState({ path: authFile })
  } else {
    throw new Error('Email or password are not defined!')
  }
})
