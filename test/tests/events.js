const helpers = require('../utils/helpers');

describe('Events', () => {
  it('blockHits', (done) => {
    const mc = helpers.mc();

    mc.events.blockHits()
      .then(data => { // eslint-disable-line no-unused-vars
        // not sure what to do with this
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('clear', (done) => {
    const mc = helpers.mc();

    mc.events.clear()
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
