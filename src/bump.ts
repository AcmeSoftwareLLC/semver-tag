import * as core from '@actions/core'
import { inc, type ReleaseType } from 'semver'

export default function bump(tag: string, level: ReleaseType): string {
  core.info(`Tag: ${tag}`)
  core.info(`Level: ${level}`)

  const nextTag = inc(tag, level)

  if (nextTag === null) {
    core.setFailed(`Invalid tag: ${tag}`)
    return ''
  }

  core.info(`Next tag: ${nextTag}`)
  return nextTag
}
