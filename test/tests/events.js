'use strict';

const mcpi = require('../../src/');
const helpers = require('../utils/helpers');

describe('Events', () => {
  it('eventsBlocksHits', (done) => {
    const mc = helpers.mc();

    mc.eventsBlockHits()
      .then(data => {
        console.log('eventsBlockHits data:', data);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('eventsClear', (done) => {
    const mc = helpers.mc();

    mc.eventsClear()
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
