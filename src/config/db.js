const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error(
      'MongoDB URI is missing from the environment variables (.env).'
    );
  }

  await mongoose.connect(uri, {
    autoIndex: true
  });

  console.log('Connected to MongoDB Atlas successfully.');
}

module.exports = connectDB;
