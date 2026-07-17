import express from 'express';
import cors from 'cors';
import healthCheckRouter from './routes/healthCheck.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(
  cors({
    origin: process.env.cors_origin?.split(',') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'options', 'patch'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1/healthCheckup', healthCheckRouter);
app.use('/api/v1/auth', authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.get('/', (req, res) => {
  res.send('aditya');
});

export default app;
