const helpers = require('../utils/helpers');
const mcpi = require('../../src/');

describe('Player', () => {
  it('getTilePos', (done) => {
    const mc = helpers.mc();

    mc.player.getTilePos()
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
      .then(() => mc.world.setBlocks(-5, -1, -5, 5, -1, 5, mcpi.Blocks.STONE))
      .then(() => mc.player.setTilePos(0, 0, 0))
      .then(() => mc.player.getTilePos())
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(0);
        expect(pos.z).toEqual(0);
      })
      .then(() => mc.player.setTilePos(2, 0, 2))
      .then(() => mc.player.getTilePos())
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

    mc.player.getPos()
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
      .then(() => mc.world.setBlocks(-5, -1, -5, 5, -1, 5, mcpi.Blocks.STONE))
      .then(() => mc.player.setPos(0, 0, 0))
      .then(() => mc.player.getPos())
      .then(pos => {
        expect(pos).not.toBeNull();
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(0);
        expect(pos.z).toEqual(0);
      })
      .then(() => mc.player.setPos(2.5, 0, 2.5))
      .then(() => mc.player.getPos())
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

  it('set', (done) => {
    const mc = helpers.mc();

    mc.player.setProperty(mcpi.PlayerSettings.AutoJump, true)
      .then(() => mc.player.setProperty(mcpi.PlayerSettings.AutoJump, false))
      .then(() => mc.close())
      .then(done)
      .catch(err => {
        mc.close();
        done.fail(err);
      });
  });
});
