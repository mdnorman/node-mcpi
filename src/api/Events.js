'use strict';

const assert = require('assert');

class Events {
  /**
   * Constructs a new Events object.
   *
   * @param {Minecraft} mc the Minecraft connection
   */
  constructor(mc) {
    assert(mc, 'mc is require');

    this.mc = mc;
  }
}

module.exports = Events;
