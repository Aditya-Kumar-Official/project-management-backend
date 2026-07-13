import dotenv from 'dotenv';
import app from './app.js';
import dns from 'dns';
import connectDB from './db/index.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const port = process.env.PORT || 3000;

dotenv.config({ path: './.env' });

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })

  .catch((err) => {
    console.error('❌MongoDB connection error', err);
    process.exit(1);
  });
