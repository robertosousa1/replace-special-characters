# Contributing

Development requires Node.js 22.12 or newer.

```sh
npm ci
npm run check
```

Include tests for behavior changes and keep the public API backward compatible unless the change is explicitly planned for a major release.

## Conventional Commits

Pull request titles must follow Conventional Commits because the repository uses squash merges and the title becomes the commit on `master`.

```text
feat: add support for a new character group
fix: preserve an unsupported Unicode symbol
docs: clarify runtime behavior
test: cover decomposed input
chore: update development tooling
```

Use `!` or a `BREAKING CHANGE:` footer for an incompatible change:

```text
feat!: remove a deprecated API
```

Version impact:

- `fix:` creates a patch release.
- `feat:` creates a minor release.
- A breaking change creates a major release.
- Other types do not normally trigger a release.

## Release Process

Release Please reads Conventional Commits from `master` and maintains a release pull request. That pull request updates `package.json`, `package-lock.json`, and `CHANGELOG.md`.

Merging the release pull request creates the version tag and GitHub Release. The published GitHub Release then triggers npm trusted publishing from `.github/workflows/publish.yml`.

Do not run `npm version` or edit released changelog entries manually. Before merging a release pull request, review its version and release notes like any other code change.
