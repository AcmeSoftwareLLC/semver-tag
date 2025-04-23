# Semver Tag Action

Analyzes the latest Git tag and calculates the next version by applying a semantic version bump (major, minor, patch, or custom), helping streamline release automation.

## Usage

```yaml
steps:
  - name: Clone repository
    uses: actions/checkout@v4

  - name: Generate Next Tag
    uses: AcmeSoftwareLLC/semver-tag@v1
    id: semver
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      level: minor # Optional, default is patch
      tag: v1.0.0 # Optional, if not provided, the latest tag will be used

  - name: Print Output
    run: echo "${{ steps.semver.outputs.next_tag }}"
```

## Input Options
| Input | Description | Required | Default |
|-------|-------------|----------|---------
| token | GitHub token for authentication | Yes | N/A |
| level | Semantic versioning level to bump (major, minor, patch, [see more](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/5f5a8dd065a29934723e2d42e4d7bf6817b75fa9/types/semver/index.d.ts#L104)) | No | patch |
| tag | The tag to analyze for the next version | No | latest tag in the repository |

## Output Options
| Output | Description |
|--------|-------------|
| next_tag | The calculated next version tag based on the provided level and latest tag |
| prev_tag | The previous tag before the increment |