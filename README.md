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
    run: echo "${{ steps.semver.outputs.next-tag }}"
```
