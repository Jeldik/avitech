import { BasePage } from "./basePage.desktop";

export class SignInPage extends BasePage {
    public readonly LocatorEmailInput = this.page.locator('#identifierId');
    public readonly LocatorNextBtn = this.page.locator('#identifierNext');
    public readonly LocatorPasswordInput = this.page.locator('[name="Passwd"]');
    public readonly LocatorPasswordNextBtn = this.page.locator('#passwordNext');
    public readonly LocatorNotNowBtn = this.page.locator('#passwordNext');
}