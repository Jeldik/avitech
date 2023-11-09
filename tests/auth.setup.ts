import { test as setup } from '@playwright/test';
import { PageManager } from './pageObjects/pageManager.desktop';

let pm: PageManager;
const authFile = '.auth/user.json'

setup('auth', async ({ page }) => {
    pm = new PageManager(page);

    await page.goto('/gmail/about/');
    await pm.aboutPage.LocatorSignInButton.click();
    await pm.signPage.LocatorEmailInput.fill(process.env.EMAIL!)
    await pm.signPage.LocatorNextBtn.click();
    await pm.signPage.LocatorPasswordInput.fill(process.env.PASSWORD!);
    await pm.signPage.LocatorPasswordNextBtn.click();

    await page.waitForTimeout(6000);

    await page.context().storageState({ path: authFile });
})