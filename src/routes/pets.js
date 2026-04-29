import express from 'express'
import {
  createPet,
  getPets,
  updatePet,
  deletePet
} from '../controllers/petController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createPet)
router.get('/', protect, getPets)
router.put('/:id', protect, updatePet)
router.delete('/:id', protect, deletePet)

export default router