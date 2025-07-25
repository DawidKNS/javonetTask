import { BrowserContext, Locator, Page } from "@playwright/test";

interface Elements {
	contentWrapper: Locator;
	header: Locator;
	tryBtn: Locator;
	guides: Locator;
	footer: Locator;
	from: Locator;
	loginEmail: Locator;
	loginPassword: Locator;
	loginName: Locator;
	loginSurname: Locator;
}

interface Buttons {
	tryForFree: Locator;
	SignUpRegister: Locator;
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
			contentWrapper: this.page.locator('main'),
			header: this.page.locator('.site-header'),
			tryBtn: this.page.locator('[data-title="Try for free"]'),
			guides: this.page.locator('a[href*="/guides/v2/"]'),
			footer: this.page.locator('footer'),
			from: this.page.locator('#LoginEmail'),
			loginEmail: this.page.locator('#LoginEmail'),
			loginPassword: this.page.locator('#LoginPassword'),
			loginName: this.page.locator('#LoginName'),
			loginSurname: this.page.locator('#LoginSurname'),
		};
		this.buttons = {
			tryForFree: this.page.locator('[data-title="Try for free"]'),
			SignUpRegister: this.page.getByRole('button', { name: /Sign up|Register/i }),
		};
	}
}