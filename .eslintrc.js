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
    strict: [ 2, "global" ],
    
    'max-len': [2, 200, 2, {
      'ignoreUrls': true,
      'ignoreComments': false
    }],
  },
};
