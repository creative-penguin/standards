'use strict';

module.exports = {
   extends: [ 'plugin:vue/recommended', '@vue/typescript', './node.js' ],
   parserOptions: {
      // This parser will be used for script tags
      parser: '@typescript-eslint/parser',
   },
   rules: {
      'vue/html-closing-bracket-newline': [
         'error',
         {
            singleline: 'never',
            multiline: 'never',
         },
      ],
      'vue/max-attributes-per-line': [
         'error',
         {
            // This allows as many attributes as max-len allows for singleline tags
            singleline: 999,
            multiline: {
               max: 1,
               allowFirstLine: true,
            },
         },
      ],

      // The following emulate the @silvermine config in template tags
      'vue/brace-style': [ 'error', '1tbs' ],
      'vue/eqeqeq': 'error',
      'vue/array-bracket-spacing': [ 'error', 'always' ],
      'vue/arrow-spacing': [ 'error', { before: true, after: true } ],
      'vue/block-spacing': 'error',
      'vue/camelcase': 'error',
      'vue/key-spacing': 'error',
      'vue/match-component-file-name': [ 'error', { extensions: [ 'vue', 'ts' ] } ],
      'vue/no-boolean-default': 'off',
      'vue/object-curly-spacing': [ 'error', 'always' ],
      'vue/space-infix-ops': 'error',
      'vue/space-unary-ops': 'error',
      'vue/html-indent': [
         'error',
         3,
         {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
         },
      ],
   },

   /*
    * War of the parsers
    *
    * The @silvermine config sets an override for ts filse to use the
    * @typescript-eslint/parser, but since we ts files will import vue files eslint is not
    * using the vue parser for the imported vue files. so we need to re overide it.
    */
   overrides: [
      {
         files: [ '*.ts' ],

         parser: 'vue-eslint-parser',
         parserOptions: {
            // this parser will be used for script tags
            parser: '@typescript-eslint/parser',
         },
      },
   ],
};
