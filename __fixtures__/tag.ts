import { jest } from '@jest/globals'

export const getLatestTag =
  jest.fn<typeof import('../src/tag.js').getLatestTag>()
