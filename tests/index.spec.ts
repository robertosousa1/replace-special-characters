import replaceSpecialCharacters from '~/index'

describe('replaceSpecialCharacters function', () => {
  test('Should convert special characters to common characters', () => {
    const input = 'JäváSçrîpt'
    const output = 'JavaScript'

    expect(replaceSpecialCharacters(input)).toEqual(output)
  })
})

describe('replaceSpecialCharacters function', () => {
  test('Should keep common characters', () => {
    const input = 'JavaScript'
    const output = 'JavaScript'

    expect(replaceSpecialCharacters(input)).toEqual(output)
  })
})
