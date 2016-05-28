'use strict';

const helpers = require('../utils/helpers');
const mcpi = require('../../src/');

describe('Camera', () => {
  it('setCameraMode', (done) => {
    const mc = helpers.mc();
    mc.setCameraMode(mcpi.CameraModes.ThirdPerson)
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('setCameraPos', (done) => {
    const mc = helpers.mc();
    mc.setCameraMode(mcpi.CameraModes.ThirdPerson)
      .then(() => mc.setCameraPos(0, 0, 0))
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
