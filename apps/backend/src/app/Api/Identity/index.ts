import * as express from 'express'
import { resolveIdentityFromJWT, logoutUserAction } from './IdentityController'

const router = express.Router({})

router.get('/', (req: express.Request, res: express.Response) => resolveIdentityFromJWT(req, res))
router.get('/logout', (req: express.Request, res: express.Response) => logoutUserAction(req, res))

export default router
