'use strict';

const helpers = require('../utils/helpers');

describe('Chat', () => {
  it('hello', (done) => {
    helpers.connect()
      .then(mc => {
        return mc.send('hello')
          .then(() => {
            mc.end();
          })
          .catch(err => {
            mc.end();
            done.fail(err);
          });
      })
      .then(() => {
        done();
      })
      .catch(err => {
        done.fail(err);
      });
  });
});
