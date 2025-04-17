const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', // for HTML reports
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      screenshotOnRunFailure = true,
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
});
