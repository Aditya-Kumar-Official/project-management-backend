import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(` ✅Successfully CONNECTED`);
  } catch (err) {
    console.error('❌MongoDB connection error', err);
  }
};
export default connectDB;
