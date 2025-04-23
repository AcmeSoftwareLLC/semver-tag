import { bumpTag } from '../src/bump.js'

describe('bump.ts', () => {
  it('increments correctly for patch level', () => {
    const nextTag = bumpTag('1.0.0', 'patch')
    expect(nextTag).toBe('1.0.1')
  })

  it('increments correctly for minor level', () => {
    const nextTag = bumpTag('1.0.0', 'minor')
    expect(nextTag).toBe('1.1.0')
  })

  it('increments correctly for major level', () => {
    const nextTag = bumpTag('1.0.0', 'major')
    expect(nextTag).toBe('2.0.0')
  })

  it('returns an empty string for invalid tag', () => {
    const nextTag = bumpTag('invalid-tag', 'patch')
    expect(nextTag).toBe('')
  })

  it('returns an empty string for invalid release type', () => {
    // @ts-expect-error: Testing invalid release type
    const nextTag = bumpTag('1.0.0', 'invalid-level')
    expect(nextTag).toBe('')
  })

  it('handles pre-release increment correctly', () => {
    const nextTag = bumpTag('1.0.0-beta.1', 'prerelease')
    expect(nextTag).toBe('1.0.0-beta.2')
  })

  it('handles build metadata correctly', () => {
    const nextTag = bumpTag('1.0.0+build.1', 'patch')
    expect(nextTag).toBe('1.0.1')
  })
})
