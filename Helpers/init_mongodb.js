const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing MongoDB connection');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
