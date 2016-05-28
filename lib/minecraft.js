'use strict';

const net = require('net');
const os = require('os');

const Blocks = require('./blocks');
const Colors = require('./colors');
const DataValues = require('./dataValues');

const Connection = require('./server/Connection');

class MinecraftClass {
  /**
   * Constructs a new Minecraft object.
   *
   * @param {string} host the host
   * @param {number} port the port
   */
  constructor(host, port) {
    this.host = host;
    this.port = port;

    // When a new `Minecraft` is created, it connects to the port and host given.
    this.connection = new Connection(host, port);
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
    return this.connection.writeAndRead(command + '\n');
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
    return this.sendReceive(`world.getBlock(${x},${y},${z})`).then(data => {
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
    return this.sendReceive(`world.getBlockWithData(${x},${y},${z})`).then(data => {
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
   * @param {number} x2 x end
   * @param {number} y2 y end
   * @param {number} z2 z end
   * @param {number} id block ID
   * @param {number} [data] block data (optional)
   *
   * @returns {Promise}
   */
  setBlocks(x1, y1, z1, x2, y2, z2, id, data) {
    if (data) {
      return this.send(`world.setBlocks(${x1},${y1},${z1},${x2},${y2},${z2},${id},${data})`);
    } else {
      return this.send(`world.setBlocks(${x1},${y1},${z1},${x2},${y2},${z2},${id})`);
    }
  };
}

// ## Constructor
function Minecraft(host, port) {
  const self = this;

  return new Promise(function (resolve, reject) {
    try {
      const rejectOnError = err => {
        reject(err);
      };

      self.connection = net.connect({port: port, host: host}, function () {
        // When a new `Minecraft` is created, it connects to the port and host given.
        self.connection.removeListener('error', rejectOnError);
        resolve(self);
      });

      self.connection.on('error', function (err) {
        console.error('Connection error:', err);
      });

      self.connection.on('error', rejectOnError);

      self.connection.on('data', function (data) {
        console.log(`Got data: ${data}`);
      });

      self.connection.on('end', function () {
        console.log('Server disconnected.');
        self.connection = null;
      });
    } catch (e) {
      reject(e);
    }
  });
};

// If you're wanting to write your own API, make sure that your commands written end with a new line! Without it, the commands will not work.
Minecraft.prototype.send = function (command) {
  const self = this;

  return new Promise(function (resolve, reject) {
    self.connection.write(command + '\n');
    resolve();
  });
};

Minecraft.prototype.sendReceive = function (command) {
  const self = this;

  var promise = new Promise(function (resolve, reject) {
    self.connection.write(command + '\n');
    self.connection.on('data', function (data) {
      resolve(data.toString());
    });
  });

  return promise;
};

Minecraft.prototype.end = function () {
  this.connection.destroy();
};

// ## Commands

// ### World Commands
// `client.getHeight(x, z)` -- Returns the Y coordinate of the last block that isn't solid from the top-down in the coordinate pair.
Minecraft.prototype.getHeight = function (x, z) {
  return this.sendReceive('world.getHeight(' + x + ',' + z + ')');
};

// `client.saveCheckpoint()` -- Saves a checkpoint that can be used to restore the world.
Minecraft.prototype.saveCheckpoint = function () {
  return this.send('world.checkpoint.save()');
};

// `client.restoreCheckpoint()` -- Restores to the last checkpoint.
Minecraft.prototype.restoreCheckpoint = function () {
  return this.send('world.checkpoint.restore()');
};

// `client.worldSetting(key, value)` -- Sets a world property.
//
// Values are boolean, 0 or 1. The current two keys are:
//
// * `world_immutable`
// * `nametags_visible`
Minecraft.prototype.worldSetting = function (key, value) {
  return this.send('world.setting(' + key + ',' + value + ')');
};

// `client.getPlayerIds()` -- Returns the entity IDs of the players online.
Minecraft.prototype.getPlayerIds = function () {
  return this.sendReceive('world.getPlayerIds()');
};

// `client.chat(message)` -- Displays a message in the chat.
Minecraft.prototype.chat = function (message) {
  return this.send('chat.post(' + message + ')');
};

// ### Camera Commands
// `client.setCameraMode(mode)` -- Sets the player's camera mode. Accepts `normal`, `thirdPerson` and `fixed`.
Minecraft.prototype.setCameraMode = function (mode) {
  const self = this;
  switch (mode) {
    case 'normal':
      return self.send('camera.mode.setNormal()');
      break;
    case 'thirdPerson':
      return self.send('camera.mode.setThirdPerson()');
      break;
    case 'fixed':
      return self.send('camera.mode.setFixed()');
      break;
  }
};

// `client.setCameraPosition(x, y, z)` -- Sets the camera's position at the selected coordinates.
Minecraft.prototype.setCameraPosition = function (x, y, z) {
  return this.send('camera.mode.setPos(' + x + ',' + y + ',' + z + ')');
};

// ### Player commands
// `client.getTile()` -- Gets the player's coordinates to the nearest block.
Minecraft.prototype.getTile = function () {
  return this.sendReceive('player.getTile()');
};

// `client.setTile(x, y, z)`-- Sets the player's coordinates to the specified block.
Minecraft.prototype.setTile = function (x, y, z) {
  return this.send('player.setTile(' + x + ',' + y + ',' + z + ')');
};

// `client.getPos()` -- Gets the precise position of the player.
Minecraft.prototype.getPos = function () {
  return this.sendReceive('player.getPos()');
};

// `client.setPos(x, y, z)` -- Sets the position of the player precisely.
Minecraft.prototype.setPos = function (x, y, z) {
  return this.send('player.setPos(' + x + ',' + y + ',' + z + ')');
};

// `client.playerSetting(key, value)` -- Sets a player property.
//
// Values are boolean, 0 or 1. The current key available is:
//
// * `autojump`
Minecraft.prototype.playerSetting = function (key, value) {
  return this.send('player.setting(' + key + ',' + value + ')');
};

// ### Event commands
// These are in need of proper documentation. If you know about these, please send a pull request! :-)
Minecraft.prototype.eventsBlockHits = function () {
  return this.sendReceive('events.block.hits()');
};

Minecraft.prototype.eventsClear = function () {
  return this.send('events.clear()');
};

// ## Exports
module.exports = {
  Minecraft: MinecraftClass,
  Blocks,
  Colors,
  DataValues,
};
