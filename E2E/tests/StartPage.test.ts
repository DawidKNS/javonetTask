import { expect } from '@playwright/test';
import test from '@lib/baseTests';

let response: any;

test.beforeEach(async ({ runPage }) => {
	response = await runPage.navigateToURL();
});

test.describe('Task 1', async () => {
	test('Visibility of key UI elements', async ({ startPage }): Promise<void> => {
		expect(await startPage.elements.contentWrapper).toBeVisible();
		expect(await startPage.elements.header).toBeVisible();
		expect(await startPage.elements.tryBtn).toBeVisible();
		expect(await startPage.elements.footer).toBeVisible();
		expect(await startPage.elements.guides.count()).toBeGreaterThan(0);
	});

	test('Check functionality of buttons and links', async ({ startPage }) => {

		await expect(await startPage.buttons.tryForFree).toBeVisible();
		await startPage.buttons.tryForFree.click();

		await expect(await startPage.elements.from).toBeVisible();

		await expect(await startPage.elements.loginEmail).toBeVisible();
		await expect(await startPage.elements.loginPassword).toBeVisible();
		await expect(await startPage.elements.loginName).toBeVisible();
		await expect(await startPage.elements.loginSurname).toBeVisible();
		await expect(await startPage.buttons.SignUpRegister).toBeVisible();

		expect(await response.status()).toBe(200);
	});

	test('Correct content loading and HTTP status', async ({ request }) => {
		expect(await response.status()).toBe(200);

		const body = await response.text();
		expect(body).toContain('Guides');
	});
});

test.afterEach(async ({ runPage }) => {
	await runPage.page.close();
});