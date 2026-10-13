// Data stored in the controller 
let articles = [
    { id: 1, title: 'Welcome to the blog', author: 'Admin' },
    { id: 2, title: 'My First Express Server', author: 'Aya' },
    { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

let nextId = 4;

// 1. Retrieve all articles (with an optional filter: ?author=...)
const getAllArticles = (req, res) => {
    const { author } = req.query;
    let result = articles;

    if (author) {
        result = articles.filter(a => a.author === author);
    }

    res.status(200).json({
        total: result.length,
        articles: result
    });
};

// 2. Retrieve an article by its unique ID
const getArticleById = (req, res) => {
    const id = Number(req.params.id);
    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({
            error: `Article ${id} not found`
        });
    }

    res.status(200).json(article);
};

// 3. Create a new article
const createArticle = (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            error: 'The title and author are required'
        });
    }

    const newArticle = {
        id: nextId++,
        title,
        author
    };

    articles.push(newArticle);

    res.status(201).json({
        message: 'Article created successfully',
        article: newArticle
    });
};

// 4. Update an existing article (PUT /api/articles/:id)
const updateArticle = (req, res) => {
    const id = Number(req.params.id);
    const { title, author } = req.body;

    // Find the article's index in the array
    const index = articles.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: `Article ${id} not found`
        });
    }

    // Update the article partially or completely
    if (title) articles[index].title = title;
    if (author) articles[index].author = author;

    res.status(200).json({
        message: 'Article updated successfully',
        article: articles[index]
    });
};
// 5. Delete an article (DELETE /api/articles/:id)
const deleteArticle = (req, res) => {
    const id = Number(req.params.id);

    const articleExists = articles.some(a => a.id === id);

    if (!articleExists) {
        return res.status(404).json({
            error: `Cannot delete: Article ${id} not found`
        });
    }

    // Filter the array to keep only articles with a different ID
    articles = articles.filter(a => a.id !== id);

    res.status(200).json({
        message: `Article ${id} deleted successfully`
    });
};
// CommonJS export: make these functions available to other modules
module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};