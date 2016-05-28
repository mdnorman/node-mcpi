'use strict';

const assert = require('assert');

class World {
  /**
   * Constructs a new World object.
   *
   * @param {Minecraft} mc the Minecraft connection
   */
  constructor(mc) {
    assert(mc, 'mc is require');

    this.mc = mc;
  }
}

module.exports = World;
