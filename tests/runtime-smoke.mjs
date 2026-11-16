import assert from 'node:assert'
import replaceSpecialCharacters from 'replace-special-characters'

assert.strictEqual(typeof replaceSpecialCharacters, 'function')
assert.strictEqual(replaceSpecialCharacters('Æther Œuvre'), 'AEther OEuvre')
assert.strictEqual(replaceSpecialCharacters('Cafe\u0301'), 'Cafe')

console.log(`ES module smoke test passed on ${process.version}`)
