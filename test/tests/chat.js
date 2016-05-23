'use strict';

const helpers = require('../utils/helpers');

describe('Chat', () => {
  it('hello', (done) => {
    const mc = helpers.mc();
    mc.send('hello')
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
