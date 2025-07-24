import { BrowserContext, Page } from '@playwright/test';
import testConfig from "@config/*";

export class RunPage {
	readonly page: Page;
	readonly context: BrowserContext;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
	}

	/**
	 * Open test browser and navigate to URL
	 */
	public async navigateToURL(): Promise<void> {
		await this.page.goto(testConfig.use!.testConfig!.web.url);
	}
}