import request from 'supertest'
import express from 'express'
import router from '../src/routes/'

const app = express()
app.use(express.json())
app.use('/api/v1/repo/stats', router)

describe('RepoRouter', () => {
  jest.setTimeout(20000) // Increase Jest timeout to handle API calls taking up to 10 seconds

  it('should get a summary of all months', async () => {
    const res = await request(app).get('/api/v1/repo/stats')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body[0]).toHaveProperty('month')
    expect(res.body[0]).toHaveProperty('opened')
    expect(res.body[0]).toHaveProperty('closed')
  })

  it('should get a summary for a specific month and year', async () => {
    const res = await request(app).get('/api/v1/repo/stats/summary?month=09&year=2021')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('month')
    expect(res.body).toHaveProperty('opened')
    expect(res.body).toHaveProperty('closed')
  })

  it('should return an error for missing month or year query parameters', async () => {
    const res = await request(app).get('/api/v1/repo/stats/summary')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('should get a summary for a specific year', async () => {
    const res = await request(app).get('/api/v1/repo/stats/year-summary?year=2021')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body[0]).toHaveProperty('month')
    expect(res.body[0]).toHaveProperty('opened')
    expect(res.body[0]).toHaveProperty('closed')
  })

  it('should return an error for missing year query parameter', async () => {
    const res = await request(app).get('/api/v1/repo/stats/year-summary')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
