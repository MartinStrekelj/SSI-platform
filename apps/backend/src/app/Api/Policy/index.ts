import * as express from 'express'
import { AuthGuard } from '../../Middleware/AuthMiddleware'
import { allPolicies, getPolicy, postPolicy } from './PolicyController'

const router = express.Router({})

router.get('/', AuthGuard, (req, res) => allPolicies(req, res))
router.get('/:uuid', AuthGuard, (req, res) => getPolicy(req, res))
router.post('/', AuthGuard, (req, res) => postPolicy(req, res))
// router.put('/:uuid', AuthGuard, (req, res) => putPolicy(req, res))
// router.delete('/:uuid', AuthGuard, (req, res) => deletePolicy(req, res))

export default router
