import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://www.javonet.com/guides/v2/';

test.describe('Test v1 - to check', () => {

	test('🔍 Widoczność kluczowych elementów UI', async ({ page, runPage }) => {
		await runPage.navigateToURL();

		// Poczekaj na główny wrapper dokumentacji/guides
		const contentWrapper = page.locator('main'); // lub inny nadrzędny kontener
		await expect(contentWrapper).toBeVisible();

		// Header
		const header = page.locator('.site-header');
		await expect(header).toBeVisible();

		// CTA "Try for free"
		const tryBtn = page.locator('[data-title="Try for free"]');
		await expect(tryBtn).toBeVisible();

		// Lista przewodników (np. elementy typu card/article/link)
		const guides = page.locator('a[href*="/guides/v2/"]'); // dopasowuje wszystkie linki do podstron guides
		const count = await guides.count();
		expect(count).toBeGreaterThan(0);

		// Footer
		const footer = page.locator('footer');
		await expect(footer).toBeVisible();
	});

	test('🔗 Funkcjonalność przycisków i linków', async ({ page }) => {
		const response = await page.goto(BASE_URL);

		// Zakładamy, że przycisk CTA prowadzi do strony rejestracji/próby
		await expect(page.locator('[data-title="Try for free"]')).toBeVisible();
		await page.locator('[data-title="Try for free"]').click();

		// 2. Poczekaj na obecność kluczowego elementu formularza
		const form = page.locator('form'); // lub np. 'form#signupForm' jeśli ma ID
		await expect(form).toBeVisible();

		// 3. Sprawdź obecność pól (input, przyciski)
		await expect(page.locator('#LoginEmail')).toBeVisible();
		await expect(page.locator('#LoginPassword')).toBeVisible();
		await expect(page.locator('#LoginName')).toBeVisible();
		await expect(page.locator('#LoginSurname')).toBeVisible();
		await expect(page.getByRole('button', { name: /Sign up|Register/i })).toBeVisible();

		// 4. Opcjonalnie: poczekaj na zakończenie żądań sieciowych, jeśli są API/ajax
		await page.waitForLoadState('networkidle'); // sieć "uspokoiła się"

		expect(response!.status()).toBe(200);
	});

	test('📄 Prawidłowe ładowanie treści i status HTTP', async ({ request }) => {
		const response = await request.get(BASE_URL);

		// Sprawdź status 200
		expect(response.status()).toBe(200);

		// Sprawdź, że w treści jest oczekiwany fragment (np. "Guides v2")
		const body = await response.text();
		expect(body).toContain('Guides'); // lub bardziej specyficzny string
	});
});
