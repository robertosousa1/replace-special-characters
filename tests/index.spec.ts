import { describe, expect, expectTypeOf, test } from 'vitest'

import replaceSpecialCharacters from '../src'
import diacritics from '../src/diacritics'

const mappedCharacters = new Map<string, string>()

for (const { base, letters } of diacritics) {
  for (const character of letters) {
    mappedCharacters.set(character, base)
  }
}

describe('replaceSpecialCharacters function', () => {
  test('Should accept a union of all supported input types', () => {
    const normalize = (
      value: string | null | undefined,
    ): string | null | undefined => replaceSpecialCharacters(value)

    expect(normalize('Olá')).toBe('Ola')
    expect(normalize(null)).toBeNull()
    expect(normalize(undefined)).toBeUndefined()
  })

  test('Should narrow the return type to the input type', () => {
    expectTypeOf(replaceSpecialCharacters('Olá')).toEqualTypeOf<string>()
    expectTypeOf(replaceSpecialCharacters(null)).toEqualTypeOf<null>()
    expectTypeOf(replaceSpecialCharacters(undefined)).toEqualTypeOf<undefined>()
    // @ts-expect-error Non-string values are outside the typed API.
    expectTypeOf(replaceSpecialCharacters).toBeCallableWith(1)
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

  test('Should convert letters with multiple combining marks in any order', () => {
    expect(replaceSpecialCharacters('Việt Việt')).toEqual('Viet Viet')
    expect(replaceSpecialCharacters('ấ ǘ')).toEqual('a u')
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

    let outputs: string[]

    try {
      outputs = ['Café', 'Café', '𝐀'].map((text) => replaceSpecialCharacters(text))
    } finally {
      Object.defineProperty(String.prototype, 'normalize', normalizeDescriptor)
    }

    // Precomposed letters are still mapped; decomposed and mathematical letters require normalize.
    expect(outputs).toEqual(['Cafe', 'Café', '𝐀'])
  })

  test('Should convert thorn, eng, and kra characters', () => {
    expect(replaceSpecialCharacters('Þing þorn Ŋŋ ĸ')).toEqual('THing thorn Nn k')
  })

  test.each([
    ['Polish', 'Łódź Wrocław', 'Lodz Wroclaw'],
    ['Vietnamese', 'Đà Nẵng đường', 'Da Nang duong'],
    ['Danish and Norwegian', 'Ørsted smørrebrød', 'Orsted smorrebrod'],
    ['Turkish', 'Işık', 'Isik'],
    ['Maltese', 'Ħamrun ħobż', 'Hamrun hobz'],
  ])('Should convert %s letters without a Unicode decomposition', (_language, input, output) => {
    expect(replaceSpecialCharacters(input)).toEqual(output)
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

  test('Should preserve supplementary letters outside the mathematical block', () => {
    const squaredA = '\u{1F130}'

    expect(squaredA.normalize('NFKD')).toEqual('A')
    expect(replaceSpecialCharacters(squaredA)).toEqual(squaredA)
  })

  test('Should preserve the historical sharp S mapping', () => {
    expect(replaceSpecialCharacters('straße ẞ')).toEqual('strase S')
  })

  test('Should convert long s to s', () => {
    expect(replaceSpecialCharacters('Congreſs')).toEqual('Congress')
    expect(replaceSpecialCharacters('ſ ẛ ẛ')).toEqual('s s s')
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

  test('Should map characters that decompose to ASCII letters to that decomposition', () => {
    const mismatches: Array<{ base: string, character: string, decomposed: string }> = []

    for (const { base, letters } of diacritics) {
      for (const character of letters) {
        const decomposed = character.normalize('NFKD').replace(/[̀-ͯ]/g, '')

        if (/^[A-Za-z]+$/.test(decomposed) && decomposed !== base) {
          mismatches.push({ base, character, decomposed })
        }
      }
    }

    expect(mismatches).toEqual([])
  })

  test('Should map uppercase and lowercase forms to the same letters', () => {
    const mismatches: string[] = []

    for (const [character, base] of mappedCharacters) {
      for (const partner of [character.toLowerCase(), character.toUpperCase()]) {
        const partnerBase = mappedCharacters.get(partner)

        if (partnerBase !== undefined && partnerBase.toLowerCase() !== base.toLowerCase()) {
          mismatches.push(`${character} -> ${base}, ${partner} -> ${partnerBase}`)
        }
      }
    }

    expect(mismatches).toEqual([])
  })

  test('Should preserve every unmapped BMP character', () => {
    const unexpectedChanges: Array<{ actual: string, character: string, expected: string }> = []

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
