import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.use(logger())
app.use(basicAuth({username: 'areg', password: 'qwe'}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
