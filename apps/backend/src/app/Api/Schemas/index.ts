import * as express from 'express'
import { AuthGuard } from '../../Middleware/AuthMiddleware'
import { allSchemas, getSchema, postSchema, putSchema, deleteSchema } from './SchemasController'

const router = express.Router({})

router.get('/', AuthGuard, (req, res) => allSchemas(req, res))
router.get('/:uuid', AuthGuard, (req, res) => getSchema(req, res))
router.post('/', AuthGuard, (req, res) => postSchema(req, res))
router.put('/:uuid', AuthGuard, (req, res) => putSchema(req, res))
router.delete('/:uuid', AuthGuard, (req, res) => deleteSchema(req, res))

export default router
