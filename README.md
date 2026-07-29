# replace-special-characters

[![npm version](https://img.shields.io/npm/v/replace-special-characters?logo=npm)](https://www.npmjs.com/package/replace-special-characters)
[![npm total downloads](https://img.shields.io/npm/dt/replace-special-characters?logo=npm&label=downloads%2Ftotal)](https://www.npmjs.com/package/replace-special-characters)
[![npm monthly downloads](https://img.shields.io/npm/dm/replace-special-characters?logo=npm&label=downloads%2Fmonth)](https://www.npmjs.com/package/replace-special-characters)
[![CI](https://github.com/robertosousa1/replace-special-characters/actions/workflows/ci.yml/badge.svg)](https://github.com/robertosousa1/replace-special-characters/actions/workflows/ci.yml)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

Remove accents and replace special Latin characters with plain ASCII equivalents.

```js
const replaceSpecialCharacters = require('replace-special-characters')

replaceSpecialCharacters('Olá, JäváSçrîpt!')
//=> 'Ola, JavaScript!'
```

- Zero runtime dependencies.
- TypeScript declarations included.
- Compatible with CommonJS and ES module imports.
- Supports Node.js 12 and newer.
- Handles accents, ligatures, decomposed characters, and mathematical Latin letters.
- Preserves emoji and symbols without a configured replacement.

## Install

```sh
npm install replace-special-characters
```

```sh
yarn add replace-special-characters
```

```sh
pnpm add replace-special-characters
```

## Usage

### CommonJS

```js
const replaceSpecialCharacters = require('replace-special-characters')

replaceSpecialCharacters('São Paulo')
//=> 'Sao Paulo'
```

### ES modules

```js
import replaceSpecialCharacters from 'replace-special-characters'

replaceSpecialCharacters('Æther Œuvre')
//=> 'AEther OEuvre'
```

### TypeScript

```ts
import replaceSpecialCharacters = require('replace-special-characters')

replaceSpecialCharacters('JäváSçrîpt')
//=> 'JavaScript'
```

## When to use this package

Use this package when you need predictable replacements for accented and special Latin characters.

Good use cases:

- Normalizing names before search.
- Preparing strings for slugs.
- Comparing user input without accents.
- Cleaning optional text fields.
- Replacing Latin diacritics and ligatures.

Choose a full transliteration library instead when you need:

- Transliteration for every language or writing system.
- Locale-aware normalization.
- Removal of emoji or arbitrary symbols.

## API

### replaceSpecialCharacters(value)

Returns a string with known accented and special Latin characters replaced by their ASCII equivalents.

#### value

Type: `string | null | undefined`

The text to normalize. `null`, `undefined`, and empty strings are returned unchanged.

## Behavior

| Input | Output |
| --- | --- |
| `'JäváSçrîpt'` | `'JavaScript'` |
| `'Olá'` | `'Ola'` |
| `'Cafe\u0301'` | `'Cafe'` |
| `'Æther Œuvre'` | `'AEther OEuvre'` |
| `'Þing Ŋŋ ĸ'` | `'THing Nn k'` |
| `'𝕽'` | `'R'` |
| `'JavaScript 🚀'` | `'JavaScript 🚀'` |
| `''` | `''` |
| `null` | `null` |
| `undefined` | `undefined` |

## Common recipes

### Normalize before search

```js
const normalizedQuery = replaceSpecialCharacters(userInput).toLowerCase()
```

### Create a basic slug

```js
const slug = replaceSpecialCharacters(title)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
```

## Why not only String.prototype.normalize?

`String.prototype.normalize('NFD')` decomposes many accented characters so their combining marks can be removed in a separate step. It does not cover every special Latin character handled by this package, such as ligatures and custom mappings like `Æ` to `AE` and `Œ` to `OE`.

This package combines selective Unicode normalization with an explicit character map. Unsupported characters remain unchanged instead of being removed.

## Compatibility

The published package supports Node.js 12 and newer and has no runtime dependencies. Development requires Node.js 22.12 or newer.

Compatibility with end-of-life Node.js releases is maintained for existing applications, but an actively supported Node.js LTS release is recommended for security.

Recognized Latin characters followed by common combining marks are normalized before replacement when the runtime supports `String.prototype.normalize`.

Mathematical Latin letters represented by supplementary Unicode code points are converted to their ASCII equivalents. Mathematical Greek letters, digits, and other supplementary symbols remain unchanged.

For backward compatibility:

- German sharp S keeps its historical single-character mapping: `ß` becomes `s` and `ẞ` becomes `S`.
- Falsy non-string values previously accepted at runtime (`false`, `0`, and `NaN`) are returned unchanged, but remain outside the TypeScript API.

Other non-string values throw a descriptive `TypeError`.

## Contributing

Local development requires Node.js 22.12 or newer.

```sh
npm ci
npm run check
```

Fork the repository, create a branch, make your changes, and open a pull request. Include tests for behavior changes and use a Conventional Commit title.

See [CONTRIBUTING.md](CONTRIBUTING.md) for commit conventions and [CHANGELOG.md](CHANGELOG.md) for release notes.

## License

MIT. See [LICENSE](LICENSE).
