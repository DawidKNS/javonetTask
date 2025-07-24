import { test as baseTest } from '@playwright/test';
import { RunPage } from "@pages/runPage";
import { StartPage } from "@pages/startPage";

const test = baseTest.extend<{
	runPage: RunPage;
	startPage: StartPage;
}>({
	runPage: async ({ page, context }, use) => {
		await use(new RunPage(page, context));
	},
	startPage: async ({ page, context }, use) => {
		await use(new StartPage(page, context));
	}
})

export default test;