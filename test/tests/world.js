'use strict';

const helpers = require('../utils/helpers');
const mcpi = require('../../src/');

describe('World', () => {
  it('setWorldSetting', (done) => {
    const mc = helpers.mc();

    mc.setWorldSetting(mcpi.WorldSettings.WorldImmutable, true)
      .then(() => mc.setWorldSetting(mcpi.WorldSettings.WorldImmutable, false))
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
