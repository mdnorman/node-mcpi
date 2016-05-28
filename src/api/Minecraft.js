'use strict';

const assert = require('assert');

const Connection = require('../server/Connection');

const Camera = require('./Camera');
const Chat = require('./Chat');
const Events = require('./Events');
const Player = require('./Player');
const World = require('./World');

class Minecraft {
  /**
   * Constructs a new Minecraft object.
   *
   * @param {string} host the host
   * @param {number} port the port
   */
  constructor(host, port) {
    assert(host, 'host is required');
    assert(port, 'port is required');

    this.host = host;
    this.port = port;

    // When a new `Minecraft` is created, it connects to the port and host given.
    this.connection = new Connection(host, port);
  }

  get camera() {
    if (!this._camera) {
      this._camera = new Camera(this);
    }
    return this._camera;
  }

  get chat() {
    if (!this._chat) {
      this._chat = new Chat(this);
    }
    return this._chat;
  }

  get events() {
    if (!this._events) {
      this._events = new Events(this);
    }
    return this._events;
  }

  get player() {
    if (!this._player) {
      this._player = new Player(this);
    }
    return this._player;
  }

  get world() {
    if (!this._world) {
      this._world = new World(this);
    }
    return this._world;
  }

  // low-level
  /**
   * Sends a message to the Minecraft server.
   *
   * @param {string} command the command to send
   *
   * @return {Promise} promise indicating when the message is written
   */
  send(command) {
    assert(command, 'command is required');

    // If you're wanting to write your own API, this makes sure commands are written end with a new line.
    // Without it, the commands will not work!
    return this.connection.write(command + '\n');
  }

  /**
   * Sends a command to the Minecraft server.
   *
   * @param {string} command the command to send
   *
   * @return {Promise<string>} promise with the response from the server
   */
  sendReceive(command) {
    assert(command, 'command is required');
    return this.connection.writeAndRead(command + '\n')
      .then(data => {
        if (data == 'Fail\n') {
          throw Error(`Got Fail response for command: ${command}`);
        }

        return data;
      });
  }

  /**
   * Close the connection to the Minecraft server.
   *
   * @returns {Promise} promise indicating when the connection is closed.
   */
  close() {
    return this.connection.close();
  }

  // commands
  /**
   * Returns the block ID and data at the selected coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   *
   * @returns {Promise.<number>} a promise with block ID
   */
  getBlock(x, y, z) {
    assert(x !== undefined && x !== null, 'x is required');
    assert(y !== undefined && y !== null, 'y is required');
    assert(z !== undefined && z !== null, 'z is required');

    return this.sendReceive(`world.getBlock(${x},${y},${z})`)
      .then(data => {
        return Number(data);
      });
  };

  /**
   * Returns the block ID and data at the selected coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   *
   * @returns {Promise.<{blockId,dataValue}>} a promise with data in the form <code>{blockId,dataValue}</code>
   */
  getBlockWithData(x, y, z) {
    assert(x !== undefined && x !== null, 'x is required');
    assert(y !== undefined && y !== null, 'y is required');
    assert(z !== undefined && z !== null, 'z is required');

    return this.sendReceive(`world.getBlockWithData(${x},${y},${z})`)
      .then(data => {
        const parts = data.split(',');
        return {
          id: Number(parts[0]),
          data: Number(parts[1])
        };
      });
  };

  /**
   * Places a block with the ID of `id` at the selected coordinates, plus data if it is appended.
   * You can use `mcpi.Blocks.BLOCK_NAME` instead of the actual ID.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} id block ID
   * @param {number} [data] block data (optional)
   *
   * @returns {Promise}
   */
  setBlock(x, y, z, id, data) {
    assert(x !== undefined && x !== null, 'x is required');
    assert(y !== undefined && y !== null, 'y is required');
    assert(z !== undefined && z !== null, 'z is required');
    assert(id !== undefined && id !== null, 'id is required');

    if (data) {
      return this.send(`world.setBlock(${x},${y},${z},${id},${data})`);
    } else {
      return this.send(`world.setBlock(${x},${y},${z},${id})`);
    }
  };

  /**
   * Places a cuboid of blocks with the coordinate set using the specified id and data.
   * You can use `mcpi.Blocks.BLOCK_NAME` instead of the actual ID.
   *
   * @param {number} x1 x start
   * @param {number} y1 y start
   * @param {number} z1 z start
   * @param {number} x2 x end (inclusive)
   * @param {number} y2 y end (inclusive)
   * @param {number} z2 z end (inclusive)
   * @param {number} id block ID
   * @param {number} [data] block data (optional)
   *
   * @returns {Promise}
   */
  setBlocks(x1, y1, z1, x2, y2, z2, id, data) {
    assert(x1 !== undefined && x1 !== null, 'x1 is required');
    assert(y1 !== undefined && y1 !== null, 'y1 is required');
    assert(z1 !== undefined && z1 !== null, 'z1 is required');
    assert(x2 !== undefined && x2 !== null, 'x2 is required');
    assert(y2 !== undefined && y2 !== null, 'y2 is required');
    assert(z2 !== undefined && z2 !== null, 'z2 is required');
    assert(id !== undefined && id !== null, 'id is required');

    if (data) {
      return this.send(`world.setBlocks(${x1},${y1},${z1},${x2},${y2},${z2},${id},${data})`);
    } else {
      return this.send(`world.setBlocks(${x1},${y1},${z1},${x2},${y2},${z2},${id})`);
    }
  };

