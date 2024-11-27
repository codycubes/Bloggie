import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoute.js";
// import authRoutes from "./routes/authRoute.js";
// import tweetRoutes from "./routes/tweetRoute.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
dotenv.config();

const connect = () => {
//   mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};


app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/tweets", tweetRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => {
  connect();
  console.log("Listening to port 8000");
});





