import { expect } from '@playwright/test';
import { test } from '../../test-options.ts';
import { v4 as uuidv4 } from 'uuid';

const subject = 'Automation Test ' + uuidv4();

test.describe('Feature: Send an Email with Attachment', () => {
  test('Scenario: Send an Email with Attachment', async ({ pageManager }) => {
    await test.step('When I click on a new email message', async () => {
      await pageManager.inboxPage.LocatorNewMessage.click();
    });

    await test.step('And I pick the recipient from contacts', async () => {
      await pageManager.inboxPage.LocatorContacts.click();
      await pageManager.inboxPage.LocatorContact.click();
      await pageManager.inboxPage.LocatorInsert.click();
    });

    await test.step('And I fill the subject', async () => {
      await pageManager.inboxPage.LocatorSubject.fill(subject);
    });

    await test.step('And I attach a file to the email message', async () => {
      await pageManager.inboxPage.LocatorInputFile.setInputFiles('./data/zadanie.docx');
    });

    await test.step('And I send the email message', async () => {
      await pageManager.inboxPage.LocatorSend.click();
    });

    await test.step('Then I check that email has been sent', async () => {
      await expect(pageManager.inboxPage.page.locator('body')).toContainText(subject);
    });

    await test.step('And I logout', async () => {
      await pageManager.inboxPage.LocatorProfile.click();
      await pageManager.inboxPage.LocatorLogout.click();
      await pageManager.inboxPage.page.goto('');

      await expect(pageManager.inboxPage.page.locator('body')).toContainText('Sign in');
    });
  });
});