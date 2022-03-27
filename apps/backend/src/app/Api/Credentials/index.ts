import * as express from 'express'
import { AuthGuard, MobileAuthGuard } from '../../Middleware/AuthMiddleware'
import { IssueNewCrendetial } from './GenerateController'
import { listMyCredentials, transferCredential, findCredentialById, createPresentation } from './ManagementController'
import { useVerificationPolicy } from './VerificationController'

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
router.post('/presentation', MobileAuthGuard, (req: express.Request, res: express.Response) =>
  createPresentation(req, res)
)

/**
 * CREDENTIAL VERIFICATION
 */
router.post('/verify', (req: express.Request, res: express.Response) => useVerificationPolicy(req, res))

export default router
