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

    mc.setBlock(10, 100, 0, mcpi.Blocks.SANDSTONE, mcpi.DataValues.Sandstone.Chiseled)
      .then(() => mc.getBlockWithData(10, 100, 0))
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

  it('setBlocks', (done) => {
    const mc = helpers.mc();

    mc.setBlocks(100, 100, 100, 110, 110, 110, mcpi.Blocks.SANDSTONE)
      .then(() => mc.getBlockWithData(100, 100, 100))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
      })
      .then(() => mc.getBlockWithData(110, 110, 110))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
      })
      .then(() => mc.getBlockWithData(105, 105, 105))
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

  it('setBlocks with data', (done) => {
    const mc = helpers.mc();

    mc.setBlocks(200, 100, 200, 210, 110, 210, mcpi.Blocks.SANDSTONE, mcpi.DataValues.Sandstone.Chiseled)
      .then(() => mc.getBlockWithData(200, 100, 200))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.getBlockWithData(210, 110, 210))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.getBlockWithData(205, 105, 205))
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
