const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Important note: The '/api/articles' prefix will be defined in server.js.
// Here, '/' represents the root of the resource: '/api/articles'!

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);

module.exports = router;