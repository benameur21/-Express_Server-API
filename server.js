const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, I am the blog API' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});