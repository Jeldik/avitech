import { test, expect } from '@playwright/test';
import { PageManager } from './pageObjects/pageManager.desktop';

let pm: PageManager;

test.describe('Tests for Avitech', () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);

    await page.goto('/gmail/about/');
    await pm.aboutPage.LocatorSignInButton.click();
    await pm.signPage.LocatorEmailInput.fill(process.env.EMAIL!)
    await pm.signPage.LocatorNextBtn.click();
    await pm.signPage.LocatorPasswordInput.fill(process.env.PASSWORD!);
    await pm.signPage.LocatorPasswordNextBtn.click();
  });

  test('New message btn open a new dialog', async ({ page }) => {
    await pm.inboxPage.LocatorNewMessage.click();

    expect(await pm.inboxPage.LocatorNewMessageIframe.isVisible());
  });

  test('Pick the contact from a contact list', async ({ page }) => {
    await pm.inboxPage.LocatorNewMessage.click();
    await pm.inboxPage.LocatorContacts.click();
    await pm.inboxPage.LocatorContact.click();
    await pm.inboxPage.LocatorInsert.click();
    
    await expect(pm.inboxPage.LocatorSelectedContact).toBeVisible();
  });

  test('Attach an attachment', async ({ page }) => {
    await pm.inboxPage.LocatorNewMessage.click();
    await pm.inboxPage.LocatorInputFile.setInputFiles('./data/zadanie.docx');
    await pm.inboxPage.page.reload();

    page.getByText('(16 kB)');
  });


  test('Logout', async ({ page }) => {
    await pm.inboxPage.LocatorProfile.click();
    await pm.inboxPage.LocatorLogout.click();
    
    await expect(page.locator('body')).toContainText('Sign in');
  });
});