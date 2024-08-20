import { Octokit } from '@octokit/rest'
import 'dotenv/config'
import { PullRequest, Summary } from '../types'

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
})

const getPullRequests = async (page: number): Promise<PullRequest[]> => {
  const response = await octokit.rest.pulls.list({
    owner: 'downshift-js',
    repo: 'downshift',
    state: 'all',
    page: page,
    per_page: 100,
  })
  return response.data
}

export const getAllPullRequests = async (): Promise<PullRequest[]> => {
  const pullRequests: PullRequest[] = []
  const maxConcurrentRequests = 10 
  let page: number = 1
  let hasMoreData: boolean = true

  while (hasMoreData) {
    const requests: Promise<PullRequest[]>[] = []

    for (let i = 0 ; i < maxConcurrentRequests ; i++) {
      requests.push(getPullRequests(page++))
    }

    const results: PullRequest[][] = await Promise.all(requests)
    hasMoreData = false

    for (const result of results) {
      if (result.length > 0) {
        hasMoreData = true
        pullRequests.push(...result)
      }
    }
  }

  return pullRequests
}

export const summarizePullRequestsByMonth = (pullRequests: PullRequest[]): Summary[] => {
  const summary: Summary[] = []
  const months: { [key: string]: { opened: number , closed: number } } = {}

  pullRequests.forEach((pullRequest) => {
    const createdMonth = pullRequest.created_at
      ? new Date(pullRequest.created_at).toISOString().slice(0, 7)
      : ''
    const closedMonth = pullRequest.closed_at
      ? new Date(pullRequest.closed_at).toISOString().slice(0, 7)
      : ''

    if (!months[createdMonth]) {
      months[createdMonth] = { opened: 0, closed: 0 }
    }
    months[createdMonth].opened++

    if (closedMonth) {
      if (!months[closedMonth]) {
        months[closedMonth] = { opened: 0, closed: 0 }
      }
      months[closedMonth].closed++
    }
  })

  for (const month in months) {
    summary.push({
      month: new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' }),
      opened: months[month].opened,
      closed: months[month].closed,
    })
  }

  return summary
}
