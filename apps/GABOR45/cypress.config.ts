import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8100',
		numTestsKeptInMemory: 0,
		execTimeout: 60000,
		video: true,
		defaultCommandTimeout: 5000,
		pageLoadTimeout: 20000,
		setupNodeEvents(on, config) {
		  // implement node event listeners here
		},
	},
});
