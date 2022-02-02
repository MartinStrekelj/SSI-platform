import * as express from 'express'
import { IssueNewCrendetial } from './GenerateController'
import { listIssuedCredenetials, listMyCredentials } from './ManagementController'

const router = express.Router({})

/**
 * CREDENTIAL GENERATION
 */
router.post('/issue', (req: express.Request, res: express.Response) => IssueNewCrendetial(req, res))

/**
 * CREDENTIAL MANAGEMENT
 */
router.get('/', (req: express.Request, res: express.Response) => listMyCredentials(req, res))

/**
 * CREDENTIAL VERIFICATION
 */

export default router
