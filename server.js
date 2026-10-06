const express = require('express');
const app = express();
const PORT = 3000;

app.use( express.json () ) ; 



//exercice 1
//Q1
app.get("/about", (req, res) => {
  res.json({
    applicationName: "My Blog API",
    studentName: "Islem Ben Ameur",
  });
});

//Q2
const users = [
  {
    id: 1,
    name: "Aya",
    email: "aya@example.com"
  },
  {
    id: 2,
    name: "Ahmed",
    email: "ahmed@example.com"
  },
  {
    id: 3,
    name: "Sara",
    email: "sara@example.com"
  }
];

app.get("/api/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredUsers = users.filter(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    return res.json(filteredUsers);
  }

  res.json(users);
});

//Q3 
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
});

//Q4 
app.post("/contact", (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      message: "Email and message are required"
    });
  }

  res.status(200).json({
    message: "Thank you, your message has been received"
  });
});


//Q5
app.get("/api/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredUsers = users.filter(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    return res.json(filteredUsers);
  }

  res.json(users);
});



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


let nextId = 4;

// POST /api/articles -> create an article from { "title": "...", "author": "..." }
app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newArticle = { id: nextId, title, author };
  nextId += 1;
  articles.push(newArticle);

  res.status(201).json({ message: 'Article created', article: newArticle });
});



















app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});