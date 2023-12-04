import { AboutPage } from './aboutPage.desktop'
import { SignInPage } from './signInPage.desktop'
import { InboxPage } from './inboxPage.desktop'
import { BasePage } from './basePage.desktop'

export class PageManager extends BasePage {
  readonly aboutPage = new AboutPage(this.page)
  readonly signPage = new SignInPage(this.page)
  readonly inboxPage = new InboxPage(this.page)
}
