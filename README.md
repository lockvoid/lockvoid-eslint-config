# eslint-config-lockvoid

This package provides LockVoid's `eslint.config.mjs` as an extensible shared config.

## Installation

```bash
npm install --save-dev eslint eslint-plugin-import @lockvoid/eslint-config
```

## Usage

Add the following to your `eslint.config.mjs`:

```js
import lockvoidConfig from "@lockvoid/eslint-config";

export default [
  lockvoidConfig,
]
```
