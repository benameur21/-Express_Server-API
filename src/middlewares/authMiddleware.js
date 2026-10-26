const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 1. Protection des routes privées : vérifie la validité du JWT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Non autorisé, utilisateur introuvable' });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Non autorisé, token invalide ou expiré' });
    }
  }

  return res.status(401).json({ message: 'Non autorisé, aucun token fourni' });
};

// 2. Contrôle d'accès basé sur les rôles (RBAC) : réservé aux admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Accès refusé : droits administrateur requis' });
};

module.exports = { protect, adminOnly };