'use strict';

const helpers = require('../utils/helpers');
const mcpi = require('../../src/');

describe('World', () => {
  it('setProperty', (done) => {
    const mc = helpers.mc();

    mc.world.setProperty(mcpi.WorldSettings.WorldImmutable, true)
      .then(() => mc.world.setProperty(mcpi.WorldSettings.WorldImmutable, false))
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
