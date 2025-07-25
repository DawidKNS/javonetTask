import { expect } from '@playwright/test';
import test from '@lib/baseTests';

test.describe('Oauth Tests', async () => {
	let user: any;

	test('Download user data', async ({ oAuthPage }): Promise<void> => {
		const userData = await oAuthPage.getUserData();
		expect(userData.status()).toBe(200);

		user = await userData.json();
		expect(user).toHaveProperty('login');
		console.log(`User login: ${user.login}`);
	});

	test('Download this users public repositories', async ({ oAuthPage }): Promise<void> => {
		const reposRes = await oAuthPage.getRepository(user.login);
		expect(reposRes.status()).toBe(200);

		const repos = await reposRes.json();
		expect(Array.isArray(repos)).toBe(true);
		expect(repos.length).toBeGreaterThan(0);
	});
});