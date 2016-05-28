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
}

module.exports = Minecraft;
