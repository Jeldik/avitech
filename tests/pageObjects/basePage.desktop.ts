import type { Page, Locator } from "@playwright/test";

/**
 * Base page object. Should contain methods and props that are reusable acress multiple page objects.
 */
export class BasePage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Checks if element is visible.
     * @param locator - locator of the element to check
     * @param timeout - how long to wait for the element to be visible
     * @returns boolean
     */
    async isElementVisible(locator: Locator, timeout?: number) {
        try {
            await locator.waitFor({ state: "visible", timeout });
            if (await locator.isVisible()) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks if element is attached.
     * @param locator - locator of the element to check
     * @param timeout - how long to wait for the element to be attached
     * @returns boolean
     */
    async isElementAttached(locator:Locator, timeout?: number) {
        try {
            await locator.waitFor({ state: "attached", timeout });
            const element = await locator.elementHandle();
            if (element !== null) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Clicks on the element and waits for the page to navigate to the given URL.
     * @param params.locatorToClick - locator of the element to click
     * @param params.urlToWaitFor - url to wait for
     * @returns Promise<void>
     */
    async clickToNavigate(locatorToClick: Locator, urlToWaitFor: string) {
        await locatorToClick.click();
        return await this.page.waitForURL(urlToWaitFor);
    }
        
}