const express = require('express');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount the router under the '/api/articles' prefix
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

// Home route to test the overall server status
app.get('/', (req, res) => {
    res.json({
        message: "Blog API - Modular Server Operational (SoC)"
    });
});

app.listen(PORT, () => {
    console.log(`Modular server listening on http://localhost:${PORT}`);
});
