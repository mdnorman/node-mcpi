'use strict';

const assert = require('assert');

class Camera {
  /**
   * Constructs a new Camera object.
   *
   * @param {Minecraft} mc the Minecraft connection
   */
  constructor(mc) {
    assert(mc, 'mc is require');
    
    this.mc = mc;
  }
}

module.exports = Camera;
