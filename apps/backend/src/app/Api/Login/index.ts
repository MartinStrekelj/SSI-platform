import * as express from 'express'
import { LoginWithWallet, Wallet2FAuth } from './LoginController'

const router = express.Router({})

router.post('/', (req: express.Request, res: express.Response) => LoginWithWallet(req, res))

router.post('/2fa', (req: express.Request, res: express.Response) => Wallet2FAuth(req, res))

export default router
