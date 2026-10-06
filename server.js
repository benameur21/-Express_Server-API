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

// GET /api/articles -> fetch all articles
app.get('/api/articles', (req, res) => {
  res.json({ total: articles.length, articles });
});










app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});