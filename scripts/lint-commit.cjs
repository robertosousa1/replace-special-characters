const lint = require('@commitlint/lint').default
const config = require('../commitlint.config.cjs')

let message = ''

process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  message += chunk
})
process.stdin.on('end', async () => {
  const report = await lint(message.trim(), config.rules, {
    defaultIgnores: true,
  })

  for (const problem of [...report.errors, ...report.warnings]) {
    console.error(`${problem.level === 2 ? 'error' : 'warning'}: ${problem.message} [${problem.name}]`)
  }

  if (!report.valid) {
    process.exitCode = 1
  }
})
