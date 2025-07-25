import { test as baseTest } from '@playwright/test';
import { RunPage } from "@pages/runPage";
import { OAuthPage } from "@pages/oAuthPage";
import { APIPage } from "@pages/apiPage";

const test = baseTest.extend<{
	runPage: RunPage;
	oAuthPage: OAuthPage;
	apiPage: APIPage;
}>({
	runPage: async ({ page, context }, use) => {
		await use(new RunPage(page, context));
	},
	oAuthPage: async ({ page, context }, use) => {
		await use(new OAuthPage(page, context));
	},
	apiPage: async ({ page, context }, use) => {
		await use(new APIPage(page, context));
	}
})

export default test;