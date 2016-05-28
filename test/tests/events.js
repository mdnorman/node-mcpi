'use strict';

const mcpi = require('../../src/');
const helpers = require('../utils/helpers');

describe('Events', () => {
  it('blockHits', (done) => {
    const mc = helpers.mc();

    mc.events.blockHits()
      .then(data => {
        console.log('blockHits data:', data);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('clear', (done) => {
    const mc = helpers.mc();

    mc.events.clear()
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
