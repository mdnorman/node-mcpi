'use strict';

const helpers = require('../utils/helpers');
const mcpi = require('../../src/');

describe('Player', () => {
  it('getTilePos', (done) => {
    const mc = helpers.mc();

    mc.getTilePos()
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).not.toBeNull();
        expect(pos.y).not.toBeNull();
        expect(pos.z).not.toBeNull();
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('setTilePos', (done) => {
    const mc = helpers.mc();

    helpers.clearArea(mc, 0, 0, 0, 5)
      .then(() => mc.setBlocks(-5, 0-1, -5, 5, 0-1, 5, mcpi.Blocks.STONE))
      .then(() => mc.setTilePos(0, 0, 0))
      .then(() => mc.getTilePos())
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(0);
        expect(pos.z).toEqual(0);
      })
      .then(() => mc.setTilePos(2, 0, 2))
      .then(() => mc.getTilePos())
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).toEqual(2);
        expect(pos.y).toEqual(0);
        expect(pos.z).toEqual(2);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('getPos', (done) => {
    const mc = helpers.mc();

    mc.getPos()
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).not.toBeNull();
        expect(pos.y).not.toBeNull();
        expect(pos.z).not.toBeNull();
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('setPos', (done) => {
    const mc = helpers.mc();

    helpers.clearArea(mc, 0, 0, 0, 5)
      .then(() => mc.setBlocks(-5, 0-1, -5, 5, 0-1, 5, mcpi.Blocks.STONE))
      .then(() => mc.setPos(0, 0, 0))
      .then(() => mc.getPos())
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(0);
        expect(pos.z).toEqual(0);
      })
      .then(() => mc.setPos(2.5, 0, 2.5))
      .then(() => mc.getPos())
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).toEqual(2.5);
        expect(pos.y).toEqual(0);
        expect(pos.z).toEqual(2.5);
      })
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });

  it('setPlayerSetting', (done) => {
    const mc = helpers.mc();

    mc.setPlayerSetting(mcpi.PlayerSettings.AutoJump, true)
      .then(() => mc.setPlayerSetting(mcpi.PlayerSettings.AutoJump, false))
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
