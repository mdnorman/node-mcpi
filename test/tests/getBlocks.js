'use strict';

const helpers = require('../utils/helpers');

describe('Get blocks', () => {
  it('getBlockWithData', (done) => {
    const mc = helpers.mc();

    mc.getBlockWithData(99999, 99999, 99999)
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.blockId).toEqual(0);
        expect(receivedData.dataValue).toEqual(0);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
