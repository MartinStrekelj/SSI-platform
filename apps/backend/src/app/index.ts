import * as express from 'express';
import { default as Login } from './Api/Login';
import { default as Identity } from './Api/Identity';

const router = express.Router({});

router.use('/login', Login);
router.use('/identity', Identity);

export default router;
