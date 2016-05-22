'use strict';

const Jasmine = require('jasmine');
const JasmineSpecReporter = require('jasmine-spec-reporter');

const testConfig = require('./config');

const jasmine = new Jasmine();

jasmine.loadConfig(testConfig.jasmineConfig);
jasmine.addReporter(new JasmineSpecReporter(testConfig.specReporterConfig));

jasmine.execute();

module.exports = jasmine;
