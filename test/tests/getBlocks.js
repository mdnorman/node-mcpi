'use strict';

const helpers = require('../utils/helpers');

describe('Get blocks', () => {
  it('getBlockWithData', (done) => {
    helpers.connect()
      .then(mc => {
        return mc.getBlockWithData(99999, 99999, 99999)
          .then(receivedData => {
            expect(receivedData).not.toBeNull();
            expect(receivedData).toEqual('0,0\n');
            mc.end();
            done();
          })
          .catch(err => {
            mc.end();
            done.fail(err);
          });
      })
      .catch(err => {
        done.fail(err);
      });
  });
});
