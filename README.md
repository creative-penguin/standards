# Code Standard Configs for Creative Penguin Repos

This package contains all configuration files for the various
code standard tools that we use in Creative Penguin repos. Currently,
the included configs are: ESLint, Commitizen, and Commitlint.

## Installation

```bash
npm i -ED @creativepenguin/standards
```

## Usage

### ESLint

Add a `.eslintrc.js` file to the project root with the following contents.

```javascript
'use strict';

module.exports = {
   // Currently ESLint requires shared config packages to be prefixed with `eslint-config`
   // to be resolved. Since we re using a shared config in a standards mono-repo, we have
   // to use the full relative file path.
   extends: [ './node_modules/@creativepenguin/standards/eslint/index.js' ],
   rules: {
      'new-cap': 'off',
   },
   globals: {
      CONFIG: true,
   },
};
```

There are 3 config options for ESLint available:
   * `./node_modules/@creativepenguin/standards/eslint/index.js`
      * Base configuration for JavaScript and TypeScript
      * These rules are inherrited by all other configs
   * `./node_modules/@creativepenguin/standards/eslint/node.js`
      * Additional environment for Node.js
   * `./node_modules/@creativepenguin/standards/eslint/vue.js`
      * Additional Vue specific rules and plugins

## Commitlint

Add a `commitlint.config.js` file to the root of the project with the following contents.

```javascript
module.exports = {
   extends: [ '@creativepenguin/standards/commitlint' ],
};
```

## Commitizen

Like ESLint, you must use the relative path to the config instead of node module resolution.

Add the following to `package.json`

```json
"config": {
  "commitizen": {
    "path": "./node_modules/@creativepenguin/standards/commitizen.js"
  }
}
```

## Husky

All Creative Penguin repos should also use Husky to ensure coding standards before commit.

Install Husky:

```bash
npm i -ED husky
```

In 'package.json', add:

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```
