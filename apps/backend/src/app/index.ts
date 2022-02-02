import * as express from 'express'
import { default as Login } from './Api/Login'
import { default as Identity } from './Api/Identity'
import { default as Credentials } from './Api/Credentials'

const router = express.Router({})

router.use('/login', Login)
router.use('/identity', Identity)
router.use('/credentials', Credentials)

export default router
