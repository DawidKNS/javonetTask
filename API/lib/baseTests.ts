import { test as baseTest } from '@playwright/test';
import { RunPage } from "@pages/runPage";
import { OAuthPage } from "@pages/oAuthPage";

const test = baseTest.extend<{
	runPage: RunPage;
	oAuthPage: OAuthPage;
}>({
	runPage: async ({ page, context }, use) => {
		await use(new RunPage(page, context));
	},
	oAuthPage: async ({ page, context }, use) => {
		await use(new OAuthPage(page, context));
	}
})

export default test;