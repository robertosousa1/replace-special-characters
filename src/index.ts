import diacritics from './diacritics'

function replaceSpecialCharacters (text: string): string {
  const diacriticsMap = {}
  for (let i = 0; i < diacritics.length; i++) {
    const letters = diacritics[i].letters
    for (let j = 0; j < letters.length; j++) {
      diacriticsMap[letters[j]] = diacritics[i].base
    }
  }

  function replace (refinedText: string): string {
    if (refinedText) {
      return refinedText.replace(/[^\u0000-\u007E]/g, function (a) {
        return diacriticsMap[a] || a
      })
    }

    return refinedText
  }

  return replace(text)
}

export = replaceSpecialCharacters