  /**
   * Returns the Y coordinate of the last block that isn't solid from the top-down in the coordinate pair.
   *
   * @param {number} x
   * @param {number} z
   *
   * @returns {Promise.<number>} a promise with block ID
   */
  getHeight(x, z) {
    assert(x !== undefined && x !== null, 'x is required');
    assert(z !== undefined && z !== null, 'z is required');

    return this.sendReceive(`world.getHeight(${x},${z})`)
      .then(data => {
        return Number(data);
      });
  };

  /**
   * Saves a checkpoint that can be used to restore the world.
   *
   * @return {Promise} promise indicating when save is requested
   */
  saveCheckpoint() {
    return this.send('world.checkpoint.save()');
  }

  /**
   * Restores to the last checkpoint.
   *
   * @return {Promise} promise indicating when save is requested
   */
  restoreCheckpoint() {
    return this.send('world.checkpoint.restore()');
  }

  // ### World Commands
  /**
   * Sets a world property.
   *
   * Values are boolean, 0 or 1.
   *
   * @param {WorldSettings} key
   * @param {*} value
   *
   * @returns {Promise}
   */
  setWorldSetting(key, value) {
    assert(key, 'key is required');
    return this.send(`world.setting(${key},${value})`);
  }

  /**
   * Returns the entity IDs of the players online.
   *
   * @returns {Promise.<Array<Number>>} array of player IDs
   */
  getPlayerIds() {
    return this.sendReceive('world.getPlayerIds()')
      .then(data => data.split(',').map(idValue => Number(idValue)));
  }

  // ### Camera Commands
  /**
   * Sets the player's camera mode.
   *
   * @param {CameraModes} cameraMode
   *
   * @returns {Promise}
   */
  setCameraMode(cameraMode) {
    assert(cameraMode, 'cameraMode is required');
    return this.send(`camera.mode.set${cameraMode}()`);
  }

  /**
   * Sets the camera's position at the selected coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   *
   * @returns {Promise}
   */
  setCameraPos(x, y, z) {
    assert(x !== undefined && x !== null, 'x is required');
    assert(y !== undefined && y !== null, 'y is required');
    assert(z !== undefined && z !== null, 'z is required');

    return this.send(`camera.mode.setPos(${x},${y},${z})`);
  }

  // ### Player commands
  /**
   * Gets the player's coordinates to the nearest block.
   *
   * @returns {Promise.<{x,y,z}>} returns players x,y,z coordinates
   */
  getTilePos() {
    return this.sendReceive('player.getTile()')
      .then(data => {
        const parts = data.split(',');
        return {
          x: Number(parts[0]),
          y: Number(parts[1]),
          z: Number(parts[2]),
        };
      });
  }

  /**
   * Sets the player's coordinates to the specified block.
   *
   * @param x
   * @param y
   * @param z
   *
   * @returns {Promise}
   */
  setTilePos(x, y, z) {
    assert(x !== undefined && x !== null, 'x is required');
    assert(y !== undefined && y !== null, 'y is required');
    assert(z !== undefined && z !== null, 'z is required');

    return this.send(`player.setTile(${x},${y},${z})`);
  }

  /**
   * Gets the precise position of the player.
   *
   * @returns {Promise.<{x,y,z}>} returns players x,y,z position
   */
  getPos() {
    return this.sendReceive('player.getPos()')
      .then(data => {
        const parts = data.split(',');
        return {
          x: Number(parts[0]),
          y: Number(parts[1]),
          z: Number(parts[2]),
        };
      });
  }

  /**
   * Sets the position of the player precisely.
   *
   * @param x
   * @param y
   * @param z
   *
   * @returns {Promise}
   */
  setPos(x, y, z) {
    assert(x !== undefined && x !== null, 'x is required');
    assert(y !== undefined && y !== null, 'y is required');
    assert(z !== undefined && z !== null, 'z is required');

    return this.send(`player.setPos(${x},${y},${z})`);
  }

  /**
   * Sets a player property.
   *
   * Values are boolean, 0 or 1.
   *
   * @param {PlayerSettings} key
   * @param {*} value
   *
   * @returns {Promise}
   */
  setPlayerSetting(key, value) {
    assert(key, 'key is required');
    return this.send(`player.setting(${key},${value}`);
  }

  // ### Event commands
  // These are in need of proper documentation. If you know about these, please send a pull request! :-)
  eventsBlockHits() {
    return this.sendReceive('events.block.hits()');
  }

  eventsClear() {
    return this.send('events.clear()');
  }
}

module.exports = Minecraft;
