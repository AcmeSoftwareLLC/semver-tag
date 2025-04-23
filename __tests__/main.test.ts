/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import { getLatestTag } from '../__fixtures__/tag.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/tag.js', () => ({ getLatestTag }))

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation((name) => {
      switch (name) {
        case 'tag':
          return '1.0.0'
        case 'level':
          return 'patch'
        case 'token':
          return 'token'
        default:
          return ''
      }
    })

    getLatestTag.mockImplementation(() => Promise.resolve('1.0.0'))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Sets the next_tag output', async () => {
    await run()

    expect(core.setOutput).toHaveBeenNthCalledWith(1, 'next_tag', '1.0.1')
  })
})
