import * as core from '@actions/core'
import { valid, type ReleaseType } from 'semver'
import { bumpTag } from './bump.js'
import { getLatestTag } from './tag.js'

export async function run(): Promise<void> {
  try {
    const level = core.getInput('level', { required: true }) as ReleaseType
    const token = core.getInput('token', { required: true })
    let tag = core.getInput('tag')

    if (!tag) {
      core.info('No tag provided, fetching latest tag...')
      tag = await getLatestTag(token)
    }

    const nextTag = bumpTag(tag, level)

    core.setOutput('prev_tag', valid(tag))
    core.setOutput('next_tag', nextTag)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
