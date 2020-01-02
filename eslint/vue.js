'use strict';

const tsParserOptions = {
   // this parser will be used for script tags
   parser: '@typescript-eslint/parser',
   // Disable warning banner for possibly incompatible versions of TypeScript
   loggerFn: false,
};


module.exports = {
   extends: [ 'plugin:vue/recommended', '@vue/typescript', './node.js' ],
   parserOptions: tsParserOptions,
   rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/component-name-in-template-casing': 'off',

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
    * @typescript-eslint/parser, but since ts files will import vue files eslint is not
    * using the vue parser for the imported vue files. so we need to re-override it.
    */
   overrides: [
      {
         files: [ '*.ts' ],

         parser: 'vue-eslint-parser',
         parserOptions: tsParserOptions,
      },
   ],
};
