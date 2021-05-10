import { Prisma } from '.prisma/client'
import { NextFunction, Request, Response } from 'express'

export const parseQuery = (req: Request, res: Response, next: NextFunction) => {
  const order: Prisma.Enumerable<Prisma.ProductOrderByInput> = {}
  switch (req.query.order) {
    case 'n':
      order.name = 'asc'
      break
    case 'nd':
      order.name = 'desc'
      break
    case 'p':
      order.price = 'asc'
      break
    case 'pd':
      order.price = 'desc'
      break
  }
  let page = parseInt(req.query.page as string)
  if (!page || page < 1 || page > 1000) {
    page = 1
  }
  req.parsedQuery = {
    order,
    page,
  }
  next()
}
