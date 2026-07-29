# replace-special-characters

[![Known Vulnerabilities](https://snyk.io/test/github/robertosousa1/replace-special-characters/badge.svg)](https://snyk.io/test/github/robertosousa1/replace-special-characters)
[![CI](https://github.com/robertosousa1/replace-special-characters/actions/workflows/ci.yml/badge.svg)](https://github.com/robertosousa1/replace-special-characters/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

Replace accented and special Latin characters with ASCII equivalents.

## When to use this package

Use this package when you need to convert accented and special Latin characters into predictable ASCII equivalents.

Good use cases:

- Normalizing names before search.
- Preparing strings for slugs.
- Comparing user input without accents.
- Cleaning optional text fields.
- Replacing Latin diacritics and ligatures.

Do not use this package when:

- You need full Unicode transliteration for every language.
- You need locale-aware normalization.
- You want to remove emoji or symbols.

## Install

```sh
npm install replace-special-characters
```

```sh
yarn add replace-special-characters
```

## Runtime compatibility

The published package supports Node.js 12 and newer and has no runtime dependencies. Development requires Node.js 22.12 or newer.

Compatibility with end-of-life Node.js releases is maintained for existing applications, but an actively supported Node.js LTS release is recommended for security.

## Usage

```js
const replaceSpecialCharacters = require('replace-special-characters')

replaceSpecialCharacters('JäváSçrîpt')
//=> 'JavaScript'
```

ES modules can import the CommonJS default export:

```js
import replaceSpecialCharacters from 'replace-special-characters'
```

## TypeScript

```ts
import replaceSpecialCharacters = require('replace-special-characters')

replaceSpecialCharacters('São Paulo')
//=> 'Sao Paulo'
```

## API

### replaceSpecialCharacters(value)

Returns a normalized string with known accented and special Latin characters replaced by their ASCII equivalents.

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
| `''` | `''` |
| `null` | `null` |
| `undefined` | `undefined` |
| `'JavaScript 🚀'` | `'JavaScript 🚀'` |

## Examples

```js
replaceSpecialCharacters('Æther Œuvre')
//=> 'AEther OEuvre'

replaceSpecialCharacters('Olá, São Paulo!')
//=> 'Ola, Sao Paulo!'

replaceSpecialCharacters('')
//=> ''

replaceSpecialCharacters(null)
//=> null
```

## Common recipes

### Normalize before search

```js
const query = replaceSpecialCharacters(userInput).toLowerCase()
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

## Notes

Recognized Latin characters followed by common combining marks are normalized before replacement when the runtime supports `String.prototype.normalize`. Characters outside the configured mappings are not normalized.

Mathematical Latin letters represented by supplementary Unicode code points are converted to their ASCII equivalents. Mathematical Greek letters, digits, and other supplementary symbols remain unchanged.

Characters without a known ASCII mapping are returned unchanged.

For backward compatibility, German sharp S keeps its historical single-character mapping: `ß` becomes `s` and `ẞ` becomes `S`.

Falsy non-string values previously accepted at runtime (`false`, `0`, and `NaN`) are returned unchanged for backward compatibility, but remain outside the TypeScript API. Other non-string values throw a `TypeError`.

```js
replaceSpecialCharacters('JavaScript 🚀')
//=> 'JavaScript 🚀'
```

## Contributing

Local development requires Node.js 22.12 or newer.

```bash
npm ci
npm run check
```

Fork the repository, create a branch, make your changes, and open a pull request. Please include tests for behavior changes and use a Conventional Commit title.

See [CONTRIBUTING.md](CONTRIBUTING.md) for commit conventions and [CHANGELOG.md](CHANGELOG.md) for release notes.

## License

MIT. See [LICENSE](LICENSE).
