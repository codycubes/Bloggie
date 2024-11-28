import express from 'express';
import dotenv from 'dotenv'; // Ensure this is at the top
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
import tweetRoutes from './routes/tweetRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api/users', userRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
