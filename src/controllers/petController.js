import Pet from '../models/Pet.js'

// Create pet profile
export const createPet = async (req, res) => {
  try {
    const { name, breed, backLength, neckGirth, chestGirth } = req.body

    const pet = await Pet.create({
      owner: req.user.id,
      name,
      breed,
      backLength,
      neckGirth,
      chestGirth
    })

    res.status(201).json(pet)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get all pets of logged in user
export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user.id })
    res.json(pets)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Update pet profile
export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    )

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    res.json(pet)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Delete pet profile
export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    })

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    res.json({ message: 'Pet deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}