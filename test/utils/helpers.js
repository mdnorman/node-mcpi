const mcpi = require('../../src/');

const Minecraft = mcpi.Minecraft;

const minecraftServerName = 'localhost';
const minecraftServerPort = 4711;

const mc = () => new Minecraft(minecraftServerName, minecraftServerPort);

const clearArea = (_mc, x, y, z, distance) =>
  _mc.world.setBlocks(x - distance, y - distance, z - distance, x + distance, y + distance, z + distance, mcpi.Blocks.Air);

module.exports = {
  mc,
  clearArea,
  minecraftServerName,
  minecraftServerPort,
};
