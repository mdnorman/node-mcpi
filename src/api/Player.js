'use strict';

const assert = require('assert');

class Player {
  /**
   * Constructs a new Player object.
   *
   * @param {Minecraft} mc the Minecraft connection
   */
  constructor(mc) {
    assert(mc, 'mc is require');

    this.mc = mc;
  }
}

module.exports = Player;
