'use strict';

const helpers = require('../utils/helpers');

describe('Get blocks', () => {
  it('getBlock', (done) => {
    const mc = helpers.mc();

    mc.getBlock(99999, 99999, 99999)
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData).toEqual(0);
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
      .then(receivedData => {
        expect(receivedData).not.toBeNull();
        expect(receivedData.id).toEqual(0);
        expect(receivedData.data).toEqual(0);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
