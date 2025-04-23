import { bumpTag } from '../src/bump.js'

describe('bump.ts', () => {
  it('increments correctly', async () => {
    const nextTag = bumpTag('1.0.0', 'patch')
    expect(nextTag).toBe('1.0.1')
  })
})
