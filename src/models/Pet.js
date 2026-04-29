import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    enum: ['Labrador Retriever', 'Shih Tzu', 'Dachshund', 'Pomeranian', 'Aspin/Mixed'],
    required: true
  },
  backLength: {
    type: Number
  },
  neckGirth: {
    type: Number
  },
  chestGirth: {
    type: Number
  }
}, {
  timestamps: true
})

export default mongoose.model('Pet', petSchema)