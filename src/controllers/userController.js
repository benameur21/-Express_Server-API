const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Utilitaire de génération de Token JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

// POST /api/users/register (Inscription)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe requis' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hachage sécurisé avec sel (Salt factor = 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      role:'user'
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

// POST /api/users/login (Connexion)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Comparaison sécurisée en temps constant
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/users/profile (Profil protégé)
const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/users (Admin uniquement)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/update-password
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: 'Les deux mots de passe sont obligatoires'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Récupérer l'utilisateur connecté
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur introuvable'
      });
    }

    // Vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Ancien mot de passe incorrect'
      });
    }

    // Générer un sel et hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({
      message: 'Mot de passe modifié avec succès'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Erreur serveur'
    });
  }
};


// PUT /api/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        message: 'Invalid role. Use user or admin'
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      message: 'User role updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }

    return res.status(500).json({
      message: 'Server error'
    });
  }
};


module.exports = { registerUser, loginUser, getUserProfile, getAllUsers ,  updatePassword, updateUserRole};