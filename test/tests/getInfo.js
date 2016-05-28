const mcpi = require('../../src/');
const helpers = require('../utils/helpers');

describe('Get info', () => {
  it('getHeight', (done) => {
    const mc = helpers.mc();

    helpers.clearArea(mc, 0, 100, 0, 10)
      .then(() => mc.world.setBlock(0, 105, 0, mcpi.Blocks.STONE))
      .then(() => mc.world.getHeight(0, 0))
      .then(height => {
        expect(height).not.toBeNull();
        expect(height).toEqual(106);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('getPlayerIds', (done) => {
    const mc = helpers.mc();

    mc.world.getPlayerIds()
      .then(playerIds => {
        expect(playerIds).not.toBeNull();
        expect(playerIds.length).toBeGreaterThan(0);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
