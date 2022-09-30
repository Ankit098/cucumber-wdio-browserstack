const argv = require('yargs').argv;
const wdioParallel = require('wdio-cucumber-parallel-execution');

const sourceSpecDirectory = `tests/features/featureFiles`;
let featureFilePath = `${sourceSpecDirectory}/*.feature`;

if (argv.parallel === 'true') {
  tmpSpecDirectory = `${sourceSpecDirectory}/tmp`;
  wdioParallel.performSetup({
    sourceSpecDirectory: sourceSpecDirectory,
    tmpSpecDirectory: tmpSpecDirectory,
    cleanTmpSpecDirectory: true
  });
  featureFilePath = `${tmpSpecDirectory}/*.feature`;
}

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [featureFilePath],
  exclude: [],
  maxInstances: 10,
  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  hostname: 'hub.browserstack.com',
  services: [['browserstack', { preferScenarioName: true }]],
  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'bstack:options': {
      os: 'OS X',
      osVersion: 'Big Sur',
      buildName: 'cucumber_wdio_test'
    },
  }],
  framework: 'cucumber',
  cucumberOpts: {
    timeout: 90000,
  }
};
