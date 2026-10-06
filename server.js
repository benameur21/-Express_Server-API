const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
  res.json({ message: 'Hello, I am the blog API' });
});

// The Article Collection
// In-memory data store. State resets to defaults upon process restart.
// Persistent storage will be handled by MongoDB in Session 3.
const articles = [
  { id: 1, title: 'Welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

app.get('/api/articles', (req, res) => {
  const { author } = req.query;
  let result = articles;

  if (author) {
    result = articles.filter((a) => a.author === author);
  }

  res.json({ total: result.length, articles: result });
});



// GET /api/articles/:id -> fetch article whose id equals 2
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} not found` });
  }

  res.json(article);
});







app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});