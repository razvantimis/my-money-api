import { request } from './utils/testRequest';

describe('Test the application', () => {
  it.skip('Should return 200 response', async () => {
    
    const res = await request('/dividends')
    expect(res.status).toBe(200)
  })
})

