const helpers = require('../utils/helpers');

describe('Checkpoint', () => {
  it('saveCheckpoint', (done) => {
    const mc = helpers.mc();
    mc.world.saveCheckpoint()
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('restoreCheckpoint', (done) => {
    const mc = helpers.mc();
    mc.world.saveCheckpoint()
      .then(() => mc.world.restoreCheckpoint())
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
