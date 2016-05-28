'use strict';

module.exports = {
  extends: 'airbnb',
  env: {
    node: true,
  },

  ecmaFeatures: {
    generators: true,
  },

  rules: {
    strict: [ 'error', 'global' ],
    
    'max-len': [ 'error', 200, 2, {
      'ignoreUrls': true,
      'ignoreComments': false,
    }],
  },
};
