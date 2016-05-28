'use strict';

const net = require('net');

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
  constructor (host, port) {
    this._callbacks = [];

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
    const self = this;
    return this._promise.then(socket => {
      return new Promise((resolve, reject) => {
        self._pushPromiseCallback(resolve, reject);
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
    const self = this;
    return this._promise.then(socket => {
      return new Promise((resolve, reject) => {
        self._pushPromiseCallback(resolve, reject);
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
    const self = this;
    socket.on('error', function (err) {
      console.error('Socket error:', err);

      const callback = self._callbacks.shift();
      if (callback) {
        callback(err);
      }
    });

    socket.on('data', function (data) {
      console.log(`Got data: ${data}`);

      const callback = self._callbacks.shift();
      if (callback) {
        callback(null, data);
      }
    });

    socket.on('end', function () {
      console.log('Server disconnected.');
    });
  };



  close() {
    return this._promise.then(socket => {
      socket.end();
    });
  }
}

module.exports = Connection;
