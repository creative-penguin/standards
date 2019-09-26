'use strict';

module.exports = {
   extends: [ '@silvermine' ],
   rules: {
      // Throws false positives for decorators in TypeScript
      'new-cap': 'off',
   },
};
