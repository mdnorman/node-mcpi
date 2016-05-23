'use strict';

const helpers = require('../utils/helpers');

const Minecraft = require('../../lib/minecraft.js');

describe('Connection', () => {
  it('success', (done) => {
    const mc = helpers.mc();
    mc.send('hello')
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('error', (done) => {
    const mc = new Minecraft(helpers.minecraftServerName, helpers.minecraftServerPort+1);
    mc.send('hello')
      .then(mc => {
        mc.close();
        done.fail(new Error('connection should have failed'));
      })
      .catch(err => {
        expect(err).not.toBeNull();
        done();
      });
  });
});
