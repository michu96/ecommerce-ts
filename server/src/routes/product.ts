import { Router } from 'express'
import productController from '../controllers/productController'
import { parseQuery } from '../middlewares/productMiddleware'

const router = Router()

router.post('/', productController.create)
router.get('/', parseQuery, productController.read)
router.get('/:id', productController.readOne)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)

export default router
