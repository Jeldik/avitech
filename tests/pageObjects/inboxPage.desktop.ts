import { BasePage } from './basePage.desktop'

export class InboxPage extends BasePage {
  public readonly LocatorNewMessage = this.page.getByText('Nová zpráva').first()
  public readonly LocatorContacts = this.page.locator('[data-tooltip="Vybrat kontakty"]').first()
  public readonly LocatorRecipients = this.page.getByText('Příjemci')
  public readonly LocatorSubject = this.page.locator('[name="subjectbox"]')
  public readonly LocatorSend = this.page.locator('[data-tooltip="Odeslat ‪(Ctrl +Enter)‬"]')
  public readonly LocatorFrame = this.page.frameLocator('iframe[src*="docs.google"]')
  public readonly LocatorContact = this.LocatorFrame.locator('div[id~="jeldicek@gmail.com"]:nth-child(1)')
  public readonly LocatorInsert = this.LocatorFrame.getByText('Vložit')
  public readonly LocatorInputFile = this.page.locator('input[type=file]')
  public readonly LocatorProfile = this.page.locator('[src="https://lh3.googleusercontent.com/ogw/AKPQZvyrNYX2z_YtSuR94bQeszh01Fydrf-MDGuh5nfIzw=s32-c-mo"]')
  public readonly LocatorAccountFrame = this.page.frameLocator('iframe[name="account"]')
  public readonly LocatorLogout = this.LocatorAccountFrame.getByText('Odhlásit se')
  public readonly LocatorNewMessageIframe = this.page.locator('iframe[src="/mail/_/bscframe"]')
  public readonly LocatorSelectedContact = this.page.getByText('(gmail.com)')
}
