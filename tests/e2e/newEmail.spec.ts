import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import { PageManager } from '../pageObjects/pageManager.desktop';

let pm: PageManager;
const subject = 'Automation Test ' + uuidv4();

test.describe('Feature: Send an Email with Attachment', () => {
  test('Scenario: Send an Email with Attachment', async ({ page }) => {
    await test.step('Given I am logged in to my email account', async () => {
      pm = new PageManager(page);
      
      await page.goto('https://mail.google.com/mail/');
    });

    await test.step('When I click on a new email message', async () => {
      await pm.inboxPage.LocatorNewMessage.click();
    });

    await test.step('And I pick the recipient from contacts', async () => {
      await pm.inboxPage.LocatorContacts.click();
      await pm.inboxPage.LocatorContact.click();
      await pm.inboxPage.LocatorInsert.click();
    });

    await test.step('And I fill the subject', async () => {
      await pm.inboxPage.LocatorSubject.fill(subject);
    });

    await test.step('And I attach a file to the email message', async () => {
      await pm.inboxPage.LocatorInputFile.setInputFiles('./data/zadanie.docx');
    });

    await test.step('And I send the email message', async () => {
      await pm.inboxPage.LocatorSend.click();
    });

    await test.step('Then I check that email has been sent', async () => {
      await expect(page.locator('body')).toContainText(subject);
    });

    await test.step('And I logout', async () => {
      await pm.inboxPage.LocatorProfile.click();
      await pm.inboxPage.LocatorLogout.click();
      await page.goto('https://mail.google.com/mail/');

      await expect(page.locator('body')).toContainText('Sign in');
    });
  });
});