import Cart from '../models/Cart.js'

// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product')
    res.json(cart || { items: [] })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity, price } = req.body

    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, size, quantity, price }]
      })
    } else {
      const existingItem = cart.items.find(
        item => item.product.toString() === productId && item.size === size
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.items.push({ product: productId, size, quantity, price })
      }

      await cart.save()
    }

    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    )

    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Clear cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id })
    res.json({ message: 'Cart cleared' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}