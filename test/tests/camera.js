const helpers = require('../utils/helpers');
const mcpi = require('../../src/');

describe('Camera', () => {
  it('setMode', (done) => {
    const mc = helpers.mc();
    mc.camera.setMode(mcpi.CameraModes.ThirdPerson)
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('setPos', (done) => {
    const mc = helpers.mc();
    mc.camera.setMode(mcpi.CameraModes.ThirdPerson)
      .then(() => mc.camera.setPos(0, 0, 0))
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
