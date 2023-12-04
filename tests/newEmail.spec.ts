import { expect } from '@playwright/test'
import { test } from '../test-options'

test.describe('Tests for Avitech', () => {
  test('Attach an attachment', async ({ page, pageManager }) => {
    await pageManager.inboxPage.LocatorNewMessage.click()
    await pageManager.inboxPage.LocatorInputFile.setInputFiles('./data/zadanie.docx')
    await page.reload()

    pageManager.inboxPage.page.getByText('(16 kB)')
  })

  test('New message btn open a new dialog', async ({ pageManager }) => {
    await pageManager.inboxPage.LocatorNewMessage.click()

    expect(await pageManager.inboxPage.LocatorNewMessageIframe.isVisible())
  })

  test('Pick the contact from a contact list', async ({ pageManager }) => {
    await pageManager.inboxPage.LocatorNewMessage.click()
    await pageManager.inboxPage.LocatorContacts.click()
    await pageManager.inboxPage.LocatorContact.click()
    await pageManager.inboxPage.LocatorInsert.click()

    await expect(pageManager.inboxPage.LocatorSelectedContact).toBeVisible()
  })

  test('Logout', async ({ pageManager }) => {
    await pageManager.inboxPage.LocatorProfile.click()
    await pageManager.inboxPage.LocatorLogout.click()

    await expect(pageManager.inboxPage.page.locator('body')).toContainText('Sign in')
  })
})
