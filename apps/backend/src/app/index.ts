import * as express from 'express';
import { default as Login } from './Login/index';

const router = express.Router({});

router.use('/login', Login);

export default router;
