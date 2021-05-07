import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import { prisma } from '../db'

export const userRequiredFields = [
  body('email').notEmpty().withMessage('Email must not be empty'),
  body('password').notEmpty().withMessage('Password must not be empty'),
]

export const userValidationRules = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .optional()
    .isLength({ min: 5 })
    .withMessage('Password must be atleast 5 characters long'),
]

export const validateUserFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    return res.status(400).json(errors.mapped())
  }
}

export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.password) {
    next()
    return
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashedPassword
    next()
  } catch (err) {
    res.status(500).json('Something went wrong')
  }
}

export const checkEmailAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) {
    next()
    return
  }
  try {
    const userWithSameEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
      select: { email: true },
    })
    if (userWithSameEmail) {
      return res.status(400).json({ email: 'Email is already taken' })
    }
    next()
  } catch (err) {
    res.status(500).json('Something went wrong')
  }
}
