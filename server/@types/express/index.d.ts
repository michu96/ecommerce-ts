export {}

declare global {
  namespace Express {
    interface Request {
      parsedQuery: any
    }
  }
}
