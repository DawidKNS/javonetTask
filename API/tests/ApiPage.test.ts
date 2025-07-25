import { expect } from '@playwright/test';
import test from '@lib/baseTests';

test.describe('JSONPlaceholder /posts API', () => {

	test('GET /posts should return 200 and array of posts', async ({ apiPage }) => {
		let body = await apiPage.getPosts();
		expect(Array.isArray(body)).toBeTruthy();
		expect(body.length).toBeGreaterThan(0);
	});

	test('GET /posts/1 should return valid post and 200', async ({ apiPage }) => {
		let body = await apiPage.getPosts1();

		expect(body).toHaveProperty('id', 1);
		expect(body).toHaveProperty('title');
		expect(body).toHaveProperty('body');
	});

	test('POST /posts with valid data returns 201', async ({ apiPage }) => {
		const body = await apiPage.getPostsValidData();
		expect(body).toMatchObject({
			title: 'foo',
			body: 'bar',
			userId: 1,
		});
	});

	test('POST /posts with missing fields should still return 201 (mock API)', async ({ apiPage }) => {
		const response = await apiPage.getIncompletePost();
		expect(response.status()).toBe(201);

		const body = await response.json();
		expect(body.title).toBe('incomplete');
		expect(body.id).toBeDefined();
	});

	test('GET /invalid-endpoint returns 404', async ({ apiPage }) => {
		const response = await apiPage.getInvalidEndpoint();
		expect(response.status()).toBe(404);
	});

	test('POST /posts should respond in under 1s', async ({ apiPage }) => {
		const start = Date.now();
		const response = await apiPage.postPerformanceTest();
		const end = Date.now();
		const duration = end - start;

		expect(duration).toBeLessThan(1000);
		expect(response.status()).toBe(201);
	});
});
