# Changelog

All notable changes to this project are documented in this file.

## [2.0.3](https://github.com/robertosousa1/replace-special-characters/compare/v2.0.2...v2.0.3) (2026-11-16)


### Bug Fixes

* map the missing case forms of ð, Ɇ, Ƕ, and Ↄ ([#30](https://github.com/robertosousa1/replace-special-characters/issues/30)) ([0e4f954](https://github.com/robertosousa1/replace-special-characters/commit/0e4f9544fa9d27478f2d407f517ba39f38329cc7))
* remove combining marks left after recognized letters ([#31](https://github.com/robertosousa1/replace-special-characters/issues/31)) ([a88c617](https://github.com/robertosousa1/replace-special-characters/commit/a88c617522a7468be836b32f2cceee1c03aeb3b9))

## [2.0.2](https://github.com/robertosousa1/replace-special-characters/compare/v2.0.1...v2.0.2) (2026-11-16)


### Bug Fixes

* map long s (ſ) to s instead of l ([#24](https://github.com/robertosousa1/replace-special-characters/issues/24)) ([194e337](https://github.com/robertosousa1/replace-special-characters/commit/194e3371f63df598d49be08fa5fdf99dbfec5296))

## [2.0.1](https://github.com/robertosousa1/replace-special-characters/compare/v2.0.0...v2.0.1) (2026-07-29)


### Bug Fixes

* publish refreshed package documentation ([#17](https://github.com/robertosousa1/replace-special-characters/issues/17)) ([401ea25](https://github.com/robertosousa1/replace-special-characters/commit/401ea2583fc0d230a23b8afb44fa749dea68fc52))

## 2.0.0 - 2026-07-29

### Breaking changes

- Package entry points are now defined through `exports`. Consumers must import the package root instead of internal files.
- Truthy non-string inputs now throw a descriptive `TypeError`.

### Added

- TypeScript declarations for `string`, `null`, `undefined`, and their union.
- Selective normalization for decomposed Latin characters with common combining marks.
- Support for supplementary mathematical Latin letters represented by UTF-16 surrogate pairs.
- Mappings for thorn (`Þ`/`þ`), eng (`Ŋ`/`ŋ`), and kra (`ĸ`).
- Runtime compatibility checks for supported Node.js versions.
- `llms.txt` with concise usage guidance for coding agents.

### Changed

- The character map is created once when the module loads.
- Published files are restricted to the runtime, declarations, documentation, and license.
- Tests now use Vitest and enforce 100% coverage.
- Linting and formatting now use Biome.
- Releases and changelog updates are automated with Release Please.
- npm publishing uses trusted publishing with provenance.

### Security

- Removed vulnerable and deprecated development dependencies.
- The npm dependency audit reports zero known vulnerabilities.

## 1.2.7 - 2022-10-17

- Last version published before the 2.0 modernization.
