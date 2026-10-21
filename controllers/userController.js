const { estNonVide, estEmailValide } = require('../utils/validators');

// Data stored in the controller (in memory for this session)
let users = [
    {
        id: 1,
        name: 'Islem ben ameur',
        email: 'islem@example.com',
        role: 'admin'
    },
    {
        id: 2,
        name: 'test one',
        email: 'test@example.com',
        role: 'user'
    }
];

let nextId = 3;

// 1. Retrieve all users (with an optional filter: ?role=...)
const getAllUsers = (req, res) => {
    const { role } = req.query;
    let result = users;

    if (role) {
        result = users.filter(user => user.role === role);
    }

    res.status(200).json({
        total: result.length,
        users: result
    });
};

// 2. Retrieve a user by their unique ID
const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            error: `User ${id} not found`
        });
    }

    res.status(200).json(user);
};

// 3. Create a new user

const createUser = (req, res) => {
    const { name, email, role } = req.body;

    // Validate the user's name
    if (!estNonVide(name)) {
        return res.status(400).json({
            error: 'Name is required and cannot be empty'
        });
    }

    // Validate the user's email
    if (!estEmailValide(email)) {
        return res.status(400).json({
            error: 'Invalid email address. The email must contain @ and .'
        });
    }

    // Create the new user
    const newUser = {
        id: nextId++,
        name: name.trim(),
        email: email.trim(),
        role: role || 'user'
    };

    users.push(newUser);

    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
};


// 4. Delete a user by their unique ID
const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const userExists = users.some(user => user.id === id);

    if (!userExists) {
        return res.status(404).json({
            error: `Cannot delete: User ${id} not found`
        });
    }

    users = users.filter(user => user.id !== id);

    res.status(200).json({
        message: `User ${id} deleted successfully`
    });
};




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};
