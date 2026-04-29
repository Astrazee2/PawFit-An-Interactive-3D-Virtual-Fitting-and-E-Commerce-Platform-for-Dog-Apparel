import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    size: String,
    quantity: {
      type: Number,
      default: 1
    },
    price: Number
  }]
}, {
  timestamps: true
})

export default mongoose.model('Cart', cartSchema)