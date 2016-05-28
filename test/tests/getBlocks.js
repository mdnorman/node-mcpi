'use strict';

const helpers = require('../utils/helpers');

describe('Get blocks', () => {
  it('getBlock', (done) => {
    const mc = helpers.mc();

    mc.getBlock(99999, 99999, 99999)
      .then(blockId => {
        expect(blockId).not.toBeNull();
        expect(blockId).toEqual(0);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('getBlockWithData', (done) => {
    const mc = helpers.mc();

    mc.getBlockWithData(99999, 99999, 99999)
      .then(block => {
        expect(block).not.toBeNull();
        expect(block.id).toEqual(0);
        expect(block.data).toEqual(0);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
