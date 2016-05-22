'use strict';

const jasmineConfig = {
  spec_dir: 'test',
  spec_files: [
    './tests/**/*.js',
  ],
  helpers: [
    './helpers/**/*.js',
  ],
};

const terminalConfig = {
  color: true,
  verbosity: 3,
  showStack: true,
};

const specReporterConfig = {
  displayPendingSummary: false,
  displayPendingSpec: true,
  displaySpecDuration: true,
  displayStacktrace: 'summary',
  displaySuiteNumber: true,
  customProcessors: [],
};

module.exports = { 
  jasmineConfig,
  specReporterConfig,
  terminalConfig, 
};
