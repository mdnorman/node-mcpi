'use strict';

const helpers = require('../utils/helpers');

describe('World', () => {
  it('hello', (done) => {
    const mc = helpers.mc();
    mc.chat.post('hello')
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
