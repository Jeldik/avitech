import { test, expect } from '@playwright/test';
import { AboutPage } from './pageObjects/aboutPage.desktop';
import { SignInPage } from './pageObjects/signInPage.desktop';
import { InboxPage } from './pageObjects/inboxPage.desktop';

let signPage: SignInPage;
let aboutPage: AboutPage;
let inboxPage: InboxPage;

test.describe('Tests for Avitech', () => {
  test.beforeEach(async ({ page }) => {
    aboutPage = new AboutPage(page);
    signPage = new SignInPage(page);

    await page.goto('/gmail/about/');
    await aboutPage.LocatorSignInButton.click();
    await signPage.LocatorEmailInput.fill(process.env.EMAIL!)
    await signPage.LocatorNextBtn.click();
    await signPage.LocatorPasswordInput.fill(process.env.PASSWORD!);
    await signPage.LocatorPasswordNextBtn.click();
  });

  test('New message btn open a new dialog', async ({ page }) => {
    inboxPage = new InboxPage(page);
    await inboxPage.LocatorNewMessage.click();

    expect(await inboxPage.LocatorNewMessageIframe.isVisible());
  });

  test('Pick the contact from a contact list', async ({ page }) => {
    inboxPage = new InboxPage(page);

    await inboxPage.LocatorNewMessage.click();
    await inboxPage.LocatorContacts.click();
    await inboxPage.LocatorContact.click();
    await inboxPage.LocatorInsert.click();
    
    await expect(inboxPage.LocatorSelectedContact).toBeVisible();
  });

  test('Attach an attachment', async ({ page }) => {
    inboxPage = new InboxPage(page);

    await inboxPage.LocatorNewMessage.click();
    await inboxPage.LocatorInputFile.setInputFiles('./data/zadanie.docx');
    await inboxPage.page.reload();

    page.getByText('(16 kB)');
  });


  test('Logout', async ({ page }) => {
    inboxPage = new InboxPage(page);

    await inboxPage.LocatorProfile.click();
    await inboxPage.LocatorLogout.click();
    
    await expect(page.locator('body')).toContainText('Sign in');
  });
});