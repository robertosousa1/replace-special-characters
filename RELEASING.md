# Releasing

Releases use Release Please, Conventional Commits, GitHub Releases, and npm trusted publishing.

## One-time GitHub configuration

1. In repository settings, allow GitHub Actions to read and write repository contents and create pull requests.
2. Create a fine-grained personal access token restricted to this repository with read/write access to contents, issues, and pull requests.
3. Add that token as the repository Actions secret `RELEASE_PLEASE_TOKEN`.
4. Protect `master`, require pull requests and the CI checks, and disable direct pushes.
5. Enable squash merging and configure the squash commit title to use the pull request title.

The personal access token is required so CI runs on Release Please pull requests and so the GitHub Release event can trigger the publication workflow.

## One-time npm configuration

Open the package settings for `replace-special-characters` on npm and add a trusted publisher with:

```text
Provider: GitHub Actions
Organization or user: robertosousa1
Repository: replace-special-characters
Workflow filename: publish.yml
Allowed action: npm publish
```

Do not configure `NPM_TOKEN`. Trusted publishing uses a short-lived OIDC credential and automatically generates provenance.

After the first successful trusted publication, set npm publishing access to require two-factor authentication and disallow tokens.

## Bootstrap version 2.0.0

Version `2.0.0` and its changelog were prepared before Release Please was enabled. After these configuration commits are on `master` and CI passes:

1. Create a GitHub Release for the new tag `v2.0.0`, targeting `master`.
2. Use the `2.0.0` section from `CHANGELOG.md` as the release notes.
3. Publish the GitHub Release.
4. Confirm that the `Publish` workflow publishes `2.0.0` to npm.

This is the only manual bootstrap release.

## Subsequent releases

1. Merge pull requests with Conventional Commit titles.
2. Release Please creates or updates its release pull request.
3. Review the proposed version and changelog.
4. Merge the release pull request.
5. Release Please creates the tag and GitHub Release.
6. The `Publish` workflow publishes that exact tag to npm.

The version does not increase on every CI run. Only merging the Release Please pull request changes `package.json` and creates a release.

If publication fails after a GitHub Release exists, rerun the failed `Publish` workflow. The workflow can also be dispatched manually with the existing release tag.
