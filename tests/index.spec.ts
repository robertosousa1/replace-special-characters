import { describe, expect, test } from 'vitest'

import replaceSpecialCharacters from '../src'
import diacritics from '../src/diacritics'

describe('replaceSpecialCharacters function', () => {
  test('Should accept a union of all supported input types', () => {
    const normalize = (
      value: string | null | undefined,
    ): string | null | undefined => replaceSpecialCharacters(value)

    expect(normalize('Olá')).toBe('Ola')
    expect(normalize(null)).toBeNull()
    expect(normalize(undefined)).toBeUndefined()
  })

  test('Should convert special characters to common characters', () => {
    const input = 'JäváSçrîpt'
    const output = 'JavaScript'

    expect(replaceSpecialCharacters(input)).toEqual(output)
  })

  test('Should keep common characters', () => {
    const input = 'JavaScript'
    const output = 'JavaScript'

    expect(replaceSpecialCharacters(input)).toEqual(output)
  })

  test('Should convert ligatures and multi-character mappings', () => {
    const input = 'Æther Œuvre'
    const output = 'AEther OEuvre'

    expect(replaceSpecialCharacters(input)).toEqual(output)
  })

  test('Should convert decomposed Unicode characters', () => {
    expect(replaceSpecialCharacters('Cafe\u0301 A\u030Angstro\u0308m')).toEqual(
      'Cafe Angstrom',
    )
  })

  test('Should not normalize characters outside the configured mappings', () => {
    expect(replaceSpecialCharacters('Ω K Å 豈 α\u0301')).toEqual('Ω K Å 豈 α\u0301')
  })

  test('Should work in runtimes without Unicode normalization', () => {
    const normalizeDescriptor = Object.getOwnPropertyDescriptor(String.prototype, 'normalize')

    if (normalizeDescriptor == null) {
      throw new Error('Expected String.prototype.normalize to exist in the test runtime')
    }

    Object.defineProperty(String.prototype, 'normalize', {
      configurable: true,
      value: undefined,
    })

    let output: string

    try {
      output = replaceSpecialCharacters('Café')
    } finally {
      Object.defineProperty(String.prototype, 'normalize', normalizeDescriptor)
    }

    expect(output).toEqual('Cafe')
  })

  test('Should convert thorn, eng, and kra characters', () => {
    expect(replaceSpecialCharacters('Þing þorn Ŋŋ ĸ')).toEqual('THing thorn Nn k')
  })

  test('Should convert supplementary mathematical Latin letters', () => {
    const mathematicalR = String.fromCharCode(55349, 56701)

    expect(mathematicalR).toEqual('𝕽')
    expect(replaceSpecialCharacters(mathematicalR)).toEqual('R')
    expect(replaceSpecialCharacters('𝐀 𝑩 𝕽 𝖅 𝐚 𝒃')).toEqual('A B R Z a b')
  })

  test('Should only convert mathematical characters that decompose to ASCII letters', () => {
    let convertedCharacters = 0

    for (let codePoint = 0x1d400; codePoint <= 0x1d7ff; codePoint += 1) {
      const character = String.fromCodePoint(codePoint)
      const normalizedCharacter = character.normalize('NFKD')
      const shouldConvert = /^[A-Za-z]$/.test(normalizedCharacter)

      expect(replaceSpecialCharacters(character)).toEqual(
        shouldConvert ? normalizedCharacter : character,
      )

      if (shouldConvert) {
        convertedCharacters += 1
      }
    }

    expect(convertedCharacters).toBeGreaterThan(0)
  })

  test('Should preserve mathematical Greek letters and digits', () => {
    expect(replaceSpecialCharacters('𝚨 𝛀 𝟘')).toEqual('𝚨 𝛀 𝟘')
  })

  test('Should preserve the historical sharp S mapping', () => {
    expect(replaceSpecialCharacters('straße ẞ')).toEqual('strase S')
  })

  test('Should keep empty strings unchanged', () => {
    expect(replaceSpecialCharacters('')).toEqual('')
  })

  test('Should keep null and undefined unchanged', () => {
    expect(replaceSpecialCharacters(null)).toEqual(null)
    expect(replaceSpecialCharacters(undefined)).toEqual(undefined)
  })

  test('Should preserve unsupported falsy values for backward compatibility', () => {
    const looselyTypedReplace = replaceSpecialCharacters as unknown as (value: unknown) => unknown

    expect(looselyTypedReplace(false)).toBe(false)
    expect(looselyTypedReplace(0)).toBe(0)
    expect(looselyTypedReplace(Number.NaN)).toBeNaN()
  })

  test.each([
    ['boolean', true],
    ['number', 1],
    ['object', {}],
    ['array', []],
    ['function', () => undefined],
    ['symbol', Symbol('value')],
  ])('Should reject truthy non-string %s values', (_type, value) => {
    const looselyTypedReplace = replaceSpecialCharacters as unknown as (input: unknown) => unknown

    expect(() => looselyTypedReplace(value)).toThrow(
      new TypeError('replaceSpecialCharacters expected a string, null, or undefined'),
    )
  })

  test('Should keep unmapped non-ASCII characters unchanged', () => {
    const input = 'JavaScript 🚀'

    expect(replaceSpecialCharacters(input)).toEqual(input)
  })

  test('Should keep every configured mapping unique and ASCII-only', () => {
    const mappedCharacters: string[] = []

    for (const { base, letters } of diacritics) {
      const characters = Array.from(letters)

      expect(Array.from(base).every((character) => character.charCodeAt(0) <= 0x7f)).toBe(true)
      expect(replaceSpecialCharacters(letters)).toEqual(base.repeat(characters.length))
      mappedCharacters.push(...characters)
    }

    expect(new Set(mappedCharacters).size).toEqual(mappedCharacters.length)
  })

  test('Should preserve every unmapped BMP character', () => {
    const mappedCharacters = new Map<string, string>()
    const unexpectedChanges: Array<{ actual: string, character: string, expected: string }> = []

    for (const { base, letters } of diacritics) {
      for (const character of letters) {
        mappedCharacters.set(character, base)
      }
    }

    for (let codePoint = 0; codePoint <= 0xffff; codePoint += 1) {
      const character = String.fromCharCode(codePoint)
      const expected = mappedCharacters.get(character) || character
      const actual = replaceSpecialCharacters(character)

      if (actual !== expected) {
        unexpectedChanges.push({ actual, character, expected })
      }
    }

    expect(unexpectedChanges).toEqual([])
  })
})
