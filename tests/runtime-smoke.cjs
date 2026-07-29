// biome-ignore lint/style/useNodejsImportProtocol: The smoke test must run on Node.js 12.
const assert = require('assert')
// biome-ignore lint/style/useNodejsImportProtocol: The smoke test must run on Node.js 12.
const path = require('path')
const packageName = process.argv[2]
const packagePath = packageName
  ? require.resolve(path.join(process.cwd(), 'node_modules', packageName))
  : '..'
const replaceSpecialCharacters = require(packagePath)

assert.strictEqual(replaceSpecialCharacters('JäváSçrîpt'), 'JavaScript')
assert.strictEqual(replaceSpecialCharacters('Cafe\u0301'), 'Cafe')
assert.strictEqual(replaceSpecialCharacters('Þ Ŋ ĸ'), 'TH N k')
assert.strictEqual(replaceSpecialCharacters(String.fromCharCode(55349, 56701)), 'R')
assert.strictEqual(replaceSpecialCharacters('Ω K Å'), 'Ω K Å')
assert.strictEqual(replaceSpecialCharacters(false), false)
assert.throws(
  () => replaceSpecialCharacters(true),
  /replaceSpecialCharacters expected a string, null, or undefined/,
)

console.log(`Runtime smoke test passed on ${process.version}`)
