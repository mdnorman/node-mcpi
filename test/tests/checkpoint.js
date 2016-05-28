'use strict';

const helpers = require('../utils/helpers');

describe('Checkpoint', () => {
  it('saveCheckpoint', (done) => {
    const mc = helpers.mc();
    mc.saveCheckpoint()
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('restoreCheckpoint', (done) => {
    const mc = helpers.mc();
    mc.saveCheckpoint()
      .then(() => mc.restoreCheckpoint())
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
