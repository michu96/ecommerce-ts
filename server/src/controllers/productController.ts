import { Request, Response } from 'express'
import { prisma } from '../db'

const productController = {
  create: async (req: Request, res: Response) => {
    try {
      await prisma.product.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        },
        select: { id: true },
      })
      res.status(201).json('ok')
    } catch (err) {
      res.status(500).json('Something went wrong')
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const count = await prisma.product.count()
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
        },
        take: 12,
        skip: 12 * (req.parsedQuery.page - 1),
        orderBy: req.parsedQuery.order,
      })
      res.json({ count, products })
    } catch (err) {
      res.status(500).json('Something went wrong')
    }
  },

  readOne: async (req: Request, res: Response) => {
    try {
      const product = await prisma.product.findFirst({
        where: { id: parseInt(req.params.id) },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      })
      if (!product) {
        return res.status(404).json('Product not found')
      }
      res.json(product)
    } catch (err) {
      res.status(500).json('Something went wrong')
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await prisma.product.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        },
      })
      res.status(200).json('ok')
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json('Product not found')
      }
      res.status(500).json('Something went wrong')
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await prisma.product.delete({ where: { id: parseInt(req.params.id) } })
      res.sendStatus(204)
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json('Product not found')
      }
      res.status(500).json('Something went wrong')
    }
  },
}

export default productController
