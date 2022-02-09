import * as express from 'express'
import { AuthGuard } from '../../Middleware/AuthMiddleware'
import { IssueNewCrendetial } from './GenerateController'
import { listMyCredentials } from './ManagementController'

const router = express.Router({})

/**
 * CREDENTIAL GENERATION
 */
router.post('/issue', AuthGuard, (req: express.Request, res: express.Response) => IssueNewCrendetial(req, res))

/**
 * CREDENTIAL MANAGEMENT
 */
router.get('/', AuthGuard, (req: express.Request, res: express.Response) => listMyCredentials(req, res))

/**
 * CREDENTIAL VERIFICATION
 */

export default router
