import * as express from 'express'
import { default as Login } from './Api/Login'
import { default as Identity } from './Api/Identity'
import { default as Credentials } from './Api/Credentials'
import { default as Schemas } from './Api/Schemas'
import { default as Policy } from './Api/Policy'

const router = express.Router({})

router.use('/login', Login)
router.use('/identity', Identity)
router.use('/credentials', Credentials)
router.use('/schemas', Schemas)
router.use('/policy', Policy)

export default router
