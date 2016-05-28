'use strict';

const assert = require('assert');
const net = require('net');
const util = require('util');

const debuglog = util.debuglog('mcpi');

/**
 * A promisified connection to a server
 */
class Connection {
  /**
   * Creates a connection with the given host and port
   *
   * @param {string} host the host
   * @param {number} port the port
   */
  constructor(host, port) {
    assert(host, 'host is required');
    assert(port, 'port is required');

    this._callbacks = [];
    this._isClosed = false;

    const self = this;
    this._promise = new Promise((resolve, reject) => {
      self._callbacks.push((err, data) => {
        if (err) {
          reject(err);
        }

        // ignore data
      });

      const socket = net.connect({port: port, host: host}, () => {
        self._callbacks.shift();
        resolve(socket);
      });

      this._setupSocket(socket);
    });
  }

  write(data) {
    assert(data, 'data is required');
    assert(!this.closed, 'connection is closed');

    const self = this;
    return this._promise.then(socket => {
      return new Promise((resolve, reject) => {
        self._pushPromiseCallback(resolve, reject);
        debuglog('Writing data:', data);
        socket.write(data, err => {
          const callback = self._callbacks.shift();
          if (err) {
            callback(err);
            return;
          }
          resolve();
        });
      });
    });
  }

  writeAndRead(data) {
    assert(data, 'command is required');
    assert(!this.closed, 'connection is closed');

    const self = this;
    return this._promise.then(socket => {
      return new Promise((resolve, reject) => {
        self._pushPromiseCallback(resolve, reject);
        debuglog('Writing data for read:', data);
        socket.write(data, err => {
          const callback = self._callbacks[0];
          if (err) {
            callback(err);
          }
        });
      });
    })
  }

  _pushPromiseCallback(resolve, reject) {
    this._callbacks.push((err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data.toString());
    });
  }

  _setupSocket(socket) {
    assert(socket, 'socket is required');

    const self = this;
    socket.on('error', function (err) {
      debuglog('Socket error:', err);

      const callback = self._callbacks.shift();
      if (callback) {
        callback(err);
      }
    });

    socket.on('data', function (data) {
      debuglog(`Got data: ${data}`);

      const callback = self._callbacks.shift();
      if (callback) {
        callback(null, data);
      }
    });

    socket.on('end', function () {
      debuglog('Server disconnected.');
    });
  };

  get closed() {
    return this._isClosed;
  }

  close() {
    if (this.closed) {
      return Promise.resolve();
    }
    
    const self = this;
    return this._promise.then(socket => {
      self._isClosed = true;
      socket.end();
    });
  }
}

module.exports = Connection;
