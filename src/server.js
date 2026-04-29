import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import petRoutes from './routes/pets.js'
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/orders.js'



const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/pets', petRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'PawFit API is running! 🐾' })
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
  })