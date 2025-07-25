import { BrowserContext, Page, request, APIRequestContext } from "@playwright/test";
import testConfig from "@config/*";

export class APIPage {
	readonly page: Page;
	readonly context: BrowserContext;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
	}

	/**
	 * Creates a new API request context using the base URL from the test configuration.
	 * @returns {Promise<APIRequestContext>} A promise resolving to the API request context.
	 */
	public async getApiContext(): Promise<APIRequestContext> {
		return await request.newContext({
			baseURL: testConfig.use!.testConfig!.api.baseURL,
		});
	}

	/**
	 * Sends a GET request to fetch all posts from the API.
	 * @returns {Promise<any>} A promise resolving to the list of posts.
	 * @throws {Error} If the request fails.
	 */
	public async getPosts(): Promise<any> {
		const apiContext = await this.getApiContext();
		const response = await apiContext.get('/posts');
		if (!response.ok()) {
			throw new Error(`Failed to fetch posts: ${response.status()} ${response.statusText()}`);
		}
		return await response.json();
	}

	/**
	 * Sends a GET request to fetch the post with ID 1.
	 * @returns {Promise<any>} A promise resolving to the post data.
	 * @throws {Error} If the request fails.
	 */
	public async getPosts1(): Promise<any> {
		const apiContext = await this.getApiContext();
		const response = await apiContext.get('/posts/1');
		if (!response.ok()) {
			throw new Error(`Failed to fetch post 1: ${response.status()} ${response.statusText()}`);
		}
		return await response.json();
	}

	/**
	 * Sends a POST request to create a new post with valid data.
	 * @returns {Promise<any>} A promise resolving to the created post.
	 * @throws {Error} If the post creation fails.
	 */
	public async getPostsValidData(): Promise<any> {
		const apiContext = await this.getApiContext();
		const response = await apiContext.post('/posts', {
			data: {
				title: 'foo',
				body: 'bar',
				userId: 1,
			},
		});
		if (response.status() !== 201) {
			throw new Error(`Failed to create post with valid data: ${response.status()} ${response.statusText()}`);
		}
		return await response.json();
	}

	/**
	 * Sends a GET request to a non-existent endpoint.
	 * @returns {Promise<any>} A promise resolving to the error response from the invalid endpoint.
	 */
	public async getInvalidEndpoint(): Promise<any> {
		const apiContext = await this.getApiContext();
		return await apiContext.get('/invalid-endpoint');
	}

	/**
	 * Sends a POST request to test the API's performance when creating a post.
	 * @returns {Promise<any>} A promise resolving to the full API response.
	 */
	public async postPerformanceTest(): Promise<any> {
		const apiContext = await this.getApiContext();
		const response = await apiContext.post('/posts', {
			data: {
				title: 'performance',
				body: 'test',
				userId: 2,
			},
		});

		return response;
	}

	/**
	 * Sends a POST request to create a post with incomplete data (missing body and userId).
	 * @returns {Promise<any>} A promise resolving to the created post or error response.
	 * @throws {Error} If the post creation fails.
	 */
	public async getIncompletePost(): Promise<any> {
		const apiContext = await this.getApiContext();
		const response = await apiContext.post('/posts', {
			data: {
				title: 'incomplete',
			},
		});

		return response;
	}
}