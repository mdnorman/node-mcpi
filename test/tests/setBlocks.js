'use strict';

const mcpi = require('../../lib/minecraft.js');
const helpers = require('../utils/helpers');

describe('Set blocks', () => {
  it('setBlock', (done) => {
    const mc = helpers.mc();
    
    mc.setBlock(0, 100, 0, mcpi.Blocks.SANDSTONE)
      .then(() => mc.getBlockWithData(0, 100, 0))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('setBlock with data', (done) => {
    const mc = helpers.mc();

    mc.setBlock(0, 100, 0, mcpi.Blocks.SANDSTONE, mcpi.DataValues.Sandstone.Chiseled)
      .then(() => mc.getBlockWithData(0, 100, 0))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
