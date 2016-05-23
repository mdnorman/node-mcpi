'use strict';

const Minecraft = require('../../lib/minecraft.js');

const minecraftServerName = 'localhost';
const minecraftServerPort = 4711;

const connect = () => new Minecraft(minecraftServerName, minecraftServerPort);

const mc = () => new Minecraft(minecraftServerName, minecraftServerPort);

module.exports = {
  connect,
  mc,
  minecraftServerName,
  minecraftServerPort,
};
