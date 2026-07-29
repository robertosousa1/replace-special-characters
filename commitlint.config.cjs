const conventionalConfig = require('@commitlint/config-conventional').default

module.exports = {
  ...conventionalConfig,
  rules: {
    ...conventionalConfig.rules,
    'header-max-length': [2, 'always', 200],
  },
}
