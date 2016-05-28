'use strict';

const helpers = require('../utils/helpers');
const mcpi = require('../../src/');

describe('Set blocks', () => {
  it('setBlock', (done) => {
    const mc = helpers.mc();
    
    helpers.clearArea(mc, 0, 0, 0, 10)
      .then(() => mc.setBlock(0, 0, 0, mcpi.Blocks.SANDSTONE))
      .then(() => mc.getBlockWithData(0, 0, 0))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
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

    helpers.clearArea(mc, 0, 0, 0, 10)
      .then(() => mc.setBlock(10, 0, 0, mcpi.Blocks.SANDSTONE, mcpi.DataValues.Sandstone.Chiseled))
      .then(() => mc.getBlockWithData(10, 0, 0))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
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

    helpers.clearArea(mc, 0, 0, 0, 10)
      .then(() => mc.setBlocks(0, 0, 0, 10, 0+10, 10, mcpi.Blocks.SANDSTONE))
      .then(() => mc.getBlockWithData(0, 0, 0))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
      })
      .then(() => mc.getBlockWithData(10, 0+10, 10))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
      })
      .then(() => mc.getBlockWithData(5, 0+5, 5))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Normal);
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

    helpers.clearArea(mc, 0, 0, 0, 10)
      .then(() => mc.setBlocks(0, 0, 0, 10, 0+10, 10, mcpi.Blocks.SANDSTONE, mcpi.DataValues.Sandstone.Chiseled))
      .then(() => mc.getBlockWithData(0, 0, 0))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.getBlockWithData(10, 0+10, 10))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.getBlockWithData(5, 0+5, 5))
      .then(blockData => {
        expect(blockData).not.toBeNull();
        expect(blockData.id).toEqual(mcpi.Blocks.SANDSTONE);
        expect(blockData.data).toEqual(mcpi.DataValues.Sandstone.Chiseled);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
