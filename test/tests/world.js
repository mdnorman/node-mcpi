'use strict';

const mcpi = require('../../lib/minecraft.js');
const helpers = require('../utils/helpers');

describe('World', () => {
  it('getWorldSetting', (done) => {
    const mc = helpers.mc();

    mc.setWorldSetting('world_immutable', true)
      .then(() => mc.setWorldSetting('world_immutable', false))
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
