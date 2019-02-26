'use strict';

module.exports = {
   extends: [ '@silvermine/eslint-config' ],
   rules: {
      // Throws false positives for decorators in TypeScript
      'new-cap': 'off',
   },
};
