import express from 'express'
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/', protect, getOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/status', protect, updateOrderStatus)

export default router