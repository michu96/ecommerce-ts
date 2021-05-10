import express from 'express'
import userRouter from './routes/user'
import productRouter from './routes/product'

const app = express()

app.use(express.json())

app.get('/', async (_req, res) => {
  res.send('Test')
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
