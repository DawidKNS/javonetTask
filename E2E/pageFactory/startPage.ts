import { BrowserContext, Locator, Page } from "@playwright/test";

interface Elements {
}

interface Buttons {
}

export class StartPage {
	readonly page: Page;
	readonly context: BrowserContext;
	readonly buttons: Buttons;
	readonly elements: Elements;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
		this.elements = {
		};
		this.buttons = {
		};
	}
}