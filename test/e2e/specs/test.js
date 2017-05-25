// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'e2e - login test render': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/login')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.login')
      .assert.containsText('button', 'Sign in')
      .end()
  }
}
