'use strict';

const mcpi = require('../../lib/minecraft.js');
const helpers = require('../utils/helpers');

describe('Get info', () => {
  it('getHeight', (done) => {
    const mc = helpers.mc();

    helpers.clearArea(0, helpers.defaultHeight, 0, 10)
      .then(() => mc.setBlock(0, helpers.defaultHeight + 5, 0, mcpi.Blocks.STONE))
      .then(() => mc.getHeight(0, 0))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData).toEqual(helpers.defaultHeight + 6);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
