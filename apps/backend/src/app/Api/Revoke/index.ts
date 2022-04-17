import * as express from 'express'
import { AuthGuard } from '../../Middleware/AuthMiddleware'
import { revokeAction, undoRevokeAction } from './RevokeController'

const router = express.Router({})

router.post('/', AuthGuard, (req, res) => revokeAction(req, res))
router.delete('/:hash', AuthGuard, (req, res) => undoRevokeAction(req, res))

export default router
