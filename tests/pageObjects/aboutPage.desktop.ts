import { BasePage } from './basePage.desktop'

export class AboutPage extends BasePage {
  public readonly LocatorSignInButton = this.page.locator('[data-action = "sign in"]')
}
