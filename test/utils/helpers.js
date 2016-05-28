'use strict';

const mcpi = require('../../lib/minecraft.js');

const Minecraft = mcpi.Minecraft;

const minecraftServerName = 'localhost';
const minecraftServerPort = 4711;

const defaultHeight = 100;

const mc = () => new Minecraft(minecraftServerName, minecraftServerPort);

const clearArea = (x, y, z, distance) => {
  const _mc = mc();
  return _mc.setBlocks(x - distance, y - distance, z - distance, x + distance, y + distance, z + distance, mcpi.Blocks.AIR)
    .then(() => _mc.getBlock(x, y, z)) // get a block to wait for the current operation to finish
    .then(() => _mc.close())
};

module.exports = {
  mc,
  clearArea,
  minecraftServerName,
  minecraftServerPort,
  defaultHeight,
};
