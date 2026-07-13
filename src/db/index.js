import mongoose from 'mongoose';

import { databaseName } from '../utils/constants.js';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${databaseName}`);
    console.log(` ✅Successfully CONNECTED`);
  } catch (err) {
    console.error('❌MongoDB connection error---', err);
    process.exit(1);
  }
};

export default connectDB;
