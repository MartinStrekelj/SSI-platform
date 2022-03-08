import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan'
import { default as Api } from './app'
import { prepareVCIssuers } from './app/Veramo/veramoInit'

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/api', Api)
app.get('/health', (req, res) => res.send({ message: 'OK' }))

const port = process.env.port || 3333
const server = app.listen(port, () => {
  prepareVCIssuers()
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)

export default app
