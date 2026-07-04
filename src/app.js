import express from 'express';
import cors from 'cors';


const app = express();
app.use(
  cors({
    origin: process.env.cors_origin?.split(',') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'options', 'patch'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

console.log('hello');
app.get('/',(req,res)=>{res.send("aditya")})

export default app;
