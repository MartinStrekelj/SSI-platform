import * as express from 'express';
import { resolveIdentityFromJWT } from './IdentityController';

const router = express.Router({});

router.get('/', (req: express.Request, res: express.Response) =>
  resolveIdentityFromJWT(req, res)
);

export default router;
