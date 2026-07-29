# Changelog

All notable changes to this project are documented in this file.

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
