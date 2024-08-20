import express, { Request, Response } from 'express'
import { getAllPullRequests, summarizePullRequestsByMonth } from '../controllers/RepoController'
import { Summary } from '../types'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const pullRequests = await getAllPullRequests()
  const summary: Summary[] = summarizePullRequestsByMonth(pullRequests)

  res.send(summary)
})

router.get('/summary', async (req: Request, res: Response) => {
  const { month, year } = req.query

  if (!month || !year) {
    return res.status(400).send({ error: 'Both month and year query parameters are required.' })
  }

  const pullRequests = await getAllPullRequests()
  const summary: Summary[] = summarizePullRequestsByMonth(pullRequests)

  const targetMonth = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long', year: 'numeric' })

  const monthSummary = summary.find(item => item.month === targetMonth)

  if (!monthSummary) return res.status(404).send({ error: 'No data found for the given month and year.' })

  res.send(monthSummary)
})

router.get('/year-summary', async (req: Request, res: Response) => {
  const { year } = req.query

  if (!year) return res.status(400).send({ error: 'The year query parameter is required.' })

  const pullRequests = await getAllPullRequests()
  const summary = summarizePullRequestsByMonth(pullRequests)

  const yearSummary = summary.filter(item => {
    return new Date(item.month).getFullYear() === parseInt(year as string, 10)
  })

  if (yearSummary.length === 0) return res.status(404).send({ error: 'No data found for the given year.' })

  res.send(yearSummary)
})

export default router
