import { Router } from 'express'
import userController from '../controllers/userController'
import {
  userRequiredFields,
  userValidationRules,
  validateUserFields,
  hashPassword,
  checkEmailAvailability,
} from '../middlewares/userMiddleware'

const router = Router()

router.post(
  '/',
  userRequiredFields,
  userValidationRules,
  validateUserFields,
  checkEmailAvailability,
  hashPassword,
  userController.create
)
router.get('/', userController.read)
router.get('/:id', userController.readOne)
router.put(
  '/:id',
  userValidationRules,
  validateUserFields,
  checkEmailAvailability,
  hashPassword,
  userController.update
)
router.delete('/:id', userController.delete)

export default router
