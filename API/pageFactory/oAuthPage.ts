import { BrowserContext, Page, request, APIRequestContext } from "@playwright/test";
import testConfig from "@config/*";

export class OAuthPage {
	readonly page: Page;
	readonly context: BrowserContext;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
	}

	/**
	  * Checks if the GitHub OAuth token is set in the test configuration.
	  * @returns {Promise<string | undefined>} The OAuth token as a string, or throws an error if not set.
	  * @throws {Error} If the token is not set in the environment.
	  */
	private async checkToken(): Promise<string | undefined> {
		const token = testConfig.use!.testConfig!.oAuth.githubToken;
		if (!token) {
			throw new Error('❌Github token is not set in the environment');
		}
		return token;
	}

	/**
	  * Checks if the base URL for the GitHub API is set in the test configuration.
	  * @returns {Promise<string | undefined>} The base URL as a string, or throws an error if not set.
	  * @throws {Error} If the URL is not set in the environment.
	  */
	private async checkUrl(): Promise<string | undefined> {
		const url = testConfig.use!.testConfig!.oAuth.baseURL;
		if (!url) {
			throw new Error('❌Github url is not set in the environment');
		}
		return url;
	}

	/**
	  * Creates an authenticated API client (APIRequestContext) for the GitHub API using OAuth token.
	  * @returns {Promise<APIRequestContext>} A configured API context for making HTTP requests.
	  */
	private async CreateApiClient(): Promise<APIRequestContext> {
		let token = await this.checkToken();
		let baseUrl = await this.checkUrl();

		let apiContext = await request.newContext({
			baseURL: baseUrl,
			extraHTTPHeaders: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/vnd.github+json',
				'User-Agent': 'Playwright-OAuth-Test',
			},
		});

		return apiContext;
	}

	/**
	  * Sends a GET request to GitHub API and retrieves the currently authenticated user information.
	  * @returns {Promise<any>} User information returned by the `/user` endpoint.
	  */
	public async getUserData(): Promise<any> {
		return await (await this.CreateApiClient()).get('/user');
	}

	/**
	 * Fetches the list of public repositories for a given GitHub username.
	 * @param {string} userLogin - The GitHub username.
	 * @returns {Promise<any>} An array of repositories returned by the `/users/:login/repos` endpoint.
	 */
	public async getRepository(userLogin: string): Promise<any> {
		return await (await this.CreateApiClient()).get(`/users/${userLogin}/repos`);
	}
}