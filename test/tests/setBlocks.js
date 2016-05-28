'use strict';

const mcpi = require('../../lib/minecraft.js');
const helpers = require('../utils/helpers');

describe('Set blocks', () => {
  it('setBlock', (done) => {
    const mc = helpers.mc();
    
    helpers.clearArea(0, helpers.defaultHeight, 0, 10)
      .then(() => mc.setBlock(0, helpers.defaultHeight, 0, mcpi.Blocks.SANDSTONE))
      .then(() => mc.getBlockWithData(0, helpers.defaultHeight, 0))
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

    helpers.clearArea(0, helpers.defaultHeight, 0, 10)
      .then(() => mc.setBlock(10, helpers.defaultHeight, 0, mcpi.Blocks.SANDSTONE, mcpi.DataValues.Sandstone.Chiseled))
      .then(() => mc.getBlockWithData(10, helpers.defaultHeight, 0))
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

    helpers.clearArea(0, helpers.defaultHeight, 0, 10)
      .then(() => mc.setBlocks(0, helpers.defaultHeight, 0, 10, helpers.defaultHeight+10, 10, mcpi.Blocks.SANDSTONE))
      .then(() => mc.getBlockWithData(0, helpers.defaultHeight, 0))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
      })
      .then(() => mc.getBlockWithData(10, helpers.defaultHeight+10, 10))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
      })
      .then(() => mc.getBlockWithData(5, helpers.defaultHeight+5, 5))
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

    helpers.clearArea(0, helpers.defaultHeight, 0, 10)
      .then(() => mc.setBlocks(0, helpers.defaultHeight, 0, 10, helpers.defaultHeight+10, 10, mcpi.Blocks.SANDSTONE, mcpi.DataValues.Sandstone.Chiseled))
      .then(() => mc.getBlockWithData(0, helpers.defaultHeight, 0))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.getBlockWithData(10, helpers.defaultHeight+10, 10))
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(receivedData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.getBlockWithData(5, helpers.defaultHeight+5, 5))
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
