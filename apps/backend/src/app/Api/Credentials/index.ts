import * as express from 'express'
import { AuthGuard } from '../../Middleware/AuthMiddleware'
import { IssueNewCrendetial } from './GenerateController'
import { listMyCredentials, transferCredential, findCredentialById } from './ManagementController'

const router = express.Router({})

/**
 * CREDENTIAL GENERATION
 */
router.post('/issue', AuthGuard, (req: express.Request, res: express.Response) => IssueNewCrendetial(req, res))

/**
 * CREDENTIAL MANAGEMENT
 */
router.get('/', AuthGuard, (req: express.Request, res: express.Response) => listMyCredentials(req, res))
router.get('/:id', AuthGuard, (req: express.Request, res: express.Response) => findCredentialById(req, res))

router.post('/transfer', AuthGuard, (req: express.Request, res: express.Response) => transferCredential(req, res))

/**
 * CREDENTIAL VERIFICATION
 */

export default router
