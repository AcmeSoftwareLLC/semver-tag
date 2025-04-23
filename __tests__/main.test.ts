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
          return 'v1.0.0'
        case 'level':
          return 'patch'
        case 'token':
          return 'token'
        default:
          return ''
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Sets the next_tag output', async () => {
    await run()

    expect(core.setOutput).toHaveBeenNthCalledWith(1, 'prev_tag', '1.0.0')
    expect(core.setOutput).toHaveBeenNthCalledWith(2, 'next_tag', '1.0.1')
  })

  it('Fetches latest tag when no tag is provided', async () => {
    core.getInput.mockImplementation((name) => {
      switch (name) {
        case 'tag':
          return ''
        case 'level':
          return 'minor'
        case 'token':
          return 'token'
        default:
          return ''
      }
    })

    getLatestTag.mockImplementation(() => Promise.resolve('1.2.3'))

    await run()

    expect(getLatestTag).toHaveBeenCalledWith('token')
    expect(core.setOutput).toHaveBeenNthCalledWith(1, 'prev_tag', '1.2.3')
    expect(core.setOutput).toHaveBeenNthCalledWith(2, 'next_tag', '1.3.0')
  })
})
