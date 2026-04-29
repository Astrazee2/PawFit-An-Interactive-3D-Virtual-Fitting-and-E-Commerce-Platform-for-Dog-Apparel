import Order from '../models/Order.js'
import Cart from '../models/Cart.js'

// Create order
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress
    })

    // Clear cart after order
    await Cart.findOneAndDelete({ user: req.user.id })

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get user orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('items.product')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}