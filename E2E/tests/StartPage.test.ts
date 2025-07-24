import test from '@lib/baseTests';
import { expect } from '@playwright/test';

test.describe(`Start Page Tests`, async () => {

	test.beforeEach(async ({  }) => {

	});

	test(`T1`, async ({  }): Promise<void> => {

	});

	test.afterEach(async ({ page }) => {
		//close browser
		await page.close();
	});
});