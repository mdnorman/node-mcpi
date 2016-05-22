'use strict';

const helpers = require('../utils/helpers');

const Minecraft = require('../../lib/minecraft.js');

describe('Connection', () => {
  it('success', (done) => {
    helpers.connect()
      .then(mc => {
        expect(mc).not.toBeNull();
        return mc.send('hello')
          .then(() => {
            mc.end();
          })
          .catch(err => {
            mc.end();
            done.fail(err);
          });
      })
      .then(() => {
        done();
      })
      .catch(err => {
        done.fail(err);
      });
  });

  it('error', (done) => {
    new Minecraft(helpers.minecraftServerName, helpers.minecraftServerPort+1)
      .then(mc => {
        mc.end();
        done.fail(new Error('connection should have failed'));
      })
      .catch(err => {
        expect(err).not.toBeNull();
        done();
      });
  });
});
