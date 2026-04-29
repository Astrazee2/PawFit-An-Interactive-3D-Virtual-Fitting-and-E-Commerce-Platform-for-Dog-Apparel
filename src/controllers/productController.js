import Product from '../models/Product.js'

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { type, breed, size } = req.query
    let filter = {}

    if (type) filter.type = type
    if (breed) filter.breedCompatibility = breed
    if (size) filter.sizes = size

    const products = await Product.find(filter)
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}