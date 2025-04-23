import * as core from '@actions/core'
import * as github from '@actions/github'
import { inc, type ReleaseType } from 'semver'

export async function run(): Promise<void> {
  try {
    const level = core.getInput('level', { required: true }) as ReleaseType
    const token = core.getInput('token', { required: true })
    let tag = core.getInput('tag')

    if (!tag) {
      const octokit = github.getOctokit(token)

      const { owner, repo } = github.context.repo
      const tags = await octokit.rest.repos.listTags({
        owner,
        repo,
        per_page: 1,
        page: 1
      })

      if (tags.data.length === 0) {
        core.setFailed('No tags found')
        return
      }

      tag = tags.data[0].name
    }

    core.info(`Level: ${level}`)
    core.info(`Tag: ${tag}`)

    const nextTag = inc(tag, level)

    if (nextTag === null) {
      core.setFailed(`Invalid tag: ${tag}`)
      return
    }

    core.info(`Next tag: ${nextTag}`)
    core.setOutput('next-tag', nextTag)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
