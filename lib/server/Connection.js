'use strict';

const net = require('net');

const createRejectOnError = reject => err => {
  reject(err);
};

const setupSocket = socket => {
  socket.on('error', function (err) {
    console.error('Socket error:', err);
  });

  socket.on('data', function (data) {
    console.log(`Got data: ${data}`);
  });

  socket.on('end', function () {
    console.log('Server disconnected.');
  });
};

const createAndAddRejectOnErrorToSocket = (socket, reject) => {
  const rejectOnError = createRejectOnError(reject);
  socket.once('error', rejectOnError);
  return rejectOnError;
};

const removeRejectOnErrorFromSocket = (socket, rejectOnError) => {
  socket.removeListener('error', rejectOnError);
};

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
    this.host = host;
    this.port = port;
    
    this.promise = new Promise((resolve, reject) => {
      const rejectOnError = createRejectOnError(reject);

      const socket = net.connect({port: port, host: host}, () => {
        socket.removeListener('error', rejectOnError);
        resolve(socket);
      });

      setupSocket(socket);

      socket.on('error', rejectOnError);
    });
  }

  write(data) {
    return this.promise.then(socket => {
      return new Promise((resolve, reject) => {
        const rejectOnError = createAndAddRejectOnErrorToSocket(socket, reject);
        socket.write(data);
        removeRejectOnErrorFromSocket(socket, rejectOnError);
        resolve();
      });
    });
  }

  writeAndRead(data) {
    return this.promise.then(socket => {
      return new Promise((resolve, reject) => {
        const rejectOnError = createAndAddRejectOnErrorToSocket(socket, reject);
        socket.write(data);
        socket.once('data', receivedData => {
          removeRejectOnErrorFromSocket(socket, rejectOnError);
          resolve(receivedData.toString());
        });
      });
    })
  }

  close() {
    return this.promise.then(socket => {
      socket.end();
    });
  }
}

module.exports = Connection;
