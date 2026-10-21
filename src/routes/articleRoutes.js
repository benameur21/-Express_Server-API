const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');


// Important note: The '/api/articles' prefix will be defined in server.js.
// Here, '/' represents the root of the resource: '/api/articles'!

// GET /api/articles - Retrieve all articles
router.get('/', articleController.getAllArticles);

// GET /api/articles/:id - Retrieve one article
router.get('/:id', articleController.getArticleById);

// POST /api/articles - Create a new article
router.post('/', articleController.createArticle);

// PUT /api/articles/:id - Update an article
router.put('/:id', articleController.updateArticle);

// DELETE /api/articles/:id - Delete an article
router.delete('/:id', articleController.deleteArticle);
module.exports = router;