import { BrowserContext, Page } from '@playwright/test';
import testConfig from "@config/*";

export class RunPage {
	readonly page: Page;
	readonly context: BrowserContext;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
	}
}