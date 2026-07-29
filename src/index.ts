import diacritics from './diacritics'

const diacriticsMap = diacritics.reduce<Record<string, string>>((map, { base, letters }) => {
  for (const letter of letters) {
    map[letter] = base
  }

  return map
}, {})

const decomposedCharacterPattern = /[\s\S][\u0300-\u036F]+/g
const mathematicalAlphanumericStart = 0x1d400
const mathematicalAlphanumericEnd = 0x1d7ff
const asciiLetterPattern = /^[A-Za-z]$/

function replaceCharacter (character: string): string {
  const mappedCharacter = diacriticsMap[character]

  if (mappedCharacter) {
    return mappedCharacter
  }

  const codePoint = character.codePointAt(0)

  if (
    typeof character.normalize === 'function' &&
    codePoint !== undefined &&
    codePoint >= mathematicalAlphanumericStart &&
    codePoint <= mathematicalAlphanumericEnd
  ) {
    const normalizedCharacter = character.normalize('NFKD')

    if (asciiLetterPattern.test(normalizedCharacter)) {
      return normalizedCharacter
    }
  }

  return character
}

function replaceSpecialCharacters (text: string): string
function replaceSpecialCharacters (text: null): null
function replaceSpecialCharacters (text: undefined): undefined
function replaceSpecialCharacters (
  text: string | null | undefined
): string | null | undefined
function replaceSpecialCharacters (text: unknown): unknown {
  if (!text) {
    return text
  }

  if (typeof text !== 'string') {
    throw new TypeError('replaceSpecialCharacters expected a string, null, or undefined')
  }

  const normalizedText =
    typeof text.normalize === 'function'
      ? text.replace(decomposedCharacterPattern, (sequence) =>
          diacriticsMap[sequence[0]] ? sequence.normalize('NFC') : sequence,
        )
      : text

  return normalizedText.replace(
    // biome-ignore lint/suspicious/noControlCharactersInRegex: Matches characters outside the ASCII range.
    /[^\u0000-\u007E]/gu,
    replaceCharacter,
  )
}

export = replaceSpecialCharacters
