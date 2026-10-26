const dns = require('node:dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

console.log('User routes mounted');

async function startServer() {
  try {
    await connectDB(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`MERN server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Critical server startup error:', error.message);
    process.exit(1);
  }
}

startServer();
