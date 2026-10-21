const User = require('../models/userModel');

// 1. Create a new user (POST /api/users)
const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const user = await User.create({ name, email, age, role });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 2. Retrieve all users (GET /api/users)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 3. Retrieve a user by ID (GET /api/users/:id)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// 4.delete a user by ID (DELETE /api/users/:id)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Vérifier si l'utilisateur existe et le supprimer
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
      user
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};







module.exports = { createUser, getUsers, getUserById, deleteUser };
