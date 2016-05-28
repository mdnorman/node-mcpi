'use strict';

const mcpi = require('../../lib/minecraft.js');
const helpers = require('../utils/helpers');

describe('Get info', () => {
  it('getHeight', (done) => {
    const mc = helpers.mc();

    helpers.clearArea(0, helpers.defaultHeight, 0, 10)
      .then(() => mc.setBlock(0, helpers.defaultHeight + 5, 0, mcpi.Blocks.STONE))
      .then(() => mc.getHeight(0, 0))
      .then(height => {
        expect(height).not.toBeNull();
        expect(height).toEqual(helpers.defaultHeight + 6);
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

    mc.getPlayerIds()
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
