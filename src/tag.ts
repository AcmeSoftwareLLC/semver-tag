import * as core from '@actions/core'
import * as github from '@actions/github'

export default async function getLatestTag(token: string): Promise<string> {
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
    return ''
  }

  return tags.data[0].name
}
