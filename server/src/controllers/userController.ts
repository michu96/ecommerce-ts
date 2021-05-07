import { Request, Response } from 'express'
import { prisma } from '../db'

const userController = {
  create: async (req: Request, res: Response) => {
    try {
      await prisma.user.create({
        data: {
          email: req.body.email,
          password: req.body.password,
        },
      })
      res.status(201).json('ok')
    } catch (err) {
      res.status(500).json('Something went wrong')
    }
  },

  read: async (_req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
        orderBy: { email: 'asc' },
        take: 50,
      })
      res.json(users)
    } catch (err) {
      res.status(500).json('Something went wrong')
    }
  },

  readOne: async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findFirst({
        where: { id: parseInt(req.params.id) },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      })
      if (!user) {
        return res.status(404).json('User not found')
      }
      res.json(user)
    } catch (err) {
      res.status(500).json('Something went wrong')
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: {
          email: req.body.email,
          password: req.body.password,
        },
      })
      res.status(200).json('ok')
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json('User not found')
      }
      res.status(500).json('Something went wrong')
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await prisma.user.delete({ where: { id: parseInt(req.params.id) } })
      res.sendStatus(204)
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json('User not found')
      }
      res.status(500).json('Something went wrong')
    }
  },
}

export default userController
