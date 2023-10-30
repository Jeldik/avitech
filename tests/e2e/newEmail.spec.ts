import { test, expect } from '@playwright/test';
import { AboutPage } from '../pageObjects/aboutPage.desktop';
import { SignInPage } from '../pageObjects/signInPage.desktop';
import { InboxPage } from '../pageObjects/inboxPage.desktop';
import { v4 as uuidv4 } from 'uuid';

let signPage: SignInPage;
let aboutPage: AboutPage;
let inboxPage: InboxPage;
const subject = 'Automation Test ' + uuidv4();

test.describe('Feature: Send an Email with Attachment', () => {
  test('Scenario: Send an Email with Attachment', async ({ page }) => {
    await test.step('Given I am logged in to my email account', async () => {
      aboutPage = new AboutPage(page);
      signPage = new SignInPage(page);
      inboxPage = new InboxPage(page);

      await page.goto('/gmail/about/');
      await aboutPage.LocatorSignInButton.click();
      await signPage.LocatorEmailInput.fill(process.env.EMAIL!)
      await signPage.LocatorNextBtn.click();
      await signPage.LocatorPasswordInput.fill(process.env.PASSWORD!);
      await signPage.LocatorPasswordNextBtn.click();
    });

    await test.step('When I click on a new email message', async () => {
      await inboxPage.LocatorNewMessage.click();
    });

    await test.step('And I pick the recipient from contacts', async () => {
      await inboxPage.LocatorContacts.click();
      await inboxPage.LocatorContact.click();
      await inboxPage.LocatorInsert.click();
    });

    await test.step('And I fill the subject', async () => {
      await inboxPage.LocatorSubject.fill(subject);
    });

    await test.step('And I attach a file to the email message', async () => {
      await inboxPage.LocatorInputFile.setInputFiles('./data/zadanie.docx');
    });

    await test.step('And I send the email message', async () => {
      await inboxPage.LocatorSend.click();
    });

    await test.step('Then I check that email has been sent', async () => {
      await expect(page.locator('body')).toContainText(subject);
    });

    await test.step('And I logout', async () => {
      await inboxPage.LocatorProfile.click();
      await inboxPage.LocatorLogout.click();
      await expect(page.locator('body')).toContainText('Sign in');
    });
  });
});