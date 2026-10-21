const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// GET /api/users - Retrieve all users
router.get('/', userController.getUsers);

// GET /api/users/:id - Retrieve a user by ID
router.get('/:id', userController.getUserById);

// POST /api/users - Create a new user
router.post('/', userController.createUser);


module.exports = router;