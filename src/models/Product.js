import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['shirt', 'coat', 'sweater', 'hoodie'],
    required: true
  },
  breedCompatibility: [{
    type: String,
    enum: ['Labrador Retriever', 'Shih Tzu', 'Dachshund', 'Pomeranian', 'Aspin/Mixed']
  }],
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL']
  }],
  glbAssetUrl: {
    type: String
  },
  imageUrl: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('Product', productSchema)