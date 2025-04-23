import { jest } from '@jest/globals'

export const bumpTag = jest.fn<typeof import('../src/bump.js').bumpTag>()
