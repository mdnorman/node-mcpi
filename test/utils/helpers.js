'use strict';

const mcpi = require('../../src/');

const Minecraft = mcpi.Minecraft;

const minecraftServerName = 'localhost';
const minecraftServerPort = 4711;

const mc = () => new Minecraft(minecraftServerName, minecraftServerPort);

const clearArea = (mc, x, y, z, distance) => 
  mc.world.setBlocks(x - distance, y - distance, z - distance, x + distance, y + distance, z + distance, mcpi.Blocks.AIR);

module.exports = {
  mc,
  clearArea,
  minecraftServerName,
  minecraftServerPort,
};
